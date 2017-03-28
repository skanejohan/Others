package quickcheck

import common._

import org.scalacheck._
import Arbitrary._
import Gen._
import Prop._

abstract class QuickCheckHeap extends Properties("Heap") with IntHeap {

	// Generates a random heap
  	lazy val genHeap: Gen[H] = for {
    	value <- arbitrary[Int]
    	heap <- oneOf(empty, genHeap)
    	//heap <- frequency((1, empty), (100, genHeap))
  	} yield insert(value, heap)

  	implicit lazy val arbHeap: Arbitrary[H] = Arbitrary(genHeap)

  	// Recursively removes the smallest element from the heap, eventually
  	// returning true if the heap was emptied OK, false if a removed 
  	// element is larger than a previouslty removed one (which means that
  	// the heap was not correctly sorted)
  	def empties_ok(lowestValue: Int, h: H): Boolean = 
    	if (isEmpty(h))
      		true
    	else 
      		if (lowestValue > findMin(h))
        		false
      		else
        		empties_ok(findMin(h), deleteMin(h))

  	// If you insert an element into an empty heap, then find the minimum 
  	// of the resulting heap, you get the element back
  	property("min1") = forAll { a: Int =>
    	val h = insert(a, empty)
    	findMin(h) == a
  	}		

  	// If you insert any two elements into an empty heap, finding the minimum 
  	// of the resulting heap should get the smallest of the two elements back.
  	property("min2") = forAll { (a: Int, b: Int) =>
    	val h = insert(a, insert(b, empty))
    	findMin(h) == scala.math.min(a, b)
  	}

  	// If you insert an element into an empty heap, then delete the minimum, 
  	// the resulting heap should be empty.
  	property("empty") = forAll { a: Int =>
    	val h = insert(a, empty)
    	isEmpty(deleteMin(h))
  	}

  	// Finding a minimum of the melding of any two heaps should return a 
  	// minimum of one or the other.
  	property("min3") = forAll { (a: Int, b: Int) =>
    	val h = insert(a, empty)
    	val i = insert(b, empty)
    	findMin(meld(h, i)) == scala.math.min(a, b)
  	}

  	// Given any heap, you should get a sorted sequence of elements when 
  	// continually finding and deleting minima.
  	property("sorted") = forAll { h: H =>
    	empties_ok(Int.MinValue, h)
  	}

  	// Given the meld of any two heaps, you should get a sorted sequence 
  	// of elements when continually finding and deleting minima.
  	property("sorted_meld") = forAll { (h1: H, h2: H) =>
    	empties_ok(Int.MinValue, meld(h1, h2))
  	}

  	// Special case, verifying the result of a simple meld
  	property("meld_test") = {
    	val h1 = insert(1, insert(2, empty))
    	val h2 = insert(3, insert(4, empty))
    	val h3 = meld(h1, h2)
    	if (isEmpty(h3))
    		false
    	else {
	    	val h4 = deleteMin(h3)
	    	if (isEmpty(h4))
	    		false
	    	else {
			    val h5 = deleteMin(h4)
			    if (isEmpty(h5))
			    	false
			    else {
    				val h6 = deleteMin(h5)
    				if (isEmpty(h6))
    					false
    				else
    					findMin(h3) == 1 && findMin(h4) == 2 && findMin(h5) == 3 && findMin(h6) == 4
			    } 
	    	}
  		}
  	}

  	// Special case, verifying deleeMin
  	property("deleteMin_test") = {
  		val h1 = insert(5, insert(4, insert(3, insert(2, insert(1, empty)))))
  		val h2 = deleteMin(h1)
  		findMin(h2) == 2
  	}

}
