import { BackgroundUI } from "./background.js";
import { LocationUI } from "./location.js";
import { ItemListUI } from "./itemlist.js";
import { Utils } from "./utils.js";

export { UI };

class UI {
    constructor(canvasDiv, context) {
        this.context = context;
        this.context.onActionPerformed = this.onActionPerformed.bind(this);
        this.canvas = new ScalingCanvas(canvasDiv, 800, 450);
        this.engine = new Engine(this.canvas, new ScalingCanvas(new OffscreenCanvas(800, 450), 800, 450));

        this.backgroundUI = new BackgroundUI(this.engine);
        this.locationUI = new LocationUI(this.engine, this.context);
        this.inventoryUI = new ItemListUI(this.engine, this.context, 500, 50, 250, 165, "You are carrying:");
        this.itemsHereUI = new ItemListUI(this.engine, this.context, 500, 235, 250, 165, "You also see:");

        this.updateLocation();

        window.requestAnimationFrame(() => this.draw());
        window.context = context; // FOR DEBUGGING TODO REMOVE

        this.showMessages();
    }

    updateLocation(direction) {
        let location = this.context.getCurrentLocation();
        this.itemsHereUI.clear();
        this.locationUI.enter(location, direction, () => {
            for (var item of this.context.getItems(location.containedItems)) {
                let position = location.itemPositions[item.name];
                if (item.isVisible && !position && !item.isDoor && !item.isWindow) { 
                    this.itemsHereUI.addItem(item);
                }
            }
        });
    }

    draw() {
        window.requestAnimationFrame(() => this.draw());
        this.canvas.setDimensions(window.innerWidth, window.innerHeight);
        this.engine.draw(window.innerWidth, window.innerHeight);
    }

    onActionPerformed(verb, noun, extraData, preventedBeforeAction) {
        var item = this.context.item(noun);
        var itemPosition = this.context.getCurrentLocation().itemPositions[noun];

        if (!preventedBeforeAction) {
            if (verb == "move") {
                this.updateLocation(extraData);
                this.showMessages();
                return;
            }

            switch(verb) {
                case "open":
                    if(item.isDoor) {
                        this.locationUI.openDoor(item);
                    }
                    else {
                        this.locationUI.addItems(this.context.getItems(item.containedItems));
                    }
                    break;
                case "close":
                    if(item.isDoor) {
                        this.locationUI.closeDoor(item);
                    }
                    else {
                        this.locationUI.removeItems(this.context.getItems(item.containedItems));
                    }
                    break;
                case "take":
                    if (itemPosition) {
                        this.locationUI.removeItem(item.element);
                    }
                    else {
                        this.itemsHereUI.removeItem(item.element);
                    }
                    this.inventoryUI.addItem(item);
                    break;
                case "drop":
                    this.inventoryUI.removeItem(item.element);
                    if (itemPosition) {
                        this.locationUI.addItem(item, itemPosition);
                    }
                    else {
                        this.itemsHereUI.addItem(item);
                    }
                    break;
            }
            if (!item.isDoor && !item.isWindow) {
                Utils.setVerbs(item.element, item, this.context);
            }
        }
        this.showMessages();
    }

    showMessages() {
        console.log(this.context.getMessages());
    }
}