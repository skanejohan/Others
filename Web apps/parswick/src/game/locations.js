import { Flag }  from "./flags.js";
import { AccessState }  from "../framework/content/item.js";
import { Location }  from "../framework/content/location.js";

export { getAll };

var getAll = function() {
    return {
        "artSection": new ArtSection(),
        "bathroom": new Bathroom(),
        "fictionSection": new FictionSection(),
        "historySection": new HistorySection(),
        "kitchen": new Kitchen(),
        "office": new Office(),
        "travelSection": new TravelSection(),
        "cellarEntrance": new CellarEntrance(),
        "cellarEast": new CellarEast(),
        "cellarSouth": new CellarSouth(),
    }
}

class ArtSection extends Location {
    constructor() {
        super("art and architecture section");
        this.containedItems = ["artShelf1", "artShelf2", "artShelf3"];
        this.positions = {
            "artShelf1": { x: 200, y: 100, w: 230, h: 40 },
            "artShelf2": { x: 200, y: 170, w: 230, h: 40 },
            "artShelf3": { x: 200, y: 240, w: 230, h: 40 },
        }
        this.exits = {
            "S": { target: "historySection" },
            "W": { target: "fictionSection" },
        }
    }
}

class Bathroom extends Location {
    constructor() {
        super("bathroom");
        this.containedItems = ["mirror", "toilet", "bathroomSink", "towel"];
        this.positions = {
            "mirror": { x: 430, y: 125, w: 16, h: 200 },
            "bathroomSink": { x: 350, y: 145, w: 70, h: 160 },
            "towel": { x: 430, y: 330, w: 16, h: 16 },
            "toilet": { x: 55, y: 145, w: 160, h: 160 },
        };
        this.exits = {
            "N": { target: "kitchen", door: "bathroomDoor" },
        }
    }
}

class CellarEntrance extends Location {
    constructor() {
        super("cellar entrance");
        this.containedItems = [];
        this.positions = {
            "femaleGhost": { x: 320, y: 180, w: 100, h: 100 },
        };
        this.containedCharacters = ["femaleGhost"];
        this.exits = {
            "W": { target: "historySection" },
            "E": { target: "cellarEast" },
            "S": { target: "cellarSouth" },
        }
    }

    canEnterFrom(location, context) {
        if (context.isItemInInventory("flashlight")) {
            if (!context.flags.has(Flag.GHOSTS_HAVE_BEEN_DESCRIBED)) {
                context.setCutscene("ghosts");
                context.flags.add(Flag.GHOSTS_HAVE_BEEN_DESCRIBED);
            }
            context.setGoal("makeFriend");
            return true;
        }
        context.setMessage("You take a few steps down the stairs but turn around again. It is completely dark and you realize that you need some kind of light.");
        context.flags.add(Flag.NEED_LIGHT_SOURCE);
        return false;
    }
}

class CellarEast extends Location {
    constructor() {
        super("east room of the cellar");
        this.containedItems = [];
        this.positions = {
        };
        this.exits = {
            "W": { target: "cellarEntrance" },
        }
    }

    canEnterFrom(location, context) {
        if(context.allCharacters["uncleAilbert"].isVisible) {
            return true;
        }
        context.setMessage("The young woman hovering in the air prevents you from entering.");
        return false;
    }
}

class CellarSouth extends Location {
    constructor() {
        super("south room of the cellar");
        this.containedItems = [];
        this.positions = {
            "maleGhost": { x: 180, y: 180, w: 100, h: 100 },
        };
        this.containedCharacters = ["maleGhost"];
        this.exits = {
            "N": { target: "cellarEntrance" },
        }
    }
}

class FictionSection extends Location {
    constructor() {
        super("fiction section");
        this.containedItems = ["plaque", "frontDoor", "fictionShelf1", "fictionShelf2", "fictionShelf3", 
            "fictionTable", "fictionLeftWindow", "fictionRightWindow"];
        this.containedCharacters = ["uncleAilbert"];
        this.positions = {
            "plaque": { x: 300, y: 52, w: 35, h: 8 },
            "fictionShelf1": { x: 100, y: 120, w: 150, h: 30 },
            "fictionShelf2": { x: 100, y: 180, w: 150, h: 30 },
            "fictionShelf3": { x: 100, y: 240, w: 150, h: 30 },
            "fictionTable":  { x: 320, y: 280, w: 80, h: 80 },
            "uncleAilbert": { x: 320, y: 120, w: 80, h: 80 },
            "frontDoor": { door: true, type: "N", start: 210, length: 80 },
            "fictionLeftWindow": { window: true, type: "N", start: 110, length: 80 },
            "fictionRightWindow": { window: true, type: "N", start: 340, length: 80 },
        };
        this.exits = {
            "S": { target: "kitchen" },
            "W": { target: "travelSection" },
            "E": { target: "artSection" },
        }
    }
}

