import { App } from "./framework/content/app.js";

import * as Items from "./game/items.js";
import * as Locations from "./game/locations.js";
import * as Characters from "./game/characters.js";
import { Game } from "./game/game.js";

// TODO (data): uncleAilbert, uncleAilbertConversation, windowedMoodSentences

window.onload = function() {
    window.app = new App(document.getElementById("gameCanvas"), 
        Game.startLocation, Game.startMessage, Items, Locations,
        Characters);
}

