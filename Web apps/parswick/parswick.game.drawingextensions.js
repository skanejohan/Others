const BASE_LAYER = 1;
const ITEM_LAYER_1 = 1;
const ITEM_LAYER_2 = 2;
const ITEM_LAYER_3 = 3;
const HINT_LAYER = 10;
const NOTIFICATION_LAYER = 20;

// artSection

THESEUS.PARSWICK.artShelf1.getDrawCoords = function() {
    return { x: 50, y: 20, w: 40, h: 10 }
}

THESEUS.PARSWICK.artShelf2.getDrawCoords = function() {
    return { x: 50, y: 40, w: 40, h: 10 }
}

THESEUS.PARSWICK.artShelf3.getDrawCoords = function() {
    return { x: 50, y: 60, w: 40, h: 10 }
}

// bathroom

THESEUS.PARSWICK.mirror.getDrawCoords = function() {
    return { x: 97, y: 20, w: 2, h: 60 }
}

THESEUS.PARSWICK.bathroomSink.getDrawCoords = function() {
    return { x: 66, y: 30, w: 30, h: 30 }
}

THESEUS.PARSWICK.towel.getDrawCoords = function() {
    return { x: 91, y: 65, w: 5, h: 5 }
}

THESEUS.PARSWICK.toilet.getDrawCoords = function() {
    return { x: 1, y: 35, w: 40, h: 25 }
}

// fictionSection

THESEUS.PARSWICK.fictionShelf1.getDrawCoords = function() {
    return { x: 10, y: 20, w: 40, h: 10 }
}

THESEUS.PARSWICK.fictionShelf2.getDrawCoords = function() {
    return { x: 10, y: 40, w: 40, h: 10 }
}

THESEUS.PARSWICK.fictionShelf3.getDrawCoords = function() {
    return { x: 10, y: 60, w: 40, h: 10 }
}

THESEUS.PARSWICK.plaque.getDrawCoords = function() {
    return { x: 62, y: 1, w: 11, h: 2 }
}

THESEUS.PARSWICK.fictionTable.getDrawCoords = function() {
    return { x: 70, y: 70, w: 20, h: 20 }
}

THESEUS.PARSWICK.fictionLeftWindow.getDrawCoords = function() {
    return { type: "topWindow", start: 15, length: 20 }
}

THESEUS.PARSWICK.fictionRightWindow.getDrawCoords = function() {
    return { type: "topWindow", start: 75, length: 20 }
}

THESEUS.PARSWICK.frontDoor.getDrawCoords = function() {
    return { type: "topDoor", start: 40, length: 20 }
}

// historySection

THESEUS.PARSWICK.historyBookShelf.getDrawCoords = function() {
    return { x: 50, y: 20, w: 40, h: 10 }
}

THESEUS.PARSWICK.wall.getDrawCoords = function() {
    return { x: 98, y: 18, w: 2, h: 14 }
}

// kitchen

THESEUS.PARSWICK.sink.getDrawCoords = function() {
    return { x: 69, y: 20, w: 30, h: 50 }
}

THESEUS.PARSWICK.cupboard.getDrawCoords = function() {
    return { x: 90, y: 22, w: 10, h: 46, layer: ITEM_LAYER_2 }
}

THESEUS.PARSWICK.cup.getDrawCoords = function() {
    return { x: 91, y: 23, w: 4, h: 4, layer: ITEM_LAYER_3 }
}

THESEUS.PARSWICK.officeDoorKey.getDrawCoords = function() {
    return { x: 95, y: 23, w: 4, h: 4, layer: ITEM_LAYER_3 }
}

THESEUS.PARSWICK.waterCooker.getDrawCoords = function() {
    return { x: 75, y: 60, w: 5, h: 5, layer: ITEM_LAYER_2 }
}

THESEUS.PARSWICK.chair.getDrawCoords = function() {
    return { x: 8, y: 14, w: 10, h: 10 }
}

THESEUS.PARSWICK.table.getDrawCoords = function() {
    return { x: 3, y: 25, w: 35, h: 30 }
}

THESEUS.PARSWICK.fridge.getDrawCoords = function() {
    return { x: 1, y: 74, w: 25, h: 25 }
}

THESEUS.PARSWICK.bathroomDoor.getDrawCoords = function() {
    return { type: "bottomDoor", start: 40, length: 20 }
}

// office

THESEUS.PARSWICK.safe.getDrawCoords = function() {
    return { x: 20, y: 79, w: 25, h: 20 }
}

THESEUS.PARSWICK.cabinet.getDrawCoords = function() {
    return { x: 79, y: 22, w: 20, h: 46 }
}

THESEUS.PARSWICK.magnifyingGlass.getDrawCoords = function() {
    return { x: 82, y: 30, w: 5, h: 5, layer: ITEM_LAYER_2 }
}

THESEUS.PARSWICK.metalBox.getDrawCoords = function() {
    return { x: 85, y: 45, w: 5, h: 5, layer: ITEM_LAYER_2 }
}

THESEUS.PARSWICK.desk.getDrawCoords = function() {
    return { x: 22, y: 30, w: 45, h: 30 }
}

THESEUS.PARSWICK.drawer.getDrawCoords = function() {
    if (this.isClosed()) {
        return { x: 32, y: 50, w: 25, h: 10, layer: ITEM_LAYER_2 }
    }
    return { x: 32, y: 60, w: 25, h: 10, layer: ITEM_LAYER_2 }
}

THESEUS.PARSWICK.paperClip.getDrawCoords = function() {
    return { x: 40, y: 62, w: 4, h: 4, layer: ITEM_LAYER_3 }
}

THESEUS.PARSWICK.officeDoor.getDrawCoords = function() {
    return { type: "bottomDoor", start: 40, length: 20 }
}

// travelSection

THESEUS.PARSWICK.travelShelf.getDrawCoords = function() {
    return { x: 10, y: 20, w: 40, h: 10 }
}

THESEUS.PARSWICK.languageShelf.getDrawCoords = function() {
    return { x: 10, y: 40, w: 40, h: 10 }
}

THESEUS.PARSWICK.armchair.getDrawCoords = function() {
    return { x: 70, y: 70, w: 20, h: 20 }
}

THESEUS.PARSWICK.travelWindow.getDrawCoords = function() {
    return { type: "topWindow", start: 20, length: 60 }
}

