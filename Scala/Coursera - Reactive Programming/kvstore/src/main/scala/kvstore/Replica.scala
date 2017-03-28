package kvstore

import akka.actor.{ OneForOneStrategy, Props, ActorRef, Actor }
import kvstore.Arbiter._
import scala.collection.immutable.Queue
import akka.actor.SupervisorStrategy.Restart
import scala.annotation.tailrec
import akka.pattern.{ ask, pipe }
import akka.actor.Terminated
import scala.concurrent.duration._
import akka.actor.PoisonPill
import akka.actor.OneForOneStrategy
import akka.actor.SupervisorStrategy
import akka.util.Timeout
import scala.language.postfixOps
import akka.actor.Cancellable

object Replica {
  sealed trait Operation {
    def key: String
    def id: Long
  }
  case class Insert(key: String, value: String, id: Long) extends Operation
  case class Remove(key: String, id: Long) extends Operation
  case class Get(key: String, id: Long) extends Operation

  sealed trait OperationReply
  case class OperationAck(id: Long) extends OperationReply
  case class OperationFailed(id: Long) extends OperationReply
  case class GetResult(key: String, valueOption: Option[String], id: Long) extends OperationReply

  def props(arbiter: ActorRef, persistenceProps: Props): Props = Props(new Replica(arbiter, persistenceProps))
}

class Replica(val arbiter: ActorRef, persistenceProps: Props) extends Actor {
  import Replica._
  import Replicator._
  import Persistence._
  import context.dispatcher

  var nextSequenceID = 0L
  var persistence = context.actorOf(persistenceProps)

  /* -------------------- Implementation of the in-memory storage ------------------------------ */

  var inMemStorage = Map.empty[String, String]
  def addToStorage(key: String, value: String) = inMemStorage += ((key, value))
  def removeFromStorage(key: String) =           inMemStorage -= (key)
  def getFromStorage(key: String) =              inMemStorage.get(key)


  /* -------------------- Implementation of the replication ------------------------------------ */ 
    
  /* The current set of replicators. For a secondary replica, it
     will contain exactly one replicator, set when the replica
     receives a Snapshot message. For the primary replica, it will
     contain all replicators in the system (managed by the 
     handleReplicas function which is called when the primary
     replica receives the Replicas message).
  */
  var replicators = Set.empty[ActorRef]

  /* A map from secondary replicas to replicators. This is used 
     by the HandleReplicas function to determine if a replica 
     already exists or not.
  */
  var secondaries = Map.empty[ActorRef, ActorRef]

  def sendCurrentState(reps: Set[ActorRef]) = {
    var id = 0 
    inMemStorage foreach { 
      case(key, value) => reps foreach {
        case rep => { rep ! Replicate(key, Some(value), id) }
      }
      id += 1
    }
  }

  /* -------------------- Implementation of pending operations --------------------------------- */ 
  
  /* ID -> (set of (one) persistence, set of replicators, original sender, scheduled task) */
  var pendingOperations = Map.empty[Long, (Set[ActorRef], Set[ActorRef], ActorRef, Cancellable)]

  def addToPendingOperations(id: Long, cancellable: Cancellable) = {
    context.system.scheduler.scheduleOnce(1 seconds) {
      pendingOperations.get(id) match {
        case Some((_, _, ar, c)) => {
          c.cancel()
          pendingOperations -= (id)
          ar ! OperationFailed(id)
        }
        case None =>
      }
    }
    pendingOperations += ((id, (Set(persistence), replicators, sender, cancellable)))
  }


  /* -------------------- Message handlers ----------------------------------------------------- */

  /* Replicas (Arbiter -> Primary Replica) */
  def handleReplicas(replicas: Set[ActorRef]) {
    var reps = Set.empty[ActorRef]
    var secs = Map.empty[ActorRef, ActorRef]

    replicas filter(ar => ar != self) foreach { 
      ar => { 
        secondaries.get(ar) match {
          case Some(r) => { reps += (r); secs += ((ar, r)) }
          case None    => { 
            var r = context.actorOf(Replicator.props(ar)); 
            reps += (r); secs += ((ar, r)) 
          }
        }
      }
    }

    val added_reps = reps -- replicators
    val removed_reps = replicators -- reps
    sendCurrentState(added_reps)
    
    var remaining_operations = Map.empty[Long, (Set[ActorRef], Set[ActorRef], ActorRef, Cancellable)]
    removed_reps foreach { 
      rep => {
        pendingOperations collect {
          case (id, (persistence, replicators, original_sender, scheduled_task)) if replicators contains rep => {
            scheduled_task.cancel()
            original_sender ! OperationAck(id)
          }
          case x => remaining_operations += x
        }
        rep ! PoisonPill 
      }
      pendingOperations = remaining_operations
    }

    replicators = reps
    secondaries = secs
  }

