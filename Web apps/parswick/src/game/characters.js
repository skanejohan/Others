export { getAll };

import { Character } from "../framework/content/character.js";
import { Conversation } from "../framework/content/conversation.js";
import { Flag }  from "./flags.js";

var getAll = function() {
    return {
        "femaleGhost": new FemaleGhost(),
        "maleGhost": new MaleGhost(),
        "uncleAilbert": new UncleAilbert(),
    }
}

class FemaleGhost extends Character {
    constructor() {
        super("femaleGhost", "beautiful woman");
        this.description = "Hovering in the air is the ghost of a young woman. Pearly-white and slightly transparent, with cherry-red lips, her ankle-long gown resting inches above the crude stone floor. She has an unmistakable nineteenth-century air about her.";
    }
}

class MaleGhost extends Character {
    constructor() {
        super("maleGhost", "handsome man");
        this.description = "Hovering in the air is the ghost of a handsome young man. His dark brown frock coat covers a crimson vest and a white shirt with a painfully starched collar. His brown eyes look at you with a friendly expression, and his mouth, surrounded by a neatly trimmed beard, is smiling slightly.";
        this.conversation = this.getFirstConversation();
    }

    selectConversation(context) {
        if (context.flags.has(Flag.HAVE_READ_DANCE_BOOK)) {
            this.conversation = this.getSecondConversation();
        }
        else {
            this.conversation = this.getFirstConversation();
        }
    }

    getFirstConversation() {
        return new Conversation()
            .addStatement(1, "Hello, my young lady!", [2])
            .addResponse(2, "Uh... hello?", 3)
        
            .addStatement(3, "Do you want to dance with me?", [4, 5])
            .addResponse(4, "I would not, thank you.")
            .addResponseWithAction(5, "I would like that very much!", ctx => this.actionFirstDance(ctx))
        
            .setInitialStatement(1);
    }

    actionFirstDance(context) {
        this.private.do("firstDance", context, () => {
            context.setMessage("You dance for a while, but it soon becomes apparent that he is not satisfied with your performance.");
            context.flags.add(Flag.NEED_DANCE_BOOK);
        });
    }

    getSecondConversation() {
        return new Conversation()
            .addStatement(1, "Hello again, my dear!", [2])
            .addResponse(2, "Hello again!", 3)
        
            .addStatement(3, "Would you like another dance?", [4, 5])
            .addResponse(4, "No, thank you, I am still embarrassed with my last performance.")
            .addResponseWithAction(5, "Yes please, this time I will not let you down!", ctx => this.actionSecondDance(ctx))
        
            .setInitialStatement(1);
    }

    actionSecondDance(context) {
        this.private.do("secondDance", context, () => {
            context.setMessage("You dance for a little longer this time, but he still does not seem completely satisfied.");
            context.flags.add(Flag.NEEDS_TO_PRACTICE_DANCING);
        });
    }
}

class UncleAilbert extends Character{
    constructor() {
        super("uncleAilbert", "uncle Ailbert", false);
        this.description = "Your beloved uncle is getting old but he still looks at you the way he did when you were young and he told you stories from the Scottish heaths, the smell of whisky ever present in his breath.";
        this.movementStrategy = this.getFollowPlayerStrategy(1);
        this.conversation = this.createConversation();
    }

    createConversation() {
        return new Conversation()
        .addStatement(1, "Hello Fiona, my dear!", [2])
        .addResponse(2, "Hello uncle Ailbert, how are you today?", 3)
    
        .addStatement(3, "Oh, the usual. My back hurts and the arthritis ain't getting any better. (Uncle Ailbert's ailments have always been a source of amusement to the whole family)", [4, 5, 6])
        .addResponse(4, "Aren't you seeing a doctor?", 7)
        .addResponse(5, "Can I help you in any way?", 9)
        .addResponse(6, "Have you spoken to cousin Maggie lately?", 13)
    
        .addStatement(7, "I am. No good, that lot", [8, 5])
        .addResponse(8, "Well well...")
    
        .addStatement(9, "Well, I could use a drink, lass", [10, 11, 12])
        .addResponse(10, "I am afraid I am out of whisky for the moment", 15)
        .addResponse(11, "Would you like a cup of tea?", 16)
        .addResponse(12, "I can get you a glass of water", 18)
    
        .addStatement(13, "Yes, she came to visit me the other day. Sends her regards, she does."[14])
        .addResponse(14, "Send her my best, won't you?")
    
        .addStatement(15, "Now that is a shame!", [11, 12])
    
        .addStatement(16, "A cup of tea? Well, if you are out of whiskey... yes please.", [17])
        .addResponseWithAction(17, "Follow me into the kitchen. I will make you a nice cup.", ctx => this.actionAddMakeTeaVerbToWaterCooker(ctx))
    
        .addStatement(18, "Water? I may be old and possibly not in perfect health but there are limits to your stupid modernity!", [10, 11])
    
        .setInitialStatement(1);
    }

    actionAddMakeTeaVerbToWaterCooker(context) {
        this.private.do("addMakeTeaVerbToWaterCooker", context, () => {
            context.flags.add(Flag.MAKE_TEA_POSSIBLE);
        });
    }
}
