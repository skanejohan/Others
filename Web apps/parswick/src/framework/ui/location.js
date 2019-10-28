import { ArrayUtils } from "../../_include/arrayutils.js";
import { calculateWall } from "./wallcalculator.js";
import { MultiLineItemElement } from "./elements/multilineitem.js";
import { ArrowElement } from "./elements/arrow.js";
import { AccessState } from "../content/item.js";
import { DoorElement } from "./elements/door.js";
import { Utils, ELEMENTBASELAYERINDEX } from "./utils.js";

export { LocationUI };

class LocationUI {

    constructor(engine, context) {
        this.engine = engine;
        this.context = context;
        this.clearAllElements();
    }

    enter(location, doneFn) {
        this.location = location;
        this.leaveOldLocation(() => this.enterLocation(doneFn));
    }

    leaveOldLocation(doneFn) {
        let allElements = this.getAllElements();
        if (allElements.length == 0) {
            if (doneFn) { doneFn() }
            return;
        }

        allElements.forEach(elem => {
            elem.finishAfterAnimations = true;
            elem.fadeOut(FADETIME);
        });
        this.clearAllElements();
        if (doneFn) {
            setTimeout(doneFn, FADETIME);
        }
    }

    enterLocation(doneFn) {
        this.calculateWalls(true);
        if (doneFn) {
            doneFn();
        }
    }

    calculateWalls(fadeIn) {
        ["E", "S", "W", "N"].forEach(
            dir => calculateWall(
                this.location, dir, 
                (x1, y1, x2, y2) => this.addWall(x1, y1, x2, y2, fadeIn),
                (x1, y1, x2, y2, window) => this.addWindow(x1, y1, x2, y2, window, dir, fadeIn),
                (x1, y1, x2, y2, door) => this.addDoor(x1, y1, x2, y2, door, dir, fadeIn),
                (x1, y1, x2, y2) => this.addArrow(x1, y1, x2, y2, dir, fadeIn)));
    }

    updateExits() {
        if (this.context.haveExitsChanged()) {
            this.clearWallElements(true);
            this.calculateWalls(false);
        }
    }

    clearAllElements() {
        this.clearWallElements();
        this.itemElements = [];
    }

    clearWallElements(removeFromEngine) {
        if (removeFromEngine) {
            this.getWallElements().forEach(e => this.engine.remove(e));
        }
        this.doorElements = {};
        this.arrowElements = {};
        this.wallElements = [];
    }

    getAllElements() {
        var allElements = this.getWallElements();
        Array.prototype.push.apply(allElements, this.itemElements);
        return allElements;
    }

    getWallElements() {
        var allElements = [];
        ["E", "S", "W", "N"].forEach(d => { if (this.arrowElements[d]) { allElements.push(this.arrowElements[d]) }});
        for (var d in this.doorElements) { 
            let doorElement = this.doorElements[d];
            allElements.push(doorElement);
            allElements.push(doorElement.arrowElement); 
        };
        Array.prototype.push.apply(allElements, this.wallElements);
        return allElements;
    }

    removeElementsForNoLongerVisibleItems(items) {
        removeItemElements(items, this.itemElements);
    }

    addElementsForNowVisibleItems(items) {
        addItemElements(items, this.itemElements, 
            item => this.calcItemPosAndColor(item), 
            this.engine, this.context);
    }

    calcItemPosAndColor(item) {
        let result = this.location.positions[item.name];
        if (result.layerIndex == 2) {
            result.color = LAYER2COLOR;
            result.frameColor = LAYER2FRAMECOLOR;
        }
        return result;
    }

    addDoor(x1, y1, x2, y2, door, direction, fadeIn) {
        let _door = this.context.item(door.name);
        let isOpen = _door.state == AccessState.OPEN;
        let elem = new DoorElement(this.engine, x1, y1, x2, y2, direction, isOpen, 
            () => {
                this.context.moveTo(this.location.exits[direction].target, direction);
            },
            () => {
                Utils.setVerbs(elem, _door, this.context);
            }
        );
        _door.element = elem;
        Utils.addMenuTo(elem);
        this.doorElements[door.name] = elem;
        Utils.setVerbs(elem, _door, this.context);
        this.engine.add(elem, ELEMENTBASELAYERINDEX);
        if (fadeIn) {
            elem.fadeIn(FADETIME);
        }
    }

    addWindow(x1, y1, x2, y2, window, direction, fadeIn) {
        this.addDoor(x1, y1, x2, y2, window, direction, fadeIn);
    }

    addArrow(x1, y1, x2, y2, direction, fadeIn) {
        let x = x1 + (x2-x1) / 2;
        let y = y1 + (y2-y1) / 2;
        let arrowElement = new ArrowElement(x, y, direction, () => {
            this.context.moveTo(this.location.exits[direction].target, direction);
        });
        this.arrowElements[direction] = arrowElement;
        this.engine.add(arrowElement, ELEMENTBASELAYERINDEX);
        if (fadeIn) {
            arrowElement.fadeIn(FADETIME);
        }
        return arrowElement;
    }

    addWall(x1, y1, x2, y2, fadeIn) {
        let lineElement = new Line(x1, y1, x2, y2, LAYER1COLOR);
        this.wallElements.push(lineElement);
        this.engine.add(lineElement, ELEMENTBASELAYERINDEX);
        if (fadeIn) {
            lineElement.fadeIn(FADETIME);
        }
    }
}

// ---------- private members ----------

// Given a list of available items, and a list of item elements currently shown,
// this function will the missing item elements. 
function addItemElements(availableItems, currentElements, posFn, engine, context, onAdded) {
    availableItems.filter(i => i.isVisible).forEach(i => {
        if (!currentElements.some(e => e.item == i)) {
            addItemElement(i, posFn, currentElements, engine, context, onAdded);
        }
    });
}

// Given a list of available items, and a list of item elements currently shown, this
// function will the remove item elements no longer among the available items. 
function removeItemElements(availableItems, currentElements, onRemoved) {
    var elementsToRemove = [];
    currentElements.forEach(e => {
        if (!availableItems.filter(i => i.isVisible).some(i => i.element == e)) {
                elementsToRemove.push(e);
        }
    });
    elementsToRemove.forEach(e => removeItemElement(e, currentElements, onRemoved));
}

function addItemElement(item, posFn, elems, engine, context, onAdded) {
    let pos = posFn(item);
    let elem = new MultiLineItemElement(pos.x, pos.y, pos.w, pos.h, item.multiLineCaption, pos.color, pos.frameColor);
    Utils.addMenuTo(elem, item.caption);
    Utils.setVerbs(elem, item, context);
    elems.push(elem);
    engine.add(elem, pos.layerIndex || ELEMENTBASELAYERINDEX);
    item.element = elem;
    elem.item = item;
    elem.fadeIn(FADETIME, onAdded);
}

function removeItemElement(elem, elems, onRemoved) {
    ArrayUtils.remove(elems, elem);
    elem.item.element = undefined;
    elem.finishAfterAnimations = true;
    elem.fadeOut(FADETIME, () => {
        if (onRemoved != undefined) {
            onRemoved();
        }
    });
}
