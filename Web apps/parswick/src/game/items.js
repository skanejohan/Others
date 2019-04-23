import { Flag }  from "./flags.js";
import { Item, OpenableItem, PickableItem, LockableItem, AccessState }  from "../framework/content/item.js";

export { getAll };

var getAll = function() {
    return {
        "armchair": new Armchair(),
        "artShelf1": new ArtShelf("artShelf1"),
        "artShelf2": new ArtShelf("artShelf2"),
        "artShelf3": new ArtShelf("artShelf3"),
        "bathroomDoor": new BathroomDoor(),
        "bathroomSink": new BathroomSink(),
        "cabinet": new Cabinet(),
        "chair": new Chair(),
        "cup": new Cup(),
        "cupboard": new Cupboard(),
        "desk": new Desk(),
        "drawer": new Drawer(),
        "fictionLeftWindow": new FictionLeftWindow(),
        "fictionRightWindow": new FictionRightWindow(),
        "fictionShelf1": new FictionShelf("fictionShelf1"),
        "fictionShelf2": new FictionShelf("fictionShelf2"),
        "fictionShelf3": new FictionShelf("fictionShelf3"),
        "fictionTable": new FictionTable(),
        "fridge": new Fridge(),
        "frontDoor": new FrontDoor(),
        "historyBookshelf": new HistoryBookshelf(),
        "houseHistoryBook": new HouseHistoryBook(),
        "languageShelf": new LanguageShelf(),
        "latinDictionary": new LatinDictionary(),
        "magnifyingGlass": new MagnifyingGlass(),
        "metalBox": new MetalBox(),
        "mirror": new Mirror(),
        "modelCar": new ModelCar(),
        "officeDoor": new OfficeDoor(),
        "officeDoorKey": new OfficeDoorKey(),
        "paperClip": new PaperClip(),
        "plaque": new Plaque(),
        "rockPick": new RockPick(),
        "safe": new Safe(),
        "sink": new Sink(),
        "stones": new Stones(),
        "table": new Table(),
        "travelShelf": new TravelShelf(),
        "travelWindow": new TravelWindow(),
        "toilet": new Toilet(),
        "towel": new Towel(),
        "wall": new Wall(),
        "waterCooker": new WaterCooker(),
    }
}

class Armchair extends Item {
    constructor() {
        super("armchair", "armchair", true, true);
        this.description = "In one corner stands a worn armchair. Many a time have you sat here, dreaming of faraway beaches and cities where the lights never go out."; 
    }
}

class ArtShelf extends Item {
    constructor(name) {
        super(name || "artShelf", "architecture shelf", true);
        this.description = "Many of the books in these shelves are of the \"coffee table book\" variety."; 
    }
}

class BathroomDoor extends OpenableItem {
    constructor() {
        super("bathroomDoor", "bathroom door", true, true, AccessState.CLOSED);
        this.isDoor = true;
    }
}

class BathroomSink extends Item {
    constructor() {
        super("bathroomSink", "sink", true);
        this.description = "Old, stained and maybe not completely clean.";
    }
}

class Cabinet extends OpenableItem {
    constructor() {
        super("cabinet", "cabinet", true, true, AccessState.CLOSED);
        this.containedItems = ["magnifyingGlass", "metalBox"];
    }    

    beforeExamine(context) {
        if (this.state == AccessState.OPEN) {
            this.description = "You remember a lot of this stuff from your childhood. Many a time have you intended to go through this stuff, keeping some of it and throwing away some. Likely, you would throw away most of it, which may be the reason why you haven't gotten around to the task.";
        }
        else {
            this.description = "This old cabinet takes up a large portion of the wall.";
        }
    }
}

class Chair extends Item {
    constructor() {
        super("chair", "chair", true, true);
        this.description = "It looks uncomfortable and, having used it on many occasions, you know it is."; 
    }
}

class Cup extends Item {
    constructor() {
        super("cup", "cup", false, true);
        this.description = "The cup is white and has the text \"Hotel del Sol, Tenerife\" written on it. As far as you can remember, you have never been to Tenerife."; 
    }

    afterTakeOnce(context) {
        context.allItems["officeDoorKey"].isVisible = true;
        context.setMessage("When you take the cup, a key appears.");
    }
}

