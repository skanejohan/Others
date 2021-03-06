import { App } from "./framework/content/app.js";

import * as Items from "./game/items.js";
import * as Locations from "./game/locations.js";
import * as Characters from "./game/characters.js";
import * as Cutscenes from "./game/cutscenes.js";
import * as Goals from "./game/goals.js";
import { Game } from "./game/game.js";

window.onload = function() {
    window.app = new App(document.getElementById("gameCanvas"), 
        Game.title, Game.startLocation, Game.startCutscene, Game.startMessage, Game.startGoal, Items, Locations,
        Characters, Cutscenes, Goals);
}

