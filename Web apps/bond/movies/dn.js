const dn = {
    scenes : [
        {
            // 00:00:00
            title: "Gun-barrel sequence",
            description: "The first version of the gun-barrel sequence has stunt man Bob Simmons perform the action. This time there is no pre-title sequence, but the main theme is played immediately after.",
        },
        {
            // 00:02:25
            title: "Three Blind Mice",
            description: "We see the \"three blind mice\" walking through Kingston, Jamaica. They walk along Harbour Street, at one point passing the [statue of Sir Charles Metcalfe|metcalfe]. At the time, this was placed at the end of King Street, but has since been moved to St. William Grant Park. Eventually, they end up at the [\"Queens Club\"|liguanea] - today the Liguanea Club - where Strangways is a member. They kill him and drive away in the hearse.",
        },
        {
            // 00:04:12
            title: "Strangways",
            description: "The three blind mice continue to Strangways' house where they kill his secretary and grab his files on Dr. No and Crab Key. The house no longer exists, but stood on [Kinsale Avenue|kinsale] in northern Kingston.",
        },
        {
            // 00:05:20
            title: "London",
            description: "We cut to London, with a view of the [Houses of Parliament|hp], shot from across the Thames. Here, MI6 is informed about the broken transmission from Jamaica.",
        },
        {
            // 00:06:25
            title: "\"Bond, James Bond\"",
            description: "The famous introduction to the world's least secret agent was recorded at Pinewood Studios, which acted as the [Les Ambassadeurs|lesamb] club in Mayfair, London. The exterior shot of the \"Le Cercle, Les Ambassadeurs, London\" sign was recorded at the correct spot.",
        },
        {
            // 00:09:20
            title: "\"This damn Beretta\"",
            description: "Here we meet M for the first time, as Bond gets briefed about the events in Jamaica. No Q in this one, but the armourer, major Boothroyd, supplies Bond with a new gun, the Walther PPK.",
        },
        {
            // 00:14:20
            title: "A game of golf",
            description: "In one of the rare occasions when we get to see Bond's apartment, Sylvia Trench is there waiting for Bond. She practices her putting skills in anticipation if his arrival.",
        },
        {
            // 00:15:45
            title: "Jamaica",
            description: "Bond's flight lands at the [Norman Manley International Airport|airport] in Kingston. He is picked up by \"Mr. Jones, chauffeur from Government House\" but a call to the Principal Secretary reveals that no car has been sent to meet him. This scene also introduces the mysterious photographer, as well as a - as yet unnamed - Felix Leiter.",
        },
        {
            // 00:17:55
            title: "\"Mr. Jones\"",
            description: "\"Mr. Jones\" drives Bond from the airport, shaking their tail on the way. When Bond confronts him, he kills himself rather than letting Bond know who he works for. These scenes are likely shot along the [Norman Manley highway|nmhighway], which leads from the airport.",
        },
        {
            // 00:21:00
            title: "Government House",
            description: "Bond arrives at [\"Government House\"|gov_house] where he meets with Pleydell-Smith and Superintendent Duff. ",
        },
        {
            // 00:22:15
            title: "Strangways' house",
            description: "Bond and Superintendent Duff visit [Strangways' house|kinsale] where Bond finds the geological connection to Professor Dent, and the picture of Strangways and Quarrel. ",
        },
        {
            // 00:23:40
            title: "\"One medium dry vodka martini\"",
            description: "At his hotel, Bond does some actual spy stuff to be able to detect if anyone later breaks into his room. The hotel  "
        },
        {
            // 00:25:05
            title: "",
            description: ""
        }
    ],
    locations: [
        {
            id: "metcalfe",
            name: "Statue of Sir Charles Metcalfe",
            position: {
                lat: 17.963709, 
                lng: -76.793368,
            },
            description: "Statue of Sir Charles Metcalfe",
            sources: ["https://www.gettyimages.com/detail/news-photo/view-of-a-statue-of-sir-charles-metcalf-and-ship-at-port-in-news-photo/589949093#/view-of-a-statue-of-sir-charles-metcalf-and-ship-at-port-in-kingston-picture-id589949093",
            "http://www.jamaicanfamilysearch.com/images/photos33.htm"], 
        },
        {
            id: "liguanea",
            name: "Queens Club",
            address: "Knutsford Boulevard, New Kingston, Kingston 5, Jamaica W.I.",
            url: "http://www.theliguaneaclub.com/",
            position: {
                lat: 18.004705, 
                lng: -76.789442,
            },
            description: "Queens Club",
        },
        {
            id: "kinsale",
            name: "Kinsale Avenue",
            position: {
                lat: 18.038589,
                lng: -76.770155,
            },
            description: "Kinsale Avenue",
        },
        {
            id: "hp",
            name: "Houses of Parliament",
            position: {
                lat: 51.499887, 
                lng: -0.124435,
                zoom: 17,
            },
            streetView: {
                lat: 51.5000167,
                lng: -0.1200933,
                zoom: 2,
            },
            description: "Houses of Parliament",
        },
        {
            id: "lesamb",
            name: "Les Ambassadeurs Club",
            position: {
                lat: 51.504425, 
                lng: -0.150407,
                zoom: 17,
            },
            streetView: {
                lat: 51.5045279,
                lng: -0.1502475,
                heading: 250,
                zoom: 3,
            },
            description: "Les Ambassadeurs Club",
        },
        {
            id: "airport",
            name: "Norman Manley International Airport",
            url: "nmia.aero",
            position: {
                lat: 17.937866, 
                lng: -76.778962,
            },
            streetView: {
            },
            description: "Norman Manley International Airport",
        },
        {
            id: "nmhighway",
            name: "The Norman Manley highway",
            position: {
                lat: 17.943593, 
                lng: -76.747634,
            },
        },
        {
            id: "gov_house",
            movieName: "Government House",
            name: "The Office Of The Governor General",
            address: "King’s House, Hope Road, Kingston 6, Jamaica",
            position: {
                lat: 18.0225406,
                lng: -76.7845049,
            },
            streetView: {
                lat: 18.0225406,
                lng: -76.7845049,
            },
            description: "Government House",
        },

        // Morgans's harbour where Bond meets Quarrel and Pussfeller - https://www.youtube.com/watch?v=rlmbuqNheic
        // The white river is where Honey and Quarrel hide from the guards
        // Reynold's Pier - Dr No's HQ
        // Laughing waters beach - underneath the mango tree
        /*locations: [
			{
                movieName: "The beach on Crab Key",
				name: "Laughing Waters Beach",
                position: new google.maps.LatLng(18.422675, -77.148348),
                description: "",
            },
			{
                movieName: "Waterfall on Crab Key",
				name: "Dunn's River Falls & Park",
                position: new google.maps.LatLng(18.415916, -77.137944),
                description: "",
            },
        ],*/
    ]
}