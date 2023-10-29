var artAndArchitectureSection = {
    image: loadImage("art-and-architecture-section"),

    name: "\"Art and Architecture\" section",

    fixedObjects: [
    ],

    initialize() {
        this.exits = [
            {
                rect: leftExitRect, leadsTo: fictionSection
            },
            {
                rect: bottomExitRect, leadsTo: historySection
            }
        ]
    }
}