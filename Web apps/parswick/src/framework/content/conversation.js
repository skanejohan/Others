export { Conversation };

class Conversation {
    constructor() {
        this.statements = {};
        this.responses = {};
        this.initialStatement = 0;
    }

    addStatement(id, msg, responseIds) {
        this.statements[id] = { msg: msg, responseIds: responseIds };
        return this;
    }

    addResponse(id, msg, statementId) {
        return this.addResponseWithAction(id, msg, undefined, statementId);
    }

    addResponseWithAction(id, msg, action, statementId) {
        this.responses[id] = { id: id, msg: msg, action: action, statementId: statementId };
        return this;
    }

    setInitialStatement(statementId) {
        this.initialStatement = statementId;
        return this;
    }
}
