var kitchen = {
    name: "kitchen",
    image: loadImage("kitchen"),

    initialize() {
        this.objects = [
            this._closedCupboard, 
            this._tap,
            this._waterCooker,
            this._sink,
            this._chair,
            this._broomCupboard,
            this._table,
            this._fridge
        ];
        this.exits = [
            { rect: doorExitRect, leadsTo: fictionSection },
            { rect: bottomExitRect, leadsTo: bathroom }
        ]
    },

    update(mouseClickedAt) {
        if (mouseClickedAt) {
            var o = Objects.getAt(mouseClickedAt, this);
            if (o == this._closedCupboard) {
                Objects.replace(o, this._openCupboard, this);
                Objects.add(this._cup, this);
                gameContext.message = [ "You open the cupboard" ];
                gameContext.messageRemainingMs = 2000;
            }
            if (o == this._cup) {
                Objects.add(o, inventory);
                Objects.replace(o, this._key, this);
                gameContext.message = [ "When you take the cup, a small key becomes visible." ];
                gameContext.messageRemainingMs = 2000;
            }
            if (o == this._key) {
                Objects.add(o, inventory);
                Objects.remove(o, this);
            }
        }
    },

    _cup: {
        rect: { left: 500, top: 100, width: 40, height: 40 }, image: loadImage("cup"), description: [ 
            "The cup is white and has the text \"Hotel del Sol,", 
            "Tenerife\" written on it. As far as you can remember,",
            "you have never been to Tenerife." ]
    },

    _key: {
        rect: { left: 500, top: 100, width: 40, height: 40 }, image: loadImage("office-door-key"), description: [ 
            "This is the key to the office." ]
    },

    _closedCupboard: {
        rect: { left: 480, top: 80, width: 100, height: 60 }, description: [ 
            "A plain white cupboard, typical for a kitchen that", 
            "has been decorated with economy in mind." ]
    },

    _openCupboard: {
        rect: { left: 430, top: 80, width: 160, height: 60 }, image: loadImage("open-cupboard"), description: [ 
            "The cupboard is open. And almost empty." ]
    },

    _sink: {
        rect: { left: 480, top: 200, width: 130, height: 90 }, description: [ 
            "The stainless steel sink has a strange coloration at", 
            "one end. You have a faint memory of pouring some kind", 
            "of paint into it at an early age." ]
    },

    _tap: {
        rect: { left: 540, top: 160, width: 40, height: 40 }, description: [ 
            "The tap provides cold water only." ]
    },

    _waterCooker: {
        rect: { left: 490, top: 160, width: 40, height: 40 }, description: [ 
            "A small water cooker, mysteriously stained." ]
    },

    _chair: {
        rect: { left: 200, top: 320, width: 80, height: 80 }, description: [ 
            "The chair looks uncomfortable and, having used it on", 
            "many occasions, you know it is." ]
    },

    _table: {
        rect: { left: 64, top: 330, width: 120, height: 120 }, description: [ 
            "This table's worn surface is covered by the doodles", 
            "that you placed there in your childhood, while spending", 
            "many long hours waiting for your parents to finish their", 
            "business." ]
    },

    _broomCupboard: {
        rect: { left: 64, top: 130, width: 120, height: 160 }, description: [ 
            "A plain white door. Behind it, you know you will find a", 
            "lot of cleaning utensils. Nothing that feels remotely", 
            "interesting." ]
    },

    _fridge: {
        rect: { left: 200, top: 200, width: 70, height: 90 }, description: [ 
            "The white fridge is humming slightly. Once in a while it",
            "makes a strange coughing noise. You take a peek inside.", 
            "It is empty, as expected." ]
    },
}