var artAndArchitectureSection = {
    name: "\"Art and Architecture\" section",
    image: loadImage("art-and-architecture-section"),

    initialize() {
        this.objects = [
            {
                rect: { left: 80, top: 80, width: 120, height: 210 }, description: [ 
                    "Many of the books in these shelves are of the", 
                    "\"coffee table book\" variety." ]
            },
            {
                rect: { left: 220, top: 80, width: 120, height: 210 }, description: [ 
                    "Many of the books in these shelves are of the", 
                    "\"coffee table book\" variety." ]
            },
            {
                rect: { left: 360, top: 80, width: 120, height: 210 }, description: [ 
                    "Many of the books in these shelves are of the", 
                    "\"coffee table book\" variety." ]
            },
            {
                rect: { left: 500, top: 80, width: 120, height: 210 }, description: [ 
                    "Many of the books in these shelves are of the", 
                    "\"coffee table book\" variety." ]
            },
        ];
        this.exits = [
            {
                rect: leftExitRect, leadsTo: fictionSection
            },
            {
                rect: bottomExitRect, leadsTo: historySection
            }
        ]
    },

    update() {
    }
}