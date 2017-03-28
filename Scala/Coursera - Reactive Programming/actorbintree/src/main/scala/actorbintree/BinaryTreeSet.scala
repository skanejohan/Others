/**
 * Copyright (C) 2009-2013 Typesafe Inc. <http://www.typesafe.com>
 */
package actorbintree

import akka.actor._
import scala.collection.immutable.Queue

object BinaryTreeSet {

  trait Operation {
    def requester: ActorRef
    def id: Int
    def elem: Int
  }

  trait OperationReply {
    def id: Int
  }

  /** Request with identifier `id` to insert an element `elem` into the tree.
    * The actor at reference `requester` should be notified when this operation
    * is completed.
    */
  case class Insert(requester: ActorRef, id: Int, elem: Int) extends Operation

  /** Request with identifier `id` to check whether an element `elem` is present
    * in the tree. The actor at reference `requester` should be notified when
    * this operation is completed.
    */
  case class Contains(requester: ActorRef, id: Int, elem: Int) extends Operation

  /** Request with identifier `id` to remove the element `elem` from the tree.
    * The actor at reference `requester` should be notified when this operation
    * is completed.
    */
  case class Remove(requester: ActorRef, id: Int, elem: Int) extends Operation

  /** Request to perform garbage collection*/
  case object GC

  /** Holds the answer to the Contains request with identifier `id`.
    * `result` is true if and only if the element is present in the tree.
    */
  case class ContainsResult(id: Int, result: Boolean) extends OperationReply
  
  /** Message to signal successful completion of an insert or remove operation. */
  case class OperationFinished(id: Int) extends OperationReply

}


class BinaryTreeSet extends Actor with ActorLogging {
  import BinaryTreeSet._
  import BinaryTreeNode._

  def createRoot: ActorRef = context.actorOf(BinaryTreeNode.props(0, initiallyRemoved = true))

  var root = createRoot

  var pendingQueue = Queue.empty[Operation]

  def receive = normal

  val normal: Receive = {
    case Insert(requester, id, elem) => { 
      //println("Tree Insert " + elem)
      root ! Insert(requester, id, elem) 
    }
    case Contains(requester, id, elem) => {
      //println("Tree Contains " + elem)
      root ! Contains(requester, id, elem)
    }
    case Remove(requester, id, elem) => {
      //println("Tree Remove " + elem)
      root ! Remove(requester, id, elem)
    }
    case GC => {
      //println("Tree GC")
      val newRoot = createRoot
      context.become(garbageCollecting(newRoot))
      root ! CopyTo(newRoot)
    }
  }

  /** Handles messages while garbage collection is performed.
    * `newRoot` is the root of the new binary tree where we want to copy
    * all non-removed elements into.
    */
  def garbageCollecting(newRoot: ActorRef): Receive = {
    case Insert(requester, id, elem) => { 
      //println("Tree Insert (GC) " + elem)
      //pendingQueue :+= Insert(requester, id, elem) 
      pendingQueue = pendingQueue.enqueue(Insert(requester, id, elem))
    }
    case Contains(requester, id, elem) => { 
      //println("Tree Contains (GC) " + elem)
      //pendingQueue :+= Contains(requester, id, elem) 
      pendingQueue = pendingQueue.enqueue(Contains(requester, id, elem))
    }
    case Remove(requester, id, elem) => { 
      //println("Tree Remove (GC) " + elem)
      //pendingQueue :+= Remove(requester, id, elem) 
      pendingQueue = pendingQueue.enqueue(Remove(requester, id, elem))
    }
    //case GC => {}
    case CopyFinished => {
      //println("CopyFinished (tree)")
      //root ! PoisonPill
      val oldRoot = root
      root = newRoot
      pendingQueue foreach (x => { root ! x })
      pendingQueue = Queue.empty[Operation]
      context.become(normal)
      oldRoot ! PoisonPill
    }
  }

}

object BinaryTreeNode {
  trait Position

  case object Left extends Position
  case object Right extends Position

  case class CopyTo(treeNode: ActorRef)
  case object CopyFinished

