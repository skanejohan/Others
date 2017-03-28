package patmat

import org.scalatest.FunSuite

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner

import patmat.Huffman._

@RunWith(classOf[JUnitRunner])
class HuffmanSuite extends FunSuite {
  trait TestTrees {
    val t1 = Fork(Leaf('a',2), Leaf('b',3), List('a','b'), 5)
    val t2 = Fork(Fork(Leaf('a',2), Leaf('b',3), List('a','b'), 5), Leaf('d',4), List('a','b','d'), 9)

    // The following is the example tree from the assignment details
    val b_tree: CodeTree = Leaf('B', 3)
    val cd_tree: CodeTree = makeCodeTree(Leaf('C', 1), Leaf('D', 1))
    val ef_tree: CodeTree = makeCodeTree(Leaf('E', 1), Leaf('F', 1))
    val gh_tree: CodeTree = makeCodeTree(Leaf('G', 1), Leaf('H', 1))
    val bcd_tree: CodeTree = makeCodeTree(b_tree, cd_tree)
    val efgh_tree: CodeTree = makeCodeTree(ef_tree, gh_tree)
    val a_tree: CodeTree = Leaf('A', 8)
    val bcdefgh_tree: CodeTree = makeCodeTree(bcd_tree, efgh_tree)
    val example_tree: CodeTree = makeCodeTree(a_tree, bcdefgh_tree)
    val example_bits: List[Bit] = List(1, 0, 0, 0, 1, 0, 1, 0)
  }

  test("weight of a larger tree") {
    new TestTrees {
      assert(weight(t1) === 5)
    }
  }

  test("chars of a larger tree") {
    new TestTrees {
      assert(chars(t2) === List('a','b','d'))
    }
  }

  test("string2chars(\"hello, world\")") {
    assert(string2Chars("hello, world") === List('h', 'e', 'l', 'l', 'o', ',', ' ', 'w', 'o', 'r', 'l', 'd'))
  }

  test("makeOrderedLeafList for some frequency table") {
    assert(makeOrderedLeafList(List(('t', 2), ('e', 1), ('x', 3))) === List(Leaf('e',1), Leaf('t',2), Leaf('x',3)))
  }

  test("combine of some leaf list") {
    val leaflist = List(Leaf('e', 1), Leaf('t', 2), Leaf('x', 4))
    //printf(combine(leaflist).toString)
    assert(combine(leaflist) === List(Fork(Leaf('e',1),Leaf('t',2),List('e', 't'),3), Leaf('x',4)))
  }

  test("combine of a singleton leaf list") {
    val leaflist = List(Leaf('e', 1))
    //printf(combine(leaflist).toString)
    assert(combine(leaflist) === List(Leaf('e',1)))
  }

  test("combine of an empty list") {
    val leaflist = List()
    //printf(combine(leaflist).toString)
    assert(combine(leaflist) === List())
  }

  test("the example in the assignment details") {
    new TestTrees {
      assert(decode(example_tree, example_bits) === "BAC".toList)
    }
  }

  test("french") {
      assert(decodedSecret === "huffmanestcool".toList)
  }

  test("decode and encode a very short text should be identity") {
    new TestTrees {
      assert(decode(t1, encode(t1)("ab".toList)) === "ab".toList)
    }
  }

  test("decode and encode a longer text using example tree") {
    new TestTrees {
      val bits = encode(example_tree)("ABCDEFG".toList)
      val decoded = decode(example_tree, bits)
      assert(decoded === "ABCDEFG".toList)
    }
  }

  test("decode and encode a longer text using example tree and quickEncode") {
    new TestTrees {
      val bits = quickEncode(example_tree)("ABCDEFG".toList)
      val decoded = decode(example_tree, bits)
      assert(decoded === "ABCDEFG".toList)
    }
  }
}
