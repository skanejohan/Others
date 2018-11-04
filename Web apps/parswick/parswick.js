import { Context } from "./framework/content/context.js";
import { UI } from "./framework/ui/ui.js";

import * as Items from "./game/items.js";
import * as Locations from "./game/locations.js";

export { App };

window.onload = function() {
    var app = new App(
        document.getElementById("gameCanvas"),
        "fictionSection", 
        "Welcome to Parswick Books");
}

class App {
    constructor(canvasDiv, startLocation, startMessage) {
        this.startLocation = startLocation;
        this.startMessage = startMessage;
        this.canvasDiv = canvasDiv;
        this.reset();
    }

    reset() {
        // TODO (data): uncleAilbert, uncleAilbertConversation, windowedMoodSentences
        this.context = new Context(
            Items.getAll(), 
            Locations.getAll(), 
            undefined,  // TODO characters
            this.startLocation,
            this.startMessage);
        this.ui = new UI(this.canvasDiv, this.context);
    }
}
