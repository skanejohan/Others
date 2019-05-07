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

    hasItem(item) {
        if (typeof item == "object") {
            return this.containedItems.indexOf(item.name) > -1;
        }
        return this.containedItems.indexOf(item) > -1;
    }

    hasCharacter(char) {
        if (typeof char == "object") {
            return this.containedCharacters.indexOf(char.name) > -1;
        }
        return this.containedCharacters.indexOf(char) > -1;
    }

    canEnterFrom(location, context) {
        return true;
    }
}
