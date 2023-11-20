var travelAndLanguageSection = {

    getName() {
        return  "\"Travel and language\" section";
    },

    initialize() {
        this.exits = [];
        this.objects = createObjectList();
        this.manager = createLocationManager(loadImage("loc-travel-and-language-section"), this.objects, this.exits);

        this.objects.add({ rect: { left: 16, top: 13, width: 41, height: 67 }, description: this._dictionaryShelfDescription });
        this.objects.add({ rect: { left: 66, top: 13, width: 41, height: 67 }, description: this._dictionaryShelfDescription });
        this.objects.add({ rect: { left: 265, top: 58, width: 30, height: 32 }, description:
            "Many a time have you sat in this worn armchair, dreaming of faraway beaches and cities where the lights never go out."});
        this.objects.add({ rect: { left: 166, top: 13, width: 41, height: 67 }, description:
            "Oh, the books in this shelf. How you have read them, some from cover to cover, others more haphazardly, " +
            "wishing that you were somewhere other than in this dreary town." });
        this.objects.add({ rect: { left: 215, top: 17, width: 25, height: 25 }, description:
            "Through the window, you can see the street outside, currently covered in a thin white layer of snow." });

        this.exits.push({ rect: rightExitRect, leadsTo: fictionSection });
    },

    update() {
        this.manager.update();
        if (Globals.mouse.isClicked()) {
            var o = this.manager.hoveredObject();
            if ((o == this._dictionaryShelf1 || o == this._dictionaryShelf2) && Globals.inventory.activeItem == office._unknownBook) {
                Globals.inventory.add(this._latinDictionary);
                gameContext.message = [ 
                    "Pondering the old book in your hand, you look more", 
                    "closely for a latin dictionary which you are able to", 
                    "find, squeezed between Astrid Stedje's \"Deutsche", 
                    "Sprache gestern und heute\" and an old edition of", 
                    "\"The Oxford Companion to English Literature\"." ];
                gameContext.messageRemainingMs = 10000;
            }
        }
    },

    render() {
        this.manager.render();
    },

    _latinDictionary: {
        rect: { left: 0, top: 0, width: 0, height: 0 }, image: loadImage("itm-latin-dictionary"), description: 
            "The cover of this book simply says \"A Latin Dictionary\". \"Well\", you mutter to yourself, \"I guess no more information is needed\"."
    },

    _dictionaryShelfDescription: 
        "This shelf is filled with dictionaries and grammar guides. To be honest, you have probably not opened any of them after placing them in the shelf."
}