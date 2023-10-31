var combinationLock = {

    // Called from the location to make gameContext display the combination lock
    show(expectedCode, success, failure) {
        this._expectedCode = expectedCode;
        this._success = success;
        this._failure = failure;
        this.callback = true;
        this._enteredCode = "";
    },

    // Called from gameContext to figure out how to deal with a combination lock
    // - false if the combination lock is not used
    // - true if the combination lock is used but not enough digits have been entered
    // - otherwise represents the callback (success or failure depending on input)
    callback: false,

    // Called from gameContext
    render() {
        var top = 75;
        var left = 610;
        var p = { x : mousePos.x - 610, y : mousePos.y - 75 };

        context.fillStyle = "black";
        context.fillRect(0, 0, 1920, 1080);

        context.strokeStyle = "yellow";
        context.fillStyle = "yellow";
        context.font = "40px kongtext";
        context.strokeRect(left, top, 700, 925);
        for (let i = this._buttons.length - 1; i >= 0; i--) {
            var b = this._buttons[i];
            context.strokeStyle = insideRect(p, b) ? "white" : "yellow";
            context.strokeRect(left + b.left, top + b.top, b.width, b.height);
            context.fillText(b.digit, left + b.left, top + b.top);
        }
    },
    
    // Called from gameContext
    update() {
        var p = { x : mousePos.x - 610, y : mousePos.y - 75 };
        for (let i = this._buttons.length - 1; i >= 0; i--) {
            var b = this._buttons[i];
            if (insideRect(p, b)) {
                this._enteredCode += b.digit;
                if (this._enteredCode == this._expectedCode) {
                    this.callback = this._success;
                }
                else if (this._enteredCode.length == this._expectedCode.length) {
                    this.callback = this._failure;
                }
            }
        }
    },

    // Called from gameContext to hide the combination lock when done.
    hide() {
        this.callback = false;
    },

    _buttons: [ 
        {left : 25, top : 25, width: 200, height: 200, digit: "1" }, 
        {left : 250, top : 25, width: 200, height: 200, digit: "2" }, 
        {left : 475, top : 25, width: 200, height: 200, digit: "3" },
        {left : 25, top : 250, width: 200, height: 200, digit: "4" }, 
        {left : 250, top : 250, width: 200, height: 200, digit: "5" }, 
        {left : 475, top : 250, width: 200, height: 200, digit: "6" },
        {left : 25, top : 475, width: 200, height: 200, digit: "7" }, 
        {left : 250, top : 475, width: 200, height: 200, digit: "8" }, 
        {left : 475, top : 475, width: 200, height: 200, digit: "9" },
        {left : 250, top : 700, width: 200, height: 200, digit: "0" }
    ]
}