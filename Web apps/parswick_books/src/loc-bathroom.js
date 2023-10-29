var bathroom = {
    image: loadImage("bathroom"),

    name: "bathroom",

    fixedObjects: [
    ],

    initialize() {
        this.exits = [
            {
                rect: { left: 343, top: 83, right: 455, bottom: 278 }, leadsTo: kitchen
            }
        ]
    }
}