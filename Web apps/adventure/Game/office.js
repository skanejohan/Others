// ---------- The desk and the stuff inside it

var paperclip = {
	name : "paperclip",
	caption : "paperclip",
	description : "It is a paper clip. Nothing more. Nothing less.",
	verbs: ["examine", "take"],
}

var drawer = (function() {
	return {
		name : "drawer",
		caption : "drawer",
		containedItems : [paperclip],
		verbs: [examine, open],
		examine : examine
	}

	function examine() {
		if (game.verbs.has(drawer, "open")) {
			game.message = "The drawer is closed."
		}
		else if (game.message = awer.containedItems.indexOf(paperclip) > -1) {
			game.message = "The drawer is, surprisingly enough, almost empty. The only thing you see is an old paper clip.";
		}
		else {
			game.message = "The drawer is empty."
		}
	}
})();

var desk = (function() {
	return {
		name : "desk",
		caption : "desk",
		containedItems : [],
		verbs: [examine],
		examine : examine
	}

	function examine() {
		game.items.addTo(office, drawer);
		game.message = "The mahogany desk is cluttered with papers, most of them bills. It seems that you owe the gas company £19.32 and the phone company £26.53, and the unpaid bill of £35 is most likely the reason why the morning paper hasn't appeared in a while. Looking through the piles, you realise that you have never really cleaned out the desk since your father's death. Among other things, you find a few old magazines - it seems like the pound hit a record high in December of 1957 and a record low in Febrary of 1985. And who would have known that the \"Benny Hill Show\" was cancelled in 1989 (you vividly remember your parents dislike of the show)? Or that French president de Gaulle accused the British government of lacking the necessary commitment to European integration in January of 1963? Well, well... In the desk, there is also a small drawer.";
	}
})();

// ---------- The safe and the stuff inside it

var houseHistoryBook = (function() {
	return {
		name : "houseHistoryBook",
		caption : "old book",
		verbs: ["examine", "take"],
		examine : examine,
	}

	function examine() {
		if (game.flags.isSet(Flag.WallBroken)) {
			game.message = "You examine the map. The entrance to the cellar turned out to be exactly where the book indicated.";
		}		
		else if (historySection.items.indexOf(historyBookShelf) > -1) {
			game.message = "You examine the map. Behind the bookshelf on the eastern wall of the history section it seems like there has once been an entrance to the cellar."
		}
		else if (game.inventory.has(latinDictionary)) {
		    game.items.addTo(historySection, historyBookShelf);
			game.flags.set(Flag.EntranceKnown);
			game.message = "Using the latin dictionary, you are able to decipher the contents of the old book. It describes the history of the house in which the bookshop is located. Most of what is in the book you already know since your parents passed this information to you - whether as a child you wanted it or not - but you find a few nuggets of new information. The most interesting part is the fact that there used to be an entrance to a cellar from what is now the history section. Looking at the map, and reading the text surrounding it, you conclude that there must be a hidden entrance to the basement behind the eastern wall, currently covered by book shelves.";
		}
		else {
			game.message = "The leather-bound old book is written in what you assume is latin. Although you may recognize a word here and there, you really have no way of telling what the book is about. You see a small map in one of the pages. You can't be sure but you have a slight feeling of recognition.";
		}
	}
})();

var safe = (function() {
	return { 
		name : "safe",
		caption : "safe",
		containedItems : [houseHistoryBook],
		verbs : [examine, enterCombination],
		examine : examine,
		enterCombination : enterCombination
	}

	function examine() {
		var door = game.verbs.has(safe, "close") ? "is open." : "has golden details, and a sign saying \"Samuel Withers & Co. Ltd. West Bromwich\". It has a dial for entering the correct combination and a large handle for opening the door."
		game.message = "The old safe is painted black. Its heavy steel door " + door;
	}

	function enterCombination(combination) {
		keypad.enterCombination(safe, "1979", combination,
			() => {
				game.verbs.replace(safe, "enterCombination", "close");
				game.message = "You enter the correct combination and with a light creaking, the door opens.";
				view.update();
			}, 
			() => {
				game.message = "For a moment there, you thought you remembered the code. A futile attempt.";
				view.update();
			});
	}
})();

