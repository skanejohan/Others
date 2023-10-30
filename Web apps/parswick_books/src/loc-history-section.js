var historySection = {
    name: "\"History\" section",
    image: loadImage("history-section"),

    initialize() {
        this.objects = [
        ];
        this.exits = [
            {
                rect: { left: 343, top: 83, right: 455, bottom: 278 }, leadsTo: artAndArchitectureSection
            },
        ]
    },

    update() {
    }
}