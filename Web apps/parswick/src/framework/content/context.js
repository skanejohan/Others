import { State } from "./state.js";
import { ArrayUtils } from "../../_include/arrayutils.js";
import { AccessState } from "./item.js";

export { Context };

class Context {
    constructor(title, items, locations, characters, cutscenes, goals, 
            initialLocation, initialCutscene, initialMessage, initialGoal, 
            onActionPerformed) {
        this.title = title;                           // Title object
        this.allItems = items;                        // Dictionary string -> Item
        this.allLocations = locations;                // Dictionary string -> Location
        this.allCharacters = characters;              // Dictionary string -> Character
        this.allCutscenes = cutscenes;                // Dictionary string -> string
        this.allGoals = goals;                        // Dictionary string -> string
        this.inventory = [];                          // Array of string
        this.historicInventory = new Set([]);         // Set of string
        this.historicGoals = new Set([]);             // Set of string
        this.flags = new Set([]);                     // Set of Flag
        this.messages = [initialMessage];             // Array of string
        this.currentLocation = initialLocation;       // string
        this.initialCutscene = initialCutscene;       // string
        this.visitedLocations = [initialLocation];    // Array of string
        this.onActionPerformed = onActionPerformed;   // (string, string) => undefined
        this.state = new State(this);                 // State  
        this.locationCurrentMoodSentence = {}         // Dictionary string -> int
        if (initialGoal == "") {
            this.goal = "";
        }
        else {
            this.setGoal(initialGoal)
        }
        this.goal = initialGoal;
        this.hasWon = false;
        this.setTitle();

        // Set the container property of all items and characters (either to a location or another item)
        Object.keys(this.allLocations).forEach(name => {
            this.allLocations[name].containedItems.forEach(i => this.allItems[i].container = name);
            this.allLocations[name].containedCharacters.forEach(c => this.allCharacters[c].container = name);
        });
        Object.keys(this.allItems).forEach(name => {
            this.allItems[name].containedItems.forEach(i => this.allItems[i].container = name);
        });

        this._exitsHaveChanged = false;
    }

    // ---------- Returns an item regardless of whether you pass in the item itself or its key string

    item(i) {
        if (typeof i === "object") {
            return i;
        }
        return this.allItems[i];
    }
    
    // ---------- Returns a character regardless of whether you pass in the character itself or its key string

    character(c) {
        if (typeof c === "object") {
            return c;
        }
        return this.allCharacters[c];
    }
    
    // ---------- Given a list of items, return a list of all items including contained ones for open containers.

    getItems(items) {
        var is = [];
        for (var item of items) {
            var item = this.item(item);
            if (item) {
                is.push(item);
                if (item.state === AccessState.OPEN) {
                    is = is.concat(this.getItems(item.containedItems));
                }
            }
        }
        return is;
    }

    // ---------- Given a list of characters (names or objects), return a list of all character objects.

    getCharacters(characters) {
        return characters.map(c => this.character(c));
    }

    // ---------- Moving items around

    isItemInInventory(item) {
        item = this.item(item);
        return this.inventory.indexOf(item.name) > -1;
    }

    addItemToInventory(item) {
        item = this.item(item);
        this.inventory.push(item.name);
        this.historicInventory.add(item.name);
    }

    removeItemFromInventory(item) {
        item = this.item(item);
        ArrayUtils.remove(this.inventory, item.name);
    }

    addItemToCurrentLocation(item) {
        item = this.item(item);
        this.allLocations[this.currentLocation].containedItems.push(item.name);
        item.container = this.currentLocation;
    }

    removeItemFromContainer(item) {
        item = this.item(item);
        var container = this.allItems[item.container] || this.allLocations[item.container];
        if (container) {
            ArrayUtils.remove(container.containedItems, item.name);
            item.container = undefined;
        }
    }

    // ---------- Moving items around

    addCharacterToLocation(character, location) {
        character = this.character(character);
        this.allLocations[location].containedCharacters.push(character.name);
        character.container = location;
    }

    removeCharacterFromLocation(character, location) {
        character = this.character(character);
        ArrayUtils.remove(this.allLocations[location].containedCharacters, character.name);
        character.container = undefined;
    }

    // ---------- Locations

    location(loc) {
        if (typeof loc == "object") {
            return loc;
        }
        return this.allLocations[loc];
    }

    moveTo(location, direction) {
        this.state.addAction(location, "move");
        if (this.location(location).canEnterFrom(this.currentLocation, this)) {
            this.currentLocation = location;
            this.visitedLocations.push(location);
            this.setMessage("You move to the " + this.allLocations[this.currentLocation].caption);
            this.reportActionPerformed("move", location, direction);
        }
        else {
            this.reportActionPerformed("move", location, direction, true);
        }
    }

    getCurrentLocation() {
        return this.location(this.currentLocation);
    }

    getNextMoodSentence() {
        var moodSentences = this.getCurrentLocation().moodSentences;
        if (moodSentences) {
            var index = -1;
            if (this.locationCurrentMoodSentence.hasOwnProperty(this.currentLocation)) {
                index = this.locationCurrentMoodSentence[this.currentLocation];
            }
            index = (index + 1) % moodSentences.length;
            this.locationCurrentMoodSentence[this.currentLocation] = index;
            return moodSentences[index];    
        }
    }

    // ---------- Messages

    setMessage(m) {
        this.messages.push(m);
    }

    getMessages() {
        var result = this.messages;
        this.messages = [];
        return result;
    }

    removeAllMessages() {
        this.messages = [];
    }

    // ---------- Goals

    setGoal(goal) {
        if (!this.historicGoals.has(goal)) {
            this.setMessage("New goal: " + this.allGoals[goal]);
            this.historicGoals.add(goal);
            this.goal = goal;
        }
    }

    getGoal() {
        return this.goal;
    }

    clearGoal() {
        this.goal = "";
    }

    // ---------- Cutscene

    setCutscenes(sceneIds) {
        if (Array.isArray(sceneIds)) {
            this.cutscenes = sceneIds.map(id => this._getCutSceneFromId(id));
        }
        else if (sceneIds == undefined) {
            this.cutscenes = undefined;
        }
        else {
            this.cutscenes = new Array(this._getCutSceneFromId(sceneIds));
        }
    }

    getCutscenes() {
        var cs = this.cutscenes;
        this.cutscenes = undefined;
        return cs;
    }

    _getCutSceneFromId = sceneId => this.allCutscenes[sceneId] || sceneId;

    // ---------- Title

    setTitle() {
        this._title = this.title;
    }

    getTitle() {
        var t = this._title;
        this._title = undefined;
        return t;
    }

    // ---------- Exits

    setExitsHaveChanged() {
        this._exitsHaveChanged = true;
    }

    haveExitsChanged() {
        var result = this._exitsHaveChanged;
        this._exitsHaveChanged = false;
        return result;
    }

    // ---------- Generated when an action has been performed

    reportActionPerformed(verb, noun, extraData, preventedBeforeAction) {
        if (this.onActionPerformed !== undefined) {
            this.onActionPerformed(verb, noun, extraData, preventedBeforeAction);
        }
    }
}
