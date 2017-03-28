package kvstore

import akka.testkit.TestKit
import akka.actor.{ ActorSystem, Props }
import org.scalatest.FunSuite
import org.scalatest.BeforeAndAfterAll
import org.scalatest.matchers.ShouldMatchers
import akka.testkit.ImplicitSender
import akka.testkit.TestProbe
import scala.concurrent.duration._
import kvstore.Persistence.{ Persisted, Persist }
import kvstore.Replica.OperationFailed
import kvstore.Replicator.{ Snapshot }
import scala.util.Random
import scala.util.control.NonFatal

class MySpec extends TestKit(ActorSystem("MySpec"))
  with FunSuite
  with BeforeAndAfterAll
  with ShouldMatchers
  with ImplicitSender
  with Tools {

  override def afterAll(): Unit = {
    system.shutdown()
  }

  import Arbiter._

  test("Primary: join and persist") {
    val arbiter = system.actorOf(Props[Arbiter], "arbiter")
    val primary = system.actorOf(Replica.props(arbiter, Persistence.props(flaky = true)), "primary")
    val p = session(primary)

    val setID = p.set("a", "b")
    p.waitAck(setID)
  }

  /*test("case2: Primary (in isolation) should react properly to Insert, Remove, Get") {
    val arbiter = TestProbe()
    val primary = system.actorOf(Replica.props(arbiter.ref, Persistence.props(flaky = false)), "case2-primary")
    val client = session(primary)

    arbiter.expectMsg(Join)
    arbiter.send(primary, JoinedPrimary)

    client.getAndVerify("k1")
    client.setAcked("k1", "v1")
    client.getAndVerify("k1")
    client.getAndVerify("k2")
    client.setAcked("k2", "v2")
    client.getAndVerify("k2")
    client.removeAcked("k1")
    client.getAndVerify("k1")
  }*/

}