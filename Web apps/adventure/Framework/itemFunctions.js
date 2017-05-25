// Does the item exist in the list of items?
function hasItem(item, items) {
	return items.indexOf(item) > -1;
}

// Remove item from items. This will remove the item if it exists
// in the items list itself, or if it is contained in another item
// in the list (regardless of the container is open or not).
function removeFromItems(item, items) { 
	var idx = items.indexOf(item);
	if (idx != -1) {
		items.splice(idx, 1);
	}
	else {
		items.forEach(i => {
			if (i.containedItems != null) {
				removeFromItems(item, i.containedItems);
			}
		});
	}
}

// Add item to the items list. 
function addToItems(item, items) { 
	if (!hasItem(item, items)) {
		items.push(item);
	}
}

// Apply f to each item in items. If an item contains other items,
// recursively apply f to those as well provided that the recursePred
// is either null or returns true when applied to the containing 
// item. The function f has the following signature: f(item, containerItem)
// where containerItem will be null for the items in the top level.
function forEachItem(items, f, recursePred) {
	_forEachItem(items, null, f, recursePred);

	function _forEachItem(items, containerItem, f, recursePred) {
		items.forEach(i => {
			f(i, containerItem);
			if (i.hasOwnProperty('containedItems') && (recursePred == null || recursePred(i))) {
				_forEachItem(i.containedItems, i, f, recursePred);
			}
		})
	}
}





function itemIsOpen(item) {
	return hasVerb(item, "close");
}

function forEachOpenItem(items, f) {
	forEachItem(items, f, itemIsOpen);
}
