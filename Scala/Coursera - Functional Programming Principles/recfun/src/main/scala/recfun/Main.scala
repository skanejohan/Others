package recfun
import common._

object Main {
  def main(args: Array[String]) {
    println("Pascal's Triangle")
    for (row <- 0 to 10) {
      for (col <- 0 to row)
        print(pascal(col, row) + " ")
      println()
    }
    
    println("Balance")
    println(balance("(A)".toList))
    println(balance("(".toList))
    
    println("Change")
    println(countChange(4, List(2, 1, 3)))
  }

  /**
   * Exercise 1
   */
  def pascal(c: Int, r: Int): Int = {
    if (c==0 || c==r) 1 else pascal(c-1, r-1) + pascal(c, r-1)
  }

  /**
   * Exercise 2
   */
  def balance(chars: List[Char]): Boolean = {
    def checkLevel(level: Int, hd: Char, tl: List[Char]): Boolean = {
      if (tl.isEmpty) 
        (level == 0 && hd.toString != ")" && hd.toString != "(") || (level == 1 && hd.toString == ")") 
      else if (level < 0) 
        false 
      else if (hd.toString == "(") 
        checkLevel(level+1, tl.head, tl.tail)
      else if (hd.toString == ")") 
        checkLevel(level-1, tl.head, tl.tail)
      else 
        checkLevel(level, tl.head, tl.tail)
    }
    checkLevel(0, chars.head, chars.tail)
  }

  /**
   * Exercise 3
   */
  def countChange(money: Int, coins: List[Int]): Int = {
    
    def check(sum: Int, available: List[Int]): Int = {
      if (sum > money) 0
      else if (sum == money) 1
      else if (available.length > 0) {
        check(sum + available.head, available) +
        check(sum, available.tail)
      }
      else
        0
    }
    check(0, coins)

    /*def checkDebug(sum: Int, used: List[Int], available: List[Int]): Int = {
      print(used)
      print(" - ")
      println(available)
      if (sum > money) 0
      else if (sum == money) 1
      else if (available.length > 0) {
        checkDebug(sum + available.head, used ++ List(available.head), available) +
        checkDebug(sum, used, available.tail)
      }
      else
        0
    }
    checkDebug(0, List(), coins)
    */

  }
}
