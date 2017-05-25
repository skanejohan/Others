QUnit.module("Item tests")

function testData() {
  var _child = { name : "child" };
  var _childSeat = { name : "childSeat",  containedItems : [_child] };
  var _safetyBelt = { name : "safetyBelt" };
  var _volvo = { name : "volvo", containedItems : [_childSeat, _safetyBelt] };
  var _champagneGlass = { name : "champagneGlass" };
  var _butler = { name : "butler" };
  var _rollsRoyce = { name : "rollsRoyce", containedItems : [_champagneGlass, _butler] };
  var _ford = { name : "ford" };
  var _cars = [_volvo, _rollsRoyce, _ford];
  
  return {
  	child : _child,
  	childSeat : _childSeat,
  	safetyBelt : _safetyBelt,
  	volvo : _volvo,
  	champagneGlass : _champagneGlass,
  	butler : _butler,
  	rollsRoyce : _rollsRoyce,
  	ford : _ford,
  	cars : _cars
  }
} 

function itemNames(items) {
	var s = "";
	forEachItem(items, f, i => true);
	function f(item, containerItem) {
		s += item.name + " ";
	}
	return s;
}

QUnit.test( "testAddToEmptyItems", function( assert ) {
	var items = [];
	var data = testData();

	addToItems(data.safetyBelt, items);
	assert.equal(items.length, 1);
	assert.equal(items[0], data.safetyBelt);

	addToItems(data.butler, items);
	addToItems(data.ford, items);

	assert.equal(items.length, 3);
	assert.equal(items[0], data.safetyBelt);
	assert.equal(items[1], data.butler);
	assert.equal(items[2], data.ford);
});	

QUnit.test( "testComplexStructure", function( assert ) {
	var data = testData();

	assert.equal(data.cars.length, 3);
	assert.deepEqual(data.cars[0], data.volvo);
	assert.deepEqual(data.cars[1], data.rollsRoyce);
	assert.deepEqual(data.cars[2], data.ford);
});

QUnit.test( "testForEachItemRecurseAll", function( assert ) {
	assert.equal(itemNames(testData().cars), "volvo childSeat child safetyBelt rollsRoyce champagneGlass butler ford ");
});

QUnit.test( "testForEachItemRecurseRollsOnly", function( assert ) {
	var s = "";
	forEachItem(testData().cars, f, i => i.name == "rollsRoyce");
	function f(item, containerItem) {
		s += item.name + " ";
	}

	assert.equal(s, "volvo rollsRoyce champagneGlass butler ford ");
});

QUnit.test( "testRemoveTopItem", function( assert ) {
	var data = testData();
	var items = data.cars;
	removeFromItems(data.rollsRoyce, items);

	assert.equal(itemNames(items), "volvo childSeat child safetyBelt ford ");
});

QUnit.test( "testRemoveContainedItem", function( assert ) {
	var data = testData();
	var items = data.cars;
	removeFromItems(data.childSeat, items);
	removeFromItems(data.butler, items);

	assert.equal(itemNames(items), "volvo safetyBelt rollsRoyce champagneGlass ford ");
});

QUnit.test( "testRemoveContainedItemAndAddItAgain", function( assert ) {
	var data = testData();
	var items = data.cars;
	removeFromItems(data.childSeat, items);
	addToItems(data.childSeat, items);

	assert.equal(itemNames(items), "volvo safetyBelt rollsRoyce champagneGlass butler ford childSeat child ");
	assert.equal(items.length, 4);
});
