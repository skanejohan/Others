var sink = (function() {
  return { 
    name : "sink",
    caption : "sink",
    verbs : [examine],
    examine : examine
  }

  function examine(gc) {
    addToItems(waterCooker, kitchen.items);
    return "The stainless steel sink has a strange coloration at one end. You have a faint memory of pouring some kind of paint into it it an early age. The tap provides cold water only. On the sink there is a small water cooker.";
  }
})();

var waterCooker = { 
    name : "waterCooker",
    caption : "water cooker",
    description : "You have used this water cooker to make your tea for at many years. A trusty friend.",
    verbs : [examine],
}

var fridge = { 
    name : "fridge",
    caption : "fridge",
    description : "The white fridge is humming slightly. Once in a while it makes a strange coughing noise. You take a peek inside. It is empty, as expected.",
    verbs : [examine],
}

var cup = (function() {
  return { 
    name : "cup",
    caption : "cup",
    description : "The cup is white and has the text \"Hotel del Sol, Tenerife\" written on it. As far as you can remember, you have never been to Tenerife.",
    verbs : [examine, take],
    afterTake : afterTake
  }

  function afterTake(gc) {
      addToItems(officeDoorKey, cupboard.containedItems);
      gc.result = "When you take the cup, a key appears.";
      cup.afterTake = null;
  }
})();

var cupboard = { 
    name : "cupboard",
    caption : "cupboard",
    description : "It is a plain white cupboard, typical for a kitchen that has been decorated with economy in mind.",
    containedItems : [cup],
    verbs : [examine, open],
}

var officeDoorKey = (function() { 
    return {
        name : "officeDoorKey",
        caption : "office door key",
        description : "This is the key to the office.",
        verbs : [examine, take],
        afterTake : afterTake,
    }

    function afterTake(gc) {
        setFlag(Flag.OfficeKeyFound, gc.flags);
        afterTake = null;
    }
})();

var table = { 
    name : "table",
    caption : "table",
    description : "Its worn surface is covered by the doodles that you placed there in your childhood, while spending many long hours waiting for your parents to finish their business in the bookshop.",
    verbs : [examine],
}

var chair = { 
    name : "chair",
    caption : "chair",
    description : "It looks uncomfortable and, having used it on many occasions, you know it is.",
    verbs : [examine],
}

var kitchen = { 
    name : "kitchen",
    caption : "kitchen",
    items: [sink, fridge, table, chair, cupboard],
    description : "The cramped kitchen contains only the most essential - a sink and a small fridge. On the wall above the sink is a small cupboard with a plain white door. Here is also a small wooden table and a rickety old chair. This room has a musty smell, but you have decided not to pursue the reason for the pungent odour. Everything in here looks as if it was cheap even when the kitchen was installed many years ago. From here you can go north to the main section or south into the bathroom.",
}

