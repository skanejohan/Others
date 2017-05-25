var codeKeyboard = (function() {
	var done = code => { };
	var code = "";
	var codeLength = 4;	
	var keyboardElement = null;
	var codeElement = null;

	that = this;

	return {
		add : add,
		show : show,
		init : init,
	}
    
    function add(num) {
    	that.code += num;
    	update(); 
	}

	function show(codeLength, done) {
		that.done = done;
		that.codeLength = codeLength;
		that.keyboardElement.classList.add("target");
		that.code = "";
		update();
	}

	function init(keyboardElement, codeElement) {
		that.keyboardElement = keyboardElement;
		that.codeElement = codeElement;
	}

    function update() {
    	that.codeElement.innerHTML = "Code: " + that.code;
    	if (that.code.length == that.codeLength) {
    		that.keyboardElement.classList.remove("target");
    		that.done(that.code);
    	} 
	}
})();
