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
    }
}

class ArtSection extends Location {
    constructor() {
        super("art and architecture section");
        this.containedItems = ["artShelf1", "artShelf2", "artShelf3"];
        this.itemPositions = {
            "artShelf1": { x: 200, y: 100, w: 230, h: 40 },
            "artShelf2": { x: 200, y: 170, w: 230, h: 40 },
            "artShelf3": { x: 200, y: 240, w: 230, h: 40 },
        };
        this.doorPositions = {
            // "frontDoor": { type: "N", start: 210, length: 80 },
        };
        this.windowPositions = {
            // "fictionLeftWindow": { type: "N", start: 110, length: 80 },
        };
        this.exits.S = { target: "historySection" };
        this.exits.W = { target: "fictionSection" };
    }
}

class Bathroom extends Location {
    constructor() {
        super("bathroom");
        this.containedItems = ["mirror", "toilet", "bathroomSink", "towel"];
        this.itemPositions = {
            "mirror": { x: 430, y: 125, w: 16, h: 200 },
            "bathroomSink": { x: 350, y: 145, w: 70, h: 160 },
            "towel": { x: 430, y: 330, w: 16, h: 16 },
            "toilet": { x: 55, y: 145, w: 160, h: 160 },
        };
        this.doorPositions = {
            // "bathroomDoor": { type: "N", start: 210, length: 80 },
        };
        this.exits.N = { target: "kitchen", door: "bathroomDoor" };
    }
}

class FictionSection extends Location {
    constructor() {
        super("fiction section");
        this.containedItems = ["plaque", "frontDoor", "fictionShelf1", "fictionShelf2", "fictionShelf3", 
            "fictionTable", "fictionLeftWindow", "fictionRightWindow"];
        this.itemPositions = {
            "plaque": { x: 300, y: 52, w: 35, h: 8 },
            "fictionShelf1": { x: 100, y: 120, w: 150, h: 30 },
            "fictionShelf2": { x: 100, y: 180, w: 150, h: 30 },
            "fictionShelf3": { x: 100, y: 240, w: 150, h: 30 },
            "fictionTable":  { x: 320, y: 280, w: 80, h: 80 },
        };
        this.doorPositions = {
            "frontDoor": { type: "N", start: 210, length: 80 },
        };
        this.windowPositions = {
            "fictionLeftWindow": { type: "N", start: 110, length: 80 },
            "fictionRightWindow": { type: "N", start: 340, length: 80 },
        };
        this.exits.S = { target: "kitchen" };
        this.exits.W = { target: "travelSection" };
        this.exits.E = { target: "artSection" };
    }
}

class HistorySection extends Location {
    constructor() {
        super("history section");
        this.containedItems = ["historyBookshelf", "wall", "officeDoor"];
        this.itemPositions = {
            /* TODO ... and historyBookshelf2 is the interesting one...
            "historyBookshelf1": { x: 200, y: 100, w: 230, h: 40 },
            "historyBookshelf2": { x: 200, y: 170, w: 230, h: 40 },
            "historyBookshelf3": { x: 200, y: 240, w: 230, h: 40 },
            */
           "historyBookshelf": { x: 200, y: 100, w: 230, h: 40 },
           "wall": { x: 430, y: 125, w: 16, h: 200 },
        };
        this.doorPositions = {
            "officeDoor": { type: "S", start: 210, length: 80 },
        };
        this.windowPositions = {
            // "fictionLeftWindow": { type: "N", start: 110, length: 80 },
        };
        this.exits.S = { target: "office", door: "officeDoor" };
        this.exits.N = { target: "artSection" };
    }
}

class Kitchen extends Location {
    constructor() {
        super("kitchen");
        this.containedItems = ["sink", "waterCooker", "fridge", "table", "chair", "cupboard", "bathroomDoor"];
        this.itemPositions = {
            "cup":  { x: 390, y: 110, w: 20, h: 20, layerIndex: 2 },
            "cupboard": { x: 365, y: 100, w: 80, h: 70 },
            "sink": { x: 345, y: 180, w: 100, h: 160 },
            "chair":  { x: 130, y: 100, w: 40, h: 40 },
            "table":  { x: 100, y: 150, w: 100, h: 100 },
            "fridge":  { x: 55, y: 318, w: 80, h: 80 },
            "officeDoorKey":  { x: 390, y: 140, w: 20, h: 20, layerIndex: 2 },
            "waterCooker": { x: 390, y: 200, w: 20, h: 20, layerIndex: 2 },
        };
        this.doorPositions = {
            "bathroomDoor": { type: "S", start: 210, length: 80 },
        };
        this.exits.N = { target: "fictionSection" };
        this.exits.S = { target: "bathroom", door: "bathroomDoor" };
    }
}

class Office extends Location {
    constructor() {
        super("office");
        this.containedItems = ["safe", "cabinet", "desk"];
        this.itemPositions = {
            "safe": { x: 100, y: 330, w: 90, h: 70 },
            "cabinet": { x: 380, y: 100, w: 70, h: 130 },
            "desk": { x: 200, y: 200, w: 120, h: 70 },
            "drawer": { x: 380, y: 100, w: 70, h: 70 },
            "paperClip": { x: 380, y: 100, w: 70, h: 70 },
            "magnifyingGlass": { x: 180, y: 100, w: 20, h: 20 },
            "metalBox": { x: 220, y: 100, w: 20, h: 20 },
        };
        this.exits.N = { target: "historySection", door: "officeDoor" };
    }
}

class TravelSection extends Location {
    constructor() {
        super("travel section");
        this.containedItems = ["travelShelf", "languageShelf", "latinDictionary", "armchair", "travelWindow"];

        this.itemPositions = {
            "travelShelf": { x: 100, y: 120, w: 150, h: 30 },
            "languageshelf": { x: 100, y: 180, w: 150, h: 30 },
            "armchair":  { x: 320, y: 280, w: 80, h: 80 },
        };
        this.windowPositions = {
            "travelWindow": { type: "N", start: 210, length: 80 },
        };

        this.exits.E = { target: "fictionSection" };
    }
}