  def props(elem: Int, initiallyRemoved: Boolean) = {
    Props(classOf[BinaryTreeNode],  elem, initiallyRemoved)
  }
}

class BinaryTreeNode(val elem: Int, initiallyRemoved: Boolean) extends Actor with ActorLogging {
  import BinaryTreeNode._
  import BinaryTreeSet._

  var subtrees = Map[Position, ActorRef]()
  var removed = initiallyRemoved

  def receive = normal

  val normal: Receive = {
    case Insert(requester, i, e) => {
      //println("Node " + elem + ": Insert " + e)
      if (e == elem) {
        if (removed) removed = false
        requester ! OperationFinished(i)
      }
      else if (e < elem) subtrees.get(Left) match {
        case Some(tree) => tree ! Insert(requester, i ,e)
        case None       => {
          subtrees += ((Left, context.actorOf(props(e, false))))
          requester ! OperationFinished(i)
        }
      }
      else if (e > elem) subtrees.get(Right) match {
        case Some(tree) => tree ! Insert(requester, i ,e)
        case None       =>  {
          subtrees += ((Right, context.actorOf(props(e, false))))
          requester ! OperationFinished(i)
        }
      }
    }

    case Contains(requester, i, e) => {
      //println("Node " + elem + ": Contains " + e)
      if (e == elem) {
        if (removed)
          requester ! ContainsResult(i, false)
        else
          requester ! ContainsResult(i, true)
      }
      else if (e < elem) subtrees.get(Left) match {
        case Some(tree) => tree ! Contains(requester, i ,e)
        case None       => requester ! ContainsResult(i, false)
      }
      else if (e > elem) subtrees.get(Right) match {
        case Some(tree) => tree ! Contains(requester, i ,e)
        case None       => requester ! ContainsResult(i, false)
      }
    }

    case Remove(requester, i, e) => {
      //println("Node " + elem + ": Remove " + e)
      if (e == elem) {
        removed = true;
        requester ! OperationFinished(i)
      }
      else if (e < elem) subtrees.get(Left) match {
        case Some(tree) => tree ! Remove(requester, i ,e)
        case None       => requester ! OperationFinished(i)
      }
      else if (e > elem) subtrees.get(Right) match {
        case Some(tree) => tree ! Remove(requester, i ,e)
        case None       => requester ! OperationFinished(i)
      }
    }

    case CopyTo(treeNode) => {
      //println("Node " + elem + ": CopyTo")
      val subtreelist = subtrees map (x => x._2)
      //context.become(copying(subtreelist.toSet, removed))
      context.become(copying(subtreelist.size, removed))
      subtreelist map (subtree => subtree ! CopyTo(treeNode))
      if (!removed) 
        treeNode ! Insert(self, 0, elem)
      if (removed && subtreelist.size == 0)
        self ! CopyFinished
    }
  }


  /** `expected` is the set of ActorRefs whose replies we are waiting for,
    * `insertConfirmed` tracks whether the copy of this node to the new tree has been confirmed.
    */
  //def copying(expected: Set[ActorRef], insertConfirmed: Boolean): Receive = {
  def copying(expected: Integer, insertConfirmed: Boolean): Receive = {
    case OperationFinished(_) => {
      //println("Node " + elem + ": OperationFinished (" + expected + ", " + insertConfirmed + ")")
      if (expected == 0)
      //if (expected.size == 0)
        context.parent ! CopyFinished
      else
        context.become(copying(expected, true))
    }
    case CopyFinished => {
      //println("Node " + elem + ": CopyFinished (" + expected + ", " + insertConfirmed + ")")
      //if (insertConfirmed && ((expected - self).size == 0)) {
      if (insertConfirmed && (expected <= 1)) {
        context.parent ! CopyFinished
        //println("Node " + elem + ": send CopyFinished to parent")
      }
      else
        context.become(copying(expected - 1, insertConfirmed))
        //context.become(copying(expected - self, insertConfirmed))
      //context.sender ! PoisonPill
    }
  }


}
