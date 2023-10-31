var office = {
    name: "office",
    image: loadImage("office"),

    initialize() {
        this.objects = [
            {
                rect: { left: 450, top: 80, width: 150, height: 210 }, description: [ 
                    "This old cabinet takes up a large portion of ", 
                    "the wall." ]
            },
            {
                rect: { left: 110, top: 190, width: 20, height: 20 }, description: [ 
                    "It seems that you owe the gas company pounds 19.32." ]
            },
            {
                rect: { left: 140, top: 190, width: 20, height: 20 }, description: [ 
                    "\"French president de Gaulle accuses the British", 
                    "government of lacking the necessary commitment to", 
                    "European integration\". In January of 1963.", 
                    "Well, well..." ]
            },
            {
                rect: { left: 170, top: 190, width: 20, height: 20 }, description: [ 
                    "An old bill from the phone company, for pounds 26.53." ]
            },
            {
                rect: { left: 110, top: 220, width: 20, height: 20 }, description: [ 
                    "Who would have known that the \"Benny Hill Show\" was", 
                    "cancelled in 1989? You vividly remember your parents", 
                    "dislike of the show." ]
            },
            {
                rect: { left: 140, top: 220, width: 20, height: 20 }, description: [ 
                    "This unpaid bill of pounds 35 is most likely the reason", 
                    "why the morning paper hasn't appeared in a while" ]
            },
            {
                rect: { left: 170, top: 220, width: 20, height: 20 }, description: [ 
                    "It seems like the pound hit a record high in December", 
                    "of 1957 and a record low in Febrary of 1985." ]
            },
            {
                rect: { left: 130, top: 260, width: 80, height: 30 }, description: [ 
                    "This small drawer is stuck." ]
            },
            {
                rect: { left: 100, top: 180, width: 140, height: 110 }, description: [ 
                    "The mahogany desk is cluttered with papers, mostly", 
                    "bills and clippings from old magazines. Looking through", 
                    "the piles, you realise that you have never really", 
                    "cleaned out the desk after your father's death" ]
            },
            {
                rect: { left: 110, top: 80, width: 60, height: 60 }, description: [ 
                    "The old safe is painted black. Its heavy steel door",
                    "has golden details, and a sign saying \"Samuel Withers", 
                    "& Co. Ltd. West Bromwich\". It has a dial for entering", 
                    "the correct combination and a large handle for opening", 
                    "the door." ]
            },
        ];
        this.exits = [
            {
                rect: doorExitRect, leadsTo: historySection
            }
        ]
    },

    update() {
    }
}