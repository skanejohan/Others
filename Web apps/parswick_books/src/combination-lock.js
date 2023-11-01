var combinationLock = {

    initialize() {
        this._buttons = [ 
            {left : 25, top : 25, width: this._buttonSize, height: this._buttonSize, digit: "1" }, 
            {left : 250, top : 25, width: this._buttonSize, height: this._buttonSize, digit: "2" }, 
            {left : 475, top : 25, width: this._buttonSize, height: this._buttonSize, digit: "3" },
            {left : 25, top : 250, width: this._buttonSize, height: this._buttonSize, digit: "4" }, 
            {left : 250, top : 250, width: this._buttonSize, height: this._buttonSize, digit: "5" }, 
            {left : 475, top : 250, width: this._buttonSize, height: this._buttonSize, digit: "6" },
            {left : 25, top : 475, width: this._buttonSize, height: this._buttonSize, digit: "7" }, 
            {left : 250, top : 475, width: this._buttonSize, height: this._buttonSize, digit: "8" }, 
            {left : 475, top : 475, width: this._buttonSize, height: this._buttonSize, digit: "9" },
            {left : 250, top : 700, width: this._buttonSize, height: this._buttonSize, digit: "0" }
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

        context.fillStyle = "black";
        context.fillRect(0, 0, 1920, 1080);
        context.strokeStyle = "yellow";
        context.fillStyle = "yellow";
        context.font = "40px kongtext";
        context.strokeRect(this._left, this._top, 700, 925);
        for (let i = this._buttons.length - 1; i >= 0; i--) {
            var b = this._buttons[i];
            context.strokeStyle = this._isHoveredButton(b.left, b.top) ? "white" : "yellow";
            context.strokeRect(this._left + b.left, this._top + b.top, b.width, b.height);
            context.fillText(b.digit, this._left + b.left, this._top + b.top);
        }
    },
    
    update() {
        if (!Globals.mouseClicked || !this._callback) {
            return;
        }

        if (this._callback === true) { // Still entering digits
            this._click();
        }

        if (this._callback !== true) { // All digits now entered - call the callback function, then hide it
            this._callback();
            this._callback = false;
        }
        
        Globals.mouseClicked = false; // We have handled the click and no other object should
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
        return this._buttons.find(b => this._isHoveredButton(b.left, b.top));
    },

    _isHoveredButton(left, top) {
        return insideRect(mousePos, { left: left + this._left, top: top + this._top, width: this._buttonSize, height: this._buttonSize });
    },

    // - false if the combination lock is not used
    // - true if the combination lock is used but not enough digits have been entered
    // - otherwise represents the callback (success or failure depending on input)
    _callback: false,

    _buttonSize: 200,
    _left: 610,
    _top: 75,
}