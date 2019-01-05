import { State } from "./state.js";
import { ArrayUtils } from "../../_include/arrayutils.js";
import { AccessState } from "./item.js";

export { Context };

class Context {
    constructor(items, locations, characters, initialLocation, initialMessage, onActionPerformed) {
        this.allItems = items;                        // Dictionary string -> Item
        this.allLocations = locations;                // Dictionary string -> Location
        this.allCharacters = characters;              // Dictionary string -> Character
        this.inventory = [];                          // Array of string
        this.historicInventory = new Set([]);         // Set of string
        this.flags = new Set([]);                     // Set of Flag
        this.messages = [initialMessage];             // Array of string
        this.currentLocation = initialLocation;       // string
        this.onActionPerformed = onActionPerformed;   // (string, string) => undefined
        this.state = new State();                     // State  

        // Set the container property of all items (either to a location or another item)
        Object.keys(this.allLocations).forEach(name => {
            this.allLocations[name].containedItems.forEach(i => this.allItems[i].container = name);
        });
        Object.keys(this.allItems).forEach(name => {
            this.allItems[name].containedItems.forEach(i => this.allItems[i].container = name);
        });
    }

    // ---------- Returns an item regardless of whether you pass in the item itself or its key string

    item(i) {
        if (typeof i === "object") {
            return i;
        }
        return this.allItems[i];
    }
    
    // ---------- Given a list of items, return a list of all items including contained ones for open containers.

    getItems(items) {
        var is = [];
        for (var item of items) {
            var item = this.item(item);
            if (item) {
                is.push(item);
                if (item.state === AccessState.OPEN) {
                    is = is.concat(this.getItems(item.containedItems));
                }
            }
        }
        return is;
    }

    // ---------- Moving items around

    isItemInInventory(item) {
        item = this.item(item);
        return this.inventory.indexOf(item.name) > -1;
    }

    addItemToInventory(item) {
        item = this.item(item);
        this.inventory.push(item.name);
        this.historicInventory.add(item.name);
    }

    removeItemFromInventory(item) {
        item = this.item(item);
        ArrayUtils.remove(this.inventory, item.name);
    }

    addItemToCurrentLocation(item) {
        item = this.item(item);
        this.allLocations[this.currentLocation].containedItems.push(item.name);
    }

    removeItemFromContainer(item) {
        item = this.item(item);
        var container = this.allItems[item.container] || this.allLocations[item.container];
        if (container) {
            ArrayUtils.remove(container.containedItems, item.name);
        }
    }

    // ---------- Locations

    location(loc) {
        if (typeof loc == "object") {
            return loc;
        }
        return this.allLocations[loc];
    }

    moveTo(location, direction) {
        this.currentLocation = location;
        this.setMessage("You move to the " + this.allLocations[this.currentLocation].caption);
        this.reportActionPerformed("move", location, direction);
    }

    getCurrentLocation() {
        return this.location(this.currentLocation);
    }

    // ---------- Messages

    setMessage(m) {
        this.messages.push(m);
    }

    getMessages() {
        var result = this.messages;
        this.messages = [];
        return result;
    }

    // ---------- Generated when an action has been performed

    reportActionPerformed(verb, noun, extraData, preventedBeforeAction) {
        if (this.onActionPerformed !== undefined) {
            this.onActionPerformed(verb, noun, extraData, preventedBeforeAction);
        }
    }
}
