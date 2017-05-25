QUnit.module("Flag tests")

QUnit.test( "testEmptyFlags", function( assert ) {
	var flags = new Set();
	for (var i = 0; i < 100; i++) {
		assert.notOk(flagIsSet(i, flags));
	}
});

QUnit.test( "testSetFlag", function( assert ) {
	var flags = new Set();
	setFlag(25, flags);
	setFlag(50, flags);
	setFlag(75, flags);
	for (var i = 0; i < 25; i++) {
		assert.notOk(flagIsSet(i, flags));
	}
	assert.ok(flagIsSet(25, flags));
	for (var i = 26; i < 50; i++) {
		assert.notOk(flagIsSet(i, flags));
	}
	assert.ok(flagIsSet(50, flags));
	for (var i = 51; i < 75; i++) {
		assert.notOk(flagIsSet(i, flags));
	}
	assert.ok(flagIsSet(75, flags));
	for (var i = 76; i < 100; i++) {
		assert.notOk(flagIsSet(i, flags));
	}
});

QUnit.test( "testRemoveFlag", function( assert ) {
	var flags = new Set();
	for (var i = 0; i < 100; i++) {
		setFlag(i, flags);
	}
	clearFlag(25, flags);
	clearFlag(50, flags);
	clearFlag(75, flags);
	for (var i = 0; i < 25; i++) {
		assert.ok(flagIsSet(i, flags));
	}
	assert.notOk(flagIsSet(25, flags));
	for (var i = 26; i < 50; i++) {
		assert.ok(flagIsSet(i, flags));
	}
	assert.notOk(flagIsSet(50, flags));
	for (var i = 51; i < 75; i++) {
		assert.ok(flagIsSet(i, flags));
	}
	assert.notOk(flagIsSet(75, flags));
	for (var i = 76; i < 100; i++) {
		assert.ok(flagIsSet(i, flags));
	}
});

QUnit.test( "testClearFlagFromEmptyFlags", function( assert ) {
	var flags = new Set();
	clearFlag(25, flags);
	clearFlag(50, flags);
	clearFlag(75, flags);
	for (var i = 0; i < 100; i++) {
		assert.notOk(flagIsSet(i, flags));
	}
});

