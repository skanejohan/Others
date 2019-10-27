export { ConversationUI };

class ConversationUI {
    constructor(engine, context, x, y, w, h, radius, bgColor, fgColor) {
        this.engine = engine;
        this.context = context;
        this.dimensions = { x: x, y: y, w: w, h: h };
        this.frame = new FillRoundRect(x, y, w, h, radius, fgColor);
        this.background = new FillRoundRect(x+3, y+3, w-6, h-6, radius, bgColor);
        this.entryElements = [];
    }

    startConversation(conversation) {
        this.engine.addModal(this.frame);
        this.engine.addModal(this.background);
        this.conversation = conversation;
        this.presentStatementAndResponses(conversation.initialStatement);
    }

    presentStatementAndResponses(statementId) {
        this.removeStatementAndResponses();
        var statement = this.conversation.statements[statementId];
        var responses = statement.responseIds.map(id => this.conversation.responses[id]);

        var xOffset = 20;
        var yOffset = 20;
        var entry = this._doPresentEntry(true, statementId, xOffset, yOffset, statement.msg);

        xOffset = 40;
        yOffset = 50 + entry.h;
        responses.forEach(r => {
            entry = this._doPresentEntry(false, r.id, xOffset, yOffset, r.msg, () => {
                if (r.action) {
                    r.action(this.context);
                }
                if (r.statementId) {
                    this.presentStatementAndResponses(r.statementId);
                }
                else {
                    this.close();
                }
            }); 
            yOffset += entry.h;
            yOffset += 20;
        });
    }

    removeStatementAndResponses() {
        this.entryElements.forEach(elem => {
            if (elem.clear) {
                elem.clear();
            }
            this.engine.remove(elem);
        });
        this.entryElements = [];
    }

    close() {
        this.removeStatementAndResponses();
        this.engine.remove(this.frame);
        this.engine.remove(this.background);
    }

    _doPresentEntry(isStatement, id, xOffset, yOffset, msg, fn) {
        var x = this.dimensions.x + xOffset;
        var y = this.dimensions.y + yOffset;
        var w = this.dimensions.w - 2 * xOffset;
        var entry = isStatement ? 
            new TextBox(x, y, w, 0, msg, FONT, LAYER1FRAMECOLOR, "black", fn) :
            new ResponseElement(x, y, w, 0, msg, this.engine, fn); 
        entry.responseId = id;
        this.engine.addModal(entry);
        this.entryElements.push(entry);
        return entry;
    }
}

// Passing the engine into this class is a hack to make CompositeElementBase work in a modal dialog.
class ResponseElement extends CompositeElementBase {
    constructor(x, y, w, h, msg, engine, onclick) {
        super(x, y, w, h, onclick);
        this.engine = engine;

        this.entry = new TextBox(x+6, y+6, w-12, 0, msg, FONT, "black", LAYER1FRAMECOLOR, onclick); 
        this.outerFrame = new FillRoundRect(x, y, w, this.entry.h+12, 5, LAYER1COLOR, onclick);
        this.innerFrame = new FillRoundRect(x+3, y+3, w-6, this.entry.h+6, 2, LAYER1FRAMECOLOR, onclick);
        this.h = this.entry.h+12;

        engine.addModal(this.outerFrame);
        engine.addModal(this.innerFrame);
        engine.addModal(this.entry);
    }

    clear() {
        this.engine.remove(this.outerFrame);
        this.engine.remove(this.innerFrame);
        this.engine.remove(this.entry);
    }

    _doDraw(ctx) {
        if (this.hovering()) {
            this.outerFrame.style = "white";
        }
        else {
            this.outerFrame.style = LAYER1COLOR;
        }
        super._doDraw(ctx);
    }
}
