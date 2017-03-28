package funsets

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

/**
 * This class is a test suite for the methods in object FunSets. To run
 * the test suite, you can either:
 *  - run the "test" command in the SBT console
 *  - right-click the file in eclipse and chose "Run As" - "JUnit Test"
 */
@RunWith(classOf[JUnitRunner])
class FunSetSuite extends FunSuite {


  /**
   * Link to the scaladoc - very clear and detailed tutorial of FunSuite
   *
   * http://doc.scalatest.org/1.8/index.html#org.scalatest.FunSuite
   *
   * Operators
   *  - test
   *  - ignore
   *  - pending
   */

  /**
   * Tests are written using the "test" operator and the "assert" method.
   */
  test("string take") {
    val message = "hello, world"
    assert(message.take(5) == "hello")
  }

  /**
   * For ScalaTest tests, there exists a special equality operator "===" that
   * can be used inside "assert". If the assertion fails, the two values will
   * be printed in the error message. Otherwise, when using "==", the test
   * error message will only say "assertion failed", without showing the values.
   *
   * Try it out! Change the values so that the assertion fails, and look at the
   * error message.
   */
  test("adding ints") {
    assert(1 + 2 === 3)
  }

  
  import FunSets._

  test("contains is implemented") {
    assert(contains(x => true, 100))
  }
  
  /**
   * When writing tests, one would often like to re-use certain values for multiple
   * tests. For instance, we would like to create an Int-set and have multiple test
   * about it.
   * 
   * Instead of copy-pasting the code for creating the set into every test, we can
   * store it in the test class using a val:
   * 
   *   val s1 = singletonSet(1)
   * 
   * However, what happens if the method "singletonSet" has a bug and crashes? Then
   * the test methods are not even executed, because creating an instance of the
   * test class fails!
   * 
   * Therefore, we put the shared values into a separate trait (traits are like
   * abstract classes), and create an instance inside each test method.
   * 
   */

  trait TestSets {
    val s1 = singletonSet(1)
    val s2 = singletonSet(2)
    val s3 = singletonSet(3)
    val s4 = singletonSet(4)
    val s5 = singletonSet(5)
    val s7 = singletonSet(7)
    val s1000 = singletonSet(1000)
  }

  /**
   * This test is currently disabled (by using "ignore") because the method
   * "singletonSet" is not yet implemented and the test would fail.
   * 
   * Once you finish your implementation of "singletonSet", exchange the
   * function "ignore" by "test".
   */
  test("singletonSet(1) contains 1") {
    
    /**
     * We create a new instance of the "TestSets" trait, this gives us access
     * to the values "s1" to "s3". 
     */
    new TestSets {
      /**
       * The string argument of "assert" is a message that is printed in case
       * the test fails. This helps identifying which assertion failed.
       */
      assert(contains(s1, 1), "Singleton")
    }
  }

  test("union contains all elements") {
    new TestSets {
      val s = union(s1, s2)
      assert(contains(s, 1), "Union 1")
      assert(contains(s, 2), "Union 2")
      assert(!contains(s, 3), "Union 3")
    }
  }

  test("intersect contains only elements in both sets") {
    new TestSets {
      val s = union(s1, s2)
      val ss = union(s1, union(s2, s3))
      assert(contains(intersect(s, ss), 1), "Union 1")
      assert(contains(intersect(s, ss), 2), "Union 2")
      assert(!contains(intersect(s, ss), 3), "Union 3")
    }
  }

  test("diff contains only elements in one set but not the other") {
    new TestSets {
      val s = union(s1, s2)
      val ss = union(s1, union(s2, s3))
      assert(!contains(diff(ss, s), 1), "Union 1")
      assert(!contains(diff(ss, s), 2), "Union 2")
      assert(contains(diff(ss, s), 3), "Union 3")
    }
  }

  test("filter") {
    new TestSets {
      val s = union(s1, s2)
      val ss = union(s1, union(s2, s3))
      assert(!contains(filter(ss, (x => x == 2)), 1), "Filter 1")
      assert(contains(filter(ss, (x => x == 2)), 2), "Filter 2")
      assert(!contains(filter(ss, (x => x == 2)), 3), "Filter 3")
    }
  }

  test("filter2") {
    new TestSets {
      val s = union(s1, union(s3, union(s4, union(s5, union(s7, s1000)))))
      printSet(s)
      printSet(filter(s, (x => x < 5)))
      assert(contains(filter(s, (x => x < 5)), 1), "Filter2 1")
      assert(!contains(filter(s, (x => x < 5)), 2), "Filter2 2")
      assert(contains(filter(s, (x => x < 5)), 3), "Filter2 3")
      assert(contains(filter(s, (x => x < 5)), 4), "Filter2 4")
      assert(!contains(filter(s, (x => x < 5)), 5), "Filter2 5")
      assert(!contains(filter(s, (x => x < 5)), 1000), "Filter2 6")
    }
  }

  test("forall") {
    new TestSets {
      val s = union(s1, union(s2, s3))
      assert(!forall(s, (x => x == 2)), "forall 1")
      assert(forall(s, (x => x > 0)), "forall 2")
      assert(!forall(s, (x => x > 1)), "forall 3")
    }
  }

  test("exists") {
    new TestSets {
      val s = union(s1, union(s2, s3))
      assert(!exists(s, (x => x == 4)), "exists 1")
      assert(exists(s, (x => x > 0)), "exists 2")
      assert(exists(s, (x => x > 1)), "exists 3")
    }
  }
  
  test("map") {
    new TestSets {
      val s = union(s1, union(s2, s3))
      assert(!contains(map(s, (x => x * 2)), 1), "map 1")
      assert(contains(map(s, (x => x * 2)), 2), "map 2")
      assert(!contains(map(s, (x => x * 2)), 3), "map 3")
      assert(contains(map(s, (x => x * 2)), 4), "map 4")
      assert(!contains(map(s, (x => x * 2)), 5), "map 5")
      assert(contains(map(s, (x => x * 2)), 6), "map 6")
      assert(!contains(map(s, (x => x * 2)), 7), "map 7")
    }
  }
  
}
