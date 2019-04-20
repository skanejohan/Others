export { getAll };

import { Character } from "../framework/content/character.js";

var getAll = function() {
    return {
        "uncleAilbert": new UncleAilbert(),
    }
}

class UncleAilbert extends Character{
    constructor() {
        super("uncleAilbert", "uncle Ailbert", false);
    }
}
