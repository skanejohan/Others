var artAndArchitectureSection = {
    name: "\"Art and Architecture\" section",
    image: loadImage("art-and-architecture-section"),

    initialize() {
        this.objects = [
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