var travelAndLanguageSection = {
    name: "\"Travel and language\" section",
    image: loadImage("travel-and-language-section"),

    initialize() {
        this.objects = [
            this._dictionaryShelf1,
            this._dictionaryShelf2,
            {
                rect: { left: 100, top: 300, width: 120, height: 120 }, description: [ 
                    "Many a time have you sat in this worn armchair,", 
                    "dreaming of faraway beaches and cities where the", 
                    "lights never go out." ]
            },
            {
                rect: { left: 520, top: 80, width: 120, height: 210 }, description: [ 
                    "Oh, the books in this shelf. How you have read them,",
                    "some from cover to cover, others more haphazardly,", 
                    "wishing that you were somewhere other than in this", 
                    "dreary town." ]
            },
            {
                rect: { left: 380, top: 80, width: 100, height: 120 }, description: [ 
                    "Through the window, you can see the street outside,", 
                    "currently covered in a thin white layer of snow." ]
            },
        ];
        this.exits = [
            {
                rect: rightExitRect, leadsTo: fictionSection
            }
        ]
    },

    update(mouseClickedAt) {
        if (mouseClickedAt) {
            var o = getObjectAt(mouseClickedAt, this.objects);
            if ((o == this._dictionaryShelf1 || o == this._dictionaryShelf2) && gameContext.activeItem == office._unknownBook) {
                addObject(this._latinDictionary, gameContext.inventory);
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

    _dictionaryShelf1: {
        rect: { left: 80, top: 80, width: 120, height: 210 }, description: [ 
            "The shelf is filled with dictionaries and grammar", 
            "guides. To be honest, you have probably not opened", 
            "one of them after placing them in the shelf." ]
    },

    _dictionaryShelf2: {
        rect: { left: 220, top: 80, width: 120, height: 210 }, description: [ 
            "The shelf is filled with dictionaries and grammar", 
            "guides. To be honest, you have probably not opened", 
            "one of them after placing them in the shelf." ]
    },

    _latinDictionary: {
        rect: { left: 0, top: 0, width: 0, height: 0 }, image: loadImage("latin-dictionary"), description: [ 
            "The cover of this book simply says \"A Latin Dictionary\".", 
            "\"Well\", you mutter to yourself, \"I guess no more", 
            "information is needed\"." ]
    },
}