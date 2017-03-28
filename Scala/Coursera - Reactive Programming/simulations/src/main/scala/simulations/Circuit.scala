package simulations

import common._

class Wire {
  private var sigVal = false
  private var actions: List[Simulator#Action] = List()

  def getSignal: Boolean = sigVal
  
  def setSignal(s: Boolean) {
    if (s != sigVal) {
      sigVal = s
      actions.foreach(action => action())
    }
  }

  def addAction(a: Simulator#Action) {
    actions = a :: actions
    a()
  }
}

abstract class CircuitSimulator extends Simulator {

  val InverterDelay: Int
  val AndGateDelay: Int
  val OrGateDelay: Int

  def probe(name: String, wire: Wire) {
    wire addAction {
      () => afterDelay(0) {
        println(
          "  " + currentTime + ": " + name + " -> " +  wire.getSignal)
      }
    }
  }

  def identity(input: Wire, output: Wire) {
    def identityAction() {
      val inputSig = input.getSignal
      afterDelay(0) { output.setSignal(inputSig) }
    }
    input addAction identityAction
  }

  def inverter(input: Wire, output: Wire) {
    def invertAction() {
      val inputSig = input.getSignal
      afterDelay(InverterDelay) { output.setSignal(!inputSig) }
    }
    input addAction invertAction
  }

  def andGate(a1: Wire, a2: Wire, output: Wire) {
    def andAction() {
      val a1Sig = a1.getSignal
      val a2Sig = a2.getSignal
      afterDelay(AndGateDelay) { output.setSignal(a1Sig & a2Sig) }
    }
    a1 addAction andAction
    a2 addAction andAction
  }

  def orGate(a1: Wire, a2: Wire, output: Wire) {
    def orAction() {
      val a1Sig = a1.getSignal
      val a2Sig = a2.getSignal
      afterDelay(OrGateDelay) { output.setSignal(a1Sig | a2Sig) }
    }
    a1 addAction orAction
    a2 addAction orAction
  }
  
  def orGate2(a1: Wire, a2: Wire, output: Wire) {
    val a1inv, a2inv, a3 = new Wire
    inverter(a1, a1inv)
    inverter(a2, a2inv)
    andGate(a1inv, a2inv, a3)
    inverter(a3, output)
  }

  def demux(in: Wire, c: List[Wire], out: List[Wire]): Unit = c match {
    case Nil => out match {
      case o::_ => identity(in, o)
      case _ => ()
    } 
    case c0 :: Nil => out match {
      case o1 :: o0 :: _ => {
        val c0inv = new Wire
        inverter(c0, c0inv)
        andGate(in, c0inv, o0)
        andGate(in, c0, o1)
      }
      case _ => ()
    }
    case hd :: tl =>
      val temp1, temp0 = new Wire
      demux(in, List(hd), List(temp1, temp0))
      demux(temp1, tl, out take (out.length / 2))
      demux(temp0, tl, out drop (out.length / 2))
  }
}

object Circuit extends CircuitSimulator {
  val InverterDelay = 1
  val AndGateDelay = 3
  val OrGateDelay = 5

  def andGateExample {
    println("")
    println("andGateExample")
    val in1, in2, out = new Wire
    andGate(in1, in2, out)
    probe("in1", in1)
    probe("in2", in2)
    probe("out", out)
    in1.setSignal(false)
    in2.setSignal(false)
    run

    in1.setSignal(true)
    run

    in2.setSignal(true)
    run
  }

  def demux0Example {
    println("")
    println("demux0Example")
    val in, out = new Wire
    demux(in, Nil, List(out))
    probe("in", in)
    probe("out", out)
    
    in.setSignal(false)
    run

    in.setSignal(true)
    run
  }
  
  def demux1Example {
    println("")
    println("demux1Example")
    val in, c, o0, o1 = new Wire
    demux(in, List(c), List(o1,o0))
    probe("in", in)
    probe("c", c)
    probe("o0", o0)
    probe("o1", o1)

    in.setSignal(false)
    c.setSignal(false)
    run
    
    in.setSignal(true)
    run
    
    c.setSignal(true)
    run
    
    in.setSignal(false)
    run
  }
}

object CircuitMain extends App {
  Circuit.andGateExample
  Circuit.demux0Example
  Circuit.demux1Example
}
