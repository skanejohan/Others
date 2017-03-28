package streams

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

import Bloxorz._

@RunWith(classOf[JUnitRunner])
class BloxorzSuite extends FunSuite {

  
  trait SolutionChecker extends GameDef with Solver with StringParserTerrain {
    /**
     * This method applies a list of moves `ls` to the block at position
     * `startPos`. This can be used to verify if a certain list of moves
     * is a valid solution, i.e. leads to the goal.
     */
    def solve(ls: List[Move]): Block =
      ls.foldLeft(startBlock) { case (block, move) => move match {
        case Left => block.left
        case Right => block.right
        case Up => block.up
        case Down => block.down
      }
    }
  }

  trait Level1 extends SolutionChecker {
      /* terrain for level 1*/

    val level =
    """ooo-------
      |oSoooo----
      |ooooooooo-
      |-ooooooooo
      |-----ooToo
      |------ooo-""".stripMargin

    val optsolution = List(Right, Right, Down, Right, Right, Right, Down)
  }

  test("terrain function level 1") {
    new Level1 {
      assert(terrain(Pos(0,0)), "0,0")
      assert(terrain(Pos(0,1)), "0,1")
      assert(terrain(Pos(0,2)), "0,2")
      assert(!terrain(Pos(0,3)), "0,3")
      assert(!terrain(Pos(0,9)), "0,9")
      assert(!terrain(Pos(0,10)), "0,10")
      assert(!terrain(Pos(4,11)), "4,11")
    }
  }

  test("findChar level 1") {
    new Level1 {
      assert(startPos == Pos(1,1))
      assert(goal == Pos(4,7))
    }
  }

  test("legalNeighbors level 1") {
    new Level1 {
      val expected = List((Block(Pos(1,2),Pos(1,3)),Right), (Block(Pos(2,1),Pos(3,1)),Down)).toString
      assert(startBlock.legalNeighbors.toString == expected)
    }
  }

    test("neighborsWithHistory on level 1") {
    new Level1 {
      val result = neighborsWithHistory(Block(Pos(1,1),Pos(1,1)), List(Left,Up)).toList.toString
      val expected = List(
          (Block(Pos(1,2),Pos(1,3)), List(Right,Left,Up)), 
          (Block(Pos(2,1),Pos(3,1)), List(Down,Left,Up))).toString
      assert(result == expected)
    }
  }

  test("newNeighborsOnly on level 1") {
    new Level1 {
        val neighbors = Set(
          (Block(Pos(1,2),Pos(1,3)), List(Right,Left,Up)),
          (Block(Pos(2,1),Pos(3,1)), List(Down,Left,Up))).toStream
        val explored = Set(Block(Pos(1,2),Pos(1,3)))
        val expected = Set((Block(Pos(2,1),Pos(3,1)), List(Down,Left,Up)))
        val result = newNeighborsOnly(neighbors, explored).toSet
        assert(result == expected)
    }
  }
  
  test("optimal solution for level 1") {
    new Level1 {
      assert(solve(solution) == Block(goal, goal))
    }
  }

  test("optimal solution length for level 1") {
    new Level1 {
      assert(solution.length == optsolution.length)
    }
  }
}
