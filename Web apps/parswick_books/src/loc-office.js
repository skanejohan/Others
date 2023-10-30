var office = {
    name: "office",
    image: loadImage("office"),

    initialize() {
        this.objects = [
            {
                rect: { left: 450, top: 80, right: 600, bottom: 290 }, description: [ 
                    "This old cabinet takes up a large portion of ", 
                    "the wall." ]
            },
            {
                rect: { left: 100, top: 180, right: 240, bottom: 290 }, description: [ 
                    "The mahogany desk is cluttered with papers, most of", 
                    "them bills. It seems that you owe the gas company ", 
                    "£19.32 and the phone company £26.53, and the unpaid", 
                    "bill of £35 is most likely the reason why the morning", 
                    "paper hasn't appeared in a while. Looking through the", 
                    "piles, you realise that you have never really cleaned", 
                    "out the desk since your father's death. Among other", 
                    "things, you find a few old magazines - it seems like", 
                    "the pound hit a record high in December of 1957 and", 
                    "a record low in Febrary of 1985. And who would have", 
                    "known that the \"Benny Hill Show\" was cancelled in", 
                    "1989 (you vividly remember your parents dislike of", 
                    "the show)? Or that French president de Gaulle accused", 
                    "the British government of lacking the necessary commitment", 
                    "to European integration in January of 1963? Well, well...", 
                    "In the desk, there is also a small drawer." ]
            },
            {
                rect: { left: 110, top: 80, right: 170, bottom: 140 }, description: [ 
                    "The old safe is painted black. Its heavy steel door",
                    "has golden details, and a sign saying \"Samuel Withers", 
                    "& Co. Ltd. West Bromwich\". It has a dial for entering", 
                    "the correct combination and a large handle for opening", 
                    "the door." ]
            },
            {
                rect: { left: 500, top: 80, right: 620, bottom: 290 }, description: [ 
                    "Many of the books in these shelves are of the", 
                    "\"coffee table book\" variety." ]
            },
        ];
        this.exits = [
            {
                rect: { left: 343, top: 83, right: 455, bottom: 278 }, leadsTo: historySection
            }
        ]
    },

    update() {
    }
}