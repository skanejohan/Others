import { Context } from "./context.js";
import { UI } from "../ui/ui.js";

export { App };

class App {
    constructor(canvasDiv, title, startLocation, startCutscene, startMessage, startGoal, items, locations, characters, cutscenes, goals) {
        this.title = title;
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
    }

    reset(suppressWelcomeMessage) {
        if (this.ui) {
            this.ui.clear();
        }
        
        this.context = new Context(
            this.title,
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
            this.context.setCutscenes(undefined);
            this.context.getTitle(); // to clear it
        }
        this.ui = new UI(this);
    }

    applyState(s) {
        this.reset(true);
        this.ui.beginBatchOperations();
        this.context.state.fromString(s);
        this.context.removeAllMessages();
        this.ui.endBatchOperations();
        this.context.setCutscenes(undefined);
    }

    readState() {
        return this.context.state.toString();
    }

    saveState(slot) {
        localStorage.setItem(this._fullName(slot), this.readState());
    }

    loadState(slot) {
        this.applyState(localStorage.getItem(this._fullName(slot)));
    }

    clearState(slot) {
        localStorage.removeItem(this._fullName(slot));
    }

    hasState(slot) {
        var state = localStorage.getItem(this._fullName(slot));
        return state != null && state != "";
    }

    _fullName = slotName => "parswick_books_" + slotName;
}

