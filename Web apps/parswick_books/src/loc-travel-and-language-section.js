var travelAndLanguageSection = {
    image: loadImage("travel-and-language-section"),

    name: "\"Travel and language\" section",

    fixedObjects: [
    ],

    initialize() {
        this.exits = [
            {
                rect: rightExitRect, leadsTo: fictionSection
            }
        ]
    }
}