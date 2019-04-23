export { getAll };

import { Character } from "../framework/content/character.js";
import { Conversation } from "../framework/content/conversation.js";
import { Flag }  from "./flags.js";

var getAll = function() {
    return {
        "uncleAilbert": new UncleAilbert(),
    }
}

class UncleAilbert extends Character{
    constructor() {
        super("uncleAilbert", "uncle Ailbert", false);
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
