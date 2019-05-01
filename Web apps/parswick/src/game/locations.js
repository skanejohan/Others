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
        };
        this.exits = {
            "W": { target: "historySection" },
            "E": { target: "cellarEast" },
            "S": { target: "cellarSouth" },
        }
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
}

class CellarSouth extends Location {
    constructor() {
        super("south room of the cellar");
        this.containedItems = [];
        this.positions = {
        };
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
        this.containedItems = ["historyBookshelf", "wall", "officeDoor"];
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
        }
    }
}

class Kitchen extends Location {
    constructor() {
        super("kitchen");
        this.containedItems = ["sink", "waterCooker", "fridge", "table", "chair", "cupboard", "bathroomDoor"];
        this.positions = {
            "cup":  { x: 390, y: 110, w: 20, h: 20, layerIndex: 2 },
            "cupboard": { x: 365, y: 100, w: 80, h: 70 },
            "sink": { x: 345, y: 180, w: 100, h: 160 },
            "chair":  { x: 130, y: 100, w: 40, h: 40 },
            "table":  { x: 100, y: 150, w: 100, h: 100 },
            "fridge":  { x: 55, y: 318, w: 80, h: 80 },
            "officeDoorKey":  { x: 390, y: 140, w: 20, h: 20, layerIndex: 2 },
            "waterCooker": { x: 390, y: 200, w: 20, h: 20, layerIndex: 2 },
            "bathroomDoor": { door: true, type: "S", start: 210, length: 80 },
        };
        this.exits = {
            "N": { target: "fictionSection" },
            "S": { target: "bathroom", door: "bathroomDoor" },
        }
    }
}

class Office extends Location {
    constructor() {
        super("office");
        this.containedItems = ["safe", "cabinet", "desk", "drawer"];
        this.positions = {
            "safe": { x: 100, y: 325, w: 90, h: 70 },
            "cabinet": { x: 375, y: 100, w: 70, h: 130 },
            "desk": { x: 150, y: 150, w: 170, h: 120 },
            "drawer": { x: 180, y: 200, w: 110, h: 70, layerIndex: 2 },
            "paperClip": { x: 230, y: 240, w: 30, h: 30, layerIndex: 3 },
            "magnifyingGlass": { x: 180, y: 100, w: 20, h: 20 },
            "metalBox": { x: 220, y: 100, w: 20, h: 20 },
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
            "languageshelf": { x: 100, y: 180, w: 150, h: 30 },
            "armchair":  { x: 320, y: 280, w: 80, h: 80 },
            "travelWindow": { window: true, type: "N", start: 210, length: 80 },
        };
        this.exits = {
            "E": { target: "fictionSection" },
        }
    }
}