// ---------- The cabinet and the stuff inside it

var magnifyingGlass = {
	name : "magnifyingGlass",
	caption : "magnifying glass",
	description : "It works. The thing you look at actually appears just a little bit bigger than it actually is. As you remember, it can also be used with insects in a rather harmful way. You feel a pang of guilt at the thought.",
	verbs : ["examine", "take"],
}

var modelCar = {
	name : "modelCar",
	caption : "model car",
	description : "You remember playing with this car. It is brown, and somebody once told you that it represents a Leyland Princess. You have no reason to doubt that.",
	verbs : ["examine", "take"],
}

var stones = {
	name : "stones",
	caption : "stones",
	description : "Your old stone collection. To be honest, you could probably go out to the square outside and pick these three rocks in just a few minutes. Come to think of it, that is probably exactly how they ended up in your possession.",
	verbs : ["examine", "take"],
}

var rockPick = {
	name : "rockPick",
	caption : "rock pick",
	description : "It looks rather like a hammer. If you were to describe it, that is probably the word you would use.",
	verbs : ["examine", "take"],
}

var metalBox = (function() {
	isPicked = false;

	that = this;

	return {
		name : "metalBox",
		caption : "metal box",
		containedItems : [stones, rockPick],
		verbs : ["examine", "take"],
		getVerbs : getVerbs,
		examine : examine,
		pick : pick,
	}

	function getVerbs() {
		if (!that.isPicked && game.inventory.has(paperclip)) {
			return metalBox.verbs.concat(pick);
		}
		return metalBox.verbs;
	}

	function examine() {
		if (that.isPicked) {
			game.message = "Most of the color has been scratched off this once green metal box.";
		}
		else {
			game.message = "Most of the color has been scratched off this once green metal box. You remember it vaguely, but exactly what is inside it eludes you. It is quite heavy and when you shake it carefully, it rattles. It has a simple lock, which at the moment seems locked.";
		}
	}

	function pick() {
		that.isPicked = true;
        game.verbs.replace(metalBox, "pick", "close");
		game.message = "Using the paper clip, you manage to open the lock. You open the box and it turns out to contain your old rock collection. Not much of a collection actually, a few small stones and your old rock pick.";
	}
})();

var cabinet = (function() {
	return {
		name : "cabinet",
		caption : "cabinet",
		containedItems : [magnifyingGlass, metalBox, modelCar],
		verbs: [examine, open],
		examine : examine
	}

	function examine() {
		if (game.verbs.has(cabinet, "close")) {
			game.message = "You remember a lot of this stuff from your childhood. Many a time have you intended to go through this stuff, keeping some of it and throwing away some. Likely, you would throw away most of it, which may be the reason why you haven't gotten around to the task."
		}
		else {
			game.message = "This old cabinet takes up a large portion of the wall."
		}
	}
})();

var office = (function() {
	return { 
		name : "office",
		caption : "office",
		items: [officeDoor, safe, desk, cabinet],
		getExits : getExits,
		look : look
	}

	function getExits() {
		return officeDoor.mode == DoorMode.Open ? { N : historySection } : { }
	}

	function look() {
		var safeDesc = game.verbs.has(safe, "close") ? "An old safe stands in a corner, its door slightly ajar. " : "In a corner stands an old safe. What it contains, you don't know. Unfortunately, when your father died very suddenly all those years ago, the combination died with him. For all you know, the solution to your financial problems could be in that sturdy old safe. "
		var cabinet = " which you know is filled with the kind of old stuff that goes into a cabinet that is never opened."; // todo or "."
		return "This small office is dominated by a large desk in its centre. Once this well-crafted mahogany desk was your grandfather's pride, but nowadays its worn surface can hardly be seen under all the paperwork that has gathered on top of it. You don't have to look closely to know that a large portion of the papers are bills, many with a due date too far back into the past for comfort. To one side stands a large cabinet" + cabinet + " Covering the rest of the walls are further book shelves, containing those books you know that you will never be able to sell. " + safeDesc + "From here, you can go north to the history section."
	}

})();

