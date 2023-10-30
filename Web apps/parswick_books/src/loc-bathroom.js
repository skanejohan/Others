var bathroom = {
    name: "bathroom",
    image: loadImage("bathroom"),

    initialize() {
        this.objects = [
        ];
        this.exits = [
            {
                rect: { left: 343, top: 83, right: 455, bottom: 278 }, leadsTo: kitchen
            }
        ]
    },

    update() {
    }
}