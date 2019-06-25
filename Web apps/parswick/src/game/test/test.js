uiTest = function() {
    var test = new Test(window.app);
    
    // Get into the office
    test.addCloseCutscene();
    test.addClickArrow("S");
    test.addClickElementMenu("cupboard", "Open");
    test.addClickElementMenu("cup", "Take");
    test.addClickElementMenu("officeDoorKey", "Take");
    test.addClickArrow("N");
    test.addClickArrow("E");
    test.addClickArrow("S");
    test.addClickElementMenu("officeDoor", "Unlock");
    test.addClickElementMenu("officeDoor", "Open");
    test.addClickArrow("officeDoor");

    // Find the hidden secret
    test.addClickElementMenu("safe", "Enter combination");
    test.addClickCombinationLockButton("1");
    test.addClickCombinationLockButton("9");
    test.addClickCombinationLockButton("7");
    test.addClickCombinationLockButton("9");
    test.addClickElementMenu("safe", "Open");
    test.addClickElementMenu("houseHistoryBook", "Take");
    test.addClickArrow("N");
    test.addClickArrow("N");
    test.addClickArrow("W");
    test.addClickArrow("W");
    test.addClickElementMenu("languageShelf", "Examine");
    test.addClickElementMenu("latinDictionary", "Take");
    test.addClickElementMenu("houseHistoryBook", "Examine");

    // Reveal the secret door
    test.addClickArrow("E");
    test.addClickArrow("E");
    test.addClickArrow("S");
    test.addClickElementMenu("historyBookshelf", "Examine");
    test.addClickElementMenu("historyBookshelf", "Empty");
    test.addClickElementMenu("historyBookshelf", "Pull");
    test.addClickArrow("officeDoor");
    test.addClickElementMenu("desk", "Examine");
    test.addClickElementMenu("drawer", "Open");
    test.addClickElementMenu("paperClip", "Take");
    test.addClickElementMenu("cabinet", "Open");
    test.addClickElementMenu("metalBox", "Take");
    test.addClickElementMenu("metalBox", "Pick");
    test.addClickElementMenu("rockPick", "Take");
    test.addClickElementMenu("metalBox", "Drop");
    test.addClickArrow("N");
    test.addClickElementMenu("wall", "Examine");
    test.addClickElementMenu("wall", "Hit");

    // Hide the truth from uncle Ailbert
    test.addClickElementMenu("uncleAilbert", "Talk");
    test.addClickConversationResponse("2");
    test.addClickConversationResponse("5");
    test.addClickConversationResponse("11");
    test.addClickConversationResponse("17");
    test.addClickArrow("S");
    test.addClickElementMenu("waterCooker", "Examine");
    test.addClickElementMenu("waterCooker", "Make tea");

    // Reveal the secret door - again
    test.addClickArrow("N");
    test.addClickArrow("E");
    test.addClickArrow("S");
    test.addClickElementMenu("wall", "Hit");

    // Meet the ghosts
    test.addClickArrow("E");
    test.addClickArrow("N");
    test.addClickArrow("W");
    test.addClickArrow("S");
    test.addClickElementMenu("broomCupboard", "Open");
    test.addClickElementMenu("flashlight", "Take");
    test.addClickArrow("N");
    test.addClickArrow("E");
    test.addClickArrow("S");
    test.addClickArrow("E");

    // Learn to dance
    test.addCloseCutscene();
    test.addClickArrow("S");
    test.addClickElementMenu("maleGhost", "Talk");
    test.addClickConversationResponse("2");
    test.addClickConversationResponse("5");
    test.addClickArrow("N");
    test.addClickArrow("W");
    test.addClickElementMenu("historyBookshelf", "Examine");
    test.addClickElementMenu("danceBook", "Take");
    test.addClickElementMenu("danceBook", "Read");
    test.addClickArrow("E");
    test.addClickArrow("S");
    test.addClickElementMenu("maleGhost", "Talk");
    test.addClickConversationResponse("2");
    test.addClickConversationResponse("5");
    test.addClickArrow("N");
    test.addClickArrow("W");
    test.addClickArrow("N");
    test.addClickArrow("W");

    test.runActions();
}

