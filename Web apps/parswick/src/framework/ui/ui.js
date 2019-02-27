import { BackgroundUI } from "./background.js";
import { LocationUI } from "./location.js";
import { ItemListUI } from "./itemlist.js";
import { MessagesUI } from "./messages.js";
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
        this.messagesUI = new MessagesUI(this.engine, 450, 400, 300);

        this.moveToCurrentLocation();

        window.requestAnimationFrame(() => this.draw());
        // ElementBase.drawClickRects = true;  // FOR DEBUGGING TODO REMOVE
    }

    clear() {
        this.engine.clear();
    }

    draw() {
        window.requestAnimationFrame(() => this.draw());
        this.canvas.setDimensions(window.innerWidth, window.innerHeight);
        this.engine.draw(window.innerWidth, window.innerHeight);
    }

    beginBatchOperations() {
        this.inBatchOperation = true;
    }

    endBatchOperations() {
        this.inBatchOperation = false;
        this.moveToCurrentLocation();
    }

    onActionPerformed(verb, noun, extraData, preventedBeforeAction) {
        if (this.inBatchOperation) {
            return;
        }

        //console.log(`${verb} - ${noun}`);
        var item = this.context.item(noun);

        if (!preventedBeforeAction) {
        
            if (verb == "move") {
                this.moveToCurrentLocation()
                return;
            }

            if (item.isDoor) {
                switch(verb) {
                    case "open":
                        item.element.open();
                        break;
                    case "close":
                        item.element.close();
                        break;
                    }
                }

            this.updateItemElements();
        }
    
        this.showMessages();
    }

    moveToCurrentLocation() {
        this.locationUI.enter(this.context.getCurrentLocation(), () => {
            this.updateItemElements();
            this.showMessages();
        });
    }

    updateItemElements() {
        let locationItems = Utils.visiblePositionedItemsHere(this.context);
        let itemsHereItems = Utils.visibleUnpositionedItemsHere(this.context);
        let inventoryItems = this.context.getItems(this.context.inventory);

        if (false) { // Debugging
            console.log("Location:  " + locationItems.map(i => i.name).join());
            console.log("Inventory: " + inventoryItems.map(i => i.name).join());
            console.log("Items:     " + itemsHereItems.map(i => i.name).join());
        }

        this.locationUI.removeElementsForNoLongerVisibleItems(locationItems);
        this.itemsHereUI.removeElementsForNoLongerVisibleItems(itemsHereItems);
        this.inventoryUI.removeElementsForNoLongerVisibleItems(inventoryItems);

        this.locationUI.addElementsForNowVisibleItems(locationItems);
        this.itemsHereUI.addElementsForNowVisibleItems(itemsHereItems);
        this.inventoryUI.addElementsForNowVisibleItems(inventoryItems);

        this.setVerbsForItems(locationItems);
        this.setVerbsForItems(itemsHereItems);
        this.setVerbsForItems(inventoryItems);
        
        let doorsAndWindows = Utils.doorsAndWindowsHere(this.context);
        this.setVerbsForItems(doorsAndWindows);
    }

    setVerbsForItems(items) {
        items.forEach(item => {
            if (item && item.element && item.element.popup) {
                Utils.setVerbs(item.element, item, this.context);
            }
        });
    }

    showMessages() {
        this.messagesUI.addMessages(this.context.getMessages());
    }
}