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
}
