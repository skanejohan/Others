export { Item, OpenableItem, PickableItem, LockableItem, AccessState };

const AccessState = {
    OPEN: 1,
    CLOSED: 2,
    LOCKED: 3,
};

class Item {
    constructor(name, caption, fixed, visible) {
        this.name = name;
        this.fixed = fixed || false;
        this.caption = caption || "";
        if (visible === undefined) {
            this.isVisible = true;
        }
        else {
            this.isVisible = visible;
        }
        this.description = "There is nothing special about the " + this.caption;
        this.containedItems = [];
        this.container = undefined; // name of location, another item or undefined
        this.private = new Private(this);

        this.verbExamine.caption = "Examine";
        this.verbTake.caption = "Take";
        this.verbDrop.caption = "Drop";
    }

    containsItem(item) {
        if (typeof item == "object") {
            return this.containedItems.indexOf(item.name) > -1;
        }
        return this.containedItems.indexOf(item) > -1;
    }

    verbExamine(context) {
        this.private.do("examine", context, () => {
            context.setMessage(`(About ${this.caption}) ${this.description}`);
        });
    }

    verbExamineVisible(context) {
        return true;
    }

    verbTake(context) {
        this.private.do("take", context, () => {
            context.removeItemFromContainer(this);
            context.addItemToInventory(this);
            context.setMessage("You take the " + this.caption + ".");
        });
    }

    verbTakeVisible(context) {
        return !this.fixed && !(context.isItemInInventory(this));
    }

    verbDrop(context) {
        this.private.do("drop", context, () => {
            context.removeItemFromInventory(this);
            context.addItemToCurrentLocation(this);
            context.setMessage("You drop the " + this.caption + ".");
        });
    }

    verbDropVisible(context) {
        return !this.fixed && (context.isItemInInventory(this));
    }

    getVerbs(context) {
        return this.private.getAllPropertyNames(this).filter(name => this.isVisibleVerb(name, context));    
    }

    getActions() {
        return this.private.getAllPropertyNames(this).filter(name => name.startsWith("action"));
    }

    isVisibleVerb(name, context) {
        if (!name.startsWith("verb")) {
            return false;
        }
        if (name.endsWith("Visible")) {
            return false;
        }
        return this[name+"Visible"](context);
    }
}

class OpenableItem extends Item {
    constructor(name, caption, fixed, visible, state) {
        super(name, caption, fixed, visible);

        this.state = state;
        this.historicStates = new Set([state]);
        this.verbOpen.caption = "Open";
        this.verbClose.caption = "Close";
    }        

    verbOpen(context) {
        this.private.do("open", context, () => {
            this.state = AccessState.OPEN;
            this.historicStates.add(AccessState.OPEN);
            context.setMessage("You open the " + this.caption + ".");
        });
    }

    verbOpenVisible(context) {
        return this.state === AccessState.CLOSED;
    }

    verbClose(context) {
        this.private.do("close", context, () => {
            this.state = AccessState.CLOSED;
            this.historicStates.add(AccessState.CLOSED);
            context.setMessage("You close the " + this.caption + ".");
        });
    }

    verbCloseVisible(context) {
        return this.state === AccessState.OPEN;
    }
}

class PickableItem extends Item {
    constructor(name, caption, fixed, visible, key, state) {
        super(name, caption, fixed, visible);

        this.key = key;
        this.state = state;
        this.historicStates = new Set([state]);
        this.verbPick.caption = "Pick";
    }        

    verbPick(context) {
        this.private.do("pick", context, () => {
            this.state = AccessState.CLOSED;
            this.historicStates.add(AccessState.CLOSED);
            context.setMessage("You pick the " + this.caption + ".");
        });
    }

    verbPickVisible(context) {
        return this.state === AccessState.LOCKED && context.isItemInInventory(this.key);
    }

}

class LockableItem extends OpenableItem {
    constructor(name, caption, fixed, visible, state, key, combination) {
        super(name, caption, fixed, visible, state);

        this.key = key;
        this.combination = combination;
        this.verbLock.caption = "Lock";
        this.verbUnlock.caption = "Unlock";
        this.verbEnterCombination.caption = "Enter combination";
    }        

    verbUnlock(context) {
        this.private.do("unlock", context, () => {
            this.state = AccessState.CLOSED;
            this.historicStates.add(AccessState.CLOSED);
            context.setMessage("You unlock the " + this.caption + ".");
        });
    }

    verbUnlockVisible(context) {
        return this.state === AccessState.LOCKED && this.key !="" && context.isItemInInventory(this.key);
    }

    verbLock(context) {
        this.private.do("lock", context, () => {
            this.state = AccessState.LOCKED;
            this.historicStates.add(AccessState.LOCKED);
            context.setMessage("You lock the " + this.caption + ".");
        });
    }

    verbLockVisible(context) {
        return this.state === AccessState.CLOSED && this.key !="" && context.isItemInInventory(this.key);
    }

    verbEnterCombination(context) {
        this.private.do("enterCombination", context, () => {
            // The actual job is driven from the UI, which should eventually call applyCombination().
        });
    }

    verbEnterCombinationVisible(context) {
        return this.state === AccessState.LOCKED && this.combination && this.combination != "";
    }

    applyCombination(context, combination) {
        this.private.do("applyCombination", context, () => {
            if (combination == this.combination) {
                this.state = AccessState.CLOSED;
                this.historicStates.add(AccessState.CLOSED);
                context.setMessage("You enter the correct combination and unlock the " + this.caption + ".");
            }
            else {
                context.setMessage("You enter a combination but the " + this.caption + " remains locked.");
            }
        }, combination);
    }
}

// Private functions

class Private {
    constructor(item) {
        this.item = item;
        this.calledFunctions = [];
    }

    do(verb, context, action, extraData) {
        var handled = false;
        var beforeAction = "before" + this.capitalizeFirstLetter(verb);
        var beforeOnceAction = beforeAction + "Once";
        var afterAction = "after" + this.capitalizeFirstLetter(verb);
        var afterOnceAction = afterAction + "Once";
    
        context.state.addAction(this.item.name, verb, extraData);
    
        if (this.hasProperty(beforeAction)) {
            handled |= this.item[beforeAction](context);
        }
        if (this.hasProperty(beforeOnceAction) && !this.getHasBeenCalled(verb)) {
            handled |= this.item[beforeOnceAction](context);
        }
        
        if (!handled) {
            action();
    
            if (this.hasProperty(afterAction)) {
                this.item[afterAction](context);
            }
            if (this.hasProperty(afterOnceAction) && !this.getHasBeenCalled(verb)) {
                this.item[afterOnceAction](context);
            }
        }

        this.setHasBeenCalled(verb);

        context.visitedLocations.push(context.currentLocation);
        Object.keys(context.allCharacters).forEach(k => context.allCharacters[k].move(context));

        context.reportActionPerformed(verb, this.item.name, undefined, handled);
    }
    
    getAllPropertyNames(obj) {
        var names = [];
        do {
            names = names.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));
        return names;
    }
    
    hasProperty(prop) {
        return this.getAllPropertyNames(this.item).indexOf(prop) > -1;
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    getHasBeenCalled(fn) {
        return this.calledFunctions.indexOf(fn) > -1;
    }
    
    setHasBeenCalled(fn) {
        if (!this.getHasBeenCalled(fn)) {
            this.calledFunctions.push(fn);
        }
    }
}
