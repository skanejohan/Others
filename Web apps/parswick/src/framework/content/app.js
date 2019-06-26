import { Context } from "./context.js";
import { UI } from "../ui/ui.js";

export { App };

class App {
    constructor(canvasDiv, startLocation, startCutscene, startMessage, startGoal, items, locations, characters, cutscenes, goals) {
        this.items = items;
        this.locations = locations;
        this.characters = characters;
        this.cutscenes = cutscenes;
        this.goals = goals;
        this.startLocation = startLocation;
        this.startCutscene = startCutscene;
        this.startMessage = startMessage;
        this.startGoal = startGoal;
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
            this.characters.getAll(),
            this.cutscenes.getAll(),
            this.goals.getAll(),
            this.startLocation,
            this.startCutscene,
            this.startMessage,
            this.startGoal);
        if (suppressWelcomeMessage) {
            this.context.removeAllMessages();
            this.context.setCutscene(undefined);
        }
        this.ui = new UI(this.canvasDiv, this.context);
    }

    applyState(s) {
        this.reset(true);
        this.ui.beginBatchOperations();
        this.context.state.fromString(s);
        this.context.removeAllMessages();
        this.ui.endBatchOperations();
        this.context.setCutscene(undefined);
    }

    readState() {
        return this.context.state.toString();
    }
}

