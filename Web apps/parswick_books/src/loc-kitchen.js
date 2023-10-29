var kitchen = {
    image: loadImage("kitchen"),

    name: "kitchen",

    fixedObjects: [
    ],

    initialize() {
        this.exits = [
            {
                rect: { left: 343, top: 83, right: 455, bottom: 278 }, leadsTo: fictionSection
            },
            {
                rect: bottomExitRect, leadsTo: bathroom
            }
        ]
    }
}