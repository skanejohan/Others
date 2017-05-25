function initializeGame(startLocation, startMessage, locationDiv, messageDiv, 
	locationItemsDiv, carriedItemsDiv, movementDiv, northBtn, eastBtn, southBtn, westBtn) {

	// ---------- Presentation
	
	this.locationDiv = locationDiv;
	this.messageDiv = messageDiv;
	this.locationItemsDiv = locationItemsDiv;
	this.carriedItemsDiv = carriedItemsDiv; 
	this.movementDiv = movementDiv;
	this.northBtn = northBtn;
	this.eastBtn = eastBtn;
	this.southBtn = southBtn;
	this.westBtn = westBtn;

	// ---------- Logic

	this.gameContext = {
        currentLocation : startLocation,
        inventory : [],
        flags : new Set(),
        result : startMessage,
    };

	// ---------- The following functions generate Javascript code.
	
	function jsVerbName(verb) {
		return verb.name == null ? verb : verb.name;
	}

	function jsUpdateFunction() {
		return "game.update()";
	}

	function jsVerbFunction(item, verb) {
		var verbName = jsVerbName(verb);
		if (verbName == "open") {
			verbName = "_open";
		}
		else if (verbName == "close") {
			verbName = "_close";
		}
		return verbName + "(" + item.name + ", game.context)";
	}

	function jsMoveFunction(targetLocation) {
		return "moveTo(" + targetLocation.name + ", game.context)";
	}

	// ---------- The following functions generate HTML

    function htmlButton(caption, func) {
        return "<button onclick='" + func + ";" + jsUpdateFunction() + "'>" + caption + "</button>"
    }

    function htmlItem(item, container) {
        var containerText = container == null ? "" : " (in the " + container.caption + ")";
        html = item.caption + containerText;
        var _verbs = getVerbs(gameContext, item);
        _verbs.forEach(v => html += htmlButton(jsVerbName(v), jsVerbFunction(item, v))); 
        html += "<br>";
        return html;
    }

    function htmlItems(items) {
    	var html = "";
    	forEachOpenItem(items, (i, c) => html += htmlItem(i, c));
        return html;
    }

	function htmlMovementButton(direction, targetLocation) {
		return htmlButton(direction, jsMoveFunction(targetLocation));
	}

	function htmlMovementButtons(gc) {
    	var html = "";
		var loc = gameContext.currentLocation;
		var exits = getExits(gameContext, loc);
		if (exits.N) {
			html += htmlMovementButton("N", exits.N)
		}
		if (exits.E) {
			html += htmlMovementButton("E", exits.E)
		}
		if (exits.S) {
			html += htmlMovementButton("S", exits.S)
		}
		if (exits.W) {
			html += htmlMovementButton("W", exits.W)
		}
        return html;
	}

	// Return the external interface. TODO do we need this???

	return {
		context : gameContext,
		update : function() {
	    	locationDiv.innerHTML = look(gameContext);
        	locationItemsDiv.innerHTML = "You see:<br><br>" + htmlItems(gameContext.currentLocation.items);
        	carriedItemsDiv.innerHTML = "You are carrying:<br><br>" + htmlItems(gameContext.inventory);
        	movementDiv.innerHTML = htmlMovementButtons(gameContext);
        	messageDiv.innerHTML = gameContext.result;
		}
	}
}