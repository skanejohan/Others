var travelAndLanguageSection = {
    name: "\"Travel and language\" section",
    image: loadImage("travel-and-language-section"),

    initialize() {
        this.objects = [
            {
                rect: { left: 100, top: 300, width: 120, height: 120 }, description: [ 
                    "Many a time have you sat in this worn armchair,", 
                    "dreaming of faraway beaches and cities where the", 
                    "lights never go out." ]
            },
            {
                rect: { left: 80, top: 80, width: 120, height: 210 }, description: [ 
                    "The shelf is filled with dictionaries and grammar", 
                    "guides. To be honest, you have probably not opened", 
                    "one of them after placing them in the shelf." ]
            },
            {
                rect: { left: 220, top: 80, width: 120, height: 210 }, description: [ 
                    "The shelf is filled with dictionaries and grammar", 
                    "guides. To be honest, you have probably not opened", 
                    "one of them after placing them in the shelf." ]
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

    update() {
    }
}