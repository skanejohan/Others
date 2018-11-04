export { Location };

class Location {
    constructor(caption) {
        this.caption = caption;
        this.description = "You are in " + this.caption;
        this.exits = {}
        this.containedItems = [];
        this.itemPositions = {};
        this.doorPositions = {};
        this.windowPositions = {};
    }

    look(context) {
        context.setMessage(this.description);
    }

    // Return all items in this location. The items that have drawing 
    // positions will have these attached in their position property.
    getAllItems(context) {
        return this.containedItems.map(name => this._getItem(context, name));
    }

    // Return all items (not windows or doors) that have drawing positions,
    // in this location. The items' drawing positions will be attached in 
    // their position property.
    getPositionedItems(context) {
        return this.getAllItems(context)
            .filter(this._isPositionedItem.bind(this))
            .map(name => this._getItem(context, name));
    }

    // Return all windows that have drawing positions, in this location. 
    // The items' drawing positions will be attached in their position 
    // property.
    getPositionedWindows(context) {
        return this.containedItems
            .filter(this._isPositionedWindow.bind(this))
            .map(name => this._getItem(context, name));
    }

    // Return all doors that have drawing positions, in this location. 
    // The items' drawing positions will be attached in their position 
    // property.
    getPositionedDoors(context) {
        return this.containedItems
            .filter(this._isPositionedDoor.bind(this))
            .map(name => this._getItem(context, name));
    }

    // Return all items that have no drawing positions.
    getUnpositionedItems() {
        return this.containedItems
            .filter(this._isNotPositionedItem.bind(this))
            .filter(this._isNotPositionedWindow.bind(this))
            .filter(this._isNotPositionedDoor.bind(this))
            .map(name => this._getItem(context, name));

    }

    _isPositionedItem(name) {
        return name in this.itemPositions;
    }

    _isNotPositionedItem(name) {
        return !this._isPositionedItem(name);
    }

    _isPositionedWindow(name) {
        return name in this.windowPositions;
    }

    _isNotPositionedWindow(name) {
        return !this._isPositionedWindow(name);
    }

    _isPositionedDoor(name) {
        return name in this.doorPositions;
    }

    _isNotPositionedDoor(name) {
        return !this._isPositionedDoor(name);
    }

    _getItem(context, name) {
        var item = context.allItems[name];
        if (item && this.itemPositions[name]) {
            item.position = this.itemPositions[name];
        } 
        return item;
    }

}
