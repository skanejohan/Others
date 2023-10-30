var travelAndLanguageSection = {
    name: "\"Travel and language\" section",
    image: loadImage("travel-and-language-section"),

    initialize() {
        this.objects = [
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