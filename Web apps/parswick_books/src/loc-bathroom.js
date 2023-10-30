var bathroom = {
    name: "bathroom",
    image: loadImage("bathroom"),

    initialize() {
        this.objects = [
            {
                rect: { left: 60, top: 270, right: 180, bottom: 410 }, description: [ 
                    "Well... let's just say that it does it's job." ]
            },
            {
                rect: { left: 620, top: 210, right: 630, bottom: 250 }, description: [ 
                    "You really ought to change the towel hanging next to", 
                    "the sink." ]
            },
            {
                rect: { left: 480, top: 80, right: 580, bottom: 140 }, description: [ 
                    "You see a handsome figure in the mirror. At 45, you", 
                    "are satisfied with what you see. Your flowing red hair", 
                    "and strong arms are unmistakably celtic traits that", 
                    "your family has valued for centuries." ]
            },
            {
                rect: { left: 480, top: 200, right: 610, bottom: 290 }, description: [ 
                    "Old, stained and maybe not completely clean." ]
            },
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