package simulations

import math.random

class EpidemySimulator extends Simulator {

  def randomBelow(i: Int) = (random * i).toInt

  protected[simulations] object SimConfig {
    val population: Int = 300
    val roomRows: Int = 8
    val roomColumns: Int = 8
  }

  import SimConfig._

  val persons: List[Person] = List.tabulate(population)(n => new Person(n)) 

  class Person (val id: Int) {
    var infected = false 
    var sick = false
    var immune = false
    var dead = false

    var row: Int = randomBelow(roomRows)
    var col: Int = randomBelow(roomColumns)

    def nextRow = (row + 1) % roomRows
      
    def previousRow = (row + roomRows - 1) % roomRows
      
    def nextCol = (col + 1) % roomColumns
      
    def previousCol = (col + roomColumns - 1) % roomColumns
      
    if (id % 100 == 0) 
      becomeInfected

    def isHealthy : Boolean = {
      !(isInfectious | immune)
    }

    def isInfectious : Boolean = {
      infected | sick | dead
    }

    def isVisiblyInfectious : Boolean = {
      sick | dead
    }

    def becomeInfected {
      if (!(immune | sick | dead)) {
        infected = true 
        afterDelay(6) { becomeSick }
        afterDelay(14) { if (randomBelow(100) < 25) die }
        afterDelay(16) { if (!dead) becomeImmune }
        afterDelay(18) { if (!dead) becomeHealthy }
      }
    }

    def becomeSick {
      sick = true
    }

    def die {
      dead = true
    }

    def becomeImmune {
      immune = true
    }

    def becomeHealthy {
      infected = false 
      sick = false
      immune = false
      dead = false
    }

    def peopleInTheSameRoom: List[Person] = {
      persons.filter(p => p.id != id & p.col == col & p.row == row)
    }

    def someoneInRoomIsVisiblyInfected(col: Int, row: Int) = {
      def rec(col: Int, row: Int, people: List[Person]): Boolean = people match {
        case x::xs => if (x.col == col & x.row == row & x.isVisiblyInfectious)
                          true
                      else
                          rec(col, row, xs)
        case _ => false
      }
      rec(col, row, persons)
    }

    def adjacentRooms: List[(Int, Int)] = {
      (previousCol, row) :: (col, previousRow) :: (nextCol, row) :: (col, nextRow) :: Nil
    }

    def candidateRooms: List[(Int, Int)] = {
      adjacentRooms.filter(room => !someoneInRoomIsVisiblyInfected(room._1, room._2))
    }

    def move = {
      if (!dead) {
        val candidates = util.Random.shuffle(candidateRooms)
        candidates match {
          case nextRoom::_ => { col = nextRoom._1; row = nextRoom._2 }
          case _           => ()
        }
        if (isHealthy) {
          for (p <- peopleInTheSameRoom) {
            if (p.isInfectious & randomBelow(100) < 40) {
              becomeInfected
            }
          }
        }
      }
    }

    def mode {
      if (!dead)
        afterDelay(randomBelow(5)) { 
          move; 
          mode; 
        }
    }

    mode
  }
}
