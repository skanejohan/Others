export { ConversationUI };

class ConversationUI {
    constructor(engine, context, x, y, w, h, radius, bgColor, fgColor) {
        this.engine = engine;
        this.context = context;
        this.dimensions = { x: x, y: y, w: w, h: h };
        this.frame = new FillRoundRect(x, y, w, h, radius, fgColor);
        this.background = new FillRoundRect(x+3, y+3, w-6, h-6, radius, bgColor);
        this.statementAndResponses = [];
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
        var entry = this._doPresentEntry(statementId, xOffset, yOffset, statement.msg);

        xOffset = 40;
        yOffset = 50 + entry.h;
        responses.forEach(r => {
            entry = this._doPresentEntry(r.id, xOffset, yOffset, r.msg, () => {
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
        this.statementAndResponses.forEach(ui => this.engine.remove(ui));
        this.statementAndResponses = [];
    }

    close() {
        this.removeStatementAndResponses();
        this.engine.remove(this.frame);
        this.engine.remove(this.background);
    }

    _doPresentEntry(id, xOffset, yOffset, msg, fn) {
        var entry = new TextBox(this.dimensions.x + xOffset, this.dimensions.y + yOffset, this.dimensions.w - 2 * xOffset, 0, msg, FONT, LAYER1FRAMECOLOR, "black", fn); 
        entry.responseId = id;
        this.engine.addModal(entry);
        this.statementAndResponses.push(entry);
        return entry;
    }
}
