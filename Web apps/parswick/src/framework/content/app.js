import { Context } from "./context.js";
import { UI } from "../ui/ui.js";

export { App };

class App {
    constructor(canvasDiv, startLocation, startMessage, items, locations) {
        this.items = items;
        this.locations = locations;
        this.startLocation = startLocation;
        this.startMessage = startMessage;
        this.canvasDiv = canvasDiv;
        this.reset();

        window.theseusApp = this; // FOR DEBUGGING TODO REMOVE
    }

    reset(suppressWelcomeMessage) {
        if (this.ui) {
            this.ui.clear();
        }
        
        this.context = new Context(
            this.items.getAll(), 
            this.locations.getAll(), 
            undefined,  // TODO characters
            this.startLocation,
            this.startMessage);
        if (suppressWelcomeMessage) {
            this.context.removeAllMessages();
        }
        this.ui = new UI(this.canvasDiv, this.context);
    }

    applyState(s) {
        this.reset(true);
        this.ui.beginBatchOperations();
        this.context.state.fromString(s);
        this.context.removeAllMessages();
        this.ui.endBatchOperations();
    }

    readState() {
        return this.context.state.toString();
    }
}

