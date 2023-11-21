var artAndArchitectureSection = {

    getName() {
        return  "\"Art and Architecture\" section";
    },

    initialize() {
        this.exits = [];
        this.objects = createObjectList();
        this.manager = createLocationManager(loadImage("loc-art-and-architecture-section"), this.objects, this.exits);

        this.objects.add({ rect: { left: 20, top: 13, width: 41, height: 67 }, description: this._shelfDescription });
        this.objects.add({ rect: { left: 100, top: 13, width: 41, height: 67 }, description: this._shelfDescription });
        this.objects.add({ rect: { left: 180, top: 13, width: 41, height: 67 }, description: this._shelfDescription });
        this.objects.add({ rect: { left: 260, top: 13, width: 41, height: 67 }, description: this._shelfDescription });

        this.exits.push({ rect: Constants.leftExitRect, leadsTo: fictionSection });
        this.exits.push({ rect: Constants.bottomExitRect, leadsTo: historySection });
    },

    update() {
        this.manager.update();
    },

    render() {
        this.manager.render();
    },

    _shelfDescription: "Many of the books in these shelves are of the \"coffee table book\" variety."
}