class HistorySection extends Location {
    constructor() {
        super("history section");
        this.containedItems = ["historyBookshelf", "wall", "officeDoor", "danceBook"];
        this.positions = {
            /* TODO ... and historyBookshelf2 is the interesting one...
            "historyBookshelf1": { x: 200, y: 100, w: 230, h: 40 },
            "historyBookshelf2": { x: 200, y: 170, w: 230, h: 40 },
            "historyBookshelf3": { x: 200, y: 240, w: 230, h: 40 },
            */
           "historyBookshelf": { x: 200, y: 100, w: 230, h: 40 },
           "wall": { x: 430, y: 125, w: 16, h: 200 },
           "officeDoor": { door: true, type: "S", start: 210, length: 80 },
        };
        this.exits = {
            "S": { target: "office", door: "officeDoor" },
            "N": { target: "artSection" },
            "E": { target: "cellarEntrance", isVisible: false },
        }
    }
}

class Kitchen extends Location {
    constructor() {
        super("kitchen");
        this.containedItems = ["sink", "waterCooker", "fridge", "table", "chair", "cupboard", "bathroomDoor", "broomCupboard"];
        this.positions = {
            "cup":  { x: 390, y: 85, w: 30, h: 30, layerIndex: 2 },
            "cupboard": { x: 365, y: 80, w: 80, h: 130 },
            "sink": { x: 345, y: 220, w: 100, h: 160 },
            "broomCupboard":  { x: 55, y: 55, w: 140, h: 40 },
            "chair":  { x: 210, y: 180, w: 40, h: 40 },
            "table":  { x: 100, y: 150, w: 100, h: 100 },
            "fridge":  { x: 55, y: 318, w: 80, h: 80 },
            "officeDoorKey":  { x: 380, y: 155, w: 50, h: 50, layerIndex: 2 },
            "waterCooker": { x: 370, y: 230, w: 55, h: 55, layerIndex: 2 },
            "bathroomDoor": { door: true, type: "S", start: 210, length: 80 },
        };
        this.exits = {
            "N": { target: "fictionSection" },
            "S": { target: "bathroom", door: "bathroomDoor" },
        }
    }

    canEnterFrom(location, context) {
        if (!context.flags.has(Flag.NEEDS_TO_PRACTICE_DANCING) || (context.allItems["frontDoor"].state == AccessState.LOCKED)) {
            return true;
        }
        context.setMessage("As you move towards the kitchen, the front door opens and a man and a woman enter. They ask if you know where the choir will sing Christmas carols in a short while. You point out the direction. They thank you and leave, closing the front door as they leave.");
        return false;
    }
}

class Office extends Location {
    constructor() {
        super("office");
        this.containedItems = ["safe", "cabinet", "desk", "drawer"];
        this.positions = {
            "safe": { x: 100, y: 325, w: 90, h: 70 },
            "cabinet": { x: 325, y: 100, w: 120, h: 200 },
            "desk": { x: 100, y: 150, w: 170, h: 120 },
            "drawer": { x: 130, y: 180, w: 110, h: 100, layerIndex: 2 },
            "paperClip": { x: 150, y: 240, w: 70, h: 30, layerIndex: 3 },
            "magnifyingGlass": { x: 335, y: 120, w: 100, h: 40, layerIndex: 2 },
            "metalBox": { x: 350, y: 230, w: 70, h: 40, layerIndex: 2 },
        };
        this.exits = {
            "N": { target: "historySection", door: "officeDoor" },
        }
    }
}

class TravelSection extends Location {
    constructor() {
        super("travel section");
        this.containedItems = ["travelShelf", "languageShelf", "latinDictionary", "armchair", "travelWindow"];
        this.positions = {
            "travelShelf": { x: 100, y: 120, w: 150, h: 30 },
            "languageShelf": { x: 100, y: 180, w: 150, h: 30 },
            "armchair":  { x: 320, y: 280, w: 80, h: 80 },
            "travelWindow": { window: true, type: "N", start: 210, length: 80 },
        };
        this.exits = {
            "E": { target: "fictionSection" },
        }
    }
}