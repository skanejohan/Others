createTravelAndLanguageSection = () => {
    let exits = [];
    let objects = createObjectList();
    let manager = createLocationManager(loadImage("loc-travel-and-language-section"), objects, exits);

    let initialize = () => {
        objects.add(dictionaryShelf1);
        objects.add(dictionaryShelf2);
        objects.add({ rect: { left: 265, top: 58, width: 30, height: 32 }, description:
            "Many a time have you sat in this worn armchair, dreaming of faraway beaches and cities where the lights never go out."});
        objects.add({ rect: { left: 166, top: 13, width: 41, height: 67 }, description:
            "Oh, the books in this shelf. How you have read them, some from cover to cover, others more haphazardly, " +
            "wishing that you were somewhere other than in this dreary town." });
        objects.add({ rect: { left: 215, top: 17, width: 25, height: 25 }, description:
            "Through the window, you can see the street outside, currently covered in a thin white layer of snow." });

        exits.push({ rect: Constants.rightExitRect, leadsTo: GameContext.fictionSection() });
    }

    let update = () => {
        manager.update();
        if (GameContext.mouse().isClicked()) {
            var o = manager.hoveredObject();
            if ((o == dictionaryShelf1 || o == dictionaryShelf2) 
                && GameContext.inventory().activeItem() == GameContext.office().unknownBook() 
                && !GameContext.inventory().has(latinDictionary)) {
                GameContext.inventory().add(latinDictionary);
                GameContext.message().setMessage(
                    "Pondering the old book in your hand, you look more closely for a latin dictionary which you are able to find, squeezed between " + 
                    "Astrid Stedje's \"Deutsche Sprache gestern und heute\" and an old edition of \"The Oxford Companion to English Literature\".",
                    10000);
                GameContext.inventory().registerAction(latinDictionary, GameContext.office().unknownBook(), 
                    () => useDict(latinDictionary, GameContext.office().unknownBook()));
            }
        }
    }

    let useDict = (dict, book) => {
        GameContext.inventory().remove(dict);
        GameContext.inventory().remove(book);
        GameContext.inventory().add(GameContext.office().houseHistoryBook());
        GameContext.message().setMessage(
            "Using the latin dictionary, you are able to decipher the contents of the old book. It describes the history of the house in which the " +
            "bookshop is located. Most of what is in the book you already know since your parents passed this information to you - whether as a child" + 
            "you wanted it or not - but you find a few nuggets of new information. The most interesting part is the fact that there used to be an entrance " + 
            "to a cellar from what is now the history section. Looking at the map, and reading the text surrounding it, you conclude that there must be " + 
            "a hidden entrance to the basement behind the eastern wall, currently covered by book shelves.",
            10000);
    }

    let latinDictionary = {
        rect: { left: 0, top: 0, width: 0, height: 0 }, image: loadImage("itm-latin-dictionary"), description: 
            "The cover of this book simply says \"A Latin Dictionary\". \"Well\", you mutter to yourself, \"I guess no more information is needed\"."
    }

    let dictionaryShelfDescription = 
        "This shelf is filled with dictionaries and grammar guides. To be honest, you have probably not opened any of them after placing them in the shelf.";

    let dictionaryShelf1 = { rect: { left: 16, top: 13, width: 41, height: 67 }, description: dictionaryShelfDescription };
    
    let dictionaryShelf2 = { rect: { left: 66, top: 13, width: 41, height: 67 }, description: dictionaryShelfDescription };

    return {
        initialize: initialize,
        getName: () => "\"Travel and language\" section",
        update: () => update(),
        render: () => manager.render(),
    }
}