class Cupboard extends OpenableItem {
    constructor() {
        super("cupboard", "cupboard", true, true, AccessState.CLOSED);
        this.description = "It is a plain white cupboard, typical for a kitchen that has been decorated with economy in mind.";
        this.containedItems = ["cup", "officeDoorKey"];
    }    
}

class Desk extends Item {
    constructor() {
        super("desk", "desk", true);
        this.description = "The mahogany desk is cluttered with papers, most of them bills. It seems that you owe the gas company £19.32 and the phone company £26.53, and the unpaid bill of £35 is most likely the reason why the morning paper hasn't appeared in a while. Looking through the piles, you realise that you have never really cleaned out the desk since your father's death. Among other things, you find a few old magazines - it seems like the pound hit a record high in December of 1957 and a record low in Febrary of 1985. And who would have known that the \"Benny Hill Show\" was cancelled in 1989 (you vividly remember your parents dislike of the show)? Or that French president de Gaulle accused the British government of lacking the necessary commitment to European integration in January of 1963? Well, well... In the desk, there is also a small drawer.";
    }

    afterExamine(context) {
        context.allItems["drawer"].isVisible = true;
    }
}

class Drawer extends OpenableItem {
    constructor() {
        super("drawer", "drawer", true, false, AccessState.CLOSED);
        this.containedItems = ["paperClip"];
    }

    beforeExamine(context) {
        if (this.state == AccessState.CLOSED) {
            this.description = "The drawer is closed.";
        }
        else if (this.containedItems.indexOf("paperClip") > -1) {
            this.description = "The drawer is, surprisingly enough, almost empty. The only thing you see is an old paper clip.";
        }
        else {
            this.description = "The drawer is empty.";
        }
    }
}

class FictionLeftWindow extends Item {
    constructor() {
        super("fictionLeftWindow", "", true, true);
        this.description = "Through the windows, you can see the large square, and the beatiful old Gothic cathedral at the other side of it. Tourists are milling about, but as usual nobody seems to notice your fine establishment.";
        this.isWindow = true;
    }
}

class FictionRightWindow extends Item {
    constructor() {
        super("fictionRightWindow", "", true, true);
        this.description = "Through the windows, you can see the large square, and the beatiful old Gothic cathedral at the other side of it. Tourists are milling about, but as usual nobody seems to notice your fine establishment.";
        this.isWindow = true;
    }
}

class FictionShelf extends Item {
    constructor(name) {
        super(name || "fictionShelf", "fiction shelf", true, true);
        this.description = "This section is filled with literary fiction - shelf after shelf of romance, crime and drama.";
    }
}

// class FictionShelf1 extends Item {
//     constructor() {
//         super("fictionShelf1", "fiction shelf", true, true);
//         this.description = "This section is filled with literary fiction - shelf after shelf of romance, crime and drama.";
//     }
// }

// class FictionShelf2 extends Item {
//     constructor() {
//         super("fictionShelf2", "fiction shelf", true, true);
//         this.description = "This section is filled with literary fiction - shelf after shelf of romance, crime and drama.";
//     }
// }

// class FictionShelf3 extends Item {
//     constructor() {
//         super("fictionShelf3", "fiction shelf", true, true);
//         this.description = "This section is filled with literary fiction - shelf after shelf of romance, crime and drama.";
//     }
// }

class FictionTable extends Item {
    constructor() {
        super("fictionTable", "table", true, true);
        this.description = "A small coffee table and two rickety chairs. This is where you intend to serve your loyal customers a cup of tea or coffee, and maybe a homemade biscuit or two, while they ponder on their purchases or just enjoy the literary ambience. This assumes, of course, that you have any loyal customers. Hardly anyone has used this table since you placed it there, nearly two years ago.";
    }
}

class Fridge extends Item {
    constructor() {
        super("fridge", "fridge", true, true);
        this.description = "The white fridge is humming slightly. Once in a while it makes a strange coughing noise. You take a peek inside. It is empty, as expected.";
    }
}

class FrontDoor extends OpenableItem {
    constructor() {
        super("frontDoor", "front door", true, true, AccessState.CLOSED);
        this.description = "This is the main entrance to your book shop. You see a sign that says \"Closed\". Luckily, that means that is says \"Open\" on the other side. Above the door is a small bell to indicate when a customer enters. Too rarely does it sound.";         
        this.isDoor = true;
    }

