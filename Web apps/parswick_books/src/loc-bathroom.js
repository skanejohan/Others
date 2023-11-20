var bathroom = {
    getName() {
        return  "bathroom";
    },
    
    initialize() {
        this.exits = [];
        this.objects = createObjectList();
        this.manager = createLocationManager(loadImage("loc-bathroom"), this.objects, this.exits);

        this.objects.add({ rect: { left: 60, top: 60, width: 20, height: 20 }, description: "Well... let's just say that it does it's job." });
        this.objects.add({ rect: { left: 200, top: 70, width: 40, height: 20 }, description: "Old, stained and maybe not completely clean." });
        this.objects.add({ rect: { left: 243, top: 70, width: 3, height: 10 }, description: "You really ought to change the towel hanging next to the sink." });
        this.objects.add({ rect: { left: 210, top: 30, width: 30, height: 20 }, description:
            "You see a handsome figure in the mirror. At 45, you are satisfied with what you see. Your flowing red hair and strong arms are unmistakably " + 
            "celtic traits that your family has valued for centuries." });

        this.exits.push({ rect: { left: 160, top: 30, width: 20, height: 50 }, leadsTo: kitchen });
     },

     update() {
        this.manager.update();
    },

    render() {
        this.manager.render();
    },
}