var language = {
    start: function() { 
        return "Starta nytt spel" 
    },

    guessWhere: function() { 
        return "Klicka i kartan för att gissa var jag är!" 
    },

    answered: function() {
        return "Besvarade: " + gamedata.answeredSoFar 
    },

    score: function() {
        return "Poäng: " + gamedata.score
    },

    answer: function() {
        return "Svara"
    },

    reallyQuit: function() {
        return "Vill du verkligen avsluta?"
    },

    yes: function() {
        return "Ja"
    },

    no: function() {
        return "Nej"
    },

    quit: function() {
        return "Avsluta"
    },

    result: function() {
        var res = "";
        if (gamedata.last_score == 100)
            res = "Perfekt! Du får 100 poäng!"
        else if (gamedata.last_score > 0)
            res = "Nära. Du får " + gamedata.last_score + " poäng."
        else
            res = "Tyvärr, det var inte rätt."
        return res + " Bilden föreställer " + gamedata.file.solution;
    },

    next: function() {
        return "Nästa"
    },

    finalscore: function() {
        return "Du fick totalt " + gamedata.score + " poäng"
    },

    post_fb: function() {
        return "Facebook"
    },

    facebook_message: function(score, total) {
        var level;
        var levels = [
            'turist',
            'erfaren turist',
            'resenär',
            'go gubbe',
            'Sten-Åke Cederhök'
        ];
        var percent = (score / total);
        if (percent <= 30) level = levels[0];
        else if (percent <= 50) level = levels[1];
        else if (percent <= 70) level = levels[2];
        else if (percent <= 90) level = levels[3];
        else level = levels[4];
        return 'Jag fick ' +  score.toString() + ' av ' + (100 * total).toString() + 
            ' vilket ger mig en rang av ' + level;
    }

};