    beforeOpen(context) {
        context.setMessage("As you move toward the door to open it, you realise that you just got here and that it is not yet time for lunch. If ever a customer should venture into your shop, you had better be here.");
        return true;
    }
}

class HistoryBookshelf extends Item {
    constructor() {
        super("historyBookshelf", "history bookshelf", true);
        this.emptyIsVisible = false;
        this.pullIsVisible = false;
        this.verbEmpty.caption = "Empty";
        this.verbPull.caption = "Pull";
    }

    beforeExamine(context) {
        if (context.flags.has(Flag.BOOKSHELF_PULLED)) {
            this.description = "The dusty bookshelf has been pulled from its place along the wall. Behind it, you can see a part of a brick wall.";
        }
        else if (context.flags.has(Flag.BOOKSHELF_EMPTY)) {
            this.description = "Behind the now empty bookshelf, you can see an old brick wall.";
        }
        else if (context.flags.has(Flag.ENTRANCE_KNOWN)) {
            this.description = "This shelf is filled with books. Emptying it may be a daunting task in this room that is already so overcrowded";
            this.emptyIsVisible = true;
        }
        else {
            this.description = "This shelf is filled with books. World War II, Christofer Columbus and the French Revolution. Operation Desert Storm, ancient Greece and Titanic. Creative chaos in this shelf, as well as in the rest of the shop.";
        }
    }

    verbEmpty(context) {
        this.private.do("empty", context, () => {
            context.flags.delete(Flag.ENTRANCE_KNOWN);
            context.flags.add(Flag.BOOKSHELF_EMPTY);
            this.emptyIsVisible = false;
            this.pullIsVisible = true;
            context.setMessage("You spend a good while emptying the bookshelf. The stacks on the floor grow, as do those in the two armchairs and on the coffee tables. You even stack books under the tables, to prevent them from collapsing completely. When you are done, the room is barely navigable, and the dust that has gathered on the now empty shelves for some reason makes you think of mouldy feather boas.");
        });
    }

    verbEmptyVisible(context) {
        return this.emptyIsVisible;
    }

    verbPull(context) {
        this.private.do("pull", context, () => {
            context.flags.delete(Flag.BOOKSHELF_EMPTY);
            context.flags.add(Flag.BOOKSHELF_PULLED);
            this.pullIsVisible = false;
            context.allItems["wall"].isVisible = true;
            context.setMessage("You pull the bookshelf out from the wall. It doesn't move far, given that the room is full of stacked books, but gives you access to a part of the brick wall behind it.");
        });
    }

    verbPullVisible(context) {
        return this.pullIsVisible;
    }
}

class HouseHistoryBook extends Item {
    constructor() {
        super("houseHistoryBook", "old book");
    }

    beforeExamine(context) {
        if (context.flags.has(Flag.WALL_BROKEN)) {
            this.description = "You examine the map. The entrance to the cellar turned out to be exactly where the book indicated.";
        }
        else if (context.flags.has(Flag.ENTRANCE_KNOWN)) {
            this.description = "You examine the map. Behind the bookshelf on the eastern wall of the history section it seems like there has once been an entrance to the cellar.";
        }
        else if (context.isItemInInventory("latinDictionary")) {
            context.allItems["historyBookshelf"].isVisible = true;
            context.flags.add(Flag.ENTRANCE_KNOWN);
            this.description = "Using the latin dictionary, you are able to decipher the contents of the old book. It describes the history of the house in which the bookshop is located. Most of what is in the book you already know since your parents passed this information to you - whether as a child you wanted it or not - but you find a few nuggets of new information. The most interesting part is the fact that there used to be an entrance to a cellar from what is now the history section. Looking at the map, and reading the text surrounding it, you conclude that there must be a hidden entrance to the basement behind the eastern wall, currently covered by book shelves.";
        }
        else {
            this.description = "The leather-bound old book is written in what you assume is latin. Although you may recognize a word here and there, you really have no way of telling what the book is about. You see a small map in one of the pages. You can't be sure but you have a slight feeling of recognition.";
        }
    }
}

class LanguageShelf extends Item {
    constructor() {
        super("languageShelf", "language shelf", true, true);
    }

