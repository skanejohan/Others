var bathroomDoor = simpleDoor("bathroomDoor", "bathroom door", DoorMode.Open);

var sink = (function() {
  return { 
    name : "sink",
    caption : "sink",
    verbs : [examine],
    examine : examine
  }

  function examine() {
    game.here.add(waterCooker);
    game.message = "The stainless steel sink has a strange coloration at one end. You have a faint memory of pouring some kind of paint into it it an early age. The tap provides cold water only. On the sink there is a small water cooker.";
  }
})();

var waterCooker = (function() {
    return {
        name : "waterCooker",
        caption : "water cooker",
        description : "You have used this water cooker to make your tea for at many years. A trusty friend.",
        verbs : ["examine"],
        makeTea : makeTea,
    } 

    function makeTea() {
        if (game.here.has(uncleAilbert)) {
            game.message = "You make some tea and offer it to uncle Ailbert who drinks it a bit hesitantly. After a while, he excuses himself and enters the bathroom. You hear him lock the door.";
            game.npcs.remove(uncleAilbert);
            bathroomDoor.mode = DoorMode.locked;
            game.flags.replace(Flag.UncleAilbertIntroduced, Flag.UncleAilbertGone);
        }
        else {
            game.message = "You make yourself a cup of tea. It tastes lovely."
        }
    }

})();

var fridge = { 
    name : "fridge",
    caption : "fridge",
    description : "The white fridge is humming slightly. Once in a while it makes a strange coughing noise. You take a peek inside. It is empty, as expected.",
    verbs : ["examine"],
}

var cup = (function() {
  return { 
    name : "cup",
    caption : "cup",
    description : "The cup is white and has the text \"Hotel del Sol, Tenerife\" written on it. As far as you can remember, you have never been to Tenerife.",
    verbs : ["examine", "take"],
    afterTake : afterTake
  }

  function afterTake() {
      game.items.insertInto(cupboard, officeDoorKey);
      game.message = "When you take the cup, a key appears.";
      cup.afterTake = null;
  }
})();

var cupboard = { 
    name : "cupboard",
    caption : "cupboard",
    description : "It is a plain white cupboard, typical for a kitchen that has been decorated with economy in mind.",
    containedItems : [cup],
    verbs : ["examine", "open"],
}

var officeDoorKey = (function() { 
    return {
        name : "officeDoorKey",
        caption : "office door key",
        description : "This is the key to the office.",
        verbs : ["examine", "take"],
        afterTake : afterTake,
    }

    function afterTake() {
        game.flags.set(Flag.OfficeKeyFound);
        afterTake = null;
    }
})();

var table = { 
    name : "table",
    caption : "table",
    description : "Its worn surface is covered by the doodles that you placed there in your childhood, while spending many long hours waiting for your parents to finish their business in the bookshop.",
    verbs : ["examine"],
}

var chair = { 
    name : "chair",
    caption : "chair",
    description : "It looks uncomfortable and, having used it on many occasions, you know it is.",
    verbs : ["examine"],
}

var kitchen = (function() {
    return { 
        name : "kitchen",
        caption : "kitchen",
        items: [sink, fridge, table, chair, cupboard],
        getExits : getExits,
        description : "The cramped kitchen contains only the most essential - a sink and a small fridge. On the wall above the sink is a small cupboard with a plain white door. Here is also a small wooden table and a rickety old chair. This room has a musty smell, but you have decided not to pursue the reason for the pungent odour. Everything in here looks as if it was cheap even when the kitchen was installed many years ago. From here you can go north to the main section or south into the bathroom.",
    }

    function getExits() {
        return bathroomDoor.mode == DoorMode.Closed ? { N : fictionSection } : { N : fictionSection, S : bathroom }
    }
})();