  /* Insert (Client -> Primary Replica) */
  def handleInsert(key: String, value: String, id: Long) = {
    val cancellable = context.system.scheduler.schedule(
      0 milliseconds, 100 milliseconds, persistence, 
      Persist(key, Some(value), id))

    addToPendingOperations(id, cancellable)
    addToStorage(key, value)
    replicators foreach { _ ! Replicate(key, Some(value), id) }
  }
  
  /* Remove (Client -> Primary Replica) */
  def handleRemove(key: String, id: Long) = {
    val cancellable = context.system.scheduler.schedule(
      0 milliseconds, 100 milliseconds, persistence, 
      Persist(key, None, id))

    addToPendingOperations(id, cancellable)
    removeFromStorage(key)
    replicators foreach { _ ! Replicate(key, None, id) }
  }

  /* Get (Client -> Replica) */
  def handleGet(key: String, id: Long) = {
    sender ! GetResult(key, getFromStorage(key), id)
  }

  /* Replicated (Replicator -> Primary Replica) */
  def handleReplicated(key: String, id: Long) = {
    pendingOperations.get(id) match {
      case Some((persistence, replicators, ar, c)) if (persistence.size==0 && replicators.size==1) => {
        c.cancel
        pendingOperations -= (id)
        ar ! OperationAck(id)
      }
      case Some((persistence, replicators, ar, c)) => {
        pendingOperations -= (id)
        pendingOperations += ((id, (persistence, replicators - sender, ar, c)))
      }
      case None =>
    }
  }

  /* Persisted (Persistence -> Replica) */
  def handlePersisted(key: String, id: Long) = {
    pendingOperations.get(id) match {
      case Some((peristence, replicators, ar, c)) if (replicators.size==0) => {
        pendingOperations -= (id)
        ar ! OperationAck(id)
      }
      case Some((peristence, replicators, ar, c)) => {
        pendingOperations -= (id)
        pendingOperations += ((id, (Set.empty[ActorRef], replicators, ar, c)))
      }
      case _ => 
    }
  }

  /* seq -> (key, original sender, scheduled task) */  
  var pendingSnapshots = Map.empty[Long, (String, ActorRef, Cancellable)]

  /* Snapshot (Replicator -> Secondary Replica) */
  def handleSnapshot(key: String, valueOption: Option[String], seq: Long) = {
    if (seq < nextSequenceID) {
      sender ! SnapshotAck(key, seq)
    }
    else if (seq == nextSequenceID) {
      val cancellable = context.system.scheduler.schedule(
        0 milliseconds, 100 milliseconds, persistence, 
        Persist(key, valueOption, seq))
      valueOption match {
        case Some(value) => addToStorage(key, value)
        case None => removeFromStorage(key)
      }
      pendingSnapshots += ((seq, (key, sender, cancellable)))
      nextSequenceID += 1
    }
    else {
    }
  }

  /* Persisted2 (Persistence -> Secondary Replica) */
  def handlePersisted2(key: String, seq: Long) = {
    pendingSnapshots.get(seq) match {
      case Some((key, ar, c)) => {
        ar ! SnapshotAck(key, seq)
        c.cancel
      }
      case _ =>
    }
  }

  /* -------------------- Message loop --------------------------------------------------------- */

  def receive = {
    case JoinedPrimary   ⇒ context.become(primary)
    case JoinedSecondary ⇒ context.become(secondary)
  }

  val primary: Receive = {
    case Insert(key, value, id) ⇒ handleInsert(key, value, id)
    case Remove(key, id)        ⇒ handleRemove(key, id)
    case Get(key, id)           ⇒ handleGet(key, id)
    case Replicas(replicas)     ⇒ handleReplicas(replicas)
    case Replicated(key, id)    ⇒ handleReplicated(key, id)
    case Persisted(key, id)     ⇒ handlePersisted(key, id)
    case _                      ⇒
  }

  val secondary: Receive = {
    case Get(key, id)                    => handleGet(key, id)
    case Snapshot(key, valueOption, seq) => handleSnapshot(key, valueOption, seq)
    case Persisted(key, id)              => handlePersisted2(key, id)
    case _                               =>
  }

  arbiter ! Join

}
