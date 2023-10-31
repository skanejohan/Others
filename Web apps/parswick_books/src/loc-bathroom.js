var bathroom = {
    name: "bathroom",
    image: loadImage("bathroom"),

    initialize() {
        this.objects = [
            {
                rect: { left: 60, top: 270, width: 120, height: 140 }, description: [ 
                    "Well... let's just say that it does it's job." ]
            },
            {
                rect: { left: 620, top: 210, width: 10, height: 40 }, description: [ 
                    "You really ought to change the towel hanging next to", 
                    "the sink." ]
            },
            {
                rect: { left: 480, top: 80, width: 100, height: 60 }, description: [ 
                    "You see a handsome figure in the mirror. At 45, you", 
                    "are satisfied with what you see. Your flowing red hair", 
                    "and strong arms are unmistakably celtic traits that", 
                    "your family has valued for centuries." ]
            },
            {
                rect: { left: 480, top: 200, width: 130, height: 90 }, description: [ 
                    "Old, stained and maybe not completely clean." ]
            },
        ];
        this.exits = [
            {
                rect: doorExitRect, leadsTo: kitchen
            }
        ]
    },

    update() {
    }
}