    beforeExamine(context) {
        if (context.isItemInInventory("houseHistoryBook") && !context.allItems["latinDictionary"].isVisible) {
            this.description = "The shelf is filled with dictionaries and grammar guides. Pondering the old book in your hand, you look more closely for a latin dictionary which you are able to find, squeezed between Astrid Stedje's \"Deutsche Sprache gestern und heute\" and an old edition of \"The Oxford Companion to English Literature\".";
        }
        else {
            this.description = "The shelf is filled with dictionaries and grammar guides. To be honest, you have probably not opened one of them after placing them in the shelf.";
        }
    }

    afterExamine(context) {
        if (context.isItemInInventory("houseHistoryBook") && !context.allItems["latinDictionary"].isVisible) {
            context.allItems["latinDictionary"].isVisible = true;
        }
    }
}

class LatinDictionary extends Item {
    constructor() {
        super("latinDictionary", "latin dictionary", false, false);
        this.description = "The cover of this book simply says \"A Latin Dictionary\". \"Well\", you mutter to yourself, \"I guess no more information is needed\".";
    }
}

class MagnifyingGlass extends Item {
    constructor() {
        super("magnifyingGlass", "magnifying glass");
        this.description = "It works. The thing you look at actually appears just a little bit bigger than it actually is. As you remember, it can also be used with insects in a rather harmful way. You feel a pang of guilt at the thought."; 
    }
}

class MetalBox extends PickableItem {
    constructor() {
        super("metalBox", "metal box", false, true, "paperClip", AccessState.LOCKED);
        this.containedItems = ["stones", "rockPick", "modelCar"];
    }

    beforeExamine(context) {
        var s = "Most of the color has been scratched off this once green metal box.";
        if (context.allItems["metalBox"].state == AccessState.LOCKED) {
            s += " You remember it vaguely, but exactly what is inside it eludes you. It is quite heavy and when you shake it carefully, it rattles. It has a simple lock, which at the moment seems locked.";
        }
        this.description = s;
    }

    afterPick(context) {
        // TODO context.replaceLastMessage ?
        context.setMessage("Using the paper clip, you manage to open the lock. You open the box and it turns out to contain your old rock collection. Not much of a collection actually, a few small stones and your old rock pick.");
        context.allItems["metalBox"].state = AccessState.OPEN;
    }
}

class Mirror extends Item {
    constructor() {
        super("mirror", "", true);
        this.description = "You see a handsome figure in the mirror. At 45, you are satisfied with what you see. Your flowing red hair and strong arms are unmistakably celtic traits that your family has valued for centuries.";
    }
}

class ModelCar extends Item {
    constructor() {
        super("modelCar", "model car");
        this.description = "You remember playing with this car. It is brown, and somebody once told you that it represents a Leyland Princess. You have no reason to doubt that."; 
    }
}

class OfficeDoor extends LockableItem {
    constructor() {
        super("officeDoor", "office door", true, true, AccessState.LOCKED, "officeDoorKey");
        this.isDoor = true;
    }
}

class OfficeDoorKey extends Item {
    constructor() {
        super("officeDoorKey", "office door key", false, false);
        this.description = "This is the key to the office.";
    }
}

class PaperClip extends Item {
    constructor() {
        super("paperClip", "paper clip");
        this.description = "It is a paper clip. Nothing more. Nothing less."; 
    }
}

class Plaque extends Item {
    constructor() {
        super("plaque", "", true, true);
        this.description = "This is a small copper plaque, on which is inscribed \"Parswick Books - City Centre merchant of the year 1979\". It is signed by \"The merchant guild of Parswick\". These were better times indeed.";
    }
}

class RockPick extends Item {
    constructor() {
        super("rockPick", "rock pick");
        this.description = "It looks rather like a hammer. If you were to describe it, that is probably the word you would use."; 
    }
}

class Safe extends LockableItem { // TODO combination lock!
    constructor() {
        super("safe", "safe", true, true, AccessState.LOCKED, "", "1979");
        this.containedItems = ["houseHistoryBook"];
    }

    beforeExamine(context) {
        var s = "The old safe is painted black. Its heavy steel door ";
        if (this.state == AccessState.OPEN) {
            s += "is open.";
        }
        else {
            s += "has golden details, and a sign saying \"Samuel Withers & Co. Ltd. West Bromwich\". It has a dial for entering the correct combination and a large handle for opening the door.";
        }
        this.description = s;
    }
}

class Sink extends Item {
    constructor() {
        super("sink", "sink", true, true);
        this.description = "The stainless steel sink has a strange coloration at one end. You have a faint memory of pouring some kind of paint into it it an early age. The tap provides cold water only. On the sink there is a small water cooker.";
    }
}

