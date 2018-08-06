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
		]
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
				name: "Parada da Artilharia Anti Aerea / Av. Dom Carlos I",
                position: new google.maps.LatLng(38.694306, -9.419764),
                description: "This is the road Bond uses to get to and from his hotel.",
            },

            // 1:25-2:15 Bond is overtaken by Tracy on her way to the beach.
            {
				name: "N247 road",
                position: new google.maps.LatLng(38.764472, -9.470995),
                description: "This is where Tracy overtakes Bond on her way to the beach.",
                sources: ["https://www.onthetracksof007.com/maps"],
                confirmed: false,
            },
            
            // 2:15-6:34 Bond rescues Tracy from the sea and fights Draco's goons
            {
				name: "Praia Grande do Guincho",
                position: new google.maps.LatLng(38.732384, -9.473209),
                description: "This is where Bond rescues Tracy di Vicenzo from the sea and fights Draco's goons.",
                sources: ["http://www.movie-locations.com/movies/o/On-Her-Majestys-Secret-Service.php"],
                confirmed: false,
            },

            // 6:34-8:58 The theme song plays.

            // 8:58-19:20 Bond arrives at the hotel, rescues Tracy at the card table, fights off Draco's goons again and goes to bed with Tracy.
			{
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
				name: "Ponte 25 de Abril",
                position: new google.maps.LatLng(38.690775, -9.177354),
                description: "When taken to Draco, Bond is driven over the 25th of April Bridge in Lissabon.",
            },

            // 19:45-20:00 Bond is taken to a meeting with Marc-Ange Draco (docks of Marseilles?) TODO

            // 20:00-25:35 Bond is meeting with Marc-Ange Draco (shot in studio)

            // 25:35-29:15 Bond fails to resign. MI6, London (shot in studio)

            // 29:15-29:30 Tracy arrives at her father's home
			{
				movieName: "The home of Marc-Ange Draco (entrance road)",
				name: "Unknown road in Portugal.",
                position: new google.maps.LatLng(38.566376, -8.729593),
                description: "This road is used by Tracy when she arrives at her father's estate.",
            },

            // 29:15-33:54 Draco's birthday party.
			{
				movieName: "The home of Marc-Ange Draco (bullfighting arena)",
                name: "Potuguese bullfighting arena",
                position: new google.maps.LatLng(38.567394, -8.724836),
                description: "This is the bullfighting arena where the scenes for Marc-Ange Draco's birthday party were shot.",
            },

            // 33:54-34:12 Bond and Tracy fall in love - riding in a park TODO

            // 34:12-34:22 Bond and Tracy fall in love - walking in a park, playing with a cat
			{
                name: "Palácio dos Marqueses da Fronteira",
                position: new google.maps.LatLng(38.740097, -9.179777),
                description: "",
            },

            // 34:22-34:27 Bond and Tracy fall in love - walking on a street - TODO

            // 34:27-34:32 Bond and Tracy fall in love - walking on a beach
			{
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
                name: "Joalharia Ferreira Marques",
                position: new google.maps.LatLng(38.712922, -9.139027),
                description: "",
            },

            // 34:47-35:10 Bond and Tracy fall in love - repeated locations
            
            // 34:47-35:10 Draco takes Bond and Tracy to Bern
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




            {
				movieName: "Solicitor Gumpold's office",
                name: "Hotel Schweizerhof",
                position: new google.maps.LatLng(46.948629, 7.440921),
                description: "",
                confirmed: false,
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
		]
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
        ]
	},
]
