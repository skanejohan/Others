var fictionSection = {

    getName() {
        return  "\"Fiction\" section";
    },

    initialize() {
        this.exits = [];
        this.objects = createObjectList();
        this.manager = createLocationManager(loadImage("loc-fiction-section"), this.objects, this.exits);

        this.objects.add( { rect: { left: 16, top: 13, width: 41, height: 67 }, description: this._literaryFictionDescription } );
        this.objects.add( { rect: { left: 218, top: 13, width: 74, height: 45 }, description: this._literaryFictionDescription } );
        this.objects.add( { rect: { left: 234, top: 58, width: 31, height: 17 }, description: this._literaryFictionDescription } );
        this.objects.add( { rect: { left: 204, top: 58, width: 30, height: 32 }, description: this._coffeeTableDescription } );
        this.objects.add( { rect: { left: 265, top: 58, width: 30, height: 32 }, description: this._coffeeTableDescription } );
        this.objects.add( { rect: { left: 234, top: 75, width: 31, height: 15 }, description: this._coffeeTableDescription } );
        this.objects.add( { rect: { left: 143, top: 17, width: 25, height: 25 }, description: this._windowsDescription } );
        this.objects.add( { rect: { left: 175, top: 17, width: 25, height: 25 }, description: this._windowsDescription } );
        this.objects.add( { rect: { left: 101, top: 19, width: 28, height: 53 }, description: this._mainEntranceDescription } );
        this.objects.add( { rect: { left: 67, top: 25, width: 22, height: 15 }, description: this._plaqueDescription } );
    
        this.exits.push({ rect: leftExitRect, leadsTo: travelAndLanguageSection });
        this.exits.push({ rect: rightExitRect, leadsTo: artAndArchitectureSection });
        this.exits.push({ rect: bottomExitRect, leadsTo: kitchen });
    },

    update() {
        this.manager.update();
    },

    render() {
        this.manager.render();
    },

    _literaryFictionDescription: 
        "This section is filled with literary fiction - shelf after shelf of romance, crime and drama.",

    _coffeeTableDescription:
        "A small coffee table and two comfortable chairs. This is where you intend to serve your loyal customers a cup of tea " + 
        "or coffee, and maybe a homemade biscuit or two, while they ponder on their purchases or just enjoy the literary ambience. " + 
        "This assumes, of course, that you have any loyal customers. Hardly anyone has used this table since you placed it there " + 
        "two years ago.",

    _windowsDescription:
        "Through the windows, you can see the large square and the beautiful old Gothic cathedral at the other side of it. " + 
        "Tourists are milling about, but as usual nobody seems to notice your fine establishment.",

    _mainEntranceDescription:
        "This is the main entrance to your bookshop. You see a sign that says \"Closed\". Luckily, that means that " + 
        "it says \"Open\" on the other side. Above the door is a small bell to indicate when a customer enters. Too " + 
        "rarely does it make a sound.",

    _plaqueDescription: 
        "This is a small copper plaque, on which is inscribed \"Parswick Books - City Centre merchant of the year 1979\". " + 
        "It is signed by \"The merchant guild of Parswick\". These were better times indeed."
}