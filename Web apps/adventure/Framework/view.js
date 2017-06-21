var view = (function() {
	this.locationDiv = null;
	this.messageDiv = null;
	this.locationItemsDiv = null;
	this.carriedItemsDiv = null; 
	this.movementDiv = null;
	this.northBtn = null;
	this.eastBtn = null;
	this.southBtn = null;
	this.westBtn = null;
	this.conversationContainer = null;
	this.conversationDiv = null;
	that = this;

	return {
		conversation : {
			show : showConversation,
			addStatement : addConversationStatement,
			addResponse : addConversationResponse,
			clear : clearConversation,
			hide : hideConversation,
		},
		initialize : initialize,
		update : update,
	}

	function initialize(locationDiv, messageDiv, locationItemsDiv, carriedItemsDiv, movementDiv, northBtn, eastBtn, 
		southBtn, westBtn, conversationContainer, conversationDiv) {
		that.locationDiv = locationDiv;
		that.messageDiv = messageDiv;
		that.locationItemsDiv = locationItemsDiv;
		that.carriedItemsDiv = carriedItemsDiv; 
		that.movementDiv = movementDiv;
		that.northBtn = northBtn;
		that.eastBtn = eastBtn;
		that.southBtn = southBtn;
		that.westBtn = westBtn;
		that.conversationContainer = conversationContainer;
		that.conversationDiv = conversationDiv;
	}

	function update() {
    	locationDiv.innerHTML = game.here.description() + "<br><br>" + game.npcs.descriptions.join("<br><br>");
    	locationItemsDiv.innerHTML = "You see:<br><br>" + htmlLocationItems();
    	carriedItemsDiv.innerHTML = "You are carrying:<br><br>" + htmlInventory();
    	movementDiv.innerHTML = htmlMovementButtons();
    	messageDiv.innerHTML = game.message;
	}

	// ---------- The following functions generate Javascript code.
	
	function jsVerbName(verb) {
		return verb.name == null ? verb : verb.name;
	}

	function jsUpdateFunction() {
		return "view.update()";
	}

	function jsVerbFunction(item, verb) {
		return "game.apply(" + item.name + ", \"" + jsVerbName(verb) + "\")";
	}

	function jsMoveFunction(targetLocation) {
		return "game.apply(" + targetLocation.name + ", \"moveTo\")";
	}

	// ---------- The following functions generate HTML

    function htmlButton(caption, func) {
        return "<button onclick='" + func + ";" + jsUpdateFunction() + "'>" + caption + "</button>"
    }

    function htmlItem(item, container) {
        var containerText = container == null ? "" : " (in the " + container.caption + ")";
        html = item.caption + containerText;
        var _verbs = game.items.getVerbs(item);
        _verbs.forEach(v => html += htmlButton(jsVerbName(v), jsVerbFunction(item, v))); 
        html += "<br>";
        return html;
    }

	function htmlLocationItems() {
    	var html = "";
    	game.here.forEachOpenItem((i, c) => html += htmlItem(i, c));
        return html;
	}

	function htmlInventory() {
    	var html = "";
    	game.inventory.forEachOpenItem((i, c) => html += htmlItem(i, c));
        return html;
	}

	function htmlMovementButton(direction, targetLocation) {
		return htmlButton(direction, jsMoveFunction(targetLocation));
	}

	function htmlMovementButtons() {
    	var html = "";
		var exits = game.here.exits();
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

	function showConversation() {
		that.conversationContainer.classList.add("target");
		that.conversationDiv.classList.add("keypad");
	}

	function addConversationStatement(msg) {
		that.conversationDiv.innerHTML += msg;
		that.conversationDiv.innerHTML += "<br>";
	}

	function addConversationResponse(msg, target) {
		that.conversationDiv.innerHTML += "<a href='#' onclick='" + target + "'>" + msg + "</a>";
		that.conversationDiv.innerHTML += "<br>";
	}

	function clearConversation() {
		that.conversationDiv.innerHTML = "";
	}

	function hideConversation() {
		that.conversationContainer.classList.remove("target");
	}
})();
