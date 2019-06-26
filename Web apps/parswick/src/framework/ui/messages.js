export { MessagesUI };

class MessagesUI {

    constructor(engine, left, bottom, width) {
        this.engine = engine;
        this.bottom = bottom;
        this.width = width;
        this.left = left;
        this.messages = [];
        this.timeout = null;
        this.maxMessageLength = 3;
        this.pendingMessages = [];
        this.active = true;
    }

    activate() {
        if (!this.active) {
            this.active = true;
            this._activateTimer();
            if (this.pendingMessages.length > 0) {
                this.addMessages(this.pendingMessages);
                this.pendingMessages = [];
            }
        }
    }
    
    deactivate() {
        if (this.active) {
            this.active = false;
            this._deactivateTimer();
        }
    }
    
    addMessages(messages) {
        if (!this.active) {
            this.pendingMessages = messages;
            return;
        }

        this._deactivateTimer();

        if (messages.length == 0) {
            this._activateTimer();
            return;
        }

        let m = messages[0];
        messages.shift();

        var element = new MessageElement(this.left, this.bottom, this.width, m, this._messageTimeMs(m), () => this._clear());
        if (this.messages.length == 0) {
            this._doAddMessageElement(element);
            this.addMessages(messages);
        }
        else {
            this.messages.forEach(m => m.translateY(-element.h, 300));
            this.messages[0].wait(300, () => {
                this._doAddMessageElement(element);
                this.addMessages(messages);
            });
        }
    }

    _doAddMessageElement(e) {
        this.engine.add(e, 10);
        this.messages.push(e);
        if (this.messages.length > this.maxMessageLength) {
            this._removeLastMessageElement();
        }
    }

    _removeLastMessageElement() {
        var m = this.messages.shift();
        m.finishAfterAnimations = true;
        m.fadeOut(300);
    }

    _activateTimer() {
        if (this.messages.length > 0) {
            setTimeout(() => this._timerEvent(), this.messages[0].millisecondsLeft());
        }
    }

    _deactivateTimer() {
        clearTimeout(this.timeout);
    }

    _timerEvent() {
        while (this.messages.length > 0 && this.messages[0].millisecondsLeft() <= 0) {
            this._removeLastMessageElement();
        }
        this._deactivateTimer();
        this._activateTimer();
    }

    _messageTimeMs(m) {
        return 1000 + m.length * 50;
    }

    _clear() {
        this.messages.forEach(m => m.finalize());
        this.messages = [];
    }
}

class MessageElement extends CompositeElementBase {
    constructor(left, bottom, w, message, messageTime, onclick) {
         // TODO should TextBox really take height?       
        let textBox = new TextBox(left, bottom, w, 0, message, FONT, "black", LAYER1FRAMECOLOR); 
        textBox.y = textBox.y - textBox.h;
        
        super(left-10, textBox.y-10, textBox.w+20, textBox.h+20, onclick);

        this.endTime = new Date(new Date().getTime() + messageTime);

        this.addElement(new FillRoundRect(left-10, textBox.y-10, w+20, textBox.h+20, 5, LAYER1COLOR));
        this.addElement(new FillRoundRect(left-5, textBox.y-5, w+10, textBox.h+10, 2, LAYER1FRAMECOLOR));
        this.addElement(textBox);
        this.fadeIn(300);
    }

    millisecondsLeft() {
        return this.endTime - new Date();
    }

    finalize() {
        this.finishAfterAnimations = true; 
        this.fadeOut(300, () => this._animations = []); 
    }
}
