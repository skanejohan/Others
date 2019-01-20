/*
  "Inside Dr No":
  During first week of January 1962, the crew flies to Jamaica
  Filming begins on January 16 - scene 39, Bond walking past the photographer at the airport.
  January 24, shooting in the music club starts
  January 26: filming of Bond's arrival at King's House.
  Feb 12: crew moves to nw Jamaica, to the vancey (?) swamp in Falmouth
  Reynolds Bauxite Docks, Ocho Rios
  Feb 26 filming begins at Pinewood, scene with M and major Boothroyd
  Mar 2, introduction as James Bond, card game.
  Oct 6, 1962 premiere at the London Pavillion Cinema, Piccadilly Circus

  Released by United Artists - Filmed in Jamaica and at Pinewood Studios, London, England
*/

const dn = {
    name: "Dr. No",
    year: 1962,
    scenes : [
        {
            // 00:00:00
            title: "Gun-barrel sequence",
            description: "The first version of the gun-barrel sequence has stunt man Bob Simmons perform the action. This time there is no pre-title sequence, but the main theme is played immediately after.",
        },
        {
            // 00:02:25
            title: "Three Blind Mice",
            description: "We see the \"three blind mice\" walking through Kingston, Jamaica. They walk along Harbour Street, at one point passing the [statue of Sir Charles Metcalfe|metcalfe]. At the time, this was placed at the end of King Street, but has since been moved to St. William Grant Park. Eventually, they end up at the [\"Queens Club\"|liguanea] - today the Liguanea Club - where Strangways is a member. They kill him and drive away in the hearse. The \"blind mouse\" in the red cap was actually a dentist, among whose patients was Timothy Moxon, who played Strangways.",
        },
        {
            // 00:04:12
            title: "Strangways",
            description: "The three blind mice continue to Strangways' house where they kill his secretary and grab his files on Dr. No and Crab Key. The house no longer exists, but stood on [Kinsale Avenue|kinsale] in northern Kingston. It was owned at the time by Dolores Keator, who plays Strangways' secretary.",
        },
        {
            // 00:05:20
            title: "London",
            description: "We cut to London, with a view of the [Houses of Parliament|hp], shot from across the Thames. Here, MI6 is informed about the broken transmission from Jamaica.",
        },
        {
            // 00:06:25
            title: "\"Bond, James Bond\"",
            description: "The famous introduction to the world's least secret agent was recorded at Pinewood Studios, which acted as the [Les Ambassadeurs|lesamb] club in Mayfair, London. The exterior shot of the \"Le Cercle, Les Ambassadeurs, London\" sign was recorded at the correct spot. According to the 2000 documentary \"Inside Dr. No\", Albert Broccoli's then partner Irwin Allen had previously met with Fleming at the Les Ambassadeurs club, at that moment telling him that the Bond novels were not even good enough for television...",
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
            description: "Bond's flight lands at the [Norman Manley International Airport|airport] in Kingston. After passing the mysterious photographer, played by Marguerite Lewars, he is picked up by \"Mr. Jones, chauffeur from Government House\". A call to the Principal Secretary reveals that no car has been sent to meet him. Mr Jones is played by Reggie Carter, who was actually the brother-in-law of Marguerite Lewars. This scene also introduces an as yet unnamed Felix Leiter.",
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
            description: "At his hotel, Bond has \"one medium dry vodka martini, mixed like you said Sir, not stirred\". Here, he also does some actual spy stuff to be able to detect if anyone later breaks into his room."
        },
        {
            // 00:25:05
            title: "Fishing",
            description: "At the [\"Queens Club\"|liguanea], Bond meets with Strangways' fellow card players who tell him about Quarrel and Strangways' new-found interest in fishing."
        },
        {
            // 00:25:50
            title: "Quarrel",
            description: "The scenes where Bond meets Quarrel, Pussfeller and Leiter are shot around today's [Morgan's Harbour Hotel|morgan]."
        },
        {
            // 00:30:10
            title: "Jump Up!",
            description: "Bond, Quarrel and Leiter discuss their findings. The mysterious photographer appears again, and Bond takes her film."
        },
        {
            // 00:34:20
            title: "A failed attempt",
            description: "As Bond returns to his hotel, the three blind mice are there to assassinate him, but they are interrupted by a passing car."
        },
        {
            // 00:34:45
            title: "Rock samples",
            description: "Bond visits professor Dent in his laboratory to inquire about the recepit found at Strangways' home."
        },
        {
            // 00:36:15
            title: "Professor in a hurry",
            description: "After Bond's visit, Professor Dent hurries to Crab Key. " // TODO WHERE DOES HE CATCH THE BOAT?
        },
        {
            // 00:36:50
            title: "Crab Key",
            description: "Professor Dent arrives at \"Crab Key\" by way of [Reynold's Pier|reynold], previously home to a bauxite mining company. In 2016, Reynold's Pier was renovated and is now one of the major cruise ship ports in Jamaica. When looking at these scenes, it is very evident that all shots were cautiously taken out to sea. Had they been taken towards land, it would have shattered the illusion of Crab Key as a remote little island. At Crab Key, Professor Dent is handed the spider with which to kill Bond.",
        },
        {
            // 00:39:45
            title: "A furry friend",
            description: "Back at the hotel Bond realizes that someone has been in his room before calmly having another drink (this time he mixes it himself). During the night he is awoken by the infamous spider, presumably placed there by Professor Dent.",
        },
        {
            // 00:42:55
            title: "Lost files",
            description: "At Government House, Bond asks for all information on Dr. No and Crab Key. The information has mysteriously disappeared, and Bond begins to suspect Ms. Taro.",
        },
        {
            // 00:44:55
            title: "Radioactivity",
            description: "Back at [Quarrel's boat|quarrel], Bond realizes that the rock samples brought back from Crab Key, that were dismissed by Professor Dent, were radioactive. He persuades Quarrel to take him to Crab Key.",
        },
        {
            // 00:46:25
            title: "Ms. Taro",
            description: "Back at his hotel, Bond calls Ms. Taro who asks him to see her at her apartment, as \"it is lovely up here in the mountains\". We see him make a left turn at the [cement factory|cement] as per Ms. Taro's instructions.",
        },
        {
            // 00:47:45
            title: "On their way to a funeral",
            description: "On his way to ms. Taro's house, Bond manages to shake off his followers, having them crash their car with a fatal outcome.",
        },
        {
            // 00:49:25
            title: "An unexpected visitor",
            description: "Bond arrives at Ms Taro's house, which in reality was the hotel (today [Couples Sans Souci hotel|sans_souci]) where the crew stayed during filming. Ms. Taro is surprised to see him but allows him in. After sleeping with her, Bond hands her over to the police.",
        },
        {
            // 00:53:20
            title: "\"A Smith & Wesson\"",
            description: "Bond waits for professor Dent in Ms. Taro's house. The professor tries to kill Bond who turns the tables and coldly shoots Dent.",
        },
        {
            // 00:56:35
            title: "Sailing to Crab Key",
            description: "Bond arrives at [the docks|quarrel] where Quarrel and Leiter are waiting. They take off and when they get close to Crab Key, Leiter heads back, while Bond and Quarrel continue to the island. These scenes are shot around [Laughing Waters beach|laughing] west of Ocho Rios on the northern shore.",
        },
        {
            // 00:59:30
            title: "Sunrise",
            description: "The famous scene where Honey gets out of the water was also shot at [Laughing Waters beach|laughing], as are the scenes when they are attacked by Dr No's men.",
        },
        {
            // 01:06:05
            title: "Up the river",
            description: "The river Bond, Quarrel and Honey use when moving inland is the [White River|white_river]. This is where they hide from the dogs and where Bond eventually kills one of the guards.",
        },
        {
            // 01:09:10
            title: "Taking a bath",
            description: "When they have escaped the guards, they rest at the a waterfall. This is [Dunn's River Falls|dunn], the main [tourist attraction|tourist] in Jamaica.",
        },
        {
            // 01:09:10
            title: "The dragon",
            description: "When they leave for the dragon, we see them in the [falls|dunn], then we see scenes in the [White River|white_river] again, before they end up in the swamp. The scenes in the swamp where Quarrel gets killed were shot much farther west, in the [Vanzie Swamp|swamp] near Falmouth.",
        },
        {
            // 01:14:55
            title: "\"We didn't know when to expect you\"",
            description: "Bond and Honey are taken to Dr. No's headquarter, where they are cleaned up to get rid of radiation. They are then taken to their rooms where they are drugged and placed in their beds. This is all shot at [Pinewood Studios|pinewood] and for the first, but certainly not last, time we see some of Ken Adam's marvellous sets.",
        },
        {
            // 01:21:20
            title: "\"One million dollars, mr. Bond\"",
            description: "The whole dinner scene is shot at [Pinewood Studios|pinewood]...",
        },
        {
            // 01:21:20
            title: "Mayhem",
            description: "...as are the scenes where Bond escapes, gets into the control room, causes a disaster and kills dr. No. ",
        },
        {
            // 01:41:50
            title: "Finale",
            description: "The final scenes, when Bond has rescued Honey and everyone escape from Crab Key, are recorded at [Reynold's Pier|reynold].",
        },
        {
            title: "End credits",
            description: "\"Released by United Artists - Filmed in Jamaica and at Pinewood Studios, London, England\"",
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
            imageView: {
                title: "Photo by Johan Åhlgren, 26 December 2015.\n\nThis is as close as you get unless you are a member.",
                href: "#",
                alt: "Dr. No - Liguanea Club",
                src: "img/dn_liguanea.jpg",
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
        {
            id: "morgan",
            name: "Morgan's Harbour Hotel",
            position: {
                lat: 17.9399143,
                lng: -76.8395751,
            },
            streetView: {
                lat: 17.9399143,
                lng: -76.8395751,
            },
        },
        {
            id: "reynold",
            name: "Reynold's Pier",
            position: {
                lat: 18.410129, 
                lng: -77.114200,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 December 2015.\n\nWe see that the pier, which acts as Crab Key, is in a rather populated location,\nwhich explains why all shots are taken from the shore, out to sea.\n\nThe photo was taken from Mystic Mountain, a major tourist attraction.",
                href: "#",
                alt: "Dr. No - reynold's pier",
                src: "img/dn_reynolds.jpg",
            }
        },
        {
            id: "quarrel",
            name: "Quarrel's boat",
            position: {
                lat: 17.940610, 
                lng: -76.838721,
            }
        },
        {
            id: "cement",
            name: "Cement factory",
            position: {
                lat: 17.961552, 
                lng: -76.730102,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 26 December 2015",
                href: "#",
                alt: "Dr. No - cement factory",
                src: "img/dn_cement.png",
            },
        },
        {
            id: "sans_souci",
            name: "",
            position: {
                lat: 18.417491, 
                lng: -77.067259,
            }
        },
        {
            id: "laughing",
            name: "Laughing Waters Beach",
            position: {
                lat: 18.422675, 
                lng: -77.148348,
            }
        },
        {
            id: "white_river",
            name: "White River",
            position: {
                lat: 18.413986, 
                lng: -77.071649,
            }
        },
        {
            id: "dunn",
            movieName: "Waterfall on Crab Key",
            name: "Dunn's River Falls & Park",
            position: {
                lat: 18.415916,
                lng: -77.137944,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 22 December 2015",
                href: "#",
                alt: "Dr. No - Dunn's River Falls",
                src: "img/dn_fall.jpg",
            },
        },
        {
            id: "tourist",
            movieName: "Waterfall on Crab Key",
            name: "Dunn's River Falls & Park",
            position: {
                lat: 18.415916,
                lng: -77.137944,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 22 December 2015",
                href: "#",
                alt: "Dr. No - Dunn's River Falls",
                src: "img/dn_tourist.jpg",
            },
        },
        {
            id: "swamp",
            name: "Vanzie Swamp",
            position: {
                lat: 18.492751,
                lng: -77.673410,
            },
        },
        {
            id: "pinewood",
            name: "Pinewood Studios",
            position: {
                lat: 51.548884,
                lng: -0.535017,
            },
        },
    ]
}