import { BackgroundUI } from "./background.js";
import { LocationUI } from "./location.js";
import { ItemListUI } from "./itemlist.js";
import { MessagesUI } from "./messages.js";
import { CombinationLockUI } from "./combinationLock.js";
import { ConversationUI } from "./conversation.js";
import { Utils } from "./utils.js";
import { CutsceneUI } from "./cutscene.js";
import { TitleUI } from "./title.js";

export { UI };

class UI {
    constructor(app) {
        this.app = app;
        this.context = app.context;
        this.context.onActionPerformed = this.onActionPerformed.bind(this);
        this.canvas = new ScalingCanvas(app.canvasDiv, 800, 450);
        this.engine = new Engine(this.canvas, new ScalingCanvas(new OffscreenCanvas(800, 450), 800, 450));

        this.backgroundUI = new BackgroundUI(this.engine);
        this.locationUI = new LocationUI(this.engine, this.context, () => this.showMessages());
        this.inventoryUI = new ItemListUI(this.engine, this.context, 500, 50, 250, 165, "You are carrying:");
        this.itemsHereUI = new ItemListUI(this.engine, this.context, 500, 235, 250, 165, "You also see:");
        this.messagesUI = new MessagesUI(this.engine, 450, 400, 300);
        this.combinationLockUI = new CombinationLockUI(this.engine, 130, 30, 540, 390, 30, "black", LAYER1COLOR);
        this.conversationUI = new ConversationUI(this.engine, this.context, 130, 30, 540, 390, 30, "black", LAYER1COLOR);
        this.cutsceneUI = new CutsceneUI(this.engine, this.context, 130, 30, 540, 390, 30, "black", LAYER1COLOR, 
            () => {
                this.messagesUI.activate();
                this.locationUI.resume();
        });
        this.titleUI = new TitleUI(this.engine, this.context, 50, 25, 700, 400, 30, "black", LAYER1COLOR, 
            continuingGame => {
                if (!continuingGame) {
                    this.context.setCutscene(this.context.initialCutscene);
                }
                this.messagesUI.activate();
                this.locationUI.resume();
                if (continuingGame) {
                    app.loadState(SAVESLOT); 
                }
                else {
                    this.showCutscene();
                }
        });
        
        this.moveToCurrentLocation();

        window.requestAnimationFrame(() => this.draw());
        // ElementBase.drawClickRects = true;  // FOR DEBUGGING TODO REMOVE
        // ElementBase.drawMousePos = true;  // FOR DEBUGGING TODO REMOVE
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
        this.locationUI.updateExits();
    }

    onActionPerformed(verb, noun, extraData, preventedBeforeAction) {
        if (this.inBatchOperation) {
            return;
        }

        var item = this.context.item(noun) || this.context.character(noun);

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

            if (verb == "enterCombination") {
                this.combinationLockUI.askForCombination(item.combination, combination => {
                    item.applyCombination(this.context, combination);
                });
            }

            if (verb == "talk") {
                this.conversationUI.startConversation(item.conversation);
            }

        }
        
        this.updateItemElements();
        this.locationUI.updateExits();
        this.showTitle();
        this.showCutscene();
        this.showMessages();
        window.app.saveState(SAVESLOT);
    }

    moveToCurrentLocation() {
        this.locationUI.enter(this.context.getCurrentLocation(), () => {
            this.updateItemElements();
            this.showTitle();
            this.showCutscene();
            this.showMessages();
            if (window.app) {
                window.app.saveState(SAVESLOT);
            }
        });
    }

    updateItemElements() {
        let locationItems = Utils.visiblePositionedItemsAndCharactersHere(this.context);
        let itemsHereItems = Utils.visibleUnpositionedItemsAndCharactersHere(this.context);
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
        this.itemsHereUI.updateVisibleElementList();
        this.inventoryUI.addElementsForNowVisibleItems(inventoryItems);
        this.inventoryUI.updateVisibleElementList();

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

    showTitle() {
        var t = this.context.getTitle();
        if (t != undefined) {
            this.locationUI.pause();
            this.titleUI.display(t, this.app);
            this.messagesUI.deactivate();
        }
    }

    showCutscene() {
        var cs = this.context.getCutscene();
        if (cs != undefined) {
            this.locationUI.pause();
            this.cutsceneUI.display(cs);
            this.messagesUI.deactivate();
        }
    }

    showMessages() {
        this.messagesUI.addMessages(this.context.getMessages());
    }
}