var data = [
/*
Haverdal med Farmor och Farfar. 2010?
Hovfjället - 2009, till 30 december.
hyrd husbil 2015 (Kungälv, Olofsbo)
Kris och Luhrs bröllop - Ronneby Brunn

	{
		name: "Rådastrands camping (Björnbyn, som mormor drev)",
		start: new Date(2006, 8, 20), // TODO datum?
		end: new Date(2006, 9, 10), // TODO datum?
		locations: [
			{
				name: "Rådastrands camping",
				address: "Rådastrand, Riksväg 62, 683 93 Råda, Sweden",
				url: "radastrand.com",
				position: new google.maps.LatLng(60.016659, 13.600117),
				start: new Date(2006, 8, 20), // TODO datum?
				end: new Date(2006, 9, 10), // TODO datum?
			},
		]
	},

	{
		name: "Schack i Katrineholm",
		start: new Date(2006, 8, 20), // TODO datum?
		end: new Date(2006, 9, 10), // TODO datum?
		locations: [
			{
				name: "Hotel Statt Katrineholm",
				address: "Storgatan 20, 641 45 Katrineholm",
				url: "hotelstatt.se",
				position: new google.maps.LatLng(58.997217, 16.209595),
				start: new Date(2006, 8, 20), // TODO datum?
				end: new Date(2006, 9, 10), // TODO datum?
			},
		]
	},


	Koster + resa hem (Bengtsfors, Götene) 12-17/7 2011?
	{
		name: "Hem från Koster hos Luhrs",
		start: new Date(2006, 8, 20), // TODO datum?
		end: new Date(2006, 9, 10), // TODO datum?
		locations: [
			{
				name: "First Hotel Bengtsfors",
				address: "Karlsbergsvägen 3, 666 31 Bengtsfors",
				url: "firsthotels.se",
				position: new google.maps.LatLng(59.030004, 12.232089),
				start: new Date(2006, 8, 20), // TODO datum?
				end: new Date(2006, 9, 10), // TODO datum?
			},
			{
				name: "Hotell Gustaf",
				address: "Järnvägsgatan 2, 533 30 Götene",
				url: "hotellgustaf.se",
				position: new google.maps.LatLng(58.528807, 13.492399),
				start: new Date(2006, 8, 20), // TODO datum?
				end: new Date(2006, 9, 10), // TODO datum?
			},
		]
	},

	Tjörn med Mario?
	{
		name: "Husbilsutflykt med Mario",
		start: new Date(2017, 8, 20), // TODO datum?
		end: new Date(2017, 9, 10), // TODO datum?
		locations: [
			{
				name: "Hav & Logi Skärhamn",
				address: "Rövallen 1, 471 95 Skärhamn",
				url: "http://www.havologi.se",
				position: new google.maps.LatLng(57.970486, 11.551854),
				start: new Date(2006, 8, 20), // TODO datum?
				end: new Date(2006, 9, 10), // TODO datum?
			},
		]
	},
	*/
	{
		name: "USA (hos Richard)",
		start: new Date(2006, 8, 20), // TODO datum?
		end: new Date(2006, 9, 10), // TODO datum?
		locations: [
			{
				name: "Richard",
				address: "37, Moore Avenue, Mt Kisco, NY 10549 USA",
				url: "",
				position: new google.maps.LatLng(41.198765, -73.726930),
				start: new Date(2006, 8, 20), // TODO datum?
				end: new Date(2006, 9, 10), // TODO datum?
			},
		]
	},
	{
		name: "Italien och Österrike",
		start: new Date(2008, 6, 20), // TODO datum?
		end: new Date(2008, 7, 2), // TODO datum?
		locations: [
			{
				name: "Motel Europa",
				address: "Viale Europa, 6, 25036 Palazzolo sull'Oglio BS, Italien",
				url: "moteleuropa.it",
				position: new google.maps.LatLng(45.589656, 9.893810),
				start: new Date(2008, 6, 20), // TODO datum?
				end: new Date(2008, 6, 21), // TODO datum?
			},
			{
				name: "Goldenes Kreuz / Hotel Croce D'Oro",
				address: "Kleiner Graben, 8, 39042 Brixen, Bozen, Italien",
				url: "",
				position: new google.maps.LatLng(46.716170, 11.654616),
				start: new Date(2008, 6, 21), // TODO datum?
				end: new Date(2008, 6, 22), // TODO datum?
			},
			{
				name: "Ferienwohnung",
				address: "Luimes, Österrike",
				url: "",
				position: new google.maps.LatLng(47.172200, 11.368160),
				start: new Date(2008, 6, 22), // TODO datum?
				end: new Date(2008, 7, 2), // TODO datum?
			},
		]
	},
	{
		name: "Stockholm (Henrik Önnermark 40)",
		start: new Date(2009, 2, 2), // TODO datum?
		end: new Date(2009, 2, 4), // TODO datum?
		locations: [
			{
				name: "Crystal Plaza Hotel",
				address: "Birger Jarlsgatan 35, 111 45 Stockholm",
				url: "crystalplazahotel.se",
				position: new google.maps.LatLng(59.338263, 18.068591),
				start: new Date(2009, 2, 2), // TODO datum?
				end: new Date(2009, 2, 4), // TODO datum?
			},
		]
	},
	{
		name: "Polen med familjen Essunger",
		start: new Date(2009, 7, 8),
		end: new Date(2009, 7, 15),
		locations: [
			{
				name: "Semesterhus",
				address: "Podamirowo 6, 76-031 Dobiesławiec, Polen",
				url: "",
				position: new google.maps.LatLng(54.256486, 16.098479),
				start: new Date(2009, 7, 8),
				end: new Date(2009, 7, 15),
			},
		]
	},
	/*{
		name: "Linköping (pappa fyller 40)",
		start: new Date(2010, 0, 8),
		end: new Date(2010, 0, 10),
		locations: [
			{
				name: "Semesterhus",
				address: "Podamirowo 6, 76-031 Dobiesławiec, Polen",
				url: "",
				position: new google.maps.LatLng(54.256486, 16.098479),
				start: new Date(2010, 0, 8),
				end: new Date(2010, 0, 10),
			},
		]
	},*/
	{
		name: "Helsingborg med Mamma och Marie",
		start: new Date(2010, 6, 5), // TODO datum + plats?
		end: new Date(2010, 6, 9), // TODO
		locations: [
			{
				name: "Villa Thalassa",
				address: "Dag Hammarskjölds väg 117, 254 33 Helsingborg",
				url: "villathalassa.se",
				position: new google.maps.LatLng(56.070469, 12.675485),
				start: new Date(2010, 6, 5), // TODO
				end: new Date(2010, 6, 9), // TODO
			},
		]
	},
	{
		name: "Stockholm (Pappa springer maraton)",
		start: new Date(2010, 5, 4),
		end: new Date(2010, 5, 6),
		locations: [
			{
				name: "Scandic Foresta",
				address: "Herserudsvägen 22, 181 34 Lidingö",
				url: "scandichotels.se",
				position: new google.maps.LatLng(59.360014, 18.120433),
				start: new Date(2010, 5, 4),
				end: new Date(2010, 5, 6),
			},
		]
	},
	{
		name: "Teneriffa",
		start: new Date(2010, 11, 12),
		end: new Date(2010, 11, 19),
		locations: [
			{
				name: "Hotel Jacaranda",
				address: "Av. de Bruselas, 4-6, 38670 Plaza de las Americas, Costa Adeje, Santa Cruz de Tenerife, Santa Cruz de Tenerife, Spanien",
				url: "besthotels.es",
				position: new google.maps.LatLng(28.089175, -16.732283),
				start: new Date(2010, 11, 12),
				end: new Date(2010, 11, 19),
			},
		]
	},
	{
		name: "Venedig",
		start: new Date(2011, 5, 20), // TODO datum?
		end: new Date(2011, 5, 27), // TODO datum?
		locations: [
			{
				name: "Hotel Atlantico",
				address: "Via Andrea Bafile 3° Accesso al Mare, 30016 Lido di Jesolo VE, Italien",
				url: "hotel-atlantico.it",
				position: new google.maps.LatLng(45.504483, 12.644548),
				start: new Date(2011, 5, 20), // TODO datum?
				end: new Date(2011, 5, 27), // TODO datum?
			},
		]
	},
	{
		name: "Legoland",
		start: new Date(2011, 7, 6), // TODO datum?
		end: new Date(2011, 7, 9), // TODO datum?
		locations: [
			{
				name: "Lalandia",
				address: "Ellehammers Alle 3, 7190 Billund, Danmark",
				url: "lalandia.dk",
				position: new google.maps.LatLng(55.733272, 9.138306),
				start: new Date(2011, 7, 6), // TODO datum?
				end: new Date(2011, 7, 9), // TODO datum?
			},
		]
	},
	{
		name: "Stockholm (Pappa springer Tjurruset)",
		start: new Date(2011, 9, 7),
		end: new Date(2011, 9, 9),
		locations: [
			{
				name: "Hotel Diplomat",
				address: "Strandvägen 7C, 114 56 Stockholm",
				url: "diplomathotel.com",
				position: new google.maps.LatLng(59.331985, 18.080399),
				start: new Date(2011, 9, 7),
				end: new Date(2011, 9, 9),
			},
		]
	},
	{
		name: "Lanzarote",
		start: new Date(2012, 0, 6),
		end: new Date(2012, 0, 13), // TODO slutdatum?
		locations: [
			{
				name: "Barcelo La Galea",
				address: "Paseo Maritimo, s/n, 35508 Costa Teguise (Lanzarote), Las Palmas, Spanien",
				url: "barcelo.com",
				position: new google.maps.LatLng(28.996064, -13.488995),
				start: new Date(2012, 0, 6),
				end: new Date(2012, 0, 13), // TODO slutdatum?
			},
		]
	},
	{
		name: "Bohuslän (Påsk med Richard och Jessica)",
		start: new Date(2012, 3, 6),
		end: new Date(2012, 3, 9),
		locations: [
			{
				name: "Hafsten Resort",
				address: "Hafsten 120, 451 96 Uddevalla",
				url: "hafsten.se",
				position: new google.maps.LatLng(58.315088, 11.721627),
				start: new Date(2012, 3, 6),
				end: new Date(2012, 3, 9),
			},
		]
	},
	{
		name: "Legoland",
		start: new Date(2013, 5, 6),
		end: new Date(2013, 5, 9),
		locations: [
			{
				name: "Lalandia",
				address: "Ellehammers Alle 3, 7190 Billund, Danmark",
				url: "lalandia.dk",
				position: new google.maps.LatLng(55.733272, 9.138306),
				start: new Date(2013, 5, 6),
				end: new Date(2013, 5, 6),
			},
		]
	},
	{
		name: "Mallorca",
		start: new Date(2012, 6, 8),
		end: new Date(2012, 6, 18), // TODO slutdatum?
		locations: [
			{
				name: "Club Hotel Tonga",
				address: "Crta Alcudia Arta, s/n, 07458 Can Picafort, Mallorca,Islas Baleares, Spanien",
				url: "bghotels.com",
				position: new google.maps.LatLng(39.763053, 3.149019),
				start: new Date(2012, 6, 8),
				end: new Date(2012, 6, 18), // TODO slutdatum?
			},
		]
	},
	{
		name: "Marseille",
		start: new Date(2012, 9, 28),
		end: new Date(2012, 10, 1),
		locations: [
			{
				name: "Radisson Blu Hotel Marseille Vieux Port",
				address: "",
				url: "",
				position: new google.maps.LatLng(43.292427, 5.367340),
				start: new Date(2012, 9, 28),
				end: new Date(2012, 10, 1),
			},
		]
	},
	{
		name: "Gran Canaria",
		start: new Date(2012, 11, 31),
		end: new Date(2013, 01, 10), // TODO slutdatum?
		locations: [
			{
				name: "ClubHotel Riu Waikiki",
				address: "Av. de Gran Canaria, 20, 35100 San Bartolomé de Tirajana, Las Palmas, Spanien",
				url: "",
				position: new google.maps.LatLng(27.764132, -15.571117),
				start: new Date(2012, 11, 31),
				end: new Date(2013, 01, 10), // TODO slutdatum?
			},
		]
	},
	{
		name: "Borås (Mammas födelsedag)",
		start: new Date(2013, 1, 15),
		end: new Date(2013, 1, 17),
		locations: [
			{
				name: "Comfort Hotel Jazz",
				address: "Allégatan 21, 503 32 Borås",
				url: "nordicchoicehotels.se",
				position: new google.maps.LatLng(57.722801, 12.941275),
				start: new Date(2013, 1, 15),
				end: new Date(2013, 1, 17),
			},
		]
	},
	{
		name: "Legoland",
		start: new Date(2013, 5, 6),
		end: new Date(2013, 5, 9),
		locations: [
			{
				name: "Lalandia",
				address: "Ellehammers Alle 3, 7190 Billund, Danmark",
				url: "lalandia.dk",
				position: new google.maps.LatLng(55.733272, 9.138306),
				start: new Date(2013, 5, 6),
				end: new Date(2013, 5, 6),
			},
		]
	},
	{
		name: "Gullholmen",
		start: new Date(2013, 6, 14),
		end: new Date(2013, 6, 21),
		locations: [
			{
				name: "Gullholmsbaden - Ale kommuns stuga",
				address: "Gullholmsbaden, 474 71 Gullhomen, Sverige",
				url: "",
				position: new google.maps.LatLng(58.175556, 11.399463),
				start: new Date(2013, 6, 14),
				end: new Date(2013, 6, 21),
			},
		]
	},
	{
		name: "Danmark och Tyskland",
		start: new Date(2013, 6, 24),
		end: new Date(2013, 7, 1),
		locations: [
			{
				name: "Slottets Bed & Breakfast",
				address: "Skovbovængets Alle 4, 4000 Roskilde, Danmark",
				url: "bedandbreakfastroskilde.dk",
				position: new google.maps.LatLng(55.636180, 12.076308),
				start: new Date(2013, 6, 24),
				end: new Date(2013, 6, 27),
			},
			{
				name: "Hotel Plaza",
				address: "Østre Stationsvej 24, 5000 Odense C, Danmark",
				url: "millinghotels.dk",
				position: new google.maps.LatLng(55.400113, 10.382812),
				start: new Date(2013, 6, 27),
				end: new Date(2013, 6, 29),
			},
			{
				name: "Hotel Europa", // TODO kolla med Jannike
				address: "H P Hanssens Gade 10, 6200 Aabenraa, Danmark",
				url: "hoteleuropa.dk",
				position: new google.maps.LatLng(55.046959, 9.420094),
				start: new Date(2013, 6, 29),
				end: new Date(2013, 6, 30),
			},
			{
				name: "Hotel Astor", // TODO kolla med Jannike
				address: "Holstenpl. 1-2, 24103 Kiel, Tyskland",
				url: "nordic-hotels.com",
				position: new google.maps.LatLng(54.319933, 10.134419),
				start: new Date(2013, 6, 30),
				end: new Date(2013, 6, 31),
			},
		]
	},
	{
		name: "Stockholm (Daniels och Saras bröllop)",
		start: new Date(2013, 10, 8),
		end: new Date(2013, 10, 10),
		locations: [
			{
				name: "First Hotel Norrtull",
				address: "Sankt Eriksgatan 119, 113 43 Stockholm",
				url: "firsthotels.se",
				position: new google.maps.LatLng(59.347910, 18.040371),
				start: new Date(2013, 10, 8),
				end: new Date(2013, 10, 10),
			},
		]
	},
	{
		name: "Florida",
		start: new Date(2013, 11, 24),
		end: new Date(2014, 0, 11),
		locations: [
			{
				name: "La Costa Beach Club",
				address: "1504 North Ocean Boulevard, Pompano Beach, FL 33062, USA",
				url: "http://lacostabeachclub.net",
				position: new google.maps.LatLng(26.251484,-80.084877),
				start: new Date(2013, 11, 24),
				end: new Date(2013, 11, 25),
			},
			{
				name: "Riverside Hotel",
				address: "620 E Las Olas Blvd, Fort Lauderdale, FL 33301, USA",
				url: "http://www.hotelsone.com/fort-lauderdale-hotels-us/riverside-hotel.sv.html",
				position: new google.maps.LatLng(26.119801,-80.136344),
				start: new Date(2013, 11, 25),
				end: new Date(2013, 11, 26),
			},
			{
				name: "El Patio Motel",
				address: "800 Washington St, Key West, FL 33040, USA",
				url: "search.swiss-suites.club",
				position: new google.maps.LatLng(24.549049, -81.791744),
				start: new Date(2013, 11, 26),
				end: new Date(2013, 11, 27),
			},
			{
				name: "Lighthouse Court Hotel",
				address: "902 Whitehead St, Key West, FL 33040, USA",
				url: "http://www.historickeywestinns.com/the-inns/lighthouse-court",
				position: new google.maps.LatLng(24.550886, -81.800898),
				start: new Date(2013, 11, 27),
				end: new Date(2013, 11, 28),
			},
			{
				name: "Sea Cove Resort & Marina",
				address: "12685 Overseas Hwy, Marathon, FL 33050, USA",
				url: "http://floatingrooms.com",
				position: new google.maps.LatLng(24.731552,-81.014646),
				start: new Date(2013, 11, 28),
				end: new Date(2013, 11, 29),
			},
			{
				name: "Miami Beach Resort & Spa",
				address: "4833 Collins Ave, Miami Beach, FL 33140, USA",
				url: "http://www.miamibeachresortandspa.com",
				position: new google.maps.LatLng(25.823999,-80.121621),
				start: new Date(2013, 11, 29),
				end: new Date(2013, 11, 30),
			},
			{
				name: "Starlite Hotel",
				address: "750 Ocean Dr, Miami Beach, FL 33139, USA",
				url: "http://www.starlitehotel.com",
				position: new google.maps.LatLng(25.777653,-80.13132),
				start: new Date(2013, 11, 30),
				end: new Date(2014, 0, 1),
			},
			{
				name: "Billie Swamp Safari",
				address: "30000 Gator Tail Trl., Clewiston, FL 33440, USA",
				url: "http://www.billieswamp.com",
				position: new google.maps.LatLng(26.331288,-81.054107),
				start: new Date(2014, 0, 1),
				end: new Date(2014, 0, 2),
			},
			{
				name: "Sunset Beach Inn",
				address: "3287 W Gulf Dr, Sanibel, FL 33957, USA",
				url: "http://www.theinnsofsanibel.com/sunsetbeach",
				position: new google.maps.LatLng(26.426943,-82.100662),
				start: new Date(2014, 0, 2),
				end: new Date(2014, 0, 4),
			},
			{
				name: "Loews Royal Pacific Resort",
				address: "6300 Hollywood Way, Orlando, FL 32819, USA",
				url: "http://www.loewshotels.com/Royal-Pacific-Resort",
				position: new google.maps.LatLng(28.031702,-81.945952),
				start: new Date(2014, 0, 4),
				end: new Date(2014, 0, 8),
			},
			{
				name: "Residence Inn",
				address: "1350 N Ocean Blvd, Pompano Beach, FL 33062, USA",
				url: "http://www.marriott.com/hotels/travel/fllpb-residence-inn-fort-lauderdale-pompano-beach-oceanfront",
				position: new google.maps.LatLng(26.250122, -80.086108),
				start: new Date(2014, 0, 8),
				end: new Date(2014, 0, 10),
			},
		]
	},
	{
		name: "Mullsjö (Mammas födelsedag)",
		start: new Date(2014, 2, 21),
		end: new Date(2014, 2, 23),
		locations: [
			{
				name: "Hotell Mullsjö",
				address: "Sjövägen, 565 32 Mullsjö",
				url: "mullsjohotell.se",
				position: new google.maps.LatLng(57.904073, 13.872609),
				start: new Date(2014, 2, 21),
				end: new Date(2014, 2, 23),
			},
		]
	},
	{
		name: "Berlin över påsk",
		start: new Date(2014, 3, 18),
		end: new Date(2014, 3, 21),
		locations: [
			{
				name: "Hotel Casa Camper Berlin",
				address: "Weinmeisterstraße 1, 10178 Berlin, Tyskland",
				url: "casacamper.com",
				position: new google.maps.LatLng(52.525731, 13.404111),
				start: new Date(2014, 3, 18),
				end: new Date(2014, 3, 21),
			},
		]
	},
	{
		name: "Köpenhamn",
		start: new Date(2014, 5, 5),
		end: new Date(2014, 5, 8),
		locations: [
			{
				name: "71 Nyhavn Hotel",
				address: "Nyhavn 71, 1051 København K, Danmark",
				url: "71nyhavnhotel.dk",
				position: new google.maps.LatLng(55.679258, 12.593846),
				start: new Date(2014, 5, 5),
				end: new Date(2014, 5, 8),
			},
		]
	},
	{
		name: "Midsommarfirande hos familjen Björnström",
		start: new Date(2014, 5, 20),
		end: new Date(2014, 5, 22),
		locations: [
			{
				name: "Hotel Djingis Khan",
				address: "Margaretavägen 7, 222 40 Lund",
				url: "djingiskhan.se",
				position: new google.maps.LatLng(55.719523, 13.194838),
				start: new Date(2014, 5, 20),
				end: new Date(2014, 5, 21),
			},
			{
				name: "Scandic S:t Jörgen",
				address: "Stora Nygatan 35, 211 37 Malmö",
				url: "scandichotels.com",
				position: new google.maps.LatLng(55.603494, 13.001593),
				start: new Date(2014, 5, 21),
				end: new Date(2014, 5, 22),
			},
		]
	},
	{
		name: "Varberg (Hallifornia)",
		start: new Date(2014, 6, 16),
		end: new Date(2014, 6, 18),
		locations: [
			{
				name: "Hotell Gästis",
				address: "Borgmästaregatan 1, 432 41 Varberg",
				url: "hotellgastis.nu",
				position: new google.maps.LatLng(57.107145, 12.249027),
				start: new Date(2014, 6, 16),
				end: new Date(2014, 6, 18),
			},
		]
	},
	{
		name: "Mallorca",
		start: new Date(2014, 6, 23),
		end: new Date(2014, 7, 1),
		locations: [
			{
				name: "HM Tropical",
				address: "Carrer de Marbella, 16, 07610 Palma, Illes Balears, Spanien",
				url: "hmtropical.com",
				position: new google.maps.LatLng(39.528068, 2.732143),
				start: new Date(2014, 6, 23),
				end: new Date(2014, 7, 1),
			},
		]
	},
	{
		name: "Småland med hyrd husbil",
		start: new Date(2014, 8, 5),
		end: new Date(2014, 8, 7),
		locations: [
			{
				name: "Paula och Jan-Åke",
				address: "Kristdalavägen 12, 577 90 Hultsfred, Sverige",
				url: "",
				position: new google.maps.LatLng(57.520684, 15.971086),
				start: new Date(2014, 8, 5),
				end: new Date(2014, 8, 6)
			},
			{
				name: "Chris och Anna",
				address: "Fredsgatan 1, 598 35 Vimmerby, Sverige",
				url: "",
				position: new google.maps.LatLng(57.673178, 15.866224),
				start: new Date(2014, 8, 6),
				end: new Date(2014, 8, 7)
			},
		]
	},
	{
		name: "Legoland",
		start: new Date(2014, 8, 18),
		end: new Date(2014, 8, 21),
		locations: [
			{
				name: "Lalandia",
				address: "Ellehammers Alle 3, 7190 Billund, Danmark",
				url: "lalandia.dk",
				position: new google.maps.LatLng(55.733272, 9.138306),
				start: new Date(2014, 8, 18),
				end: new Date(2014, 8, 21),
			},
		]
	},
	{
		name: "Teneriffa över jul",
		start: new Date(2014, 11, 16),
		end: new Date(2014, 11, 28),
		locations: [
			{
				name: "Hotel Taburiente Tenerife",
				address: "Calle Dr. Jose Naveiras, 24A, 38001 Santa Cruz de Tenerife, Spanien",
				url: "hoteltaburiente.com",
				position: new google.maps.LatLng(28.473424, -16.253059),
				start: new Date(2014, 11, 16),
				end: new Date(2014, 11, 18),
			},
			{
				name: "Hotel ValleMar",
				address: "Av de Colón, 4, 38400 Puerto de la Cruz, Santa Cruz de Tenerife, Spanien",
				url: "hotelvallemar.com",
				position: new google.maps.LatLng(28.417952, -16.544375),
				start: new Date(2014, 11, 18),
				end: new Date(2014, 11, 20),
			},
			{
				name: "Sandos San Blas Nature Resort & Golf",
				address: "Urbanización San Blas, Av. de Greñamora, 1, 38639, Santa Cruz de Tenerife, Spanien",
				url: "sandos.com",
				position: new google.maps.LatLng(28.030330, -16.598563),
				start: new Date(2014, 11, 20),
				end: new Date(2014, 11, 23),
			},
			{
				name: "Sunset View Club",
				address: "Calle San Blas, s/n, 38639 Golf del Sur, 38620 Santa Cruz, Spanien",
				url: "diamondresortsandhotels.com",
				position: new google.maps.LatLng(28.028796, -16.602190),
				start: new Date(2014, 11, 23),
				end: new Date(2014, 11, 27),
			},
			{
				name: "Chayofa Country Club",
				address: "Urbanización Chayofa, Calle El Morro, 2, 38652 Arona, Santa Cruz de Tenerife, Santa Cruz de Tenerife, Spanien",
				url: "chayofacountryclub.co.uk",
				position: new google.maps.LatLng(28.074182, -16.691996),
				start: new Date(2014, 11, 27),
				end: new Date(2014, 11, 28),
			},
		]
	},
	{
		name: "Hamburg över påsk",
		start: new Date(2015, 3, 3),
		end: new Date(2015, 3, 6),
		locations: [
			{
				name: "Hamburg Marriott Hotel",
				address: "ABC-Straße 52, 20354 Hamburg, Tyskland",
				url: "marriott.com",
				position: new google.maps.LatLng(53.554634, 9.987093),
				start: new Date(2015, 3, 3),
				end: new Date(2015, 3, 6),
			},
		]
	},
	{
		name: "Varberg med Farmor och Farfar",
		start: new Date(2015, 3, 24),
		end: new Date(2015, 3, 26),
		locations: [
			{
				name: "Apelvikens Camping",
				address: "Sanatorievägen 4, 432 53 Varberg",
				url: "apelviken.se",
				position: new google.maps.LatLng(57.085433, 12.246959),
				start: new Date(2015, 3, 24),
				end: new Date(2015, 3, 26),
			},
		]
	},
	{
		name: "Köpenhamn med Mamma",
		start: new Date(2015, 4, 1),
		end: new Date(2015, 4, 3),
		locations: [
			{
				name: "Tivoli Hotel & Congress Center",
				address: "Arni Magnussons Gade 2, 1577 København V, Danmark",
				url: "tivolihotel.dk",
				position: new google.maps.LatLng(55.666490, 12.566188),
				start: new Date(2015, 4, 1),
				end: new Date(2015, 4, 3),
			},
		]
	},
	{
		name: "Småland och Öland",
		start: new Date(2015, 4, 13),
		end: new Date(2015, 4, 17),
		locations: [
			{
				name: "Vox Hotel",
				address: "Lantmätargränd 2C, 553 20 Jönköping",
				url: "voxhotel.se",
				position: new google.maps.LatLng(57.782923, 14.173167),
				start: new Date(2015, 4, 13),
				end: new Date(2015, 4, 14),
			},
			{
				name: "First Hotel Witt Kalmar",
				address: "Södra Långgatan 42, 392 31 Kalmar",
				url: "firsthotels.se",
				position: new google.maps.LatLng(56.663808, 16.367413),
				start: new Date(2015, 4, 14),
				end: new Date(2015, 4, 15),
			},
			{
				name: "Strand Hotell Borgholm",
				address: "Villagatan 4, 387 32 Borgholm",
				url: "strandborgholm.se",
				position: new google.maps.LatLng(56.878706, 16.647622),
				start: new Date(2015, 4, 15),
				end: new Date(2015, 4, 16),
			},
			{
				name: "Scandic Växjö",
				address: "Hejaregatan 19, 352 46 Växjö",
				url: "scandichotel.se",
				position: new google.maps.LatLng(56.884012, 14.760521),
				start: new Date(2015, 4, 16),
				end: new Date(2015, 4, 17),
			},
		]
	},
	{
		name: "Europa med bil (Frankrike med Essungers)",
		start: new Date(2015, 6, 4),
		end: new Date(2016, 6, 28),
		locations: [
			{
				name: "Malmö Arena Hotel",
				address: "Hyllie Boulevard 12, 216 23 Malmö",
				url: "malmoarenahotel.com",
				position: new google.maps.LatLng(55.564836, 12.975807),
				start: new Date(2015, 6, 4),
				end: new Date(2016, 6, 5),
			},
			{
				name: "City Hotel Kurfürst Balduin",
				address: "Hohenfelder Str. 12, 56068 Koblenz, Tyskland",
				url: "cityhotel-koblenz.de",
				position: new google.maps.LatLng(50.361172, 7.592841),
				start: new Date(2015, 6, 5),
				end: new Date(2016, 6, 6),
			},
			{
				name: "Hotel Moselflair",
				address: "Bergstraße 6, 56812 Cochem, Tyskland",
				url: "hotel-moselflair.de",
				position: new google.maps.LatLng(50.147762, 7.170343),
				start: new Date(2015, 6, 6),
				end: new Date(2016, 6, 8),
			},
			{
				name: "Hôtel Jean Moët",
				address: "7 Rue Jean Moët, 51200 Épernay, Frankrike",
				url: "hoteljeanmoet.com",
				position: new google.maps.LatLng(49.044095, 3.957781),
				start: new Date(2015, 6, 8),
				end: new Date(2016, 6, 9),
			},
			{
				name: "Hôtel des Trois Hiboux",
				address: "Oise - Pays de France Natural Regional Park, Astérix Park, Parc Astérix, 60128 Plailly, Frankrike",
				url: "parcasterix.fr",
				position: new google.maps.LatLng(49.129710, 2.571090),
				start: new Date(2015, 6, 9),
				end: new Date(2016, 6, 10),
			},
			{
				name: "Hôtel Ibis Chartres Centre Cathédrale",
				address: "14 Place Drouaise, 28000 Chartres, Frankrike",
				url: "accorhotels.com",
				position: new google.maps.LatLng(48.452798, 1.489463),
				start: new Date(2015, 6, 10),
				end: new Date(2016, 6, 11),
			},
			{
				name: "Lagrange Prestige - Les Hauts de la Houle",
				address: "Rue du Commandant Charcot, 35260 Cancale, Frankrike",
				url: "vacances-lagrange.com",
				position: new google.maps.LatLng(48.673280, -1.856545),
				start: new Date(2015, 6, 11),
				end: new Date(2016, 6, 18),
			},
			{
				name: "Hôtel La Palmeraie",
				address: "22 Avenue de la Côte de Nacre, 14970 Bénouville, Frankrike",
				url: "hotel-lapalmeraie.com",
				position: new google.maps.LatLng(49.248033, -0.275031),
				start: new Date(2015, 6, 18),
				end: new Date(2016, 6, 19),
			},
			{
				name: "Renaissance Brussels Hotel",
				address: "Rue du Parnasse 19, 1050 Bruxelles, Belgien",
				url: "marriott.com",
				position: new google.maps.LatLng(50.838156, 4.371605),
				start: new Date(2015, 6, 19),
				end: new Date(2016, 6, 21),
			},
			{
				name: "Colourful Bed And Breakfast",
				address: "Eerste Helmersstraat 55, 1054 DB Amsterdam, Nederländerna",
				url: "colourfulbedandbreakfast.nl",
				position: new google.maps.LatLng(52.363445, 4.875349),
				start: new Date(2015, 6, 21),
				end: new Date(2016, 6, 23),
			},
			{
				name: "Park Hotel Lübeck Am Lindenplatz",
				address: "Lindenpl. 2, 23554 Lübeck, Tyskland",
				url: "parkhotel-luebeck.de",
				position: new google.maps.LatLng(53.865974, 10.673168),
				start: new Date(2015, 6, 23),
				end: new Date(2016, 6, 24),
			},
			{
				name: "Lalandia Rødby",
				address: "Lalandia Centret 1, 4970 Rødby, Danmark",
				url: "lalandia.dk",
				position: new google.maps.LatLng(54.670150, 11.333352),
				start: new Date(2015, 6, 24),
				end: new Date(2016, 6, 26),
			},
			{
				name: "Bandholm Hotel",
				address: "Havnegade 37, 4941 Bandholm, Danmark",
				url: "bandholmhotel.dk",
				position: new google.maps.LatLng(54.836738, 11.485400),
				start: new Date(2015, 6, 26),
				end: new Date(2016, 6, 28),
			},
		]
	},
	{
		name: "Teneriffa med Mamma",
		start: new Date(2015, 9, 25),
		end: new Date(2016, 10, 1),
		locations: [
			{
				name: "Tagoro Family & Fun Costa Adeje",
				address: "Calle Galicia, 3, 38660 Costa Adeje, Santa Cruz de Tenerife, Spanien",
				url: "dreamplacehotels.com",
				position: new google.maps.LatLng(28.087854, -16.727005),
				start: new Date(2015, 9, 25),
				end: new Date(2016, 10, 1),
			},
		]
	},
	{
		name: "Utkörda hemifrån pga tjejfest - husbilen",
		start: new Date(2015, 10, 28),
		end: new Date(2015, 10, 29),
		locations: [
			{
				name: "Hafsten Resort",
				address: "Hafsten 120, 451 96 Uddevalla",
				url: "hafsten.se",
				position: new google.maps.LatLng(58.315056, 11.722576),
				start: new Date(2015, 10, 28),
				end: new Date(2015, 10, 29),
			},
		]
	},
	{
		name: "Jamaica",
		start: new Date(2015, 11, 16),
		end: new Date(2016, 0, 2),
		locations: [
			{
				name: "Tobys Resort",
				address: "1 Kent Avenue, Montego Bay, Jamaica",
				url: "tobysresorthotel-montegobay.com",
				position: new google.maps.LatLng(18.490698, -77.926854),
				start: new Date(2015, 11, 16),
				end: new Date(2015, 11, 17)
			},
			{
				name: "Travellers Beach Resort",
				address: "Norman Manley Blvd, Negril JMDWD14, Jamaica",
				url: "tbr.travel",
				position: new google.maps.LatLng(18.284631, -78.342686),
				start: new Date(2015, 11, 17),
				end: new Date(2015, 11, 21)
			},
			{
				name: "Kaz Kreol Beach Lodge",
				address: "White River Bay, Ocho Rios 0000, Jamaica",
				url: "",
				position: new google.maps.LatLng(18.414713, -77.073344),
				start: new Date(2015, 11, 21),
				end: new Date(2015, 11, 25)
			},
			{
				name: "The Spanish Court Hotel",
				address: "1 St Lucia Avenue, Kingston, Saint Andrew, 5, Jamaica",
				url: "spanishcourthotel.com",
				position: new google.maps.LatLng(18.008328, -76.783747),
				start: new Date(2015, 11, 25),
				end: new Date(2015, 11, 27)
			},
			{
				name: "Royal Decameron Club Caribbean",
				address: "Main Road, Runaway Bay, Jamaica",
				url: "decameron.com",
				position: new google.maps.LatLng(18.469348, -77.304464),
				start: new Date(2015, 11, 27),
				end: new Date(2015, 11, 30)
			},
			{
				name: "Scandic Klara",
				address: "Slöjdgatan 7, 111 57 Stockholm",
				url: "scandichotels.se",
				position: new google.maps.LatLng(59.333847, 18.062448),
				start: new Date(2015, 11, 31),
				end: new Date(2016, 0, 2)
			},
		]
	},
	{
		name: "Fredrikshavn med Mamma, Maria och Mario",
		start: new Date(2016, 1, 18),
		end: new Date(2016, 1, 20),
		locations: [
			{
				name: "Scandic The Reef",
				address: "Tordenskjoldsgade 14, 9900 Frederikshavn, Danmark",
				url: "scandichotels.dk",
				position: new google.maps.LatLng(57.439373, 10.536760),
				start: new Date(2016, 1, 18),
				end: new Date(2016, 1, 20)
			},
		]
	},
	{
		name: "Skåne och Danmark över påsk med Liljeblads",
		start: new Date(2016, 2, 24),
		end: new Date(2016, 2, 28),
		locations: [
			{
				name: "Elite Hotel Mollberg",
				address: "Stortorget 18, 251 14 Helsingborg, Sverige",
				url: "elite.se",
				position: new google.maps.LatLng(56.046851, 12.695774),
				start: new Date(2016, 2, 24),
				end: new Date(2016, 2, 25)
			},
			{
				name: "Scandic Hotel Silkeborg",
				address: "Udgårdsvej 2, 8600 Silkeborg, Danmark",
				url: "scandichotels.dk",
				position: new google.maps.LatLng(56.170600, 9.514757),
				start: new Date(2016, 2, 25),
				end: new Date(2016, 2, 27)
			},
			{
				name: "Hotel Royal",
				address: "Store Torv 4, 8000 Aarhus C, Danmark",
				url: "hotelroyal.dk",
				position: new google.maps.LatLng(56.157592, 10.210016),
				start: new Date(2016, 2, 27),
				end: new Date(2016, 2, 28)
			},
		]
	},
	{
		name: "Småland (husbil)",
		start: new Date(2016, 4, 4),
		end: new Date(2016, 4, 8),
		locations: [
			{
				name: "Villa Björkhagen",
				address: "Friggagatan 31, 554 54 Jönköping, Sverige",
				url: "villabjorkhagen.se",
				position: new google.maps.LatLng(57.787228, 14.216812),
				start: new Date(2016, 4, 4),
				end: new Date(2016, 4, 5)
			},
			{
				name: "Paula och Jan-Åke",
				address: "Kristdalavägen 12, 577 90 Hultsfred, Sverige",
				url: "",
				position: new google.maps.LatLng(57.520684, 15.971086),
				start: new Date(2016, 4, 5),
				end: new Date(2016, 4, 6)
			},
			{
				name: "Västervik Resort",
				address: "Lysingsvägen, 593 53 Västervik, Sverige",
				url: "vastervikresort.se",
				position: new google.maps.LatLng(57.737664, 16.676493),
				start: new Date(2016, 4, 6),
				end: new Date(2016, 4, 8)
			},
		]
	},
	{
		name: "Dyrön, Farmor 70 år",
		start: new Date(2016, 5, 4),
		end: new Date(2016, 5, 6),
		locations: [
			{
				name: "Annikas stuga",
				address: "Hagvägen 8, 471 43 Dyrön, Sverige",
				url: "https://www.facebook.com/pg/annikapadyron/about",
				position: new google.maps.LatLng(57.929188, 11.611811),
				start: new Date(2016, 5, 4),
				end: new Date(2016, 5, 6)
			},
		]
	},
	{
		name: "Kalifornien + New York",
		start: new Date(2016, 5, 24),
		end: new Date(2016, 6, 23),
		locations: [
			{
				name: "Pier 2620 Hotel Fisherman's Wharf",
				address: "2620 Jones St, San Francisco, CA 94133, USA",
				url: "",
				position: new google.maps.LatLng(37.805399, -122.416749),
				start: new Date(2016, 5, 24),
				end: new Date(2016, 5, 28)
			},
			{
				name: "Inns of California",
				address: "350 S Washington St, Sonora, CA 95370, USA",
				url: "",
				position: new google.maps.LatLng(37.980104, -120.381885),
				start: new Date(2016, 5, 28),
				end: new Date(2016, 5, 30)
			},
			{
				name: "Quality Inn & Suites Santa Cruz Mountains",
				address: "9733 CA-9, Ben Lomond, CA 95005, USA",
				url: "",
				position: new google.maps.LatLng(37.089875, -122.094208),
				start: new Date(2016, 5, 30),
				end: new Date(2016, 6, 1)
			},
			{
				name: "Coastview Inn",
				address: "301 Beach St, Santa Cruz, CA 95060, USA",
				url: "",
				position: new google.maps.LatLng(36.964223, -122.021118),
				start: new Date(2016, 6, 1),
				end: new Date(2016, 6, 2)
			},
			{
				name: "Silver Surf Motel",
				address: "9390 Castillo Dr, San Simeon, CA 93452, USA",
				url: "silversurfmotel.com",
				position: new google.maps.LatLng(35.613899, -121.144261),
				start: new Date(2016, 6, 2),
				end: new Date(2016, 6, 3)
			},
			{
				name: "Le Parc Suite Hotel",
				address: "733 N W Knoll Dr, West Hollywood, CA 90069, USA",
				url: "leparcsuites.com",
				position: new google.maps.LatLng(34.084264, -118.377848),
				start: new Date(2016, 6, 3),
				end: new Date(2016, 6, 6)
			},
			{
				name: "Sheraton Universal Hotel",
				address: "333 Universal Hollywood Dr, Universal City, CA 91608, USA",
				url: "sheratonuniversal.com",
				position: new google.maps.LatLng(34.137521, -118.360037),
				start: new Date(2016, 6, 6),
				end: new Date(2016, 6, 7)
			},
			{
				name: "Residence Inn by Marriott Anaheim Maingate",
				address: "1700 S Clementine St, Anaheim, CA 92802, USA",
				url: "marriott.com",
				position: new google.maps.LatLng(33.806579, -117.909014),
				start: new Date(2016, 6, 7),
				end: new Date(2016, 6, 10)
			},
			{
				name: "Jens Agby",
				address: "Sea Wind Court, Carlsbad, CA 92011, USA",
				url: "",
				position: new google.maps.LatLng(33.117831, -117.314204),
				start: new Date(2016, 6, 10),
				end: new Date(2016, 6, 19)
			},
			{
				name: "Radisson Martinique on Broadway",
				address: "49 W 32nd St, New York, NY 10001, USA",
				url: "radisson.com",
				position: new google.maps.LatLng(40.748242, -73.987779),
				start: new Date(2016, 6, 20),
				end: new Date(2016, 6, 22)
			},
		]
	},
	{
		name: "Skåne och Småland (husbil)",
		start: new Date(2016, 6, 29),
		end: new Date(2016, 7, 4),
		locations: [
			{
				name: "Farmor och Farfar",
				address: "Bankogårdsgatan 25, Helsingborg, Sverige",
				url: "",
				position: new google.maps.LatLng(56.032159, 12.745075),
				start: new Date(2016, 6, 29),
				end: new Date(2016, 6, 30)
			},
			{
				name: "SvampaCampingen",
				address: "273 97 Tomelilla",
				url: "tomelilla.se",
				position: new google.maps.LatLng(55.559237, 13.909400),
				start: new Date(2016, 6, 30),
				end: new Date(2016, 6, 31)
			},
			{
				name: "Sjöstugans Camping & Vandrarhem",
				address: "343 94 Bökhult",
				url: "sjostugan.com",
				position: new google.maps.LatLng(56.568858, 14.132451),
				start: new Date(2016, 6, 31),
				end: new Date(2016, 7, 1)
			},
			{
				name: "Växjö Swecamp Evedal",
				address: "Evedal, 352 63 Växjö",
				url: "evedalscamping.com",
				position: new google.maps.LatLng(56.922865, 14.817520),
				start: new Date(2016, 7, 1),
				end: new Date(2016, 7, 2)
			},
			{
				name: "High Chaparral",
				address: "High Chaparral, 330 31 Kulltorp",
				url: "highchaparral.se",
				position: new google.maps.LatLng(57.259675, 13.830396),
				start: new Date(2016, 7, 2),
				end: new Date(2016, 7, 4)
			},
		]
	},
	{
		name: "Fotbollsresa med MBK till England",
		start: new Date(2016, 7, 18),
		end: new Date(2016, 7, 22),
		locations: [
			{
				name: "Engelsk värdfamilj",
				address: "Shakespeare Ave, Bath BA2 4RG, Storbritannien",
				url: "",
				position: new google.maps.LatLng(51.373756, -2.363491),
				start: new Date(2016, 7, 18),
				end: new Date(2016, 7, 19)
			},
			{
				name: "Skern Lodge Outdoor Activity Centre",
				address: "Appledore, Bideford EX39 1NG, Storbritannien",
				url: "skernlodge.co.uk",
				position: new google.maps.LatLng(51.053165, -4.204548),
				start: new Date(2016, 7, 19),
				end: new Date(2016, 7, 21)
			},
			{
				name: "Engelsk värdfamilj",
				address: "Shakespeare Ave, Bath BA2 4RG, Storbritannien",
				url: "",
				position: new google.maps.LatLng(51.373756, -2.363491),
				start: new Date(2016, 7, 21),
				end: new Date(2016, 7, 22)
			},
		]
	},
	{
		name: "Maldiverna med Mamma, Maria, Mario och Nicholas",
		start: new Date(2016, 9, 30),
		end: new Date(2016, 10, 7),
		locations: [
			{
				name: "Seashore Beach Inn",
				address: "Maafushi, Maldiverna",
				url: "",
				position: new google.maps.LatLng(3.945374, 73.492261),
				start: new Date(2016, 9, 30),
				end: new Date(2016, 10, 7)
			},
		]
	},
	{
		name: "Leetspeak",
		start: new Date(2016, 9, 14),
		end: new Date(2016, 9, 15),
		locations: [
			{
				name: "First Hotel Mortensen",
				address: "Baltzarsgatan 45, 211 36 Malmö",
				url: "firsthotels.se",
				position: new google.maps.LatLng(55.604718, 13.001451),
				start: new Date(2016, 9, 14),
				end: new Date(2016, 9, 15),
			},
		]
	},
	{
		name: "La Palma",
		start: new Date(2016, 11, 23),
		end: new Date(2016, 11, 30),
		locations: [
			{
				name: "La Palma & Teneguía Princess",
				address: "Ctra. la Costa Cerca Vieja, 10, 38740 Fuencaliente de la Palma, Santa Cruz de Tenerife, Spanien",
				url: "princess-hotels.com",
				position: new google.maps.LatLng(28.501867, -17.874973),
				start: new Date(2016, 11, 23),
				end: new Date(2016, 11, 30)
			},
		]
	},
	{
		name: "Jönköping (Pappas födelsedag)",
		start: new Date(2017, 0, 14), // TODO datum?
		end: new Date(2017, 0, 15),
		locations: [
			{
				name: "Elite Stora Hotellet",
				address: "Hotellplan, 553 20 Jönköping",
				url: "elite.se",
				position: new google.maps.LatLng(57.783292, 14.169588),
				start: new Date(2017, 1, 14),
				end: new Date(2017, 1, 15),
			},
		]
	},
	{
		name: "Falkenberg, 11-årsdagen med Farmor och Farfar",
		start: new Date(2017, 3, 8),
		end: new Date(2017, 3, 9),
		locations: [
			{
				name: "Hertigen Bungalow",
				address: "Elvägen, Falkenberg, Sverige",
				url: "",
				position: new google.maps.LatLng(56.900512, 12.518918),
				start: new Date(2017, 3, 8),
				end: new Date(2017, 3, 9)
			},
		]
	},
	{
		name: "Oslo över påsk",
		start: new Date(2017, 3, 13),
		end: new Date(2017, 3, 17),
		locations: [
			{
				name: "Hotell Park Inn by Radisson",
				address: "Øvre Slottsgate 2C, 0157 Oslo, Norge",
				url: "parkinn.com",
				position: new google.maps.LatLng(59.911038, 10.740566),
				start: new Date(2017, 3, 13),
				end: new Date(2017, 3, 16)
			},
			{
				name: "Scandic Holmenkollen Park",
				address: "Kongeveien 26, 0787 Oslo, Norge",
				url: "scandichotels.no",
				position: new google.maps.LatLng(59.962803, 10.662736),
				start: new Date(2017, 3, 16),
				end: new Date(2017, 3, 17)
			},
		]
	},
	{
		name: "Legoland (husbil)",
		start: new Date(2017, 5, 2),
		end: new Date(2017, 5, 6),
		locations: [
			{
				name: "Legoland Holiday Village",
				address: "Ellehammers Alle 2, 7190 Billund, Danmark",
				url: "legoland.dk",
				position: new google.maps.LatLng(55.729693, 9.134079),
				start: new Date(2017, 5, 2),
				end: new Date(2017, 5, 6),
			},
		]
	},
	{
		name: "Midsommar",
		start: new Date(2017, 5, 23),
		end: new Date(2017, 5, 25),
		locations: [
			{
				name: "Familjen Luhr",
				address: "Onsala snäckväg 17",
				url: "",
				position: new google.maps.LatLng(57.433127, 12.043810),
				start: new Date(2017, 5, 23),
				end: new Date(2017, 5, 24),
			},
			{
				name: "Vallersvik Camping och Vandrarhem",
				address: "Vallersviksvägen 28, 439 61 Frillesås",
				url: "vallersvik.com",
				position: new google.maps.LatLng(57.320295, 12.159033),
				start: new Date(2017, 5, 24),
				end: new Date(2017, 5, 25),
			},
		]
	},
	{
		name: "Europa med husbilen",
		start: new Date(2017, 6, 1),
		end: new Date(2017, 6, 28),
		locations: [
			{
				name: "Reisemobilhafen Wohnmobil-Oase Rügen",
				address: "Proraer Chaussee 60, 18609 Ostseebad Binz, Tyskland",
				url: "reisemobilhafen-ostseebad-binz.de",
				position: new google.maps.LatLng(54.449144, 13.559387),
				start: new Date(2017, 6, 1),
				end: new Date(2017, 6, 2),
			},
			{
				name: "Comfortcamping Senftenberger See",
				address: "Senftenberger Str. 10, 01968 Senftenberg, Tyskland",
				url: "komfortcamping-see.de",
				position: new google.maps.LatLng(51.498682, 13.983877),
				start: new Date(2017, 6, 2),
				end: new Date(2017, 6, 3),
			},
			{
				name: "Camp-Pension Dana",
				address: "Trojská 357/129, 171 00 Praha-Troja, Tjeckien",
				url: "campdana.cz",
				position: new google.maps.LatLng(50.116885, 14.431657),
				start: new Date(2017, 6, 3),
				end: new Date(2017, 6, 6),
			},
			{
				name: "Neue Donau Camping",
				address: "Campingplatz Ost, 1220 Wien, Österrike",
				url: "wiencamping.at",
				position: new google.maps.LatLng(48.210152, 16.446802),
				start: new Date(2017, 6, 6),
				end: new Date(2017, 6, 8),
			},
			{
				name: "Städtisches Bad & Camping Leibnitz",
				address: "Rudolf-Hans-Bartsch-Gasse 33, 8430 Leibnitz, Österrike",
				url: "leibnitz.at",
				position: new google.maps.LatLng(46.777625, 15.530789),
				start: new Date(2017, 6, 8),
				end: new Date(2017, 6, 10),
			},
			{
				name: "Camp Lucija",
				address: "Seča 204, 6320 Portorož-Portorose, Slovenien",
				url: "camp-lucija.si",
				position: new google.maps.LatLng(45.503073, 13.591335),
				start: new Date(2017, 6, 10),
				end: new Date(2017, 6, 12),
			},
			{
				name: "Camping Miramare",
				address: "Lungomare Dante Alighieri, 29, 30013 Località Punta Sabbioni, Cavallino-Treporti VE, Italien",
				url: "camping-miramare.it",
				position: new google.maps.LatLng(45.440271, 12.423095),
				start: new Date(2017, 6, 12),
				end: new Date(2017, 6, 14),
			},
			{
				name: "Campeggio Gasparina",
				address: "Via Gasparina, 13, 37014 Castelnuovo del Garda VR, Italien",
				url: "gasparina.com",
				position: new google.maps.LatLng(45.454444, 10.698865),
				start: new Date(2017, 6, 14),
				end: new Date(2017, 6, 16),
			},
			{
				name: "Hotel Löwenhof",
				address: "Via Brennero, 60, 39040 Varna BZ, Italien",
				url: "loewenhof.it",
				position: new google.maps.LatLng(46.734934, 11.647002),
				start: new Date(2017, 6, 16),
				end: new Date(2017, 6, 19),
			},
			{
				name: "Campeggio di Merano",
				address: "Via Piave, 44, 39012 Merano BZ, Italien",
				url: "meran.eu",
				position: new google.maps.LatLng(46.662995, 11.159075),
				start: new Date(2017, 6, 19),
				end: new Date(2017, 6, 20),
			},
			{
				name: "Seecamping Bregenz",
				address: "Hechtweg 1, 6900 Bregenz, Österrike",
				url: "seecamping.at",
				position: new google.maps.LatLng(47.505330, 9.714047),
				start: new Date(2017, 6, 20),
				end: new Date(2017, 6, 21),
			},
			{
				name: "Campingplatz Rausenbach",
				address: "Rausenbachweg 8, 8124 Maur, Schweiz",
				url: "camping-rausenbach.jimdo.com",
				position: new google.maps.LatLng(47.345985, 8.669371),
				start: new Date(2017, 6, 21),
				end: new Date(2017, 6, 22),
			},
			{
				name: "Müller-See Camping und Freizeit",
				address: "Müller-See 1, 79359 Riegel am Kaiserstuhl, Tyskland",
				url: "muellersee.de",
				position: new google.maps.LatLng(48.162519, 7.742272),
				start: new Date(2017, 6, 22),
				end: new Date(2017, 6, 24),
			},
			{
				name: "Camping Indigo Strasbourg",
				address: "9 Rue de l'Auberge de jeunesse, 67200 Strasbourg, Frankrike",
				url: "camping-indigo.com",
				position: new google.maps.LatLng(48.575277, 7.716483),
				start: new Date(2017, 6, 24),
				end: new Date(2017, 6, 26),
			},
			{
				name: "Campingplatz Auf dem Simpel",
				address: "Auf dem Simpel, 29614 Soltau, Tyskland",
				url: "auf-dem-simpel.de",
				position: new google.maps.LatLng(53.022929, 9.859005),
				start: new Date(2017, 6, 26),
				end: new Date(2017, 6, 28),
			},
		]
	},
	{
		name: "ComicCon Stockholm",
		start: new Date(2017, 8, 15),
		end: new Date(2017, 8, 17),
		locations: [
			{
				name: "Grand Central by Scandic",
				address: "Kungsgatan 70, 111 20 Stockholm",
				url: "scandichotels.com",
				position: new google.maps.LatLng(59.333728, 18.055572),
				start: new Date(2017, 8, 15),
				end: new Date(2017, 8, 16),
			},
			{
				name: "Scandic Victoria Tower",
				address: "Arne Beurlings Torg 3, 164 40 Kista",
				url: "scandichotels.com",
				position: new google.maps.LatLng(59.406980, 17.957548),
				start: new Date(2017, 8, 16),
				end: new Date(2017, 8, 17),
			},
		]
	},
	{
		name: "Legoland med mamma och Jessica (husbil)",
		start: new Date(2017, 8, 29),
		end: new Date(2017, 8, 31),
		locations: [
			{
				name: "Legoland Holiday Village",
				address: "Ellehammers Alle 2, 7190 Billund, Danmark",
				url: "legoland.dk",
				position: new google.maps.LatLng(55.729941, 9.135055),
				start: new Date(2017, 8, 29),
				end: new Date(2017, 8, 29),
			},
		]
	},
	{
		name: "Sri Lanka med mamma",
		start: new Date(2017, 9, 28),
		end: new Date(2017, 10, 4),
		locations: [
			{
				name: "Calamander Unawatuna Beach",
				address: "Unawatuna, 80600, Sri Lanka",
				url: "unawatunabeachresort.com",
				position: new google.maps.LatLng(6.009855, 80.248804),
				start: new Date(2017, 9, 28),
				end: new Date(2017, 10, 2),
			},
			{
				name: "Mount Lavinia Hotel",
				address: "100 Hotel Rd, Dehiwala-Mount Lavinia, Sri Lanka",
				url: "mountlaviniahotel.com",
				position: new google.maps.LatLng(6.833491, 79.861665),
				start: new Date(2017, 10, 2),
				end: new Date(2017, 10, 4),
			},
		]
	},
	{
		name: "Gran Canaria",
		start: new Date(2017, 11, 23),
		end: new Date(2017, 11, 30),
		locations: [
			{
				name: "Hotel Paradise Costa Taurito",
				address: "Calle Alcazaba, 4, 35138 Taurito, Las Palmas, Spanien",
				url: "paradisehotels.es",
				position: new google.maps.LatLng(27.817603, -15.750591),
				start: new Date(2017, 11, 23),
				end: new Date(2017, 11, 30),
			},
		]
	},
	{
		name: "Linköping (Melwins dop)",
		start: new Date(2018, 0, 26),
		end: new Date(2018, 0, 28),
		locations: [
			{
				name: "Elite Stora Hotellet",
				address: "Stora Torget 9, 582 19 Linköping",
				url: "https://www.elite.se/sv/hotell/linkoping/stora-hotellet/",
				position: new google.maps.LatLng(58.410909, 15.622113),
				start: new Date(2018, 0, 26),
				end: new Date(2018, 0, 28),
			},
		]
	},
	{
		name: "Fuerteventura",
		start: new Date(2018, 1, 12),
		end: new Date(2018, 1, 19),
		locations: [
			{
				name: "Playitas Resort",
				address: "35629 Tuineje, Las Palmas, Spanien",
				url: "http://www.playitas.net/",
				position: new google.maps.LatLng(28.226858, -13.991994),
				start: new Date(2018, 1, 12),
				end: new Date(2018, 1, 19),
			},
		]
	},
	{
		name: "Skidåkning på Hovfjället",
		start: new Date(2018, 2, 29),
		end: new Date(2018, 3, 2),
		locations: [
			{
				name: "Hovfjället",
				address: "Överbyn 63, 685 94 Torsby",
				url: "http://www.hovfjallet.se/",
				position: new google.maps.LatLng(60.294786, 12.965671),
				start: new Date(2018, 2, 29),
				end: new Date(2018, 3, 2),
			},
		]
	},
	{
		name: "Husbilstur valborgshelgen",
		start: new Date(2018, 3, 27),
		end: new Date(2018, 4, 1),
		locations: [
			{
				name: "Prångens Camping och Stugby",
				address: "Prångenvägen 3, 523 37 Ulricehamn",
				url: "http://www.prangenscamping.se/",
				position: new google.maps.LatLng(57.802778, 13.406214),
				start: new Date(2018, 3, 27),
				end: new Date(2018, 3, 28),
			},
			{
				name: "Vadstena Camping",
				address: "Hofslagaregatan 11, 592 30 Vadstena",
				url: "http://www.vadstenacamping.se/",
				position: new google.maps.LatLng(58.468567, 14.939141),
				start: new Date(2018, 3, 28),
				end: new Date(2018, 3, 29),
			},
			{
				name: "Skeppsdockans Camping och Vandrarhem",
				address: "Dockan 1, 614 92 Söderköping",
				url: "http://www.soderkopingscamping.se/",
				position: new google.maps.LatLng(58.490455, 16.306382),
				start: new Date(2018, 3, 29),
				end: new Date(2018, 3, 30),
			},
			{
				name: "Paula och Jan-Åke",
				address: "Kristdalavägen 12, 577 90 Hultsfred, Sverige",
				url: "",
				position: new google.maps.LatLng(57.520684, 15.971086),
				start: new Date(2018, 3, 30),
				end: new Date(2018, 4, 1),
			},
		]
	},
	{
		name: "Bohuslän över Kristi Himmelsfärdshelgen",
		start: new Date(2018, 4, 9),
		end: new Date(2018, 4, 13),
		locations: [
			{
				name: "Hafsten Resort",
				address: "Hafsten 120, 451 96 Uddevalla",
				url: "hafsten.se",
				position: new google.maps.LatLng(58.316647, 11.722298),
				start: new Date(2018, 4, 9),
				end: new Date(2012, 4, 13),
			},
		]
	},
	{
		name: "Motorcykel till Danmark",
		start: new Date(2018, 4, 25),
		end: new Date(2018, 4, 27),
		locations: [
			{
				name: "Lökken Badehotel",
				address: "Torvet 8, 9480 Løkken, Danmark",
				url: "loekken-badehotel.dk",
				position: new google.maps.LatLng(57.370858, 9.711917),
				start: new Date(2018, 4, 25),
				end: new Date(2012, 4, 27),
			},
		]
	},
	{
		name: "Kortutflykt med husbilen till Askims camping",
		start: new Date(2018, 5, 8),
		end: new Date(2018, 5, 9),
		locations: [
			{
				name: "Lisebergs camping Askim Strand",
				address: "Marholmsvägen 124, 436 45 Askim",
				url: "liseberg.se",
				position: new google.maps.LatLng(57.627411, 11.921246),
				start: new Date(2018, 5, 8),
				end: new Date(2012, 5, 9),
			},
		]
	},
    // TODO Luhrs, Mölle, Ramlösa...
	{
		name: "Europaresa med husbilen",
		start: new Date(2018, 6, 6),
		end: new Date(2018, 7, 5),
		locations: [
			{
				name: "Kielfärjan",
				address: "",
				url: "stena.se",
				position: new google.maps.LatLng(56.431173, 11.349044),
				start: new Date(2018, 6, 6),
				end: new Date(2018, 6, 7),
			},
			{
				name: "Alfsee Ferien und Erlebnis Park",
				address: "Am Campingpark 10, 49597 Rieste, Tyskland",
				url: "alfsee.de",
				position: new google.maps.LatLng(52.484763, 7.988014),
				start: new Date(2018, 6, 7),
				end: new Date(2018, 6, 8),
			},
			{
				name: "De Zuidercluft",
				address: "Jonenweg 1g, 8355 CH Giethoorn, Nederländerna",
				url: "havensweerribbenwieden.nl",
				position: new google.maps.LatLng(52.721653, 6.073913),
				start: new Date(2018, 6, 8),
				end: new Date(2018, 6, 9),
			},
			{
				name: "Parking Kanaaleiland",
				address: "Bargeweg 0, 8000 Brugge, Belgien",
				url: "https://www.brugge.be/parkeren-kampeerwagens",
				position: new google.maps.LatLng(51.1966892,3.2258324),
				start: new Date(2018, 6, 9),
				end: new Date(2018, 6, 10),
			},
			{
				name: "Camping Campix",
				address: "48 Avenue Guy Môquet, 60340 Saint-Leu-d'Esserent, Frankrike",
				url: "campingcampix.com",
				position: new google.maps.LatLng(49.224587, 2.426136),
				start: new Date(2018, 6, 10),
				end: new Date(2018, 6, 12),
			},
			{
				name: "Camping de Paris",
				address: "2 Allée du Bord de l'Eau, 75016 Paris, Frankrike",
				url: "campingparis.fr",
				position: new google.maps.LatLng(48.869804, 2.235945),
				start: new Date(2018, 6, 12),
				end: new Date(2018, 6, 15),
			},
			{
				name: "Camping Val de Blois",
				address: "Le Lac de Loire, 41350 Vineuil, Frankrike",
				url: "camping-loisir-blois.com",
				position: new google.maps.LatLng(47.604991, 1.373235),
				start: new Date(2018, 6, 15),
				end: new Date(2018, 6, 16),
			},
			{
				name: "Camping Les Peupliers",
				address: "Avenue de Paris, 86700 Couhé, Frankrike",
				url: "http://camping-les-peupliers.com/",
				position: new google.maps.LatLng(46.312156, 0.178223),
				start: new Date(2018, 6, 16),
				end: new Date(2018, 6, 17),
			},
			{
				name: "Camping Tohapi La Foret du Pyla",
				address: "Avenue de Biscarrosse, 33115 La Teste-de-Buch, Frankrike",
				url: "tohapi.fr",
				position: new google.maps.LatLng(44.584626, -1.210847),
				start: new Date(2018, 6, 17),
				end: new Date(2018, 6, 18),
			},
			{
				name: "Camping Le Pavillon Royal",
				address: "Avenue Prince de Galles, 64210 Bidart, Frankrike",
				url: "pavillon-royal.com",
				position: new google.maps.LatLng(43.454771, -1.577509),
				start: new Date(2018, 6, 18),
				end: new Date(2018, 6, 19),
			},
			{
				name: "Nou Camping",
				address: "Carretera C-13, km-156, 25597 La Guingueta d'Àneu, Lérida, Spanien",
				url: "noucamping.com",
				position: new google.maps.LatLng(42.592652, 1.131717),
				start: new Date(2018, 6, 19),
				end: new Date(2018, 6, 20),
			},
			{
				name: "Càmping Santa Creu",
				address: "AD100 Canillo, Andorra",
				url: "elsmeners.com",
				position: new google.maps.LatLng(42.565335, 1.599647),
				start: new Date(2018, 6, 20),
				end: new Date(2018, 6, 22),
			},
			{
				name: "Camping La Chicanette",
				address: "7 Rue de la Chicanette, 30800 Saint-Gilles, Frankrike",
				url: "campinglachicanette.fr",
				position: new google.maps.LatLng(43.675345, 4.428642),
				start: new Date(2018, 6, 22),
				end: new Date(2018, 6, 23),
			},
			{
				name: "Camping Des Embruns",
				address: "63 Route de Biot, 06600 Antibes, Frankrike",
				url: "lesembrunscamping.jimdo.com",
				position: new google.maps.LatLng(43.612387, 7.125503),
				start: new Date(2018, 6, 23),
				end: new Date(2018, 6, 26),
			},
			{
				name: "Camping Tranquilla",
				address: "Via alle Cave, 2, 28831 Baveno VB, Italien",
				url: "tranquilla.com",
				position: new google.maps.LatLng(45.912599, 8.488642),
				start: new Date(2018, 6, 26),
				end: new Date(2018, 6, 28),
			},
			{
				name: "Rive-Bleue",
				address: "1897 Port-Valais, Schweiz",
				url: "http://www.camping-rive-bleue.ch/",
				position: new google.maps.LatLng(46.386229, 6.859643),
				start: new Date(2018, 6, 28),
				end: new Date(2018, 6, 30),
			},
			{
				name: "TCS Camping Solothurn",
				address: "Glutzenhofstrasse 5, 4500 Solothurn, Schweiz",
				url: "tcs.ch",
				position: new google.maps.LatLng(47.197697, 7.521869),
				start: new Date(2018, 6, 30),
				end: new Date(2018, 6, 31),
			},
			{
				name: "Camping Sonneneck am Haselbachsee",
				address: "Haselbach 12, 73488 Ellenberg, Tyskland",
				url: "camping-sonneneck.de",
				position: new google.maps.LatLng(48.986185, 10.215245),
				start: new Date(2018, 6, 31),
				end: new Date(2018, 7, 1),
			},
			{
				name: "Camping Furlbach",
				address: "Am Furlbach 33, 33758 Schloß Holte-Stukenbrock, Tyskland",
				url: "campingplatzamfurlbach.de",
				position: new google.maps.LatLng(51.870484, 8.671016),
				start: new Date(2018, 7, 1),
				end: new Date(2018, 7, 2),
			},
			{
				name: "Paula och Jan-Åke",
				address: "Kristdalavägen 12, 577 90 Hultsfred, Sverige",
				url: "",
				position: new google.maps.LatLng(57.520684, 15.971086),
				start: new Date(2018, 6, 17),
				end: new Date(2018, 6, 18),
			},
		]
	},
	{
		name: "Motorcykel till Danmark",
		start: new Date(2018, 7, 16),
		end: new Date(2018, 7, 17),
		locations: [
			{
				name: "Hotel Fårup",
				address: "Pirupvejen 151, 9492 Blokhus, Denmark",
				url: "faarupsommerland.dk",
				position: new google.maps.LatLng(57.270145, 9.643621),
				start: new Date(2018, 7, 16),
				end: new Date(2012, 7, 16),
			},
		]
	},
	{
		name: "Florida med mamma",
		start: new Date(2018, 9, 26),
		end: new Date(2018, 10, 4),
		locations: [
			{
				name: "Best Western Airport Inn & Suites",
				address: "8101 Aircenter Ct, Orlando, FL 32809, USA",
				url: "bworlandoairport.com",
				position: new google.maps.LatLng(28.450687, -81.356314),
				start: new Date(2018, 9, 26),
				end: new Date(2012, 9, 27),
			},
			{
				name: "Barefoot Beach Club",
				address: "13238 Gulf Blvd, Madeira Beach, FL 33708, USA",
				url: "barefootbeachclub.com",
				position: new google.maps.LatLng(27.788433, -82.787025),
				start: new Date(2018, 9, 27),
				end: new Date(2012, 9, 29),
			},
			{
				name: "The Boat House Motel",
				address: "2006, 1180 Edington Pl, Marco Island, FL 34145, USA",
				url: "theboathousemotel.com",
				position: new google.maps.LatLng(25.973193, -81.731510),
				start: new Date(2018, 9, 29),
				end: new Date(2012, 9, 30),
			},
			{
				name: "The Sea Lord Hotel & Suites",
				address: "4140 El Mar Dr, Lauderdale-By-The-Sea, FL 33308, USA",
				url: "sealordhotel.com",
				position: new google.maps.LatLng(26.185289, -80.095767),
				start: new Date(2018, 9, 30),
				end: new Date(2012, 9, 31),
			},
			{
				name: "Radisson Resort at the Port",
				address: "8701 Astronaut Blvd, Cape Canaveral, FL 32920, USA",
				url: "radisson.com",
				position: new google.maps.LatLng(28.395194, -80.612405),
				start: new Date(2018, 9, 31),
				end: new Date(2012, 10, 1),
			},
			{
				name: "Universal's Cabana Bay Beach Resort",
				address: "6550 Adventure Way, Orlando, FL 32819, USA",
				url: "universalorlando.com",
				position: new google.maps.LatLng(28.465461, -81.473651),
				start: new Date(2018, 10, 1),
				end: new Date(2012, 10, 3),
			},
		]
	},
	{
		name: "Julresa till Innsbruck",
		start: new Date(2018, 11, 21),
		end: new Date(2018, 11, 31),
		locations: [
			{
				name: "Kielfärjan",
				address: "",
				url: "stena.se",
				position: new google.maps.LatLng(56.431173, 11.349044),
				start: new Date(2018, 11, 21),
				end: new Date(2018, 11, 22),
			},
			{
				name: "Nattåg Hamburg - Innsbruck",
				address: "",
				url: "https://www.oebb.at/",
				position: new google.maps.LatLng(48.364875, 10.885127),
				start: new Date(2018, 11, 22),
				end: new Date(2012, 11, 23),
			},
			{
				name: "Altstadthotel Weisses Kreuz",
				address: "Herzog-Friedrich-Straße 31, 6020 Innsbruck, Österrike",
				url: "weisseskreuz.at",
				position: new google.maps.LatLng(47.267706, 11.393572),
				start: new Date(2018, 11, 23),
				end: new Date(2012, 11, 29),
			},
			{
				name: "Nattåg Innsbruck - Hamburg",
				address: "",
				url: "https://www.oebb.at/",
				position: new google.maps.LatLng(48.364875, 10.885127),
				start: new Date(2018, 11, 29),
				end: new Date(2012, 11, 30),
			},
			{
				name: "Kielfärjan",
				address: "",
				url: "stena.se",
				position: new google.maps.LatLng(56.431173, 11.349044),
				start: new Date(2018, 11, 30),
				end: new Date(2018, 11, 31),
			},
		]
	},
	{
		name: "Med mamma, Richard, Jessica och Wilhelm i Småland (MC-inköp)",
		start: new Date(2019, 0, 4),
		end: new Date(2019, 0, 5),
		locations: [
			{
				name: "Elite Stadshotellet Växjö",
				address: "Kungsgatan 6, 352 33 Växjö",
				url: "elite.se",
				position: new google.maps.LatLng(56.877891, 14.808869),
				start: new Date(2019, 0, 4),
				end: new Date(2019, 0, 5),
			},
		]
	},
	{
		name: "Med mamma på skidresa i Österrike",
		start: new Date(2019, 3, 13),
		end: new Date(2019, 3, 20),
		locations: [
			{
				name: "Hotel Marietta",
				address: "Ringstraße 8, 5562 Obertauern, Austria",
				url: "marietta.at",
				position: new google.maps.LatLng(47.250169, 13.554718),
				start: new Date(2019, 3, 13),
				end: new Date(2019, 3, 20),
			},
		]
	},
	{
		name: "Med husbilen i Västervik",
		start: new Date(2019, 4, 30),
		end: new Date(2019, 5, 1),
		locations: [
			{
				name: "Västervik Resort",
				address: "Lysingsvägen, 593 53 Västervik, Sverige",
				url: "vastervikresort.se",
				position: new google.maps.LatLng(57.737664, 16.676493),
				start: new Date(2019, 4, 30),
				end: new Date(2019, 5, 1)
			},
		]
	},
	{
		name: "Med husbilen i Marstrand",
		start: new Date(2019, 5, 6),
		end: new Date(2019, 5, 8),
		locations: [
			{
				name: "Marstrands Familjecamping",
				address: "Långedalsvägen 16, 442 66 Marstrand",
				url: "marstrandscamping.se",
				position: new google.maps.LatLng(57.895254, 11.606876),
				start: new Date(2019, 5, 6),
				end: new Date(2019, 5, 8),
			},
		]
	},
	{
		name: "Englandsresa",
		start: new Date(2019, 6, 7),
		end: new Date(2019, 6, 28),
		locations: [
			{
				name: "Legoland Hotel",
				address: "Windsor Resort, Winkfield Rd, Windsor SL4 4AY, UK",
				url: "legoland.co.uk",
				position: new google.maps.LatLng(51.464669, -0.645779),
				start: new Date(2019, 6, 7),
				end: new Date(2019, 6, 8),
			},
			{
				name: "The Christopher Hotel",
				address: "110 High St, Eton, Windsor SL4 6AN, UK",
				url: "thechristopher.co.uk",
				position: new google.maps.LatLng(51.488146, -0.610209),
				start: new Date(2019, 6, 8),
				end: new Date(2019, 6, 9),
			},
			{
				name: "Queens Hotel",
				address: "1-3 Kings Road, Brighton BN1 1NS, UK",
				url: "queenshotelbrighton.com",
				position: new google.maps.LatLng(50.819639, -0.139471),
				start: new Date(2019, 6, 9),
				end: new Date(2019, 6, 10),
			},
			{
				name: "Seacrest Hotel",
				address: "12 S Parade, Portsmouth, Southsea PO5 2JB, UK",
				url: "seacresthotel.co.uk",
				position: new google.maps.LatLng(50.779850, -1.082472),
				start: new Date(2019, 6, 10),
				end: new Date(2019, 6, 11),
			},
			{
				name: "Marsham Court Hotel",
				address: "3 Russell Cotes Rd, Bournemouth BH1 3AB, UK",
				url: "marshamcourthotel.co.uk",
				position: new google.maps.LatLng(50.717933, -1.870465),
				start: new Date(2019, 6, 11),
				end: new Date(2019, 6, 12),
			},
			{
				name: "The Abbey Sands Hotel",
				address: "Belgrave Rd, Torquay TQ2 5HG, UK",
				url: "abbeysandshotel.co.uk",
				position: new google.maps.LatLng(50.464470, -3.536761),
				start: new Date(2019, 6, 12),
				end: new Date(2019, 6, 13),
			},
			{
				name: "YHA Eden Project",
				address: "Eden Project, Bodelva Rd, Bodelva, Par PL24 2SG, UK",
				url: "yha.org.uk",
				position: new google.maps.LatLng(50.364011, -4.748957),
				start: new Date(2019, 6, 13),
				end: new Date(2019, 6, 14),
			},
			{
				name: "Poldhu Guest House",
				address: "60 Fore St, Saint Ives TR26 1HW, UK",
				url: "",
				position: new google.maps.LatLng(50.214743, -5.480119),
				start: new Date(2019, 6, 14),
				end: new Date(2019, 6, 15),
			},
			{
				name: "Lifeboat Inn",
				address: "Wharf Rd, Saint Ives TR26 1LF, UK",
				url: "lifeboatinnstives.co.uk",
				position: new google.maps.LatLng(50.213293, -5.479805),
				start: new Date(2019, 6, 15),
				end: new Date(2019, 6, 16),
			},
			{
				name: "Gordons Hotel",
				address: "Cliff St, Cheddar BS27 3PT, UK",
				url: "gordonshotel.co.uk",
				position: new google.maps.LatLng(51.279224, -2.774703),
				start: new Date(2019, 6, 16),
				end: new Date(2019, 6, 17),
			},
			{
				name: "Llanerch Vineyard Hotel",
				address: "Hensol Rd, Pontyclun CF72 8GG, UK",
				url: "llanerch.co.uk",
				position: new google.maps.LatLng(51.507401, -3.369802),
				start: new Date(2019, 6, 17),
				end: new Date(2019, 6, 18),
			},
			{
				name: "Hotel Portmeirion",
				address: "Portmeirion, Penrhyndeudraeth LL48 6ER, UK",
				url: "portmeirion-village.com",
				position: new google.maps.LatLng(52.913642, -4.098372),
				start: new Date(2019, 6, 18),
				end: new Date(2019, 6, 19),
			},
			{
				name: "Jurys Inn Liverpool",
				address: "31 Keel Wharf, Liverpool L3 4FN, UK",
				url: "jurysinns.com",
				position: new google.maps.LatLng(53.398397, -2.989831),
				start: new Date(2019, 6, 19),
				end: new Date(2019, 6, 21),
			},
			{
				name: "Shakespeare Hotel",
				address: "Chapel St, Stratford-upon-Avon CV37 6ER, UK",
				url: "https://www.accorhotels.com/gb/hotel-6630-mercure-stratford-upon-avon-shakespeare-hotel/index.shtml",
				position: new google.maps.LatLng(52.191099, -1.707101),
				start: new Date(2019, 6, 21),
				end: new Date(2019, 6, 22),
			},
			{
				name: "De Vere Horwood Estate",
				address: "Mursley Rd, Little Horwood, Milton Keynes MK17 0PH, UK",
				url: "https://www.devere.co.uk/horwood-estate",
				position: new google.maps.LatLng(51.958902, -0.844210),
				start: new Date(2019, 6, 22),
				end: new Date(2019, 6, 23),
			},
			{
				name: "The Galaxie",
				address: "180 Banbury Rd, Oxford OX2 7BT, UK",
				url: "galaxie-booking.com",
				position: new google.maps.LatLng(51.775220, -1.263666),
				start: new Date(2019, 6, 23),
				end: new Date(2019, 6, 24),
			},
			{
				name: "Grand Hotel",
				address: "King Edward's Parade, Eastbourne BN21 4EQ, UK",
				url: "grandeastbourne.com",
				position: new google.maps.LatLng(50.759998, 0.282634),
				start: new Date(2019, 6, 24),
				end: new Date(2019, 6, 27),
			},
			{
				name: "Safari Hotel",
				address: "Leatherhead Rd, Chessington KT9 2NE, UK",
				url: "https://www.chessington.com/resort-hotels/chessington-safari-hotel.aspx",
				position: new google.maps.LatLng(51.350513, -0.316280),
				start: new Date(2019, 6, 27),
				end: new Date(2019, 6, 28),
			},
		]
	},
	{
		name: "Med mamma i Florida",
		start: new Date(2019, 9, 25),
		end: new Date(2019, 10, 3),
		locations: [
			{
				name: "Riviera Suites South Beach",
				address: "318 20th St, Miami Beach, FL 33139, United States",
				url: "rivierahotelsouthbeach.com",
				position: new google.maps.LatLng(25.795762, -80.130384),
				start: new Date(2019, 9, 25),
				end: new Date(2019, 9, 26),
			},
			{
				name: "Embassy Suites Hotel",
				address: "1100 SE 17th St, Fort Lauderdale, FL 33316, USA",
				url: "https://embassysuites3.hilton.com/en/hotels/florida/embassy-suites-by-hilton-fort-lauderdale-17th-street-FLLSOES/index.html",
				position: new google.maps.LatLng(26.099800, -80.131393),
				start: new Date(2019, 9, 26),
				end: new Date(2019, 9, 27),
			},
			{
				name: "The Sunset Inn - Islamorada",
				address: "82200 Overseas Hwy, Islamorada, FL 33036, United States",
				url: "",
				position: new google.maps.LatLng(24.923076, -80.630022),
				start: new Date(2019, 9, 27),
				end: new Date(2019, 9, 28),
			},
			{
				name: "Southernmost Point Guest House",
				address: "1327 Duval St, Key West, FL 33040, United States",
				url: "https://southernmostpoint.com/",
				position: new google.maps.LatLng(24.547345, -81.796623),
				start: new Date(2019, 9, 28),
				end: new Date(2019, 9, 29),
			},
			{
				name: "Oceans Edge Key West Resort & Marina",
				address: "5950 Peninsular Ave, Key West, FL 33040, USA",
				url: "oceansedgekeywest.com",
				position: new google.maps.LatLng(24.564209, -81.729960),
				start: new Date(2019, 9, 29),
				end: new Date(2019, 9, 30),
			},
			{
				name: "The Diplomat Beach Resort Hollywood",
				address: "3555 S Ocean Dr, Hollywood, FL 33019, United States",
				url: "https://www.diplomatresort.com/",
				position: new google.maps.LatLng(25.991730, -80.117802),
				start: new Date(2019, 9, 30),
				end: new Date(2019, 10, 2),
			},
		]
	},
	{
		name: "Thailand över jul",
		start: new Date(2019, 11, ),
		end: new Date(2019, 11, ),
		locations: [
			{
				name: "Emporium Suites by Chatrium",
				address: "622 Sukhumvit 24 Alley, Klongton klongtoey Bangkok 10110, Thailand",
				url: "https://www.chatrium.com/emporiumsuitesbangkok",
				position: new google.maps.LatLng(13.729877, 100.568257),
				start: new Date(2019, 11, 21),
				end: new Date(2019, 11, 23),
			},
			{
				name: "Samed Pavilion Resort",
				address: "89/1 หมู่ 4 อ่าวไผ่ เกาะเสม็ด Phe, Mueang Rayong District, Rayong 21160, Thailand",
				url: "https://samedpavilionresort.com/",
				position: new google.maps.LatLng(12.564083, 101.456045),
				start: new Date(2019, 11, 23),
				end: new Date(2019, 11, 30),
			},
		]
	},
	{
		name: "Husbilshelg, Öströö och Åkulla",
		start: new Date(2020, 3, 30),
		end: new Date(2020, 4, 2),
		locations: [
			{
				name: "Öströö fårfarm",
				address: "Öströö Gård, 432 77 Tvååker",
				url: "http://www.ostroofarfarm.com/",
				position: new google.maps.LatLng(57.067953, 12.507665),
				start: new Date(2020, 3, 30),
				end: new Date(2020, 4, 1),
			},
			{
				name: "Åkulla Outdoor Resort",
				address: "Åkulla Friluftsgård, 432 97 Rolfstorp",
				url: "http://www.akullaresort.se/",
				position: new google.maps.LatLng(57.124877, 12.564680),
				start: new Date(2020, 4, 1),
				end: new Date(2020, 4, 2),
			},
		]
	},
	{
		name: "Husbilshelg, Trollhättan och Malö",
		start: new Date(2020, 6, 10),
		end: new Date(2020, 6, 12),
		locations: [
			{
				name: "Ställplats Trollhätte kanal",
				address: "461 53 Trollhättan",
				url: "",
				position: new google.maps.LatLng(58.265361, 12.265800),
				start: new Date(2020, 6, 10),
				end: new Date(2020, 6, 11),
			},
			{
				name: "Malö camping",
				address: "Malön 203, 474 91 Ellös",
				url: "http://www.malo.se/",
				position: new google.maps.LatLng(58.199634, 11.481639),
				start: new Date(2020, 6, 11),
				end: new Date(2020, 6, 12),
			},
		]
	},
	{
		name: "Sverigeresa med husbilen",
		start: new Date(2020, 6, 16),
		end: new Date(2020, 7, 2),
		locations: [
			{
				name: "Vänersborg Guest Harbour and Marina",
				address: "VÄNERPARKEN 12, 462 35 Vänersborg",
				url: "http://www.vanersborgsmarina.se/sv/",
				position: new google.maps.LatLng(58.377271, 12.316189),
				start: new Date(2020, 6, 16),
				end: new Date(2020, 6, 17),
			},
			{
				name: "Rådastrands camping",
				address: "Rådastrand, Riksväg 62, 683 93 Råda, Sweden",
				url: "radastrand.com",
				position: new google.maps.LatLng(60.016659, 13.600117),
				start: new Date(2020, 6, 17),
				end: new Date(2020, 6, 19),
			},
			{
				name: "Lugnets camping",
				address: "Lugnetvägen 14, 791 31 Falun",
				url: "https://firstcamp.se/destination/lugnet-falun/",
				position: new google.maps.LatLng(60.620164, 15.652048),
				start: new Date(2020, 6, 19),
				end: new Date(2020, 6, 21),
			},
			{
				name: "Ställplats Gavleån, Gävle",
				address: "Södra Skeppsbron 9, 802 80 Gävle",
				url: "https://www2.visitgavle.se/sv/boende/a810987/st%C3%A4llplats-gavle%C3%A5n/detaljer",
				position: new google.maps.LatLng(60.676706, 17.159800),
				start: new Date(2020, 6, 21),
				end: new Date(2020, 6, 22),
			},
			{
				name: "Järvsö Bergscamping",
				address: "Alpvägen 7, 820 40 Järvsö",
				url: "https://jarvsobergscamping.se/",
				position: new google.maps.LatLng(61.721047, 16.160722),
				start: new Date(2020, 6, 22),
				end: new Date(2020, 6, 24),
			},
			{
				name: "Östersund Stugby och camping",
				address: "Krondikesvägen 95 C, 831 46 Östersund",
				url: "http://www.ostersundscamping.se/",
				position: new google.maps.LatLng(63.158652, 14.679418),
				start: new Date(2020, 6, 24),
				end: new Date(2020, 6, 25),
			},
			{
				name: "Hotell Fjällgården",
				address: "Fjällgårdsvägen 35, 837 52 Åre",
				url: "https://www.fjallgarden.se/",
				position: new google.maps.LatLng(63.404468, 13.090496),
				start: new Date(2020, 6, 25),
				end: new Date(2020, 6, 29),
			},
			{
				name: "Orsa camping",
				address: "Bowlingvägen 1, 794 31 Orsa",
				url: "http://www.orsacamping.se/",
				position: new google.maps.LatLng(61.122458, 14.590618),
				start: new Date(2020, 6, 29),
				end: new Date(2020, 6, 31),
			},
			{
				name: "Dalhalla",
				address: "Sätra Dalhallavägen 201, 795 91 Rättvik",
				url: "dalhalla.se",
				position: new google.maps.LatLng(60.948018, 15.103063),
				start: new Date(2020, 6, 31),
				end: new Date(2020, 7, 1),
			},
			{
				name: "Husabergsudde Camping",
				address: "Stockshammar 318, 696 92 Askersund",
				url: "http://www.husabergsudde.se/",
				position: new google.maps.LatLng(58.867677, 14.909223),
				start: new Date(2020, 7, 1),
				end: new Date(2020, 7, 2),
			},
		]
	},
	{
		name: "Höstlov med mamma, Richard, Jessica och Wilhelm",
		start: new Date(2020, 9, 27),
		end: new Date(2020, 9, 29),
		locations: [
			{
				name: "Route 154 Hotell & Restaurang",
				address: "Falkenbergsvägen 10, 311 63 Älvsered",
				url: "https://www.route154.se/",
				position: new google.maps.LatLng(57.23922521983026, 12.858502247396478),
				start: new Date(2020, 9, 27),
				end: new Date(2020, 9, 29),
			},
		]
	},
	{
		name: "MTB i Åre med mamma",
		start: new Date(2021, 6, 8),
		end: new Date(2021, 7, 16),
		locations: [
			{
				name: "Parkvillan",
				address: "Parkvägen 6, 837 52 Åre",
				url: "http://www.parkvillan.se/",
				position: new google.maps.LatLng(63.399842034552385, 13.07759327421221),
				start: new Date(2021, 6, 9),
				end: new Date(2021, 6, 11),
			},
			{
				name: "Hotel Åregården",
				address: "Årevägen 81, 837 52 Åre",
				url: "http://aregarden.com/",
				position: new google.maps.LatLng(63.39955117950837, 13.079172096064989),
				start: new Date(2021, 6, 11),
				end: new Date(2021, 6, 15),
			},
		]
	},
	{
		name: "Sverigeresa med husbilen",
		start: new Date(2021, 6, 16),
		end: new Date(2021, 7, 10),
		locations: [
			{
				name: "Lisebergs camping Askim Strand",
				address: "Marholmsvägen 124, 436 45 Askim",
				url: "https://www.liseberg.se/boende/former/camping/lisebergs-camping-askim-strand/",
				position: new google.maps.LatLng(57.62784740465234, 11.921300016677085),
				start: new Date(2021, 6, 16),
				end: new Date(2021, 6, 17),
			},
			{
				name: "Håverud Camping",
				address: "Kanalvägen 4, 464 72 Håverud",
				url: "",
				position: new google.maps.LatLng(58.8198813266567, 12.41424143032982),
				start: new Date(2021, 6, 17),
				end: new Date(2021, 6, 18),
			},
			{
				name: "Degernäs camping",
				address: "Degernäs Camping, 693 80 Degerfors",
				url: "https://www.degernascamping.se/",
				position: new google.maps.LatLng(59.25065794644466, 14.460338687792664),
				start: new Date(2021, 6, 18),
				end: new Date(2021, 6, 19),
			},
			{
				name: "First Camp Västerås-Mälaren",
				address: "Johannisbergsvägen, 725 91 Västerås",
				url: "https://firstcamp.se/destination/vasteras-malaren",
				position: new google.maps.LatLng(59.576213751492126, 16.520390487591854),
				start: new Date(2021, 6, 19),
				end: new Date(2021, 6, 20),
			},
			{
				name: "Hos Sören och Lena, Jessicas föräldrar",
				address: "Sundbro 118, 743 82 Bälinge",
				url: "",
				position: new google.maps.LatLng(59.9339498, 17.5358329),
				start: new Date(2021, 6, 20),
				end: new Date(2021, 6, 21),
			},
			{
				name: "Gräsöbadens Familjecamping",
				address: "Västerbyn 296, 742 97 Gräsö",
				url: "http://grasobadenscamping.se/",
				position: new google.maps.LatLng(60.35194095492653, 18.444404422329722),
				start: new Date(2021, 6, 21),
				end: new Date(2021, 6, 22),
			},
			{
				name: "Delsbo Camping",
				address: "Hammarsvall, 820 60 Delsbo",
				url: "http://www.delsbocamping.se/",
				position: new google.maps.LatLng(61.79958655141179, 16.53690985280605),
				start: new Date(2021, 6, 22),
				end: new Date(2021, 6, 23),
			},
			{
				name: "Järvsö Camping",
				address: "Turistvägen 76, 820 40 Järvsö",
				url: "http://www.jarvsocamping.se/",
				position: new google.maps.LatLng(61.71986315063674, 16.170445235515043),
				start: new Date(2021, 6, 23),
				end: new Date(2021, 6, 27),
			},
			{
				name: "Eskilns Camping",
				address: "Köpingsvägen, 737 92 Fagersta",
				url: "http://www.eskilnscamping.se/",
				position: new google.maps.LatLng(59.98022919261825, 15.79475183292106),
				start: new Date(2021, 6, 27),
				end: new Date(2021, 6, 28),
			},
			{
				name: "Trosa Havsbad Camping",
				address: "Rävuddsvägen 42, 619 31 Trosa",
				url: "https://www.trosahavsbad.se/",
				position: new google.maps.LatLng(58.87292457252458, 17.575299423756594),
				start: new Date(2021, 6, 28),
				end: new Date(2021, 6, 29),
			},
			{
				name: "First Camp Kolmården-Norrköping",
				address: "Kvarsebovägen 2, 618 34 Kolmården",
				url: "https://firstcamp.se/destination/kolmarden-norrkoping/",
				position: new google.maps.LatLng(58.66110134105309, 16.404723631890192),
				start: new Date(2021, 6, 29),
				end: new Date(2021, 6, 30),
			},
			{
				name: "Chris och Anna",
				address: "Fredsgatan 1, 598 35 Vimmerby, Sverige",
				url: "",
				position: new google.maps.LatLng(57.673178, 15.866224),
				start: new Date(2021, 6, 30),
				end: new Date(2021, 7, 1),
			},
			{
				name: "KustCamp Gamleby",
				address: "Hammarsvägen 10, 594 32 Gamleby",
				url: "http://www.campa.se/",
				position: new google.maps.LatLng(57.888494228923584, 16.415507791723734),
				start: new Date(2021, 7, 1),
				end: new Date(2021, 7, 2),
			},
			{
				name: "Oskarshamns hamnställplats",
				address: "",
				url: "",
				position: new google.maps.LatLng(57.2661335174505, 16.45441466439865),
				start: new Date(2021, 7, 2),
				end: new Date(2021, 7, 3),
			},
			{
				name: "Kronocamping Saxnäs",
				address: "Södra Saxnäsvägen 16, 386 95 Färjestaden",
				url: "http://www.kcsaxnas.se/",
				position: new google.maps.LatLng(56.68558958440196, 16.478493710763097),
				start: new Date(2021, 7, 3),
				end: new Date(2021, 7, 5),
			},
			{
				name: "First Camp Skönstavik-Karlskrona",
				address: "Ronnebyvägen 17, 371 45 Karlskrona",
				url: "https://firstcamp.se/destination/skonstavik-karlskrona/",
				position: new google.maps.LatLng(56.199198630313035, 15.604683646376742),
				start: new Date(2021, 7, 5),
				end: new Date(2021, 7, 6),
			},
			{
				name: "Kolleviks Camping",
				address: "374 30 Karlshamn",
				url: "https://mycamping.se/destinationer/kollevik/",
				position: new google.maps.LatLng(56.15959248345763, 14.892310921761764),
				start: new Date(2021, 7, 6),
				end: new Date(2021, 7, 8),
			},
			{
				name: "First Camp Råå Vallar-Helsingborg",
				address: "Kustgatan 95, 252 70 Råå",
				url: "https://firstcamp.se/destination/raa-vallar-helsingborg",
				position: new google.maps.LatLng(56.00403387859757, 12.726936751439428),
				start: new Date(2021, 7, 8),
				end: new Date(2021, 7, 9),
			},
			{
				name: "Norra Hamnen Marina Ställplats",
				address: "252 67 Helsingborg",
				url: "https://www.husbil.se/stallplatser/p/395/",
				position: new google.maps.LatLng(56.04839880071368, 12.684802691605476),
				start: new Date(2021, 7, 9),
				end: new Date(2021, 7, 10),
			},
		]
	},
	{
		name: "Olof fyller 50",
		start: new Date(2021, 9, 15),
		end: new Date(2021, 9, 17),
		locations: [
			{
				name: "Elite Hotel Mollberg",
				address: "Stortorget 18, 251 14 Helsingborg, Sweden",
				url: "http://www.elite.se/",
				position: new google.maps.LatLng(56.046677532252914, 12.696048718935954),
				start: new Date(2021, 9, 15),
				end: new Date(2021, 9, 17),
			},
		]
	},
	{
		name: "Danmark med mamma, Richard, Jessica och Wilhelm",
		start: new Date(2021, 9, 31),
		end: new Date(2021, 10, 05),
		locations: [
			{
				name: "TODO", // TODO
				address: "TODO",
				url: "",
				position: new google.maps.LatLng(41.198765, -73.726930),
				start: new Date(2021, 9, 31),
				end: new Date(2021, 10, 05),
			},
		]
	},
	{
		name: "Helsingborg",
		start: new Date(2021, 11, 25),
		end: new Date(2021, 11, 27),
		locations: [
			{
				name: "Clarion Grand Hotel Helsingborg",
				address: "Stortorget 8, 252 23 Helsingborg, Sweden",
				url: "https://www.nordicchoicehotels.se/hotell/sverige/helsingborg/clarion-grand-hotel-helsingborg",
				position: new google.maps.LatLng(56.04626893416911, 12.694605690486272),
				start: new Date(2021, 11, 25),
				end: new Date(2021, 11, 27),
			},
		]
	},
	{
		name: "Skidsemester i Stöten",
		start: new Date(2022, 00, 01),
		end: new Date(2022, 00, 06),
		locations: [
			{
				name: "Hotel Frykenstrand",
				address: "By 80, 686 93 Sunne, Sweden",
				url: "http://www.frykenstrand.se/",
				position: new google.maps.LatLng(59.88684000803969, 13.140842058716869),
				start: new Date(2022, 00, 01),
				end: new Date(2022, 00, 02),
			},
			{
				name: "Stöten",
				address: "",
				url: "",
				position: new google.maps.LatLng(61.265059061620306, 12.883567901584065),
				start: new Date(2022, 00, 02),
				end: new Date(2022, 00, 05),
			},
			{
				name: "Hotel Frykenstrand",
				address: "By 80, 686 93 Sunne, Sweden",
				url: "http://www.frykenstrand.se/",
				position: new google.maps.LatLng(59.88684000803969, 13.140842058716869),
				start: new Date(2022, 00, 05),
				end: new Date(2022, 00, 06),
			},
		]
	},
	{ 
		name: "Skidor i Åre med mamma",
		start: new Date(2022, 1, 13),
		end: new Date(2022, 1, 15),
		locations: [
			{
				name: "Hotell Fjällgården",
				address: "Fjällgårdsvägen 35, 837 52 Åre",
				url: "https://www.fjallgarden.se/",
				position: new google.maps.LatLng(63.404468, 13.090496),
				start: new Date(2022, 1, 13),
				end: new Date(2022, 1, 15),
			},
		]
	},
	{
		name: "Skidresa till Ischgl",
		start: new Date(2022, 3, 09),
		end: new Date(2022, 3, 16),
		locations: [
			{
				name: "Hotel Piz Buin",
				address: "Dorfstr. 16, 6561 Ischgl, Austria",
				url: "http://www.pizbuin-ischgl.at/",
				position: new google.maps.LatLng(47.01367946725322, 10.295222104724015),
				start: new Date(2022, 3, 09),
				end: new Date(2022, 3, 16),
			},
		]
	},
	{
		name: "MTB i Isaberg",
		start: new Date(2022, 3, 23),
		end: new Date(2022, 3, 24),
		locations: [
			{
				name: "Isaberg Mountain Resort",
				address: "Nissastigen, 330 27 Hestra, Sweden",
				url: "http://www.isaberg.com/",
				position: new google.maps.LatLng(57.43454936618097, 13.619902330659304),
				start: new Date(2022, 3, 23),
				end: new Date(2022, 3, 24),
			},
		]
	},
	{
		name: "Långhelg med husbilen",
		start: new Date(2022, 5, 3),
		end: new Date(2022, 5, 6),
		locations: [
			{
				name: "Villa Björkhagen",
				address: "Friggagatan 31, 554 54 Jönköping, Sverige",
				url: "villabjorkhagen.se",
				position: new google.maps.LatLng(57.787228, 14.216812),
				start: new Date(2022, 5, 3),
				end: new Date(2022, 5, 4)
			},
			{
				name: "Paula och Jan-Åke (torpet)",
				address: "",
				url: "",
				position: new google.maps.LatLng(57.8424731, 16.0566513),
				start: new Date(2022, 5, 4),
				end: new Date(2022, 5, 5)
			},
			{
				name: "Vadstena Camping",
				address: "Hofslagaregatan 11, 592 30 Vadstena",
				url: "http://www.vadstenacamping.se/",
				position: new google.maps.LatLng(58.468567, 14.939141),
				start: new Date(2022, 5, 5),
				end: new Date(2022, 5, 6),
			},
		]
	},
	{
		name: "Europaresa med husbilen",
		start: new Date(2022, 6, 6),
		end: new Date(2022, 7, 14),
		locations: [
			{
				name: "Kielfärjan",
				address: "",
				url: "stena.se",
				position: new google.maps.LatLng(56.431173, 11.349044),
				start: new Date(2022, 6, 6),
				end: new Date(2022, 6, 7),
			},
			{
				name: "Campingplatz Sinntal-Oberzell",
				address: "Alfred-Kühnert-Straße 1, 36391 Sinntal, Tyskland",
				url: "http://campingplatz-sinntal-oberzell.de/",
				position: new google.maps.LatLng(50.33834960625175, 9.710938752691831),
				start: new Date(2022, 6, 7),
				end: new Date(2022, 6, 8)
			},
			{
				name: "Bikepark Brandnertal",
				address: "Tschengla 3, 6707 Bürserberg, Österrike",
				url: "http://www.bikepark-brandnertal.at",
				position: new google.maps.LatLng(47.14631259761436, 9.759379389490038),
				start: new Date(2022, 6, 8),
				end: new Date(2022, 6, 10),
			},
			{
				name: "Campeggio di Merano",
				address: "Via Piave, 44, 39012 Merano BZ, Italien",
				url: "meran.eu",
				position: new google.maps.LatLng(46.662995, 11.159075),
				start: new Date(2022, 6, 10),
				end: new Date(2022, 6, 12),
			},
			{
				name: "La Rocca Camping Village",
				address: "Via Gardesana dell'Acqua, 37, 37011 Bardolino VR, Italien",
				url: "https://www.campinglarocca.com/",
				position: new google.maps.LatLng(45.56426864089334, 10.711727335662241),
				start: new Date(2022, 6, 12),
				end: new Date(2022, 6, 15),
			},
			{
				name: "Camping Seeblick - Toni",
				address: "Moosen 46, 6233 Kramsach, Österrike",
				url: "https://www.camping-seeblick.tirol/",
				position: new google.maps.LatLng(47.46052088057337, 11.906459271083722),
				start: new Date(2022, 6, 15),
				end: new Date(2022, 6, 17),
			},
			{
				name: "Camping Lampenhäusl",
				address: "5672, Gemeinde, 5672 Fusch an der Großglocknerstraße, Österrike",
				url: "https://www.lampenhaeusl.at/",
				position: new google.maps.LatLng(47.2239589645775, 12.82693601097002),
				start: new Date(2022, 6, 17),
				end: new Date(2022, 6, 18),
			},
			{
				name: "Lago 3 Comuni Camping",
				address: "Via Tolmezzo, 52, 33010 Trasaghis UD, Italien",
				url: "http://www.lago3comuni.com/",
				position: new google.maps.LatLng(46.32559362197108, 13.064472426091063),
				start: new Date(2022, 6, 18),
				end: new Date(2022, 6, 19),
			},
			{
				name: "Camping Opatija",
				address: "Poljanska cesta 16, 51414, Ičići, Kroatien",
				url: "http://www.rivijera-opatija.hr/",
				position: new google.maps.LatLng(45.30859961646848, 14.28534691429489),
				start: new Date(2022, 6, 19),
				end: new Date(2022, 6, 22),
			},
			{
				name: "Camping Plitvice",
				address: "Smoljanac 67, 53231, Smoljanac, Kroatien",
				url: "http://www.campingplitvice.hr/",
				position: new google.maps.LatLng(44.9339635846878, 15.629290539263188),
				start: new Date(2022, 6, 22),
				end: new Date(2022, 6, 24),
			},
			{
				name: "Camping Cortina",
				address: "Via Campo, 2, 32043 Cortina d'Ampezzo BL, Italien",
				url: "http://www.campingcortina.it/",
				position: new google.maps.LatLng(46.52141857856073, 12.134370538637732),
				start: new Date(2022, 6, 24),
				end: new Date(2022, 6, 25),
			},
			{
				name: "Camper Schneeburghof",
				address: "Via Monte Benedetto, 26, 39019 Tirolo BZ, Italien",
				url: "http://www.schneeburghof.com/",
				position: new google.maps.LatLng(46.675552036542, 11.166594800451175),
				start: new Date(2022, 6, 25),
				end: new Date(2022, 6, 28),
			},
			{
				name: "Camping Ötztal Längenfeld",
				address: "Unterlängenfeld 220, 6444 Längenfeld, Österrike",
				url: "http://www.camping-oetztal.com/",
				position: new google.maps.LatLng(47.072791950811755, 10.962662018246142),
				start: new Date(2022, 6, 28),
				end: new Date(2022, 6, 30),
			},
			{
				name: "Camping Lido Mappo",
				address: "Via Mappo 20, 6598 Tenero-Contra, Schweiz",
				url: "http://www.lidomappo.ch/",
				position: new google.maps.LatLng(46.176499742869694, 8.842449552152258),
				start: new Date(2022, 6, 30),
				end: new Date(2022, 7, 2),
			},
			{
				name: "Camping Municipal des Thézières",
				address: "166 route du stade, 74440 Taninges, Frankrike",
				url: "https://camping-taninges.fr/",
				position: new google.maps.LatLng(46.099189684852455, 6.5870617989228855),
				start: new Date(2022, 7, 2),
				end: new Date(2022, 7, 4),
			},
			{
				name: "Camping Le Clos Don Jean",
				address: "435 Rte du Clos Don Jean, 74290 Menthon-Saint-Bernard, Frankrike",
				url: "https://www.campingclosdonjean.com/",
				position: new google.maps.LatLng(45.863142729437726, 6.198197375717023),
				start: new Date(2022, 7, 4),
				end: new Date(2022, 7, 6),
			},
			{
				name: "Camping Kirchzarten KG",
				address: "Dietenbacher Str. 17, 79199 Kirchzarten, Tyskland",
				url: "https://www.camping-kirchzarten.de/",
				position: new google.maps.LatLng(47.95898326615601, 7.952174316840061),
				start: new Date(2022, 7, 6),
				end: new Date(2022, 7, 7),
			},
			{
				name: "Campingplatz Hohensyburg",
				address: "Syburger Dorfstraße 69, 44265 Dortmund, Tyskland",
				url: "http://www.camping-hohensyburg.de/",
				position: new google.maps.LatLng(51.41925128934742, 7.493042637907155),
				start: new Date(2022, 7, 7),
				end: new Date(2022, 7, 10),
			},
			{
				name: "Kielfärjan",
				address: "",
				url: "stena.se",
				position: new google.maps.LatLng(56.431173, 11.349044),
				start: new Date(2022, 7, 10),
				end: new Date(2022, 7, 11),
			},
		]
	},
]