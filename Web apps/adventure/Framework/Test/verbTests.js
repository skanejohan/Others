QUnit.module("Verb tests")

function  verbTestData() {
	var verb1 = function() {};
	var verb2 = function() {};
	var _item1 = { verbs : [verb1, verb2], allVerbs : [verb1, verb2] };
	var _item2 = { verbs : [], allVerbs : [verb1, verb2] };
	var _item3 = { verbs : [verb1], allVerbs : [verb1, verb2] };

	return {
		verb1 : verb1,
		verb2 : verb2,
		item1 : _item1,
		item2 : _item2,
		item3 : _item3, 
	}
}

QUnit.test( "testAddVerb", function( assert ) {
	var data = verbTestData();
	var item = data.item2;
	assert.equal(item.verbs.length, 0);

	addVerb(item, data.verb1);
	assert.equal(item.verbs.length, 1);
	assert.equal(item.verbs[0], data.verb1);

	addVerb(item, data.verb1);
	assert.equal(item.verbs.length, 1);
	assert.equal(item.verbs[0], data.verb1);

	addVerb(item, data.verb2);
	assert.equal(item.verbs.length, 2);
	assert.equal(item.verbs[0], data.verb1);
	assert.equal(item.verbs[1], data.verb2);
});	

QUnit.test( "testAddVerbAsString", function( assert ) {
	var data = verbTestData();
	var item = data.item2;
	assert.equal(item.verbs.length, 0);

	addVerb(item, "verb1");
	assert.equal(item.verbs.length, 1);
	assert.equal(item.verbs[0], data.verb1);

	addVerb(item, "verb1");
	assert.equal(item.verbs.length, 1);
	assert.equal(item.verbs[0], data.verb1);

	addVerb(item, "verb2");
	assert.equal(item.verbs.length, 2);
	assert.equal(item.verbs[0], data.verb1);
	assert.equal(item.verbs[1], data.verb2);
});	

QUnit.test( "testAddNonExistingVerb", function( assert ) {
	var data = verbTestData();
	var item = data.item2;
	assert.equal(item.verbs.length, 0);

	addVerb(item, "verb1");
	assert.equal(item.verbs.length, 1);
	assert.equal(item.verbs[0], data.verb1);

	addVerb(item, "verb3");
	assert.equal(item.verbs.length, 1);
	assert.equal(item.verbs[0], data.verb1);
});	

QUnit.test( "testHasVerb", function( assert ) {
	var data = verbTestData();
	var item = data.item3;
	assert.ok(hasVerb(item, data.verb1));
	assert.notOk(hasVerb(item, data.verb2));
	assert.ok(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));
	
	addVerb(item, "verb2");
	assert.ok(hasVerb(item, "verb1"));
	assert.ok(hasVerb(item, "verb2"));
});	

QUnit.test( "testRemoveVerb", function( assert ) {
	var data = verbTestData();
	var item = data.item1;
	assert.ok(hasVerb(item, data.verb1));
	assert.ok(hasVerb(item, data.verb2));
	
	removeVerb(item, data.verb2);
	assert.ok(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));

	removeVerb(item, data.verb2);
	assert.ok(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));

	removeVerb(item, data.verb1);
	assert.notOk(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));
});	

QUnit.test( "testRemoveVerbAsString", function( assert ) {
	var data = verbTestData();
	var item = data.item1;
	assert.ok(hasVerb(item, data.verb1));
	assert.ok(hasVerb(item, data.verb2));
	
	removeVerb(item, "verb2");
	assert.ok(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));

	removeVerb(item, "verb2");
	assert.ok(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));

	removeVerb(item, "verb1");
	assert.notOk(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));
});	

QUnit.test( "testReplaceVerb", function( assert ) {
	var data = verbTestData();
	var item = data.item3;
	assert.ok(hasVerb(item, data.verb1));
	assert.notOk(hasVerb(item, data.verb2));

	replaceVerb(item, data.verb1, data.verb2)
	assert.notOk(hasVerb(item, data.verb1));
	assert.ok(hasVerb(item, data.verb2));
});	

QUnit.test( "testReplaceVerbAsString", function( assert ) {
	var data = verbTestData();
	var item = data.item3;
	assert.ok(hasVerb(item, "verb1"));
	assert.notOk(hasVerb(item, "verb2"));

	replaceVerb(item, "verb1", "verb2")
	assert.notOk(hasVerb(item, "verb1"));
	assert.ok(hasVerb(item, "verb2"));
});	

