import { BackgroundPainter } from "./backgroundpainter.js";
import { LocationPainter } from "./locationpainter.js";
import { ItemContainerPainter } from "./itemcontainerpainter.js";

export { UI };

class UI {
    constructor(canvasDiv, context) {
        this.context = context;
        this.locationPainter = {};
        this.context.onActionPerformed = this.onActionPerformed.bind(this);
        this.canvas = new ScalingCanvas(canvasDiv, 800, 450);
        this.engine = new Engine(this.canvas);
        this.elements = {};

        this.updateLocation();

        window.requestAnimationFrame(() => this.draw());
        window.context = context; // FOR DEBUGGING TODO REMOVE

        this.showMessages();
    }

    updateLocation() {
        let location = this.context.getCurrentLocation();

        this.engine.clear()
        new BackgroundPainter(this.engine, this.elements, this.context).register();
        this.locationPainter = new LocationPainter(this.engine, this.elements, this.context);
        this.locationPainter.register(location);
        
        this.inventoryPainter = new ItemContainerPainter(this.engine, this.elements, this.context);
        this.inventoryPainter.register(500, 50, 250, 200, "You are carrying:", [], "inventory");
    }

    draw() {
        window.requestAnimationFrame(() => this.draw());
        this.canvas.setDimensions(window.innerWidth, window.innerHeight);
        this.engine.draw();
    }

    onActionPerformed(verb, noun) {
        //console.log(`onAction: ${verb} - ${noun}`);
        if (verb == "move") {
            this.updateLocation();
            this.showMessages();
            return;
        }

        switch(verb) {
            case "open":
                this.locationPainter.showContainedItems(noun);
                break;
            case "close":
                this.locationPainter.hideContainedItems(noun);
                break;
            case "take":
                this.locationPainter.hideItem(noun);
                this.inventoryPainter.showItem(noun);
                break;
            case "drop":
                this.inventoryPainter.hideItem(noun);
                this.locationPainter.showItem(noun);
                break;
        }
        this.context.allItems[noun].painter.updateVerbs();
        this.showMessages();
    }

    showMessages() {
        console.log(this.context.getMessages());
    }
}