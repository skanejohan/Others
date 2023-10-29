var fictionSection = {
    image: loadImage("fiction-section"),

    name: "\"Fiction\" section",

    fixedObjects: [
        {
            left: 82, top: 106, right: 166, bottom: 318, description: [ 
                "This section is filled with literary fiction - shelf", 
                "after shelf of romance, crime and drama." ]
        },
        {
            left: 377, top: 280, right: 665, bottom: 440, description: [
                "A small coffee table and two rickety chairs. This is", 
                "where you intend to serve your loyal customers a cup", 
                "of tea or coffee, and maybe a homemade biscuit or two,",
                "while they ponder on their purchases or just enjoy the",
                "literary ambience. This assumes, of course, that you",
                "have any loyal customers. Hardly anyone has used this", 
                "table since you placed it there, nearly two years ago."]
        },
        {
            left: 516, top: 71, right: 600, bottom: 187, description: [
                "Through the window, you can see the large square, and", 
                "the beatiful old Gothic cathedral at the other side of", 
                "it. Tourists are milling about, but as usual nobody", 
                "seems to notice your fine establishment."]
        },
        {
            left: 343, top: 83, right: 455, bottom: 278, description: [
                "This is the main entrance to your bookshop. You see a", 
                "sign that says \"Closed\". Luckily, that means that it", 
                "says \"Open\" on the other side. Above the door is a", 
                "small bell to indicate when a customer enters. Too", 
                "rarely does it make a sound."]
        },
        {
            left: 219, top: 92, right: 300, bottom: 138, description: [
                "This is a small copper plaque, on which is inscribed", 
                "\"Parswick Books - City Centre merchant of the year", 
                "1979\". It is signed by \"The merchant guild of ", 
                "Parswick\". These were better times indeed."]
        }
    ],

    initialize() {
        this.exits = [
            {
                rect: leftExitRect, leadsTo: travelAndLanguageSection
            },
            {
                rect: rightExitRect, leadsTo: artAndArchitectureSection
            },
            {
                rect: bottomExitRect, leadsTo: kitchen
            }
        ]
    }
}