test = function() {
    var getIntoOffice = 
        "move-kitchen,open-cupboard,take-cup,take-officeDoorKey,move-fictionSection,move-artSection," + 
        "move-historySection,unlock-officeDoor,open-officeDoor,move-office";

    var findHiddenSecret =
        "enterCombination-safe,applyCombination-safe-1979,open-safe,take-houseHistoryBook,move-historySection,move-artSection," + 
        "move-fictionSection,move-travelSection,examine-languageShelf,take-latinDictionary,examine-houseHistoryBook";
    
    var revealTheSecretDoor = 
        "move-fictionSection,move-artSection,move-historySection,examine-historyBookshelf,empty-historyBookshelf," + 
        "pull-historyBookshelf,move-office,examine-desk,open-drawer,take-paperClip,open-cabinet,take-metalBox,pick-metalBox," + 
        "take-rockPick,drop-metalBox,move-historySection,examine-wall,hit-wall"; 

    var hideTheTruthFromUncleAilbert = 
        "talk-uncleAilbert,addMakeTeaVerbToWaterCooker-uncleAilbert,move-kitchen,examine-waterCooker,makeTea-waterCooker";

    var revealTheSecretDoorAgain = 
        "move-fictionSection,move-artSection,move-historySection,hit-wall";

    var meetTheGhosts =
        "move-cellarEntrance,move-artSection,move-fictionSection,move-kitchen,open-broomCupboard,take-flashlight," +
        "move-fictionSection,move-artSection,move-historySection,move-cellarEntrance";

    var learnToDance = "move-cellarSouth,talk-maleGhost,firstDance-maleGhost,move-cellarEntrance,move-historySection," + 
        "examine-historyBookshelf,take-danceBook,move-cellarEntrance,move-cellarSouth,talk-maleGhost,secondDance-maleGhost," +
        "move-cellarEntrance,move-historySection,move-artSection,move-fictionSection";

    window.app.applyState([
        getIntoOffice, 
        findHiddenSecret, 
        revealTheSecretDoor,
        hideTheTruthFromUncleAilbert,
        revealTheSecretDoorAgain,
        meetTheGhosts,
        learnToDance,
    ].join());
}

class Test {
    constructor(app) {
        this.app = app;
        this.actions = [];
    }

    saveAndModifyEnvironment() {
        this.app.ui.messagesUI.maxMessageLength = 1;
        this.oldMessageTimeMs = this.app.ui.messagesUI._messageTimeMs;
        this.app.ui.messagesUI._messageTimeMs = () => 200;
        this.oldGetMousePos = ElementBase.getMousePos;
    }

    restoreEnvironment() {
        ElementBase.getMousePos = this.oldGetMousePos;
        this.app.ui.messagesUI._messageTimeMs = this.oldMessageTimeMs;
        this.app.ui.messagesUI.maxMessageLength = 3;
    }

    addCloseCutscene() {
        this.actions.push(() => {
            this.highlight(this.app.ui.cutsceneUI.btn);
            return 1000;
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 500;
        })
    }

    addClickArrow(arrowName) {
        this.actions.push(() => {
            this.highlight(this.findArrow(arrowName));
            return 100; 
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 500;
        })
    }

    addClickElementMenu(itemName, menuCaption) {
        this.actions.push(() => {
            this.highlight(this.findElement(itemName));
            return 500; 
        });
        this.actions.push(() => {
            var item = this.findElement(itemName);
            if (item && item.popup && item.popup.elements) {
                this.highlight(this.findMenuElement(menuCaption, item.popup.elements));
            }
            return 500; 
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 1000;
        })
    }

    addClickCombinationLockButton(digit) {
        this.actions.push(() => {
            var b = this.findCombinationLockButton(digit);
            this.highlight(b);
            return 200; 
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 200;
        })
    }

    addClickConversationResponse(id) {
        this.actions.push(() => {
            var b = this.findConversationResponse(id);
            this.highlight(b);
            return 500; 
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 500;
        })
    }

    runActions(skipSaveEnvironment) {
        if (!skipSaveEnvironment) {
            this.saveAndModifyEnvironment();
        }
        var action = this.actions.shift();
        if (action) {
            var timeOut = action();
            setTimeout(() => this.runActions(true), timeOut);
        }
        else {
            this.restoreEnvironment();
        }
    }

    click() {
        this.app.ui.canvas._onclick();
    }

    findElement(itemName) {
        var element = this.app.ui.locationUI.itemElements.find(i => i.item.name == itemName);
        if (!element) {
            element = this.app.ui.locationUI.doorElements[itemName];
        }
        if (!element) {
            element = this.app.ui.inventoryUI.itemElements.find(e => e.item.name == itemName);
        }
        if (!element) {
            element = this.app.ui.itemsHereUI.itemElements.find(e => e.item.name == itemName);
        }
        return element;
    }

    findMenuElement(menuCaption, menuElements) {
        for (var i = 0; i < menuElements.length; i++) {
            var e = menuElements[i];
            if (e.elements && e.elements.length > 0 && e.elements[0].text == menuCaption) {
                return e;
            }
        }
    }

    findCombinationLockButton(digit) {
        return this.app.ui.combinationLockUI.lockElements.find(e => {
            var te = e._textElement;
            if (!te) {
                return false;
            }
            return te.elements[0].text == digit;
        });
    }

    findConversationResponse(id) {
        var result = this.app.ui.conversationUI.statementAndResponses.find(r => r.responseId == id);
        return result.elements[1].elements[0]; // Return the first text segment of the first text element, for click.
    }

    findArrow(arrowName) {
        var arrow = this.app.ui.locationUI.arrowElements[arrowName];
        if (!arrow) {
            arrow = this.app.ui.locationUI.doorElements[arrowName].arrowElement;
        }
        return arrow;
    }

    highlight(element) {
        if (element) {
            this.moveTo(element.x + element.w / 2, element.y + element.h / 2);
        }   
    }

    moveTo(x, y) {
        ElementBase.getMousePos = () => { return { x : x, y : y } };
    }
}
