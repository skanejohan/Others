import { App } from "./framework/content/app.js";

import * as Items from "./game/items.js";
import * as Locations from "./game/locations.js";

// TODO (data): uncleAilbert, uncleAilbertConversation, windowedMoodSentences
// TODO (data): "fictionSection", "Welcome to Parswick Books"

window.onload = function() {
    window.app = new App(document.getElementById("gameCanvas"), "fictionSection", "Welcome to Parswick Books", Items, Locations);
}

