var latinDictionary = { 
	name : "latinDictionary",
	caption : "latin dictionary",
	description : "The cover of this book simply says \"A Latin Dictionary\". \"Well\", you mutter to yourself, \"I guess no more information is needed\".",
	verbs : [examine, take],
}

var travelShelf = { 
	name : "travelShelf",
	caption : "travel shelf",
	description : "Oh, the books in this shelf. How you have read them, some from cover to cover, others more haphazardly, wishing that you were somewhere other than in this dreary town.", 
	verbs : [examine],
}

var languageShelf = (function() {
	return { 
		name : "languageShelf",
		caption : "language shelf",
		verbs : [examine],
		examine : examine,
	}

	function examine(gc) {
		if (isCarried(gc, houseHistoryBook) && !flagIsSet(Flag.LatinDictionaryFound, gc.flags)) {
			addToItems(latinDictionary, travelSection.items);
			setFlag(Flag.LatinDictionaryFound, gc.flags);
			return "The shelf is filled with dictionaries and grammar guides. Pondering the old book in your hand, you look more closely for a latin dictionary which you are able to find, squeezed between Astrid Stedje's \"Deutsche Sprache gestern und heute\" and an old edition of \"The Oxford Companion to English Literature\".";
		}
		else {
			return "The shelf is filled with dictionaries and grammar guides. To be honest, you have probably not opened one of them after placing them in the shelf.";
		}
	}
})();

var travelSection = { 
	name : "travelSection",
	caption : "travel section",
	description : "You are in the travel and language section of the book shop. One of the shelves in here holds dictionaries, grammar guides and the like. The other holds books about locations near and far, exotic ones about distant cultures and sandy deserts, as well as less exotic ones such as Islington and Ipswich. In one corner stands a worn armchair. Many a time have you sat here, dreaming of faraway beaches and cities where the lights never go out. Through the window, you can see the street outside, currently covered in a thin white layer of snow. From here, you can move east into the fiction section.",
	items: [languageShelf, travelShelf],
}
