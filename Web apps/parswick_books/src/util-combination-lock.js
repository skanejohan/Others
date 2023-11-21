createCombinationLock = () => {
    let _enteredCode = undefined;
    let _expectedCode = undefined;
    let _success = undefined;
    let _failure = undefined;
    let _active = false;
    
    let _isHoveredButton = b => insideRect(GameContext.mouse().pos(), b);
    let _getHoveredButton = () => _buttons.find(b => _isHoveredButton(b));

    let _buttons = [ 
        { left : 108, top : 23, width: 28, height: 28, digit: "1" }, 
        { left : 146, top : 23, width: 28, height: 28, digit: "2" }, 
        { left : 184, top : 23, width: 28, height: 28, digit: "3" },
        { left : 108, top : 61, width: 28, height: 28, digit: "4" }, 
        { left : 146, top : 61, width: 28, height: 28, digit: "5" }, 
        { left : 184, top : 61, width: 28, height: 28, digit: "6" },
        { left : 108, top : 99, width: 28, height: 28, digit: "7" }, 
        { left : 146, top : 99, width: 28, height: 28, digit: "8" }, 
        { left : 184, top : 99, width: 28, height: 28, digit: "9" },
        { left : 146, top : 137, width: 28, height: 28, digit: "0" }
    ];

    let _show = (expectedCode, success, failure) => {
        _expectedCode = expectedCode;
        _success = success;
        _failure = failure;
        _enteredCode = "";
        _active = true;
    }

    let _render = () => {
        if (_active) {
            GameContext.drawContext().clear();
            GameContext.drawContext().drawRect(98, 13, 124, 162, "yellow");
            for (let i = _buttons.length - 1; i >= 0; i--) {
                var b = _buttons[i];
                var style = _isHoveredButton(b) ? "white" : "yellow";
                GameContext.drawContext().drawRectR(b, style);
                GameContext.drawContext().drawText(b.digit, b.left, b.top, 5, style);
            }
        }
    }

    let _update = () => {
        if (GameContext.mouse().isClicked() && _active) {
            var b = _getHoveredButton();
            if (b) {
                _enteredCode += b.digit;
                if (_enteredCode == _expectedCode) {
                    _success();
                    _active = false;
                }
                else if (_enteredCode.length == _expectedCode.length) {
                    _failure();
                    _active = false;
                }
            }
            GameContext.mouse().setClicked(false); // We have handled the click and no other object should
        }
    }

    return {
        show: _show,
        render: _render,
        update: _update
    }
}
