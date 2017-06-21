var game = (function() {
	this.savedGamesPrefix = "ads.game.adventure.";
	this.context = {}

	that = this;

	return {
		initialize : initialize,

		flags : {
		
			// set(flag)
			set : flagsSet,

			// clear(flag)
			clear : flagsClear,  
			
			// replace(oldFlag, newFlag)
			replace : flagsReplace,
			
			// isSet(flag) : bool
			isSet : flagsIsSet,
			
			// isNotSet(flag) : bool
			isNotSet : flagsIsNotSet

		},

		here : {
			
			// has(item) : bool - Does the item exist in the current location?
			has : item => hasItem(item, that.context.currentLocation.items),

			// add(item) - add item to the current location.
			add : item => addToItems(item, that.context.currentLocation.items),

			// remove(item) - remove item from the current location. This will 
			// remove the item if it exists in the items list itself, or if it 
			// is contained in another item in the list (regardless of whether 
			// the container is open or not).
			remove : item => removeFromItems(item, that.context.currentLocation.items),

			// description() - get the description of the current location.
			description : hereDescription,

			// exits() - retrieve the exits from the current location
			exits : hereExits,

			// items() - return the items in the current location
			items : hereItems,

			forEachItem : f => itemsForEach(game.here.items(), f, i => true),

			forEachOpenItem : f  => itemsForEach(game.here.items(), f, i => game.verbs.has(i, "close")),
		},

		inventory : {
			
			// has(item) : bool - Do I have the item?
			has : item => hasItem(item, that.context.inventory),

			// add(item) - add item to the inventory.
			add : item => addToItems(item, that.context.inventory),

			// remove(item) - remove item from the inventory. For the exact
			// behaviour, see comment for here.remove.
			remove : item => removeFromItems(item, that.context.inventory),

			// items() - return the items in the inventory
			items : inventoryItems,

			forEachItem : f => itemsForEach(game.inventory.items(), f, i => true),

			forEachOpenItem : f  => itemsForEach(game.inventory.items(), f, i => game.verbs.has(i, "close")),

		},

		items : {

			// insertInto(container, item) - place item into the container.
			insertInto : (container, item) => addToItems(item, container.containedItems),

			// addTo(location, item) - add item to the specified location.
			addTo : (location, item) => addToItems(item, location.items),

			// removeFrom(location, item) - remove item from the specified location.
			removeFrom : (location, item) => removeFromItems(item, location.items),

			// getVerbs(item)
			getVerbs : itemGetVerbs,

		},

		verbs : {

			// add(item, verb) - add the verb to the item
			add : verbsAdd,

			// remove(item, verb) - remove the verb from the item
			remove : verbsRemove,

			// replace(item, oldVerb, newVerb) replace oldVerb with newVerb in item
			replace : verbsReplace,

			// has(item, verb) - does the item have the verb?
			has : verbsHas,
		},

		actions : {

			// examine(item)
			examine : actionsExamine,

			// take(item)
			take : actionsTake,

			// drop(item)
			drop : actionsDrop,

			// open(item)
			open : actionsOpen,

			// close(item)
			close : actionsClose,

			// lock(item)
			lock : actionsLock,

			// unlock(item)
			unlock : actionsUnlock,

			// moveTo(location)
			moveTo : actionsMoveTo,

		},

		npcs : {

			// add(npc, loc) - add the npc to the given location
			add : addNpc,

			// move(npc, loc) - move the npc to the given location
			move : moveNpc, 

			// remove(npc) - remove the npc
			remove : removeNpc, 

			// The description of all npc's, like "A enters" or "B is here".
			get descriptions() { return that.context.npcsDescription } 
		},

		// apply(item, verb) - applies the given verb to the item. If there is a function
		// with the verb's name among the function of the actions object (typically because
		// it is a general function, such as take, drop, examine...), that function is
		// called (supplying the item as the only parameter). If not, the function is called
		// on the item itself.
		apply : apply,

		// ... = message
		get message() { return that.context.result },

		// message = ...
		set message(m) { that.context.result = m },
	
		// location(i) - returns the location where the player character was i steps ago.
		location : function(i) { return that.context.previousLocations[i] },

		saveGame : saveGame,

		loadGame : loadGame,

		listGames : listGames,

		deleteGame : deleteGame,
	}

	function initialize(loc, msg) {
		that.context.currentLocation = loc,
        that.context.inventory = [];
        that.context.flags = new Set();
        that.context.result = msg;
        that.context.previousLocations = [loc, loc, loc, loc, loc];
        that.context.npcs = [];
        that.context.npcsDescription = [];
    };

	function flagsSet(flag) {
		that.context.flags.add(flag);
	}

	function flagsClear(flag) {
		that.context.flags.delete(flag);
	}

	function flagsReplace(oldFlag, newFlag) {
		flagsClear(oldFlag);
		flagsSet(newFlag)
	}

	function flagsIsSet(flag) {
		return that.context.flags.has(flag);
	}

	function flagsIsNotSet(flag) {
		return !flagsIsSet(flag);
	}

	function hasItem(item, items) {
		return items.indexOf(item) > -1;
	}

	function addToItems(item, items) { 
		if (!hasItem(item, items)) {
			items.push(item);
		}
	}

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

	function itemsForEach(items, f, recursePred) {
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

	function hereDescription() {
	    return that.context.currentLocation.look == null ? 
	    	that.context.currentLocation.description : 
	    	that.context.currentLocation.look();
	}

	function hereExits() {
 	   var loc = that.context.currentLocation;
 	   return loc.getExits == null ? loc.exits : loc.getExits();
	}

	function hereItems() {
		return that.context.currentLocation.items;
	}

	function inventoryItems() {
		return that.context.inventory;
	}

	function itemGetVerbs(item) {
    	return item.getVerbs == null ? item.verbs : item.getVerbs();
	}

	function verbsAdd(item, verb) {
		if (item.verbs != null) {
			var s = verbName(verb);	
			if (indexOfVerb(item.verbs, s) == -1) {
				item.verbs.push(s);
			}
		}
	}

	function verbsRemove(item, verb) {
		var idx = indexOfVerb(item.verbs, verb);
		if (idx > -1) {
			item.verbs.splice(idx, 1);	
		}
	}

	function verbsReplace(item, oldVerb, newVerb) {
		verbsRemove(item, oldVerb);
		verbsAdd(item, newVerb);
	}

	function verbsHas(item, verb) {
		return indexOfVerb(item.verbs, verb) > -1;
	}

	function verbName(verb) {
		return verb.name == null ? verb : verb.name;
	}

	function indexOfVerb(verbs, verb) {
		if (verbs != null) {
			var s = verbName(verb);
			for (var i = 0; i < verbs.length; i++) {
				if (verbName(verbs[i]) === s) {
					return i;	
				}
			}
		}
		return -1;
	}

	function actionsExamine(item) {
	    if (item.examine == null) {
	    	game.message = item.description;
	    }
	    else {
	    	item.examine();
	    }
	}

	function actionsTake(item) {
	    var handled = item.beforeTake == null ? false : item.beforeTake();
	    if (!handled) {
	        game.here.remove(item);
	        game.inventory.remove(item); // If it is contained in a carried object
	        game.inventory.add(item);
	        game.verbs.replace(item, "take", "drop");
	        that.context.result = "You take the " + item.caption;
	        if (item.afterTake != null) {
	            item.afterTake();
	        }
	    }
	}

	function actionsDrop(item) {
	    var handled = item.beforeDrop == null ? false : item.beforeDrop();
	    if (!handled) {
	        game.inventory.remove(item)
	        game.here.add(item)
	        game.verbs.replace(item, "drop", "take");
	        that.context.result = "You drop the " + item.caption;
	        if (item.afterDrop != null) {
	            item.afterDrop();
	        }
	    }
	}

	function actionsOpen(item) {
	    var handled = item.beforeOpen == null ? false : item.beforeOpen();
	    if (!handled) {
	        game.verbs.replace(item, "open", "close");
	        that.context.result = "You open the " + item.caption;
	        if (item.afterOpen != null) {
	            item.afterOpen();
	        }
	    }
	}

	function actionsClose(item) {
	    var handled = item.beforeClose == null ? false : item.beforeClose();
	    if (!handled) {
	        game.verbs.replace(item, "close", "open");
	        that.context.result = "You close the " + item.caption;
	        if (item.afterClose != null) {
	            item.afterClose();
	        }
	    }
	}

	function actionsLock(item) {
	    var handled = item.beforeLock == null ? false : item.beforeLock();
	    if (!handled) {
	        game.verbs.replace(item, "lock", "unlock");
	        that.context.result = "You lock the " + item.caption;
	        if (item.afterLock != null) {
	            item.afterLock();
	        }
	    }
	}

	function actionsUnlock(item) {
	    var handled = item.beforeUnlock == null ? false : item.beforeUnlock();
	    if (!handled) {
	        game.verbs.replace(item, "unlock", "lock");
	        that.context.result = "You unlock the " + item.caption;
	        if (item.afterUnlock != null) {
	            item.afterUnlock();
	        }
	    }
	}

	function actionsMoveTo(location) {
    	that.context.currentLocation = location; 
    	that.context.result = "You move to the " + that.context.currentLocation.caption;
    	state.add("game.apply(" + location.name + ", 'moveTo')");
	}

	function apply(item, verb, param) {
		that.context.npcsDescription = [];
		var v = verbName(verb);
		if (typeof game.actions[verb] === "function") {
			game.actions[verb](item, param);
		}
		else {
			item[v](param);
		}
		if (v != "enterCombination") {
	    	state.add("game.apply(" + item.name + ", '" + v + "')");
		}

		that.context.previousLocations.pop();
		that.context.previousLocations = [that.context.currentLocation].concat(that.context.previousLocations);
		that.context.npcs.forEach(npc => npc.update());
	}

	function addNpc(npc, loc) {
		if (that.context.npcs.indexOf(npc) == -1) {
			that.context.npcs.push(npc);
			game.items.addTo(loc, npc);
			npc.location = loc;
		}
	}

	function moveNpc(npc, loc) {
		var oldLocation = npc.location;
		game.items.removeFrom(oldLocation, npc);
		npc.location = loc;
		game.items.addTo(loc, npc);
		if (loc == that.context.currentLocation) {
			if (oldLocation != loc) {
				that.context.npcsDescription.push(npc.caption + " enters");
			}
			else {
				that.context.npcsDescription.push(npc.caption + " is also here");
			}
		}
	}

	function removeNpc(npc) {
		var idx = that.context.npcs.indexOf(npc);
		if (idx > -1) {
			that.context.npcs.splice(idx, 1);	
			game.items.removeFrom(npc.location, npc);
		}
	}		
	
	function saveGame(name) {
		localStorage.setItem(that.savedGamesPrefix + name, state.toString());
	}

	function loadGame(name) {
		var s = localStorage.getItem(that.savedGamesPrefix + name);
		if (s != null) {
			console.log(s);
			state.fromString(s);
		}
		view.update();	
	}

	function listGames() {
		return Object.keys(localStorage).
			filter(s => s.startsWith(that.savedGamesPrefix)).
			map(s => s.replace(that.savedGamesPrefix, ""));
	}

	function deleteGame(name) {
		localStorage.removeItem(that.savedGamesPrefix + name);
	}
})();