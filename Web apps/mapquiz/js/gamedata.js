GameState = {
    NONE: 0,        // "Start new game" is visible
    INPROGRESS: 1,  // Waiting for an answer
    PENDING: 2,     // Displaying result, waiting for a new question
    QUITREQUEST: 3, // The user clicked "Quit" and the "really quit?" dialog is visible 
    FINISHED: 4     // Displaying the final score
} 

var gamedata = {
    serverif: null,
    mapdata: null,
    file: null,
    image_container: null,
    empty_image: null,
    answeredSoFar: 0,
    score: 0,
    last_score: 0,
    last_distance: 0,
    gameState: GameState.NONE,
    noOfQuestions: 10,

    initialize: function(mapdata, serverif) {
        this.mapdata = mapdata;
        this.serverif = serverif;
        this.image_container = document.getElementById("image_container");
        this.empty_image = new Image();
        this.empty_image.setAttribute("class", "image");
        this.empty_image.src = "/mapquiz/static/loading.png";
    },

    loadImage: function(url) {
        gamedata.image_container.replaceChild(this.empty_image, gamedata.image_container.firstChild);
        var img = new Image();
        img.setAttribute("class", "image");
        img.onload = function () { 
            gamedata.image_container.replaceChild(img, gamedata.image_container.firstChild);
        };
        img.src = url;
    },

    getFile: function() {
        if (this.answeredSoFar < this.noOfQuestions) {
            var res = this.serverif.getFile();
            this.file = res;
            this.loadImage(this.file.url);
            this.gameState = GameState.INPROGRESS;
        }
        else {
            this.gameState = GameState.NONE;
        }        
    },

    answer: function() {
        res = this.serverif.getScore(this.file.id, mapdata.circle.center);
        this.last_score = res.score;
        this.last_distance = Math.floor(res.distance);
        this.score += this.last_score;
        this.answeredSoFar += 1;
        mapdata.removeCircle();
        if (this.answeredSoFar < this.noOfQuestions) {
            this.gameState = GameState.PENDING;
        }
        else {
            this.gameState = GameState.FINISHED;
        }        
    },

    restart: function() {
        this.answeredSoFar = 0;
        this.score = 0;
        this.getFile();
    },

    ask_quit: function() {
        this.gameState = GameState.QUITREQUEST;
    },

    dont_quit: function() {
        this.gameState = GameState.INPROGRESS;
    },

    quit: function() {
        this.gameState = GameState.NONE;
        mapdata.removeCircle();
    },

    gsNone: function() {
        return gamedata.gameState === GameState.NONE;
    },

    gsInProgress: function() {
        return gamedata.gameState === GameState.INPROGRESS;
    },

    gsPending: function() {
        return gamedata.gameState === GameState.PENDING;
    },

    gsQuitRequest: function() {
        return gamedata.gameState === GameState.QUITREQUEST;
    },

    gsFinished: function() {
        return gamedata.gameState === GameState.FINISHED;
    }

};