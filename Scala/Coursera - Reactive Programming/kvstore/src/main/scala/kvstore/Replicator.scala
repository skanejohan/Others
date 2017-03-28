package kvstore

import akka.actor.Props
import akka.actor.Actor
import akka.actor.ActorRef
import scala.language.postfixOps
import scala.concurrent.duration._
import akka.actor.Cancellable

object Replicator {
  case class Replicate(key: String, valueOption: Option[String], id: Long)
  case class Replicated(key: String, id: Long)
  
  case class Snapshot(key: String, valueOption: Option[String], seq: Long)
  case class SnapshotAck(key: String, seq: Long)

  def props(replica: ActorRef): Props = Props(new Replicator(replica))
}

class Replicator(val replica: ActorRef) extends Actor {
  import Replicator._
  import Replica._
  import context.dispatcher
  
  var acks = Map.empty[Long, (ActorRef, Replicate, Cancellable)]
  
  var _seqCounter = 0L
  def nextSeq = {
    val ret = _seqCounter
    _seqCounter += 1
    ret
  }
  
  def handleReplicate(key: String, valueOption: Option[String], id: Long) {
    val seq = nextSeq
    val cancellable = context.system.scheduler.schedule(
      0 milliseconds, 100 milliseconds, replica, 
      Snapshot(key, valueOption, seq))
    acks += ((seq, (sender, Replicate(key, valueOption, id), cancellable)))
  }

  def handleSnapshotAck(key: String, seq: Long) {
    acks.get(seq) match {
      case Some((actorRef, replicate, cancellable)) => {
        cancellable.cancel
        actorRef ! Replicated(key, replicate.id)
        acks -= (seq)
      }
      case _ =>
    }
  }
  
  def receive: Receive = {
    case Replicate(key, valueOption, id) => handleReplicate(key, valueOption, id)
    case SnapshotAck(key, seq)           => handleSnapshotAck(key, seq)
    case _                               =>
  }

}
