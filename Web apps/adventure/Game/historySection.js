// todo Utils\door.js

DoorMode = {
	Open : 1,
	Closed : 2,
	Locked : 3,
}

function lockableDoor(name, caption, mode, key) {
	var door = { 
		name : name,
		caption : caption,
		getVerbs : getVerbs,
		mode : mode,
		afterLock : () => {door.mode = DoorMode.Locked},
		afterUnlock : () => {door.mode = DoorMode.Closed},
		afterOpen : () => {door.mode = DoorMode.Open},
		afterClose : () => {door.mode = DoorMode.Closed},
	};

	function getVerbs() {
		var openVerb = door.mode == DoorMode.Closed ? ["open"] : []
		var closeVerb = door.mode == DoorMode.Open ? ["close"] : []
		var lockVerb = game.inventory.has(key) && door.mode == DoorMode.Closed ? ["lock"] : []
		var unlockVerb = game.inventory.has(key) && door.mode == DoorMode.Locked ? ["unlock"] : []
		return openVerb.concat(closeVerb.concat(lockVerb.concat(unlockVerb)));
	}

	return door;
}

var officeDoor = lockableDoor("officeDoor", "office door", DoorMode.Locked, officeDoorKey);

var historyBookShelf = (function() {
	var obj = { 
	    name : "historyBookShelf",
    	caption : "history bookshelf",
    	verbs : [examine],
    	examine : examine,
    	empty : empty,
    	pull : pull,
	}

	function examine() {
		if (game.flags.isSet(Flag.BookshelfPulled)) {
			game.message = "The dusty bookshelf has been pulled from its place along the wall. Behind it, you can see a part of a brick wall."
		}
		else if (game.flags.isSet(Flag.BookshelfEmpty)) {
			game.message = "Behind the now empty bookshelf, you can see an old brick wall."
		}
		else if (game.flags.isSet(Flag.EntranceKnown)) {
			game.verbs.add(historyBookShelf, "empty");
			game.message = "This shelf is filled with books. Emptying it may be a daunting task in this room that is already so overcrowded"
		}
		else {
			game.message = "This shelf is filled with books. World War II, Christofer Columbus and the French Revolution. Operation Desert Storm, ancient Greece and Titanic. Creative chaos in this shelf, as well as in the rest of the shop." 
		}
	}

	function empty() {
		game.flags.replace(Flag.EntranceKnown, Flag.BookshelfEmpty);
		game.message = "You spend a good while emptying the bookshelf. The stacks on the floor grow, as do those in the two armchairs and on the coffee tables. You even stack books under the tables, to prevent them from collapsing completely. When you are done, the room is barely navigable, and the dust that has gathered on the now empty shelves for some reason makes you think of mouldy feather boas."; 
		game.verbs.replace(obj, empty, pull);
	}

	function pull() {
		game.flags.replace(Flag.BookshelfEmpty, Flag.BookshelfPulled);
		game.message = "You pull the bookshelf out from the wall. It doesn't move far, given that the room is full of stacked books, but gives you access to a part of the brick wall behind it."; 
		game.verbs.remove(obj, pull);
	    game.items.addTo(historySection, wall);
	}

	return obj;
})();

var wall = (function() {
	return { 
	    name : "wall",
    	caption : "wall",
    	verbs : [examine],
    	examine : examine,
    	hit : hit,
	}

	function examine() {
		if (game.flags.isSet(Flag.WallBroken)) {
			game.message = "There is a hole in the wall, large enough to enter."
		}
		else {
			game.verbs.add(wall, hit);
			game.message = "When you look closer at the wall, one section of it looks newer than the rest.";
		}
	}

	function hit() {
		if (game.inventory.has(rockPick)) {
		 	if (game.flags.isSet(Flag.UncleAilbertIntroduced)) {
				game.message = "You really don't want to smash the wall in uncle Ailbert's presence."
			}	
			else if (game.flags.isSet(Flag.UncleAilbertGone)) {
				game.message = "You hit the wall with the axe until the door-shaped section has been demolished. Behind it, you see only darkness.";
		 	    game.flags.set(Flag.WallBroken);
			}
			else {
				game.flags.set(Flag.UncleAilbertIntroduced);
		        game.items.addTo(fictionSection, uncleAilbert);
				game.actions.moveTo(fictionSection);
				game.message = "As you are about to hit the wall, the entrance door bell chimes. You take a short pause, then walk out to meet your presumed customer. It turns out to be your uncle Ailbert."
			}
		}
		else {
			game.message = "You knock at the wall. When you knock in the middle of the newer section, it sounds hollow. When you look closer, it actually has the shape of a door. Could the book be right?";
		}
	}
})();

var historySection = (function() {
	return { 
		name : "historySection",
		caption : "history section",
		items : [officeDoor],
		getExits : getExits,
		look : look,
	}

	function getExits() {
		return officeDoor.mode == DoorMode.Open ? { N : artSection , S : office } : { N : artSection }
	}

	function look() {
		var bookshelfDescription = game.flags.isSet(Flag.EntranceKnown) ? "You look at the bookshelf on the eastern wall in a way that you have never done before. " : "";
		var officeDescription = game.flags.isSet(Flag.OfficeKeyFound) ? "." :  " which you know is filled with even more books. At least you could enter the office if the door wasn't locked and you hadn't misplaced the key. Upon second thought, north seems the only viable option here."
		return "This windowless room contains books on history, a subject that has been dear to you ever since you took over the bookshop. Maybe as a result of this, the room is filled to the brim with books on the subjcect. Along the walls are books in the shelves from floor to ceiling. Two coffee tables are located here, both covered by large stacks of books. The two armchairs standing in one corner are also filled with books. You really ought to get rid of some of the books in here, and clean up the room a bit. If only someone would come in and buy a lot of these books... " + bookshelfDescription + "<br><br>From here you can go north to the art section or south to your office" + officeDescription;
	}
})();

