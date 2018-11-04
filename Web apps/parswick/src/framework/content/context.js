import { State } from "./state.js";

export { Context };

class Context {
    constructor(items, locations, characters, initialLocation, initialMessage, onActionPerformed) {
        this.allItems = items;                 // Dictionary string -> Item
        this.allLocations = locations;         // Dictionary string -> Location
        this.allCharacters = characters;       // Dictionary string -> Character
        this.inventory = [];                    // Array of string
        this.historicInventory = new Set([]);   // Set of string
        this.flags = new Set([]);               // Set of Flag
        this.messages = [initialMessage];
        this.currentLocation = initialLocation;
        this.onActionPerformed = onActionPerformed;
        this.state = new State();

        // Set the container property of all items
        Object.keys(this.allLocations).forEach(name => {
            this.allLocations[name].containedItems.forEach(i => this.allItems[i].container = name);
        });
        Object.keys(this.allItems).forEach(name => {
            this.allItems[name].containedItems.forEach(i => this.allItems[i].container = name);
        });
    }

    // ---------- Relationship between items - the containedItems and container properties

    findContainer(containerName) {
        var container = this.allItems[containerName];
        if (!container) {
            container = this.allLocations[containerName];
        }
        return container;
    }
    
    removeItemFromContainer(item) {
        var container = this.findContainer(item.container);
        if (container) {
            ArrayUtils.remove(container.containedItems, item.name);
        }
    }

    // ---------- Inventory management

    isItemInInventory(item) {
        return this.inventory.indexOf(item.name) > -1;
    }

    addItemToInventory(item) {
        //this.removeFromInventory(item); // In case we pick up an item that was in another carried item
        this.inventory.push(item.name);
        this.historicInventory.add(item.name);
    }

    removeItemFromInventory(item) {
        ArrayUtils.remove(this.inventory, item.name);
    }

    addItemToCurrentLocation(item) {
        this.allLocations[this.currentLocation].containedItems.push(item.name);
    }




    // Items

    // setContainers() {
    //     var locationNames = Object.keys(this.allLocations);
    //     locationNames.forEach(name => {
    //         this.allLocations[name].containedItems.forEach(i => this.allItems[i].container = name);
    //     });
    //     var itemNames = Object.keys(this.allItems);
    //     itemNames.forEach(name => {
    //         this.allItems[name].containedItems.forEach(i => this.allItems[i].container = name);
    //     });
    // }

    getItem(name, itemPositions) {
        var item = this.allItems[name];
        if (item && itemPositions && itemPositions[name]) {
            item.position = itemPositions[name];
        } 
        return item;
    }

    /* Given a list of item names, return a list<Item> of all items, including contained ones 
       for open containers. Items that have an entry in the positions list will have these 
       values appended as property "position". */
    getAllItems(names, positions) {
        var items = [];
        for (var name of names) {
            var item = this.getItem(name, positions);
            if (item) {
                items.push(item);
                var containedOpenItems = item.containedItems.filter(i => this.getItem(i).isOpen); 
                items = items.concat(this.getAllItems(containedOpenItems, positions));
            }
        }
        return items;
    }




    moveTo(location) {
        this.currentLocation = location;
        this.setMessage("You move to the " + this.allLocations[this.currentLocation].caption);
        this.reportActionPerformed("move", location);
    }

    getCurrentLocation() {
        return this.allLocations[this.currentLocation];
    }


    removeFromCurrentLocation(item) {
        let items = this.allLocations[this.currentLocation].containedItems;
        var idx = items.indexOf(item);
        if (idx > -1) {
            items.splice(idx, 1);
        }
    }

    setMessage(m) {
        this.messages.push(m);
    }

    getMessages() {
        var result = this.messages;
        this.messages = [];
        return result;
    }

    reportActionPerformed(verb, noun) {
        if (this.onActionPerformed !== undefined) {
            this.onActionPerformed(verb, noun);
        }
    }
}

// TODO MOVE
class ArrayUtils {
    static remove(array, item) {
        var idx = array.indexOf(item);
        if (idx > -1) {
            array.splice(idx, 1);
        }
    }
}
