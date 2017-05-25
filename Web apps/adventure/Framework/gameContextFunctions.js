// ---------- Actions

function take(item, gc) {
    var handled = item.beforeTake == null ? false : item.beforeTake(gc);
    if (!handled) {
        removeFromItems(item, gc.currentLocation.items);
        removeFromItems(item, gc.inventory); // If it is contained in a carried object
        addToItems(item, gc.inventory);
        replaceVerb(item, "take", "drop");
        gc.result = "You take the " + item.caption;
        if (item.afterTake != null) {
            item.afterTake(gc);
        }
    }
}

function drop(item, gc) {
    var handled = item.beforeDrop == null ? false : item.beforeDrop(gc);
    if (!handled) {
        removeFromItems(item, gc.inventory)
        addToItems(item, gc.currentLocation.items)
        replaceVerb(item, "drop", "take");
        gc.result = "You drop the " + item.caption;
        if (item.afterDrop != null) {
            item.afterDrop(gc);
        }
    }
}

function examine(item, gc) {
    gc.result = item.examine == null ? item.description : item.examine(gc);
}

function _open(item, gc) {
    var handled = item.beforeOpen == null ? false : item.beforeOpen(gc);
    if (!handled) {
        replaceVerb(item, "open", "close");
        gc.result = "You open the " + item.caption;
        if (item.afterOpen != null) {
            item.afterOpen(gc);
        }
    }
}

function _close(item, gc) {
    var handled = item.beforeClose == null ? false : item.beforeClose(gc);
    if (!handled) {
        replaceVerb(item, "close", "open");
        gc.result = "You close the " + item.caption;
        if (item.afterClose != null) {
            item.afterClose(gc);
        }
    }
}

function lock(item, gc) {
    var handled = item.beforeLock == null ? false : item.beforeLock(gc);
    if (!handled) {
        replaceVerb(item, "lock", "unlock");
        gc.result = "You lock the " + item.caption;
        if (item.afterLock != null) {
            item.afterLock(gc);
        }
    }
}

function unlock(item, gc) {
    var handled = item.beforeUnlock == null ? false : item.beforeUnlock(gc);
    if (!handled) {
        replaceVerb(item, "unlock", "lock");
        gc.result = "You unlock the " + item.caption;
        if (item.afterUnlock != null) {
            item.afterUnlock(gc);
        }
    }
}

function pick(item, gc) {
    var handled = item.beforePick == null ? false : item.beforePick(gc);
    if (!handled) {
        removeVerb(item, "pick");
        gc.result = "You pick the " + item.caption;
        if (item.afterPick != null) {
            item.afterPick(gc);
        }
    }
}

function enterCombination(item, gc, code) {
    item.enterCombination(gc, code);
}

function empty(item, gc) {
    item.empty(gc);
}

function pull(item, gc) {
    item.pull(gc);
}

function hit(item, gc) {
    item.hit(gc);
}

function talk(npc, gc) {

}

function moveTo(location, gc) {
    gc.currentLocation = location; 
    gc.result = "You move to the " + gc.currentLocation.caption;
}

function look(gc) {
    return gc.currentLocation.look == null ? gc.currentLocation.description : gc.currentLocation.look(gc);
}

// ---------- Helper functions

function isHere(gc, item) {
    return gc.currentLocation.items.indexOf(item) > -1;
}

function isCarried(gc, item) {
    return gc.inventory.indexOf(item) > -1;
}

function getVerbs(gc, item) {
    return item.getVerbs == null ? item.verbs : item.getVerbs(gc);
}

function getExits(gc, loc) {
    return loc.getExits == null ? loc.exits : loc.getExits(gc);
}