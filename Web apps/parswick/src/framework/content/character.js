import { Item } from "./item.js";

export { Character };

class Character extends Item {
    constructor(name, caption, visible) {
        super(name, caption, true, visible);
        this.description = "There is nothing special about " + this.caption;
    }
}
