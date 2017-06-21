var uncleAilbert = (function() {
	return {
		name : "uncleAilbert",
		caption : "Uncle Ailbert",
		verbs : ["talk"],
		talk : talk,
		update : update,
		location : null,
	}

	function talk() {
		conversation.addStatement(1, "Hello Fiona, my dear!");
		conversation.addStatement(2, "Hello uncle Ailbert, how are you today?");
		conversation.setResponses(1, [2]);
		conversation.setResponses(2, [3]);

		conversation.addStatement(3, "Oh, the usual. My back hurts and the arthritis ain't getting any better. (Uncle Ailbert's ailments have always been a source of amusement to the whole family)");
		conversation.addStatement(4, "Aren't you seeing a doctor?");
		conversation.addStatement(5, "Can I help you in any way?");
		conversation.addStatement(6, "Have you spoken to cousin Maggie lately?");
		conversation.setResponses(3, [4, 5, 6]);
		conversation.setResponses(4, [7]);
		conversation.setResponses(5, [9]);
		conversation.setResponses(6, [13]);

		conversation.addStatement(7, "I am. No good, that lot");
		conversation.addStatement(8, "Well well...");
		conversation.setResponses(7, [8, 5]);
		conversation.setResponses(8, [0]);

		conversation.addStatement(9, "Well, I could use a drink, lass");
		conversation.addStatement(10, "I am afraid I am out of whisky for the moment");
		conversation.addStatement(11, "Would you like a cup of tea?");
		conversation.addStatement(12, "I can get you a glass of water");
		conversation.setResponses(9, [10, 11, 12]);
		conversation.setResponses(10, [15]);
		conversation.setResponses(11, [16]);
		conversation.setResponses(12, [18]);

		conversation.addStatement(13, "Yes, she came to visit me the other day. Sends her regards, she does.");
		conversation.addStatement(14, "Send her my best, won't you?");
		conversation.setResponses(13, [14]);
		conversation.setResponses(14, [0]);

		conversation.addStatement(15, "Now that is a shame!");
		conversation.setResponses(15, [11, 12]);

		conversation.addStatement(16, "A cup of tea? Well, if you are out of whiskey... yes please.");
		conversation.addStatement(17, "Follow me into the kitchen. I will make you a nice cup.", () => game.verbs.add(waterCooker, "makeTea"));
		conversation.setResponses(16, [17]);
		conversation.setResponses(17, [0]);

		conversation.addStatement(18, "Water? I may be old and possibly not in perfect health but there are limits to your stupid modernity!");
		conversation.setResponses(18, [10, 11]);

 		conversation.startConversation(1);
	}

	function update() {
		game.npcs.move(uncleAilbert, game.location(1));
	}
})();
