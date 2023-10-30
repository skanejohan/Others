var travelAndLanguageSection = {
    name: "\"Travel and language\" section",
    image: loadImage("travel-and-language-section"),

    initialize() {
        this.objects = [
            {
                rect: { left: 100, top: 300, right: 220, bottom: 420 }, description: [ 
                    "Many a time have you sat in this worn armchair,", 
                    "dreaming of faraway beaches and cities where the", 
                    "lights never go out." ]
            },
            {
                rect: { left: 80, top: 80, right: 200, bottom: 390 }, description: [ 
                    "The shelf is filled with dictionaries and grammar", 
                    "guides. To be honest, you have probably not opened", 
                    "one of them after placing them in the shelf." ]
            },
            {
                rect: { left: 220, top: 80, right: 340, bottom: 390 }, description: [ 
                    "The shelf is filled with dictionaries and grammar", 
                    "guides. To be honest, you have probably not opened", 
                    "one of them after placing them in the shelf." ]
            },
            {
                rect: { left: 520, top: 80, right: 640, bottom: 390 }, description: [ 
                    "Oh, the books in this shelf. How you have read them,",
                    "some from cover to cover, others more haphazardly,", 
                    "wishing that you were somewhere other than in this", 
                    "dreary town." ]
            },
            {
                rect: { left: 380, top: 80, right: 480, bottom: 200 }, description: [ 
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

    update() {
    }
}