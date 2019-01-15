import { App } from "./framework/content/app.js";

import * as Items from "./game/items.js";
import * as Locations from "./game/locations.js";

// TODO (data): uncleAilbert, uncleAilbertConversation, windowedMoodSentences

window.onload = function() {
    new App(document.getElementById("gameCanvas"), "fictionSection", "Welcome to Parswick Books", Items, Locations);
}
