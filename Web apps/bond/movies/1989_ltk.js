/*
1. Banco de Isthmus is the Palacio Postal at 4 calle de Tacuba (entrance + indoor scenes)
2. The casino is the Casino Espanol de Mexico, Calle Isabel la Catolica 29
3. Sanchez's office is in Teatro de la Ciudad, 36 Donceles. This is also used for the exterior of the casino.
4. When Bond looks out through the window of Sanchez's office, we clearly see the building at 37 Calle de Tacuba.  
*/

const ltk = {
    name: "License to Kill",
    year: 1989,
    scenes : [
        {

            // 00:00:00
            title: "Gun-barrel sequence",
            description: "Timothy Dalton's second one. Still a bowtie but no hat."
        },
        {
            // 00:00:20
            title: "\"Give her his heart\"",
            description: "In the opening scene, a U.S. Border Patrol plane notices Sanchez's plane as it sets down in the Florida keys. The runway used is located at the [Sugarloaf airport|sugarloaf] at Sugarloaf key. We then cut to Bond, Leiter and Sharky on their way to Leiter's wedding. The wedding is supposed to be in Key West, but the initial shot of the limousine driving along the [seven mile|seven] bridge actually shows them driving in the wrong direction. Back to Sanchez, who is now entering the [house|lupe_house] where Lupe Lamora and her lover have an unwise rendez-vous. The indoor scenes were shot in studio. Not Pinewood this time, but on stage 2 of Estudios Churubusco in Mexico City. The helicopter that picks up Bond and Leiter lands [here|heli]. The wedding, where poor Sharky has to deal with an angry bride and her father, takes place at the [St. Mary's Star of the Sea Catholic Church|stmary] in Key West.",  
        },
        {
            // 00:03:15
            title: "On the hook",
            description: "Most of the initial action here takes place near the [Sugarloaf airport|sugarloaf]. In particular, we see [these stilted houses|stilted] in the background in some of the scenes. Once in the air, Bond eventually catches Sanchez \"on the hook\". When this is taken care of, Bond and Leiter parachute out of the helicopter, eventually landing right outside the [St. Mary's Star of the Sea Catholic Church|stmary] in time for the wedding.",
        },
        {
            // 00:08:15
            title: "Main theme", 
            description: "This one, possibly sponsored by Kodak, features the usual guns, roulette tables and silhouettes of women. Deisgned as usual by Maurice Binder."
        },
        {
            // 00:10:55
            title: "The wedding",
            description: "After seeing Sanchez trying to bribe his way out of jail, and Bond having fun at Felix and Della's wedding, we meet Pam Bouvier for the first time. The wedding scenes are shot at 707 South Street, in Key West.",
        },
        {
            // 00:13:50
            title: "Transport and escape",
            description: "We see Sanches being transported away from jail. These scenes were likely recorded at the U.S. Coast Guard station in Key West. As they drive along the bridges, we clearly see that they are using the old part of the seven mile bridge, which had been replaced by a new one a few years earlier. At this point, the old bridge was still open to traffic, it wasn't until 2008 that it was closed for motorized traffic. The point where the truck exits the road is just south of Knight Key. The underwater scenes were shot in the waters near Isla de Mujeres, off the coast of Cancun, Mexico.",
        },
        {
            // 00:17:30
            title: "Gatecrashers",
            description: "The scene where the Leiters say goodbye to Bond, and where Sanches's goons are waiting for Della and Felix is again recorded at 707 South Street in Key West."
        },
        {
            // 00:17:45
            title: "\"The first day of the rest of your life\"",
            description: "Milton Krest's warehouse is located at what is today the Conch Republic Seafood Company."
        },
        {
            // 00:21:05
            title: "\"Some big drug dealer just escaped\"",
            description: "The scene where Bond is about to fly out is recorded at Key West International Airport."
        },
        {
            // 00:21:45
            title: "\"He disagreed with something that ate him\"",
            description: "Bond returns to find Della dead and Felix barely alive. Again recorded at 707 South Street in Key West."
        },
        {
            // 00:24:55
            title: "Shark hunting",
            description: "Bond and Sharky pay a visit to the warehouse during the day, only to return during the night. Bond discovers the drugs and feeds Killifer to the sharks. ",
        },
        {
            // 00:31:30
            title: "Sharky's Charters",
            description: "Bond and Sharky discuss going after Krest. They discuss this on Sharky's boat, anchored along Charterboat Row in the City Marina.",
        },
        {
            title: "Authorities",
            description: "Bond runs into DEA agent ",
        },
        {
            title: "",
            description: "",
        },
        {
            title: "",
            description: "",
        },
        {
            title: "",
            description: "",
        },

    ],
    // lupe_house: 24.648874, -81.571494
    // stilted: https://www.google.se/maps/@24.648425,-81.5727495,3a,60y,191.98h,87.86t/data=!3m6!1e1!3m4!1sg2o74Am2IHiZQCWA7trgcQ!2e0!7i13312!8i6656
    locations: [
        {
            id: "tolsa",
            name: "Manuel Tolsá Square",
            position: {
                lat: 19.436075, 
                lng: -99.139473,
                zoom: 17,
            },
            streetView: {
                lat: 19.4358174,
                lng: -99.1389461,
                heading: 326.69,
            },
        },
    ]
}