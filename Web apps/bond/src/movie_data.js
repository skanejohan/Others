function time(h, m, s) {
    return new Date(2000, 1, 1, h, m, s, 0);
}

const movie_data = [
    {
		title: "Dr. No",
		year: 1962,
		locations: [
			{
				movieName: "Queens Club",
                name: "The Liguanea Club",
				address: "Knutsford Boulevard, New Kingston, Kingston 5, Jamaica W.I.",
				url: "http://www.theliguaneaclub.com/",
                position: new google.maps.LatLng(18.004705, -76.789442),
                description: "",
            },
			{
				name: "Norman Manley International Airport",
				address: "Jamaica",
				url: "nmia.aero",
                position: new google.maps.LatLng(17.937866, -76.778962),
                description: "",
            },
			{
                movieName: "Government House",
				name: "The Office Of The Governor General",
				address: "King’s House, Hope Road, Kingston 6, Jamaica",
				url: "nmia.aero",
                position: new google.maps.LatLng(17.937866, -76.778962),
                description: "",
            },
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
		],
        sequences : [
        ],
    },
    {
		title: "On her Majesty's Secret Service",
		year: 1969,
		locations: [
            // 0:00-0:40 Introduction and gun-barrel sequence.

            // 0:40-0:45 Big Ben is reflected in the "Universal Exports" sign. TODO

            // 0:45-1:20 M, Q and Moneypenny wonder where Bond is. MI6, London (shot in studio)

            // 1:20-1:25 Bond drives away from his hotel.
            {
                id: "road_from_hotel",
                name: "Parada da Artilharia Anti Aerea / Av. Dom Carlos I",
                position: new google.maps.LatLng(38.694550, -9.419931),
                description: "This is the road Bond uses to get to and from his hotel.",
            },

            // 1:25-2:15 Bond is overtaken by Tracy on her way to the beach.
            {
                id: "N247",
                name: "N247 road",
                position: new google.maps.LatLng(38.764472, -9.470995),
                description: "This is where Tracy overtakes Bond on her way to the beach.",
                sources: ["https://www.onthetracksof007.com/maps"],
                confirmed: false,
            },
            
            // 2:15-6:34 Bond rescues Tracy from the sea and fights Draco's goons
            {
                id: "fight_beach",
				name: "Praia Grande do Guincho",
                position: new google.maps.LatLng(38.732384, -9.473209),
                description: "This is where Bond rescues Tracy di Vicenzo from the sea and fights Draco's goons.",
                sources: ["http://www.movie-locations.com/movies/o/On-Her-Majestys-Secret-Service.php"],
                confirmed: false,
            },

            // 6:34-8:58 The theme song plays.

            // 8:58-19:20 Bond arrives at the hotel, rescues Tracy at the card table, fights off Draco's goons again and goes to bed with Tracy.
			{
                id: "palacio_hotel",
                name: "Palácio Estoril Hotel",
                position: new google.maps.LatLng(38.704813, -9.396409),
                description: "This is the hotel in which both Bond and Tracy live at the beginning of the movie. The images from the lobby are said to have been recorded in the hotel. Most other indoors scenes are probably recorded in the studio.",
                sources: [
                    "http://www.movie-locations.com/movies/o/On-Her-Majestys-Secret-Service.php", 
                    "http://www.jamesbondlifestyle.com/product/hotel-pal%C3%A1cio-estoril-portugal"
                ],
            },

            // 19:20-19:45 Bond is taken to a meeting with Marc-Ange Draco
			{
                id: "pte25apr",
				name: "Ponte 25 de Abril",
                position: new google.maps.LatLng(38.690775, -9.177354),
                description: "When taken to Draco, Bond is driven over the 25th of April Bridge in Lissabon.",
            },

            // 19:45-20:00 Bond is taken to a meeting with Marc-Ange Draco (docks of Marseilles?) TODO

            // 20:00-25:35 Bond is meeting with Marc-Ange Draco (shot in studio)

            // 25:35-29:15 Bond fails to resign. MI6, London (shot in studio)

            // 29:15-29:30 Tracy arrives at her father's home
			{
                id: "draco_entrance",
				movieName: "The home of Marc-Ange Draco (entrance road)",
				name: "Unknown road in Portugal.",
                position: new google.maps.LatLng(38.566376, -8.729593),
                description: "This road is used by Tracy when she arrives at her father's estate.",
            },

            // 29:15-33:54 Draco's birthday party.
			{
                id: "bullfight",
				movieName: "The home of Marc-Ange Draco (bullfighting arena)",
                name: "Portuguese bullfighting arena",
                position: new google.maps.LatLng(38.567394, -8.724836),
                description: "This is the bullfighting arena where the scenes for Marc-Ange Draco's birthday party were shot.",
            },

            // 33:54-34:12 Bond and Tracy fall in love - riding in a park TODO

            // 34:12-34:22 Bond and Tracy fall in love - walking in a park, playing with a cat
			{
                id: "love_marqueses",
                name: "Palácio dos Marqueses da Fronteira",
                position: new google.maps.LatLng(38.740097, -9.179777),
                description: "",
            },

            // 34:22-34:27 Bond and Tracy fall in love - walking on a street - TODO

            // 34:27-34:32 Bond and Tracy fall in love - walking on a beach
			{
                id: "love_beach",
                name: "Private beach",
                position: new google.maps.LatLng(38.523848, -8.738378),
                description: "",
                sources: ["https://www.onthetracksof007.com/maps"],
                confirmed: false,
            },
            
            // 34:32-34:35 Bond and Tracy fall in love - walking in a park (Palácio dos Marqueses da Fronteira)

            // 34:35-34:44 Bond and Tracy fall in love - riding in a park TODO

            // 34:44-34:47 Bond and Tracy fall in love - looking at a ring
			{
                id: "love_jewelers",
                name: "Joalharia Ferreira Marques",
                position: new google.maps.LatLng(38.712922, -9.139027),
                description: "",
            },

            // 34:47-35:10 Bond and Tracy fall in love - repeated locations


            // Bern: 

            // 35:10-35:32 Draco takes Bond and Tracy to Bern
			{
                name: "Bärengraben",
                position: new google.maps.LatLng(46.948070, 7.459631),
                description: "The car takes Bond and Tracy past the Bärengraben, an old bear pit that still houses bears.",
            },
			{
                name: "Nydeggbrücke",
                position: new google.maps.LatLng(46.948478, 7.458368),
                description: "The car takes Bond and Tracy across the Nydeggbrücke into the old city of Bern.",
            },

            // https://www.youtube.com/watch?v=fjD3NJBiEVA
            // https://www.onthetracksof007.com/maps

            //35:22 - 42:00 Bond visits solicitor Gumbold's office
			{
                name: "Heiliggeistkirche",
                position: new google.maps.LatLng(46.948127, 7.440724),
                description: "We get a quick glimpse of the bell tower of the Heiliggeitstkirche (Church of the Holy Spirit).",
            },
            {
				movieName: "Solicitor Gumpold's office (entrance)",
                id: "bollwerk15",
                name: "House on Bollwerk 15, Bern",
                position: new google.maps.LatLng(46.949359, 7.440662),
                description: "The entrance to solicitor Gumpold's office is not the Schweizerhof hotel, but an adjacent building. The Café Brésil next door is still (2018) there.",
                confirmed: false,
            },
            {
				movieName: "Solicitor Gumpold's office",
                name: "Hotel Schweizerhof",
                position: new google.maps.LatLng(46.948629, 7.440921),
                description: "Solicitor Gumpold's office is in reality the Schweizerhof hotel. Parts of the interior scenes - specifically Bond entering the elevator - also seem to have been filmed here. The hotel has since been renovated, but the elevator and the stairwell next to it can still be clearly seen.", 
                confirmed: false,
                source: "https://www.youtube.com/watch?v=agby3qCQ6YA", // JAMES BOND 007 - On Her Majesty`s Secret Service (1969) - FILM LOCATION DOCUMENTARY
            },
			{
                name: "Bern Bahnhof",
                position: new google.maps.LatLng(46.948940, 7.440281),
                description: "Bern's main railway station was being rebuilt during filming, and one of the cranes used featured in the film - the device Bond uses to crack Gumbold's safe is transported using it.",
                source: "https://www.bernerzeitung.ch/kultur/kino/Bern-im-BondFilm--damals-und-heute/story/30649899",
            },

            // TODO scene in car with Draco and Tracy, "such things should be left to a girl's father".
            {
                name: "Kramgasse",
                position: new google.maps.LatLng(),
                description: "While Bond is investigating Gumpold's office, Draco and Tracy have a discussion in the car. We can clearly see that this is taken in the Kramgasse (\"Grocer's Alley\"), a now pedestrian street. The clock tower in the background is the \"Zytglogge\", and we can also see the Simsonbrunnen (Samson fountain)."
            },



            //https://www.bernerzeitung.ch/kultur/kino/James-Bond-ist-ein-Berner/story/28818649

            //42:00 - 43:25 Bond visits M
            {
                id: "m_entrance",
                name: "Thames Lawn Estate (entrance)",
                movieName: "Entrance to M's house",
                position: new google.maps.LatLng(51.568250, -0.771983),
                description: "Bond enters M's house through an imposing gate. The gate remains today.",
            },
            {
                id: "m_house",
                name: "Thames Lawn Estate",
                movieName: "M's house",
                position: new google.maps.LatLng(51.568363, -0.770401),
                description: "An impressive building, the house that is supposed to belong to M has unfortunately burnt down since the movie was recorded. It has been replaced by a more modern, but still imposing, building.",
            },

            // 43:25-45:40 Bond visits sir Hillary Bray at the college of arms
            {
                id: "st_paul",
                name: "St. Paul's Cathedral",
                position: new google.maps.LatLng(51.513766, -0.098320),
                description: "In the establishing shot for Bond's visit to the College of Arms, we can clearly see St. Paul's Cathedral in the background.",
            },
            {
                id: "arms",
                name: "The College of Arms",
                position: new google.maps.LatLng(51.512152, -0.098734),
                description: "This location plays its correct role in the film. According to information (2018) on their web site, \"the College of Arms is the official heraldic authority for England, Wales, Northern Ireland and much of the Commonwealth including Australia and New Zealand\".",
            },

            // 45:40 - Bond arrives in Switzerland
            {
                 // 45:40
                 id: "lauterbrunnen",
                 name: "Lauterbrunnen, railway station",
                 position: new google.maps.LatLng(46.598314, 7.907782), 
                 description: "Here, Bond arrives at the Lauterbrunnen railway station and is greeted by Irma Bunt and Grunther. We can see clearly how they drive up to the main road and head south. The house we see on the left as their sled runs up the hill is the Gemeindehaus Adler, the Lauterbrunnen town hall.", 
            },
            {
                // 48:15
                id: "heli_arrive",
                name: "Bond arrives at the helicopter",
                position: new google.maps.LatLng(46.639905, 8.055360),
                description: "This scenery is rather a long way from Lauterbrunnen, where Bond arrived by train. In one scene, we see the sled arriving, and the three huts in the background, looking east, are still (2018) clearly visible."
            },

            // TODO Was the helicopter actually here?

            {
                // 49:50
                id: "birg_view",
                name: "Birg",
                position: new google.maps.LatLng(46.561823, 7.857703),
                description: "While flying to Piz Gloria, the helicopter passes above the Schilthorn cable car station at Birg. We clearly see the outdoor restaurant.",
            },


            {
                // 50:55
                id: "piz",
                name: "Piz Gloria",
                position: new google.maps.LatLng(46.557227, 7.835204),
                description: "The story of the unfinished restaurant, discovered by the film team, has been told many times. One of the most iconic locations in the whole franchise, the finalization of the restaurant was made possibly with money from the production company.",
            },

            {
                name: "Birg",
                position: new google.maps.LatLng(46.561823, 7.857703),
                description: "The scene where Campbell is denied entry by Grunther is likely recorded at the Schilthorn cable car station at Birg.",
                confirmed: false,
            },

            // TODO where does Irma Bunt say goodbye to the girls?
            {
                name: "Grindelwald",
                position: new google.maps.LatLng(46.561823, 7.857703),
                description: "When Bond has escaped down the mountain, he arrives in the small town of Grindelwald, over ten miles east of Piz Gloria, meaning that he would most likely have passed the town of Lauterbrunnen, where he arrived in Switzerland. In the first shot of the town, seen from up the mountain, we can clearly see a large house, today's Grand Hotel Regina (2018).",
            },
            {
                name: "Kino",
                position: new google.maps.LatLng(46.624402, 8.034372),
                description: "In one of the first scenes in Grindelwald, Irma Bunt is seen outside a hotel, telling her goons to \"come on\". According to https://www.youtube.com/watch?v=agby3qCQ6YA, this could be current (2014) hotel Bernerhof.",
            },

            // Inset shots of Hotel Oberland here. There is a hotel Oberland in LUTERBRUNNEN, COULD THAT BE IT?

            {
                name: "Ice rink",
                position: new google.maps.LatLng(46.624304, 8.034437),
                description: "The ice rink where Bond meets Tracy again was situated in Grindelwald, near hotel Regina, is no longer there.",
            },
            {
                id: "l_church",
                name: "Lauterbrunnen church",
                position: new google.maps.LatLng(46.592701, 7.908466),
                description: "We see an overview shot of the church in Lauterbrunnen.",
            },

            {
                id: "phone_booth",
                name: "Phone booth",
                position: new google.maps.LatLng(46.593640, 7.907140),
                description: "The phone booth used by Bond to try and contact London is no longer there.",
            },
            
            {
                id: "staubbach",
                name: "Hotel Staubbach",
                position: new google.maps.LatLng(46.593282, 7.907721),
                description: "In the scene where Bond tries to reach London, hotel Staubbach can be clearly seen in the background.",
            },

            {
                id: "jungfrau",
                name: "Hotel Jungfrau",
                position: new google.maps.LatLng(46.593942, 7.907142),
                description: "When escaping after being shot at in the phone booth, Bond and Tracy pass the hotel Jungfrau.",
            },

            {
                id: "crossing",
                name: "Road crossing",
                position: new google.maps.LatLng(46.592858, 7.907516),
                description: "After passing the hotel Jungfrau, Bond and Tracy appear in a crossing which in reality is in the other direction, and more likely the one they would have passed earlier, on their way to the phone booth.",
            },

            {
                id: "stock_car",
                name: "Stock car race",
                position: new google.maps.LatLng(46.583531, 7.913499),
                description: "This is where the stock car race was filmed.",
                source: ["https://www.onthetracksof007.com/maps", "https://007travelers.blogspot.com/2014/12/007-travel-story-lauterbrunnen.html"],
            },

            {
                name: "Barn",
                position: new google.maps.LatLng(46.755356, 7.686779),
                description: "Bond and Tracy take cover in this barn when they run out of petrol. Bond proposes to Tracy.",
            },

            {
                name: "Hillside", 
                position: new google.maps.LatLng(46.754188, 7.687437),
                description: "Blofeld and his men arrive, only to find the barn abandoned."
            },

            // TODO the bobsled race

            {
                id: "draco",
                name: "Draco's residence", 
                position: new google.maps.LatLng(38.566969, -8.730118),
                description: "The wedding party takes place on Draco's residence."
            },

            {
                name: "Tragedy", 
                position: new google.maps.LatLng(38.480622, -8.989766),
                description: "Tracy gets killed by Irma Bunt.",
            },
            
            
        ],
        sequences : [
            { 
                start: time(0, 0, 0),    
                end : time(0, 0, 40),  
                description: 'Introduction and gun-barrel sequence',
                ids: [],
            },
            { 
                start: time(0, 0, 40),   
                end : time(0, 0, 45),  
                description: 'Big Ben is reflected in the "Universal Exports" sign',
                ids: [],
            },
            { 
                start: time(0, 0, 45),   
                end : time(0, 1, 20),  
                description: 'M, Q and Moneypenny wonder where Bond is. MI6, London (shot in studio)', 
                ids: [], 
            },
            { 
                start: time(0, 1, 20),   
                end : time(0, 1, 25),  
                description: 'Bond drives away from his hotel', 
                ids: ["road_from_hotel"], 
            },
            { 
                start: time(0, 1, 25),   
                end : time(0, 2, 15),  
                description: 'Bond is overtaken by Tracy on her way to the beach', 
                ids: ["N247"], 
            },
            { 
                start: time(0, 2, 15),   
                end : time(0, 6, 34),  
                description: 'Bond rescues Tracy from the sea and fights Draco\'s goons', 
                ids: ["fight_beach"], 
            },
            { 
                start: time(0, 6, 34),   
                end : time(0, 8, 58),  
                description: 'The theme song plays', 
                ids: [], 
            },
            { 
                start: time(0, 8, 58),   
                end : time(0, 19, 20), 
                description: 'Bond arrives at the hotel, rescues Tracy at the card table, fights off Draco\'s goons again and goes to bed with Tracy', 
                ids: ["palacio_hotel"], 
            },
            { 
                start: time(0, 19, 20),  
                end : time(0, 20, 00), 
                description: 'Bond is taken to a meeting with Marc-Ange Draco',
                ids: ["pte25apr"], 
            },
            { 
                start: time(0, 20, 00),  
                end : time(0, 25, 35), 
                description: 'Bond is meeting with Marc-Ange Draco (shot in studio)', 
                ids: [], 
            },
            { 
                start: time(0, 25, 35),  
                end : time(0, 29, 15), 
                description: 'Bond fails to resign. MI6, London (shot in studio)', 
                ids: [], 
            },
            { 
                start: time(0, 29, 15),  
                end : time(0, 33, 54), 
                description: 'Bond meets Marc-Ange Draco and Tracy at Draco\'s birthday party', 
                ids: ["draco_entrance", "bullfight"], 
            },
            { 
                start: time(0, 33, 54),  
                end : time(0, 35, 10), 
                description: 'Bond and Tracy fall in love', 
                ids: ["love_marqueses", "love_beach", "love_jewelers"], 
            },
            { 
                start: time(0, 35, 10),  
                end : time(0, 35, 32), 
                description: 'Draco takes Bond and Tracy to Bern', 
                ids: ["Bärengraben", "Nydeggbrücke"], 
            },
            { 
                start: time(0, 35, 32),  
                end : time(0, 42, 0), 
                description: 'Bond visits solicitor Gumbold\'s office', 
                ids: ["Heiliggeistkirche", "bollwerk15", "Hotel Schweizerhof", "Bern Bahnhof"], 
            },
            { 
                start: time(0, 42, 0),  
                end : time(0, 43, 25), 
                description: 'Bond visits M at his house', 
                ids: ["m_entrance", "m_house"], 
            },
            { 
                start: time(0, 43, 25),  
                end : time(0, 45, 40), 
                description: 'Bond visits sir Hillary Bray at the College of Arms', 
                ids: ["st_paul", "arms"], 
            },
            {
                start: time(0, 45, 40),  
                end : time(0, 47, 32), 
                description: 'Bond arrives in Switzerland', 
                ids: ["lauterbrunnen"], 
           },
           {
                start: time(0, 47, 32),  
                end : time(0, 48, 15), 
                description: 'Bond arrives at the helicopter', 
                ids: ["heli_arrive"], 
           },
           {
                start: time(0, 48, 15),  
                end : time(0, 50, 55), 
                description: 'Bond goes by helicopter to Blofeld\'s allergy research institute', 
                ids: ["birg_view"], 
            },
            {
                start: time(0, 50, 55),  
                end : time(1, 10, 20), 
                description: 'Bond meets Blofeld and the girls', 
                ids: ["piz"], 
            },
            {
                start: time(1, 10, 20),  
                end : time(1, 11, 40), 
                description: 'Campbell tries to gain access to the clinic', 
                ids: ["birg"], 
            },
            {
                start: time(1, 11, 40),  
                end : time(1, 29, 25), 
                description: 'Bond is exposed, Campbell is killed, the girls are sent away, Bond escapes.', 
                ids: ["piz"], 
            },
            {
                start: time(1, 29, 25),  
                end : time(1, 34, 20), 
                description: 'Bond escapes down the mountains.', 
                ids: [], 
            },
            {
                start: time(1, 34, 20),  
                end : time(1, 39, 50), 
                description: 'Bond tries to escape Irma Bunt and her henchmen, then meets Tracy again.', 
                ids: ["Grindelwald", "Kino", "ice_rink"], 
            },

            {
                start: time(1, 39, 50),  
                end : time(1, 41, 25), 
                description: 'Bond tries to contacts London but gets interrupted.', 
                ids: ["l_church", "phone_booth", "staubbach", "jungfrau", "crossing"], 
            },

            {
                start: time(1, 41, 25),  
                end : time(1, 43, 35), 
                description: 'Bond and Tracy end up in a stock car race.', 
                ids: ["stock_car"], 
            },

            {
                start: time(1, 43, 35),  
                end : time(1, 48, 50), 
                description: 'Bond and Tracy hide in the barn.', 
                ids: ["Barn", "Hillside"],
            },

            {
                start: time(1, 48, 50),  
                end : time(1, 53, 22), 
                description: 'Blofeld and his men chase Bond and Tracy.', 
                ids: [],
            },

            {
                start: time(1, 53, 22),  
                end : time(1, 55, 25), 
                description: 'Bond is back in London.', 
                ids: [],
            },

            {
                start: time(1, 55, 25),  
                end : time(2, 05, 45), 
                description: 'The raid on Piz Gloria.', 
                ids: [],
            },

            {
                start: time(2, 05, 45),  
                end : time(2, 09, 35), 
                description: 'The bobsled escape.', 
                ids: [],
            },

            {
                start: time(2, 09, 35),  
                end : time(2, 12, 20), 
                description: 'The wedding.', 
                ids: ['love_jewelers', 'draco'],
            },

            {
                start: time(2, 12, 20),  
                end : time(2, 15, 00), 
                description: 'Tragedy.', 
                ids: ['Tragedy'],
            },

            {
                start: time(2, 15, 00),  
                end : time(2, 15, 40), 
                description: 'End credits.', 
                ids: [],
            },

    
        ]
    },
    {
		title: "Live and Let Die",
		year: 1973,
		locations: [
			{
				name: "Green Grotto Caves",
                position: new google.maps.LatLng(18.460957, -77.374510),
                description: "",
            },
		],
        sequences : [
        ],
	},
    {
		title: "The Man with the Golden Gun",
		year: 1974,
		locations: [
            // 0:30-7:50     James Bond Island
            // 7:50-10:15    intro
            // 10:15-14 M's office
            // 14-18:15    Beirut (cabaret)
            // 18:15-19_00: street in Beriut
            // 19_00-20:30  Qs lab
            // 20_30-20:45 Macau (sign Casino de Macau) 
            // 20:45-23:45 Lazars lab
            // -24:30  Casino
            // 24:30: Hongkong harbour
            // 25 Hong Kong Macau Hydrofoil Ltd - Mary Goodnight
            // 26:15-26_45 outside The Peninsula Hotel
            // 26:45-31:45  The Peninsula Hotel
            // Bottoms-Up Club
            // 32_22 Golden Dragon Company (street looking at club)
            // 35 Harbour (Bond)
            // 35 Harbour (Scaramanga, Djonk)
            // 37 Harbour (Bond) in boat - Bayer?
            // 38 Queen Elizabeth (stage)
            // 42:10 Hai Fat's house, Bangkok
            // 45:45 Road outside Hai Fat's house
            // 46 Peninsula Hotel (?)
            // 47: Hai Fat's house
            // 50: "school"
            // 54:19 outside school... canal, temple... canal race
            // 1:00 Hai Fat's house
            // 1:02 Hotel, Bangkok
            // 1:11 Kickboxing
            // 1:16 Outside kickboxing
            // 1:17 AMC dealer (streets of Bangkok, where?)
            // 1:21: leaving Bangkok
            // 1:23: bridge jump
            // 1:27 Queen Elizabeth
            // 1:28 South China Sea - JB island
            // 1:53 Junk
            // 1:58 Emd credits
		],
        sequences : [
        ],
	},
]
