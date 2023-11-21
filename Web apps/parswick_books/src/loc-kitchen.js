var kitchen = {

    getName() {
        return  "kitchen";
    },

    initialize() {
        this.exits = [];
        this.objects = createObjectList();
        this.manager = createLocationManager(loadImage("loc-kitchen"), this.objects, this.exits);

        this.objects.add(this._closedCupboard); 
        this.objects.add(this._sink);
        this.objects.add(this._waterCooker);
        this.objects.add(this._tap);
        this.objects.add(this._chair);
        this.objects.add(this._broomCupboard);
        this.objects.add(this._table);
        this.objects.add(this._fridge);

        this.exits.push( { rect: { left: 160, top: 30, width: 20, height: 50 }, leadsTo: fictionSection } );
        this.exits.push( { rect: Constants.bottomExitRect, leadsTo: bathroom } );
    },

    update() {
        this.manager.update();
        
        if (GameContext.mouse().isClicked()) {
            var o = this.manager.hoveredObject();
            
            if (o == this._closedCupboard) {
                this.objects.replace(o, this._openCupboard);
                this.objects.add(this._cup);
                GameContext.message().setMessage("You open the cupboard.", 2000);
            }

            if (o == this._cup) {
                GameContext.inventory().add(o);
                this.objects.replace(o, this._key);
                GameContext.message().setMessage("When you take the cup, a small key becomes visible.", 2000);
            }
            if (o == this._key) {
                GameContext.inventory().add(o);
                this.objects.remove(o);
            }
        }
    },

    render() {
        this.manager.render();
    },

    _cup: {
        rect: { left: 220, top: 20, width: 10, height: 10 }, image: loadImage("itm-cup"), 
        description: 
            "The cup is white and has the text \"Hotel del Sol, Tenerife\" written on it. As far as you can remember, " +
            "you have never been to Tenerife."
    },

    _key: {
        rect: { left: 220, top: 20, width: 10, height: 10 }, image: loadImage("itm-office-door-key"), 
        description: "This is the key to the office."
    },

    _closedCupboard: {
        rect: { left: 218, top: 13, width: 40, height: 25 }, 
        description: "A plain white cupboard, typical for a kitchen that has been decorated with economy in mind."
    },

    _openCupboard: {
        rect: { left: 208, top: 13, width: 60, height: 25 }, image: loadImage("itm-open-cupboard"), 
        description: "The cupboard is open. And almost empty."
    },

    _sink: {
        rect: { left: 200, top: 45, width: 70, height: 35 }, 
        description:  
            "The stainless steel sink has a strange coloration at one end. You have a faint memory of pouring some kind " + 
            "of paint into it at an early age."
    },

    _tap: {
        rect: { left: 240, top: 40, width: 16, height: 16 }, 
        description: "The tap provides cold water only."
    },

    _waterCooker: {
        rect: { left: 210, top: 50, width: 16, height: 16 }, 
        description: "A small water cooker, mysteriously stained."
    },

    _chair: {
        rect: { left: 95, top: 70, width: 10, height: 10 }, 
        description: "The chair looks uncomfortable and, having used it on many occasions, you know it is."
    },

    _table: {
        rect: { left: 70, top: 60, width: 20, height: 20 }, 
        description: 
            "This table's worn surface is covered by the doodles that you placed there in your childhood, while spending " + 
            "many long hours waiting for your parents to finish their business."
    },

    _broomCupboard: {
        rect: { left: 110, top: 20, width: 30, height: 60 }, 
        description: "A plain white door. Behind it, you know you will find a lot of cleaning utensils. Nothing that feels remotely interesting."
    },

    _fridge: {
        rect: { left: 30, top: 50, width: 30, height: 30 }, 
        description:
            "The white fridge is humming slightly. Once in a while it makes a strange coughing noise. You take a peek inside. " +
            "It is empty, as expected."
    },
}