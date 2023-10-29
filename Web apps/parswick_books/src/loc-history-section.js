var historySection = {
    image: loadImage("history-section"),

    name: "\"History\" section",

    fixedObjects: [
    ],

    initialize() {
        this.exits = [
            {
                rect: { left: 343, top: 83, right: 455, bottom: 278 }, leadsTo: artAndArchitectureSection
            },
        ]
    }
}