class Stones extends Item {
    constructor() {
        super("stones", "stones", false, true);
        this.description = "Your old stone collection. To be honest, you could probably go out to the square outside and pick these three rocks in just a few minutes. Come to think of it, that is probably exactly how they ended up in your possession.";
    }
}

class Table extends Item {
    constructor() {
        super("table", "table", true, true);
        this.description = "Its worn surface is covered by the doodles that you placed there in your childhood, while spending many long hours waiting for your parents to finish their business in the bookshop.";
    }
}

class Toilet extends Item {
    constructor() {
        super("toilet", "toilet bowl", true);
        this.description = "Well... let's just say that it does it's job."; 
    }
}

class Towel extends Item {
    constructor() {
        super("towel", "", true);
        this.description = "You really ought to change the towel hanging next to the sink."; 
    }
}

class TravelShelf extends Item {
    constructor() {
        super("travelShelf", "travel shelf", true, true);
        this.description = "Oh, the books in this shelf. How you have read them, some from cover to cover, others more haphazardly, wishing that you were somewhere other than in this dreary town.";
    }
}

class TravelWindow extends Item {
    constructor() {
        super("travelWindow", "", true, true);
        this.description = "Through the window, you can see the street outside, currently covered in a thin white layer of snow.";
        this.isWindow = true;
    }
}

class Wall extends Item {
    constructor() {
        super("wall", "wall", true, false);
        this.hitIsVisible = false;
        this.verbHit.caption = "Hit";
    }

    beforeExamine(context) {
        if (context.flags.has(Flag.WALL_BROKEN)) {
            this.description = "There is a hole in the wall, large enough to enter.";
        }
        else {
            this.description = "When you look closer at the wall, one section of it looks newer than the rest.";
            this.hitIsVisible = true;
        }
    }

    verbHit(context) {
        this.private.do("hit", context, () => {
            if (!context.isItemInInventory("rockPick")) {
                context.setMessage("You knock at the wall. When you knock in the middle of the newer section, it sounds hollow. When you look closer, it actually has the shape of a door. Could the book be right?");
            }
            else if (context.flags.has(Flag.UNCLE_AILBERT_INTRODUCED)) {
                context.setMessage("You really don't want to smash the wall in uncle Ailbert's presence.");
            }
            else if (context.flags.has(Flag.UNCLE_AILBERT_GONE)) {
                context.setMessage("You hit the wall with the axe until the door-shaped section has been demolished. Behind it, you see only darkness.");
                context.flags.add(Flag.WALL_BROKEN);
                this.hitIsVisible = false;
            }
            else {
                context.setMessage("As you are about to hit the wall, the entrance door bell chimes. You take a short pause, then walk out to meet your presumed customer. It turns out to be your uncle Ailbert.");
                context.allCharacters["uncleAilbert"].isVisible = true;
                context.flags.add(Flag.UNCLE_AILBERT_INTRODUCED);
                context.moveTo("fictionSection");
            }
        });
    }

    verbHitVisible(context) {
        return this.hitIsVisible;
    }
}

class WaterCooker extends Item {
    constructor() {
        super("waterCooker", "water cooker", true, true);
        this.description = "You have used this water cooker to make your tea for at many years. A trusty friend."; 
        this.verbMakeTea.caption = "Make tea";
    }

    verbMakeTea(context) {
        this.private.do("makeTea", context, () => {
            if (context.location("kitchen").hasCharacter("uncleAilbert") && context.flags.has(Flag.UNCLE_AILBERT_INTRODUCED)) {
                context.setMessage("You make some tea and offer it to uncle Ailbert who drinks it a bit hesitantly. After a while, he excuses himself and enters the bathroom. You hear him lock the door.");
                context.allCharacters["uncleAilbert"].isVisible = false;
                context.allItems["bathroomDoor"].isVisible = false;
                context.flags.delete(Flag.UNCLE_AILBERT_INTRODUCED);
                context.flags.add(Flag.UNCLE_AILBERT_GONE);
            }
            else {
                context.setMessage("You make yourself a cup of tea. It tastes lovely.");
            }
        });
    }

    verbMakeTeaVisible(context) {
        return context.flags.has(Flag.MAKE_TEA_POSSIBLE);
    }
}
