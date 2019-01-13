import { ItemElement } from "./elements/item.js";
import { ArrayUtils } from "../../_include/arrayutils.js";
import { Utils, ELEMENTBASELAYERINDEX } from "./utils.js";

export { addItemElements, removeItemElements };

// Given a list of available items, and a list of item elements currently shown,
// this function will the missing item elements. 
function addItemElements(availableItems, currentElements, posFn, engine, context, onAdded) {
    availableItems.forEach(i => {
        if (!currentElements.some(e => e.item == i)) {
            addItemElement(i, posFn, currentElements, engine, context, onAdded);
        }
    });
}

// Given a list of available items, and a list of item elements currently shown, this
// function will the remove item elements no longer among the available items. 
function removeItemElements(availableItems, currentElements, onRemoved) {
    currentElements.forEach(e => {
        if (!availableItems.some(i => i.element == e)) {
            removeItemElement(e, currentElements, onRemoved);
        }
    });
}

function addItemElement(item, posFn, elems, engine, context, onAdded) {
    if (LOG) console.log("Add item element for " + item.caption);
    let pos = posFn(item);
    let elem = new ItemElement(pos.x, pos.y, pos.w, pos.h, item.caption);
    Utils.addMenuTo(elem);
    Utils.setVerbs(elem, item, context);
    elems.push(elem);
    engine.add(elem, pos.layerIndex || ELEMENTBASELAYERINDEX);
    item.element = elem;
    elem.item = item;
    elem.fadeIn(FADETIME, onAdded);
}

function removeItemElement(elem, elems, onRemoved) {
    if (LOG) console.log("Remove item element for " + elem.item.caption);
    elem.item.element = undefined;
    elem.finishAfterAnimations = true;
    elem.fadeOut(FADETIME, () => {
        ArrayUtils.remove(elems, elem);
        if (onRemoved != undefined) {
            onRemoved();
        }
    });
}

const LOG = false; // For debugging