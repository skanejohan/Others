var combinationLock = {

    initialize() {
        this._buttons = [ 
            { left : 108, top : 23, width: this._buttonSize, height: this._buttonSize, digit: "1" }, 
            { left : 146, top : 23, width: this._buttonSize, height: this._buttonSize, digit: "2" }, 
            { left : 184, top : 23, width: this._buttonSize, height: this._buttonSize, digit: "3" },
            {left : 108, top : 61, width: this._buttonSize, height: this._buttonSize, digit: "4" }, 
            {left : 146, top : 61, width: this._buttonSize, height: this._buttonSize, digit: "5" }, 
            {left : 184, top : 61, width: this._buttonSize, height: this._buttonSize, digit: "6" },
            {left : 108, top : 99, width: this._buttonSize, height: this._buttonSize, digit: "7" }, 
            {left : 146, top : 99, width: this._buttonSize, height: this._buttonSize, digit: "8" }, 
            {left : 184, top : 99, width: this._buttonSize, height: this._buttonSize, digit: "9" },
            {left : 146, top : 137, width: this._buttonSize, height: this._buttonSize, digit: "0" }
        ];
    },

    // Called from the location to make gameContext display the combination lock
    show(expectedCode, success, failure) {
        this._expectedCode = expectedCode;
        this._success = success;
        this._failure = failure;
        this._callback = true;
        this._enteredCode = "";
    },

    render() {
        if (!this._callback) {
            return;
        }

        Globals.drawContext.clear();
        Globals.drawContext.drawRect(98, 13, 124, 162, "yellow");
        for (let i = this._buttons.length - 1; i >= 0; i--) {
            var b = this._buttons[i];
            var style = this._isHoveredButton(b) ? "white" : "yellow";
            Globals.drawContext.drawRectR(b, style);
            Globals.drawContext.drawText(b.digit, b.left, b.top, 5, style);
        }
    },
    
    update() {
        if (!Globals.mouse.isClicked() || !this._callback) {
            return;
        }

        if (this._callback === true) { // Still entering digits
            this._click();
        }

        if (this._callback !== true) { // All digits now entered - call the callback function, then hide it
            this._callback();
            this._callback = false;
        }
        
        Globals.mouse.setClicked(false); // We have handled the click and no other object should
    },

    _click() {
        var b = this._getHoveredButton();
        if (b) {
            this._enteredCode += b.digit;
            if (this._enteredCode == this._expectedCode) {
                this._callback = this._success;
            }
            else if (this._enteredCode.length == this._expectedCode.length) {
                this._callback = this._failure;
            }
        }
    },

    _getHoveredButton() {
        return this._buttons.find(b => this._isHoveredButton(b));
    },

    _isHoveredButton(b) {
        return insideRect(Globals.mouse.pos(), b);
    },

    // - false if the combination lock is not used
    // - true if the combination lock is used but not enough digits have been entered
    // - otherwise represents the callback (success or failure depending on input)
    _callback: false,

    _buttonSize: 28,
}