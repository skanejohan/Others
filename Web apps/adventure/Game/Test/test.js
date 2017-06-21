function load(i) {
    eval("game.apply(fictionSection, 'moveTo')");
    eval("game.apply(kitchen, 'moveTo')");
    eval("game.apply(cupboard, 'open')");
    eval("game.apply(cup, 'take')");
    eval("game.apply(officeDoorKey, 'take')");
    eval("game.apply(fictionSection, 'moveTo')");
    eval("game.apply(artSection, 'moveTo')");
    eval("game.apply(historySection, 'moveTo')");
    eval("game.apply(officeDoor, 'unlock')");
    eval("game.apply(officeDoor, 'open')");
    eval("game.apply(office, 'moveTo')");
    if (i < 2){
        eval("game.apply(safe, 'enterCombination')");
        view.update();
        return;
    }
    eval("game.apply(safe, 'enterCombination', '1979')");
    eval("game.apply(desk, 'examine')");
    eval("game.apply(drawer, 'open')");
    eval("game.apply(paperclip, 'take')");
    eval("game.apply(metalBox, 'take')");
    eval("game.apply(metalBox, 'pick')");
    eval("game.apply(houseHistoryBook, 'take')");
    eval("game.apply(rockPick, 'take')");
    eval("game.apply(historySection, 'moveTo')");
    eval("game.apply(artSection, 'moveTo')");
    eval("game.apply(fictionSection, 'moveTo')");
    eval("game.apply(travelSection, 'moveTo')");
    eval("game.apply(languageShelf, 'examine')");
    eval("game.apply(latinDictionary, 'take')");
    eval("game.apply(houseHistoryBook, 'examine')");
    eval("game.apply(fictionSection, 'moveTo')");
    eval("game.apply(artSection, 'moveTo')");
    eval("game.apply(historySection, 'moveTo')");
    eval("game.apply(historyBookShelf, 'examine')");
    eval("game.apply(historyBookShelf, 'empty')");
    eval("game.apply(historyBookShelf, 'pull')");
    eval("game.apply(wall, 'examine')");
    eval("game.apply(wall, 'hit')");
    //eval("game.apply(uncleAilbert, 'talk')");

    /*
    talk to uncle Ailbert (eventually, he wants tea)
    eval("moveTo(kitchen, view.context)");
    eval("examine(sink, view.context)");
    eval("use(waterCooker, view.Context)"); (Uncle Ailbert drinks the tea, then has to use the bathroom. He locks the door.)
    eval("moveTo(fictionSection, view.context)");
    eval("moveTo(artSection, view.context)");
    eval("moveTo(historySection, view.context)");
    eval("hit(wall, view.context)");
    */
    view.update();
}
