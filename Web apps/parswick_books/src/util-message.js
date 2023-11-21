let createMessage = () => {
    let message = undefined;
    let remainingMs = 0;

    let _setMessage = (msg, ms) => {
        message = msg;
        remainingMs = ms;
    }

    let _update = ms => {
        if (remainingMs > 0) {
            remainingMs -= ms;
            if (remainingMs <= 0) {
                remainingMs = 0;
                message = undefined;
            }
        }
    }

    let _render = () => {
        if (message) {
            GameContext.drawContext().drawMessage(message);
        }
    }

    return {
        setMessage: _setMessage,
        update: _update,
        render: _render
    }
}