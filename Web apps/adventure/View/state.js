// todo make movement also "texts" for the buttons, using htmlButton
// test by manually adding "move("E", game.context)" "move("S", game.context)" "_open(cupboard, game.context)"
// and call state.apply()
// then add state stuff to htmlButton:
//    function htmlButton(caption, func) {
//        return "<button onclick='" + func + ";" + state.jsAddToActionsFunction(func) + ";" + jsUpdateFunction() + "'>" + caption + "</button>"
//    }
// Later add saving and loading (requires that we can reset the game, pass an empty gameContext into the view (which might be called game instead and moved to Framework).

var state = (function() {
	this.actions = [];
	that = this;

	return {
		jsAddToActionsFunction : jsAddToActionsFunction,
		clear : clear,
		apply : apply,
		add : add,
	}

	function jsAddToActionsFunction(func) {
		return "state.add(\"" + func + "\")";
	}

	function add(func) {
		that.actions.push(func);
	}

	function clear() {

	}

	function apply() {
		that.actions.foreach(
			(elem, index, array) => 
			{
				new Function(elem)();
			});
	}
})();