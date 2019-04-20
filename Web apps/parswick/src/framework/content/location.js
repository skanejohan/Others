export { Location };

class Location {
    constructor(caption) {
        this.caption = caption;
        this.description = "You are in " + this.caption;
        this.exits = {}
        this.containedItems = [];
        this.containedCharacters = [];
        this.positions = {};
    }

    look(context) {
        context.setMessage(this.description);
    }
}
