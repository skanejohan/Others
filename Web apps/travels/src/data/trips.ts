import { Aston, Jannike, Johan, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, Trip, Location, Stop } from "./types";

/*
Haverdal med Farmor och Farfar. 2010?
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
	Konferens Stockholm (Combination), Best Western Hotel Bentleys
	Utvecklarkonferens Lustikulla (Combination), Best Western Hotel Bentleys
	Öredev (Combination), Clarion Hotel Malmö Live?
	Konferens (Combination), Köpenhamn
	Griffeye, Klädesholmen
	*/

const KielGoteborg : Location = {
	name: "Färja Kiel-Göteborg",
	address: "",
	url: "",
	position: [56.698964629410995, 11.303899837409976],
};

const GoteborgKiel : Location = {
	name: "Färja Göteborg-Kiel",
	address: "",
	url: "",
	position: [55.059714887215065, 11.023218474429443],
};

const TrelleborgRostock : Location = {
	name: "Färja Trelleborg-Rostock",
	address: "",
	url: "",
	position: [54.68586985763149, 12.250699267896799],
};

const RostockTrelleborg : Location = {
	name: "Färja Rostock-Trelleborg",
	address: "",
	url: "",
	position: [55.03353835434692, 12.82881067815772],
};

const Askim: Location = {
	name: "Lisebergs camping Askim Strand",
	address: "Marholmsvägen 124, 436 45 Askim",
	url: "liseberg.se",
	position: [57.62750272967534, 11.921874230565997],
};

const Landvetter : Location = {
	name: "Landvetter",
	address: "",
	url: "",
	position: [57.66823120276672, 12.295187844678518],
};

const Paula : Location = {
	name: "Paula och Jan-Åke",
	address: "Kristdalavägen 12, 577 90 Hultsfred, Sverige",
	url: "",
	position: [57.520684, 15.971086],
}


const StopAt = (position: [number, number]) : Stop => {
	return {
		location: {
			name: "",
			address: "",
			url: "",
			position: position,
		}
	};
}

export const trips : Trip[] = [
	{
		name: "Konferens (Spectronic), Istanbul",
		start: { year: 1991, month: undefined, day: undefined },
		end: { year: 1991, month: undefined, day: undefined },
		people: [Johan],
		stops: [
			{
				location: {
					name: "Pera Palace Hotel",
					address: "Meşrutiyet Caddesi, Evliya Çelebi, Tepebaşı Cd. No:52, 34430 Beyoğlu/İstanbul, Turkiet",
					url: "http://www.perapalace.com/",
					position: [41.030997269195986, 28.97344716962997],
				}
			}
		]
	},
	{
		name: "Mount Kisco, USA",
		start: { year: 2006, month: Sep, day: undefined },
		end: { year: 2006, month: Oct, day: undefined },
		stops: [
			{
				location: {
					name: "Richard",
					address: "37, Moore Avenue, Mt Kisco, NY 10549 USA",
					url: "",
					position: [41.198765, -73.726930],
				}
			}
		]
	},
	{
		name: "Italien och Österrike",
		start: { year: 2008, month: May, day: undefined},
		end: { year: 2008, month: Jun, day: undefined},
		stops: [
			{
				location: {
					name: "Motel Europa",
					address: "Viale Europa, 6, 25036 Palazzolo sull'Oglio BS, Italien",
					url: "moteleuropa.it",
					position: [45.589656, 9.893810],
				},
				start: { year: 2008, month: May, day: undefined},
				end: { year: 2008, month: May, day: undefined},
			},
			{
				location: {
					name: "Goldenes Kreuz / Hotel Croce D'Oro",
					address: "Kleiner Graben, 8, 39042 Brixen, Bozen, Italien",
					url: "",
					position: [46.716170, 11.654616],
				},
				start: { year: 2008, month: May, day: undefined},
				end: { year: 2008, month: May, day: undefined},
			},
			{
				location: {
					name: "Ferienwohnung",
					address: "Luimes, Österrike",
					url: "",
					position: [47.172200, 11.368160],
				},
				start: { year: 2008, month: May, day: undefined},
				end: { year: 2008, month: May, day: undefined},
			},
		]
	},
	{
		name: "Stockholm (Henrik Önnermark 40)",
		start: { year: 2009, month: Mar, day: undefined },
		end: { year: 2009, month: Mar, day: undefined },
		stops: [
			{
				location: {
					name: "Crystal Plaza Hotel",
					address: "Birger Jarlsgatan 35, 111 45 Stockholm",
					url: "crystalplazahotel.se",
					position: [59.338263, 18.068591],
				}
			},
		]
	},
	{
		name: "Själland med Farmor och Farfar",
		start: { year: 2009, month: Jun, day: undefined },
		end: { year: 2009, month: Jun, day: undefined },
		stops: [
			{
				location: {
					name: "TODO",
					address: "TODO",
					url: "",
					position: [0, 0],
				},
			},
		]
	},
	{
		name: "Polen med familjen Essunger",
		start: { year: 2009, month: Aug, day: 8 },
		end: { year: 2009, month: Aug, day: 15 },
		stops: [
			{
				location: {
					name: "Semesterhus",
					address: "Podamirowo 6, 76-031 Dobiesławiec, Polen",
					url: "",
					position: [54.256486, 16.098479],
				},
			},
		]
	},
	{
		name: "Hovfjället med fam. Luhrs, Wenneberg, Björnström...",
		start: { year: 2009, month: Dec, day: undefined },
		end: { year: 2009, month: Dec, day: 30 },
		stops: [
			{
				location: {
					name: "TODO",
					address: "TODO",
					url: "",
					position: [60.31287915294745, 13.012190758435073], // TODO
				},
			},
		]
	},
	{
		name: "Linköping (Johan 40)",
		start: { year: 2010, month: Jan, day: undefined },
		end: { year: 2010, month: Jan, day: undefined },
		stops: [
			{
				location: {
					name: "Scandic Frimurarehotellet",
					address: "S:t Larsgatan 14, 582 24 Linköping",
					url: "scandichotels.se/frimurarehotellet",
					position: [58.41403486734704, 15.62324530467015],
				},
			},
		]
	},
	{
		name: "Helsingborg med Marie Ivarsson",
		start: { year: 2010, month: Jul, day: undefined },
		end: { year: 2010, month: Jul, day: undefined },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Villa Thalassa",
					address: "Dag Hammarskjölds väg 117, 254 33 Helsingborg",
					url: "villathalassa.se",
					position: [56.070469, 12.675485],
				},
			},
		]
	},
	{
		name: "Stockholm Marathon",
		start: { year: 2010, month: Jun, day: 4 },
		end: { year: 2010, month: Jun, day: 6 },
		stops: [
			{
				location: {
					name: "Scandic Foresta",
					address: "Herserudsvägen 22, 181 34 Lidingö",
					url: "scandichotels.se",
					position: [59.360014, 18.120433],
				},
			},
		]
	},
	{
		name: "Teneriffa",
		start: { year: 2010, month: Dec, day: 12 },
		end: { year: 2010, month: Dec, day: 19 },
		stops: [
			{
				location: {
					name: "Hotel Jacaranda",
					address: "Av. de Bruselas, 4-6, 38670 Plaza de las Americas, Costa Adeje, Santa Cruz de Tenerife, Santa Cruz de Tenerife, Spanien",
					url: "besthotels.es",
					position: [28.089175, -16.732283],
				},
			},
		]
	},
	{
		name: "Aalborg",
		start: { year: 2011, month: Apr, day: undefined },
		end: { year: 2011, month: Apr, day: undefined },
		stops: [
			{
				location: {
					name: "Scandic Aalborg City",
					address: "Europa Pl. 1, 9000 Aalborg, Danmark",
					url: "https://www.scandichotels.dk/hoteller/danmark/aalborg/scandic-aalborg-city",
					position: [57.04390554755651, 9.913060459924425],
				},
			},
		]
	},
	{
		name: "Venedig",
		start: { year: 2011, month: Jun, day: 20 },
		end: { year: 2011, month: Jun, day: 27 },
		stops: [
			{
				location: {
					name: "Hotel Atlantico",
					address: "Via Andrea Bafile 3° Accesso al Mare, 30016 Lido di Jesolo VE, Italien",
					url: "hotel-atlantico.it",
					position: [45.504483, 12.644548],
				},
			},
		]
	},
	{
		name: "Hem från Koster hos Luhrs",
		start: { year: 2011, month: Jul, day: 12 },
		end: { year: 2011, month: Jul, day: 15 },
		stops: [
			StopAt([58.88456111666719, 11.029081960205618]),
			{
				location: {
					name: "First Hotel Bengtsfors",
					address: "Karlsbergsvägen 3, 666 31 Bengtsfors",
					url: "firsthotels.se",
					position: [59.030004, 12.232089],
				},
				start: { year: 2011, month: Jul, day: 12 },
				end: { year: 2011, month: Jul, day: 13 },
			},
			StopAt([59.3949594891141, 13.508040855949092]),
			StopAt([59.302339337716646, 14.11016375895033]),
			{
				location: {
					name: "Hotell Gustaf",
					address: "Järnvägsgatan 2, 533 30 Götene",
					url: "hotellgustaf.se",
					position: [58.528807, 13.492399],
				},
				start: { year: 2011, month: Jul, day: 12 },
				end: { year: 2011, month: Jul, day: 13 },
			},
		]
	},
	{
		name: "Legoland",
		start: { year: 2011, month: Aug, day: 6 },
		end: { year: 2011, month: Aug, day: 9 },
		stops: [
			{
				location: {
					name: "Lalandia",
					address: "Ellehammers Alle 3, 7190 Billund, Danmark",
					url: "lalandia.dk",
					position: [55.733272, 9.138306],
				},
			},
		]
	},
	{
		name: "Stockholm (Tjurruset)",
		start: { year: 2011, month: Oct, day: 7 },
		end: { year: 2011, month: Oct, day: 9 },
		stops: [
			{
				location: {
					name: "Hotel Diplomat",
					address: "Strandvägen 7C, 114 56 Stockholm",
					url: "diplomathotel.com",
					position: [59.331985, 18.080399],
				},
			},
		]
	},
	{
		name: "Lanzarote",
		start: { year: 2012, month: Jan, day: 6 },
		end: { year: 2012, month: Jan, day: 13 },
		stops: [
			{
				location: {
					name: "Barcelo La Galea",
					address: "Paseo Maritimo, s/n, 35508 Costa Teguise (Lanzarote), Las Palmas, Spanien",
					url: "barcelo.com",
					position: [28.996064, -13.488995],
				},
            },
		]
	},
	{
		name: "Bohuslän (Påsk med Richard och Jessica)",
		start: { year: 2012, month: Apr, day: 6 },
		end: { year: 2012, month: Apr, day: 9 },
		stops: [
			{
                location: {
                    name: "Hafsten Resort",
                    address: "Hafsten 120, 451 96 Uddevalla",
                    url: "hafsten.se",
                    position: [58.315088, 11.721627],
                },
            },
		]
	},
	{
		name: "Legoland",
		start: { year: 2012, month: Jun, day: 6 },
		end: { year: 2012, month: Jun, day: 9 },
		stops: [
			{
                location: {
                    name: "Lalandia",
                    address: "Ellehammers Alle 3, 7190 Billund, Danmark",
                    url: "lalandia.dk",
                    position: [55.733272, 9.138306],
                },
            },
		]
	},
	{
		name: "Mallorca",
		start: { year: 2012, month: Jul, day: 8 },
		end: { year: 2012, month: Jul, day: 18 },
		stops: [
			{
                location: {
                    name: "Club Hotel Tonga",
                    address: "Crta Alcudia Arta, s/n, 07458 Can Picafort, Mallorca,Islas Baleares, Spanien",
                    url: "bghotels.com",
                    position: [39.763053, 3.149019],
                },
            },
		]
	},
	{
		name: "Småland",
		start: { year: 2012, month: Jul, day: 24 },
		end: { year: 2012, month: Jul, day: undefined },
		stops: [
			{
                location: {
                    name: "Vox Hotel",
                    address: "Lantmätargränd 2C, 553 20 Jönköping",
                    url: "https://voxhotel.se/",
                    position: [57.78294546171475, 14.174063161516502],
                },
            },
		]
	},
	{
		name: "Marseille",
        start: { year: 2012, month: Oct, day: 28 },
		end: { year: 2012, month: Nov, day: 1 },
		stops: [
			{
                location: {
                    name: "Radisson Blu Hotel Marseille Vieux Port",
                    address: "",
                    url: "",
                    position: [43.292427, 5.367340],
                },
            },
		]
	},
	{
		name: "Gran Canaria",
        start: { year: 2012, month: Dec, day: 31 },
		end: { year: 2012, month: Jan, day: 10 },
		people: [Johan, Jannike, Aston],
		stops: [
			{
                location: {
                    name: "ClubHotel Riu Waikiki",
                    address: "Av. de Gran Canaria, 20, 35100 San Bartolomé de Tirajana, Las Palmas, Spanien",
                    url: "",
                    position: [27.764132, -15.571117],
                },
                start: { year: 2012, month: Dec, day: 31 },
                end: { year: 2013, month: Jan, day: 10 },
            },
		]
	},
	{
		name: "Borås (Jannikes födelsedag)",
        start: { year: 2013, month: Feb, day: 15 },
		end: { year: 2013, month: Feb, day: 17 },
		stops: [
			{
                location: {
                    name: "Comfort Hotel Jazz",
                    address: "Allégatan 21, 503 32 Borås",
                    url: "nordicchoicehotels.se",
                    position: [57.722801, 12.941275],
                },
            },
		]
	},
	{
		name: "Legoland",
        start: { year: 2013, month: Jun, day: 6 },
		end: { year: 2013, month: Jun, day: 9 },
		stops: [
			{
                location: {
                    name: "Lalandia",
                    address: "Ellehammers Alle 3, 7190 Billund, Danmark",
                    url: "lalandia.dk",
                    position: [55.733272, 9.138306],
                },
            },
		]
	},
	{
		name: "Gullholmen",
        start: { year: 2013, month: Jul, day: 14 },
		end: { year: 2013, month: Jul, day: 21 },
		stops: [
			{
                location: {
                    name: "Gullholmsbaden - Ale kommuns stuga",
                    address: "Gullholmsbaden, 474 71 Gullhomen, Sverige",
                    url: "",
                    position: [58.175556, 11.399463],
                },
            },
		]
	},
	{
		name: "Danmark och Tyskland",
        start: { year: 2013, month: Jul, day: 24 },
		end: { year: 2013, month: Aug, day: 1 },
		stops: [
			{
                location: {
                    name: "Slottets Bed & Breakfast",
                    address: "Skovbovængets Alle 4, 4000 Roskilde, Danmark",
                    url: "bedandbreakfastroskilde.dk",
                    position: [55.636180, 12.076308],
                },
                start: { year: 2013, month: Jul, day: 24 },
                end: { year: 2013, month: Jul, day: 27 },
            },
			{
                location: {
                    name: "Hotel Plaza",
                    address: "Østre Stationsvej 24, 5000 Odense C, Danmark",
                    url: "millinghotels.dk",
                    position: [55.400113, 10.382812],
                },
                start: { year: 2013, month: Jul, day: 27 },
                end: { year: 2013, month: Jul, day: 29 },
            },
			{
                location: {
                    name: "Hotel Europa",
                    address: "H P Hanssens Gade 10, 6200 Aabenraa, Danmark",
                    url: "hoteleuropa.dk",
                    position: [55.046959, 9.420094],
                },
                start: { year: 2013, month: Jul, day: 29 },
                end: { year: 2013, month: Jul, day: 30 },
            },
			{
                location: {
                    name: "Hotel Astor",
                    address: "Holstenpl. 1-2, 24103 Kiel, Tyskland",
                    url: "nordic-hotels.com",
                    position: [54.319933, 10.134419],
                },
                start: { year: 2013, month: Jul, day: 30 },
                end: { year: 2013, month: Jul, day: 31 },
			},
		]
	},
	{
		name: "Stockholm (Daniels och Saras bröllop)",
        start: { year: 2013, month: Nov, day: 8 },
		end: { year: 2013, month: Nov, day: 10 },
		stops: [
			{
				location: {
					name: "First Hotel Norrtull",
					address: "Sankt Eriksgatan 119, 113 43 Stockholm",
					url: "firsthotels.se",
					position: [59.347910, 18.040371],
				},
			},
		]
	},
	{
		name: "Jobb (Enera), Stockholm",
		start: { year: 2013, month: Nov, day: undefined },
		end: { year: 2013, month: Nov, day: undefined },
		stops: [
			{
				location: {
					name: "Hotel Aldoria",
					address: "Sankt Eriksgatan 38, 112 34 Stockholm",
					url: "http://www.hotelfridhem.se/",
					position: [59.33403821265424, 18.03252553872035],
				},
			},
		]
	},
	{
		name: "Florida",
        start: { year: 2013, month: Dec, day: 24 },
		end: { year: 2014, month: Jan, day: 11 },
		stops: [
			{
				location: {
					name: "La Costa Beach Club",
					address: "1504 North Ocean Boulevard, Pompano Beach, FL 33062, USA",
					url: "lacostabeachclub.net",
					position: [26.251484, -80.084877],
				},
				start: { year: 2013, month: Dec, day: 24 },
				end: { year: 2013, month: Dec, day: 25 },
			},
			{
				location: {
					name: "Riverside Hotel",
					address: "620 E Las Olas Blvd, Fort Lauderdale, FL 33301, USA",
					url: "hotelsone.com",
					position: [26.119801, -80.136344],
				},
				start: { year: 2013, month: Dec, day: 25 },
				end: { year: 2013, month: Dec, day: 26 },
			},
			{
				location: {
					name: "El Patio Motel",
					address: "800 Washington St, Key West, FL 33040, USA",
					url: "search.swiss-suites.club",
					position: [24.549049, -81.791744],
				},
				start: { year: 2013, month: Dec, day: 26 },
				end: { year: 2013, month: Dec, day: 27 },
			},
			{
				location: {
					name: "Lighthouse Court Hotel",
					address: "902 Whitehead St, Key West, FL 33040, USA",
					url: "historickeywestinns.com",
					position: [24.550886, -81.800898],
				},
				start: { year: 2013, month: Dec, day: 27 },
				end: { year: 2013, month: Dec, day: 28 },
			},
			{
				location: {
					name: "Sea Cove Resort & Marina",
					address: "12685 Overseas Hwy, Marathon, FL 33050, USA",
					url: "floatingrooms.com",
					position: [24.731552, -81.014646],
				},
				start: { year: 2013, month: Dec, day: 28 },
				end: { year: 2013, month: Dec, day: 29 },
			},
			{
				location: {
					name: "Miami Beach Resort & Spa",
					address: "4833 Collins Ave, Miami Beach, FL 33140, USA",
					url: "miamibeachresortandspa.com",
					position: [25.823999, -80.121621],
				},
				start: { year: 2013, month: Dec, day: 29 },
				end: { year: 2013, month: Dec, day: 30 },
			},
			{
				location: {
					name: "Starlite Hotel",
					address: "750 Ocean Dr, Miami Beach, FL 33139, USA",
					url: "starlitehotel.com",
					position: [25.777653, -80.13132],
				},
				start: { year: 2013, month: Dec, day: 30 },
				end: { year: 2014, month: Jan, day: 1 },
			},
			{
				location: {
					name: "Billie Swamp Safari",
					address: "30000 Gator Tail Trl., Clewiston, FL 33440, USA",
					url: "billieswamp.com",
					position: [26.331288, -81.054107],
				},
				start: { year: 2014, month: Jan, day: 1 },
				end: { year: 2014, month: Jan, day: 2 },
			},
			{
				location: {
					name: "Sunset Beach Inn",
					address: "3287 W Gulf Dr, Sanibel, FL 33957, USA",
					url: "theinnsofsanibel.com/sunsetbeach",
					position: [26.426943, -82.100662],
				},
				start: { year: 2014, month: Jan, day: 2 },
				end: { year: 2014, month: Jan, day: 4 },
			},
			{
				location: {
					name: "Loews Royal Pacific Resort",
					address: "6300 Hollywood Way, Orlando, FL 32819, USA",
					url: "loewshotels.com/Royal-Pacific-Resort",
					position: [28.031702, -81.945952],
				},
				start: { year: 2014, month: Jan, day: 4 },
				end: { year: 2014, month: Jan, day: 8 },
			},
			{
				location: {
					name: "Residence Inn",
					address: "1350 N Ocean Blvd, Pompano Beach, FL 33062, USA",
					url: "marriott.com/hotels/travel/fllpb-residence-inn-fort-lauderdale-pompano-beach-oceanfront",
					position: [26.250122, -80.086108],
				},
				start: { year: 2014, month: Jan, day: 8 },
				end: { year: 2014, month: Jan, day: 10 },
			},
		]
	},
	{
		name: "Mullsjö (Jannikes födelsedag)",
		start: { year: 2014, month: Mar, day: 21 },
		end: { year: 2014, month: Mar, day: 23 },
		stops: [
			{
				location: {
					name: "Hotell Mullsjö",
					address: "Sjövägen, 565 32 Mullsjö",
					url: "mullsjohotell.se",
					position: [57.904073, 13.872609],
				},
			},
		]
	},
	{
		name: "Berlin över påsk",
		start: { year: 2014, month: Apr, day: 18 },
		end: { year: 2014, month: Apr, day: 21 },
		stops: [
			{
				location: {
					name: "Hotel Casa Camper Berlin",
					address: "Weinmeisterstraße 1, 10178 Berlin, Tyskland",
					url: "casacamper.com",
					position: [52.525731, 13.404111],
				},
			},
		]
	},
	{
		name: "Köpenhamn",
		start: { year: 2014, month: Jun, day: 5 },
		end: { year: 2014, month: Jun, day: 8 },
		stops: [
			{
				location: {
					name: "71 Nyhavn Hotel",
					address: "Nyhavn 71, 1051 København K, Danmark",
					url: "71nyhavnhotel.dk",
					position: [55.679258, 12.593846],
				},
			},
		]
	},
	{
		name: "Midsommarfirande hos familjen Björnström",
		start: { year: 2014, month: Jun, day: 20 },
		end: { year: 2014, month: Jun, day: 22 },
		stops: [
			{
				location: {
					name: "Hotel Djingis Khan",
					address: "Margaretavägen 7, 222 40 Lund",
					url: "djingiskhan.se",
					position: [55.719523, 13.194838],
				},
				start: { year: 2014, month: Jun, day: 20 },
				end: { year: 2014, month: Jun, day: 21 },
			},
			{
				location: {
					name: "Scandic S:t Jörgen",
					address: "Stora Nygatan 35, 211 37 Malmö",
					url: "scandichotels.com",
					position: [55.603494, 13.001593],
				},
				start: { year: 2014, month: Jun, day: 21 },
				end: { year: 2014, month: Jun, day: 22 },
			},
		]
	},
	{
		name: "Varberg (Hallifornia)",
		start: { year: 2014, month: Jul, day: 16 },
		end: { year: 2014, month: Jul, day: 18 },
		stops: [
			{
				location: {
					name: "Hotell Gästis",
					address: "Borgmästaregatan 1, 432 41 Varberg",
					url: "hotellgastis.nu",
					position: [57.107145, 12.249027],
				},
			},
		]
	},
	{
		name: "Mallorca",
		start: { year: 2014, month: Jul, day: 23 },
		end: { year: 2014, month: Aug, day: 1 },
		stops: [
			{
				location: {
					name: "HM Tropical",
					address: "Carrer de Marbella, 16, 07610 Palma, Illes Balears, Spanien",
					url: "hmtropical.com",
					position: [39.528068, 2.732143],
				},
			},
		]
	},
	{
		name: "Småland med hyrd husbil",
		start: { year: 2014, month: Sep, day: 5 },
		end: { year: 2014, month: Sep, day: 7 },
		stops: [
			{
				location: Paula,
				start: { year: 2014, month: Sep, day: 5 },
				end: { year: 2014, month: Sep, day: 6 },
			},
			{
				location: {
					name: "Chris och Anna",
					address: "Fredsgatan 1, 598 35 Vimmerby, Sverige",
					url: "",
					position: [57.673178, 15.866224],
				},
				start: { year: 2014, month: Sep, day: 6 },
				end: { year: 2014, month: Sep, day: 7 },
			},
		]
	},
	{
		name: "Legoland",
		start: { year: 2014, month: Sep, day: 18 },
		end: { year: 2014, month: Sep, day: 21 },
		stops: [
			{
				location: {
					name: "Lalandia",
					address: "Ellehammers Alle 3, 7190 Billund, Danmark",
					url: "lalandia.dk",
					position: [55.733272, 9.138306],
				},
			},
		]
	},
	{
		name: "Teneriffa över jul",
		start: { year: 2014, month: Dec, day: 16 },
		end: { year: 2014, month: Dec, day: 28 },
		stops: [
			{
				location: {
					name: "Hotel Taburiente Tenerife",
					address: "Calle Dr. Jose Naveiras, 24A, 38001 Santa Cruz de Tenerife, Spanien",
					url: "hoteltaburiente.com",
					position: [28.473424, -16.253059],
				},
				start: { year: 2014, month: Dec, day: 16 },
				end: { year: 2014, month: Dec, day: 18 },
			},
			{
				location: {
					name: "Hotel ValleMar",
					address: "Av de Colón, 4, 38400 Puerto de la Cruz, Santa Cruz de Tenerife, Spanien",
					url: "hotelvallemar.com",
					position: [28.417952, -16.544375],
				},
				start: { year: 2014, month: Dec, day: 18 },
				end: { year: 2014, month: Dec, day: 20 },
			},
			{
				location: {
					name: "Sandos San Blas Nature Resort & Golf",
					address: "Urbanización San Blas, Av. de Greñamora, 1, 38639, Santa Cruz de Tenerife, Spanien",
					url: "sandos.com",
					position: [28.030330, -16.598563],
				},
				start: { year: 2014, month: Dec, day: 20 },
				end: { year: 2014, month: Dec, day: 23 },
			},
			{
				location: {
					name: "Sunset View Club",
					address: "Calle San Blas, s/n, 38639 Golf del Sur, 38620 Santa Cruz, Spanien",
					url: "diamondresortsandhotels.com",
					position: [28.028796, -16.602190],
				},
				start: { year: 2014, month: Dec, day: 23 },
				end: { year: 2014, month: Dec, day: 27 },
			},
			{
				location: {
					name: "Chayofa Country Club",
					address: "Urbanización Chayofa, Calle El Morro, 2, 38652 Arona, Santa Cruz de Tenerife, Santa Cruz de Tenerife, Spanien",
					url: "chayofacountryclub.co.uk",
					position: [28.074182, -16.691996],
				},
				start: { year: 2014, month: Dec, day: 27 },
				end: { year: 2014, month: Dec, day: 28 },
			},
		]
	},
	{
		name: "Jobb (Enera), Stockholm",
		start: { year: 2015, month: Mar, day: 24 },
		end: { year: 2015, month: Mar, day: 26 },
		stops: [
			{
				location: {
					name: "Hotel Aldoria",
					address: "Sankt Eriksgatan 38, 112 34 Stockholm",
					url: "http://www.hotelfridhem.se/",
					position: [59.33403821265424, 18.03252553872035],
				},
			},
		]
	},
	{
		name: "Hamburg över påsk",
		start: { year: 2015, month: Apr, day: 3 },
		end: { year: 2015, month: Apr, day: 6 },
		stops: [
			{
				location: {
					name: "Hamburg Marriott Hotel",
					address: "ABC-Straße 52, 20354 Hamburg, Tyskland",
					url: "marriott.com",
					position: [53.554634, 9.987093],
				},
			},
		]
	},
	{
		name: "Varberg med Karin och Bengt",
		start: { year: 2015, month: Apr, day: 24 },
		end: { year: 2015, month: Apr, day: 26 },
		stops: [
			{
				location: {
					name: "Apelvikens Camping",
					address: "Sanatorievägen 4, 432 53 Varberg",
					url: "apelviken.se",
					position: [57.085433, 12.246959],
				},
			},
		]
	},
	{
		name: "Köpenhamn",
		start: { year: 2015, month: May, day: 1 },
		end: { year: 2015, month: May, day: 3 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Tivoli Hotel & Congress Center",
					address: "Arni Magnussons Gade 2, 1577 København V, Danmark",
					url: "tivolihotel.dk",
					position: [55.666490, 12.566188],
				},
			},
		]
	},
	{
		name: "Småland och Öland",
		start: { year: 2015, month: May, day: 13 },
		end: { year: 2015, month: May, day: 17 },
		stops: [
			{
				location: {
					name: "Vox Hotel",
					address: "Lantmätargränd 2C, 553 20 Jönköping",
					url: "voxhotel.se",
					position: [57.782923, 14.173167],
				},
				start: { year: 2015, month: May, day: 13 },
				end: { year: 2015, month: May, day: 14 },
			},
			{
				location: {
					name: "First Hotel Witt Kalmar",
					address: "Södra Långgatan 42, 392 31 Kalmar",
					url: "firsthotels.se",
					position: [56.663808, 16.367413],
				},
				start: { year: 2015, month: May, day: 14 },
				end: { year: 2015, month: May, day: 15 },
			},
			{
				location: {
					name: "Strand Hotell Borgholm",
					address: "Villagatan 4, 387 32 Borgholm",
					url: "strandborgholm.se",
					position: [56.878706, 16.647622],
				},
				start: { year: 2015, month: May, day: 15 },
				end: { year: 2015, month: May, day: 16 },
			},
			{
				location: {
					name: "Scandic Växjö",
					address: "Hejaregatan 19, 352 46 Växjö",
					url: "scandichotel.se",
					position: [56.884012, 14.760521],
				},
				start: { year: 2015, month: May, day: 16 },
				end: { year: 2015, month: May, day: 17 },
			},
		]
	},
	{
		name: "Europa med bil (Frankrike med Essungers)",
		start: { year: 2015, month: Jul, day: 4 },
		end: { year: 2015, month: Jul, day: 28 },
		stops: [
			{
				location: {
					name: "Malmö Arena Hotel",
					address: "Hyllie Boulevard 12, 216 23 Malmö",
					url: "malmoarenahotel.com",
					position: [55.564836, 12.975807],
				},
				start: { year: 2015, month: Jul, day: 4 },
				end: { year: 2015, month: Jul, day: 5 },
			},
			{
				location: {
					name: "City Hotel Kurfürst Balduin",
					address: "Hohenfelder Str. 12, 56068 Koblenz, Tyskland",
					url: "cityhotel-koblenz.de",
					position: [50.361172, 7.592841],
				},
				start: { year: 2015, month: Jul, day: 5 },
				end: { year: 2015, month: Jul, day: 6 },
			},
			{
				location: {
					name: "Hotel Moselflair",
					address: "Bergstraße 6, 56812 Cochem, Tyskland",
					url: "hotel-moselflair.de",
					position: [50.147762, 7.170343],
				},
				start: { year: 2015, month: Jul, day: 6 },
				end: { year: 2015, month: Jul, day: 8 },
			},
			{
				location: {
					name: "Hôtel Jean Moët",
					address: "7 Rue Jean Moët, 51200 Épernay, Frankrike",
					url: "hoteljeanmoet.com",
					position: [49.044095, 3.957781],
				},
				start: { year: 2015, month: Jul, day: 8 },
				end: { year: 2015, month: Jul, day: 9 },
			},
			{
				location: {
					name: "Hôtel des Trois Hiboux",
					address: "Oise - Pays de France Natural Regional Park, Astérix Park, Parc Astérix, 60128 Plailly, Frankrike",
					url: "parcasterix.fr",
					position: [49.129710, 2.571090],
				},
				start: { year: 2015, month: Jul, day: 9 },
				end: { year: 2015, month: Jul, day: 10 },
			},
			{
				location: {
					name: "Hôtel Ibis Chartres Centre Cathédrale",
					address: "14 Place Drouaise, 28000 Chartres, Frankrike",
					url: "accorhotels.com",
					position: [48.452798, 1.489463],
				},
				start: { year: 2015, month: Jul, day: 10 },
				end: { year: 2015, month: Jul, day: 11 },
			},
			{
				location: {
					name: "Lagrange Prestige - Les Hauts de la Houle",
					address: "Rue du Commandant Charcot, 35260 Cancale, Frankrike",
					url: "vacances-lagrange.com",
					position: [48.673280, -1.856545],
				},
				start: { year: 2015, month: Jul, day: 11 },
				end: { year: 2015, month: Jul, day: 18 },
			},
			{
				location: {
					name: "Hôtel La Palmeraie",
					address: "22 Avenue de la Côte de Nacre, 14970 Bénouville, Frankrike",
					url: "hotel-lapalmeraie.com",
					position: [49.248033, -0.275031],
				},
				start: { year: 2015, month: Jul, day: 18 },
				end: { year: 2015, month: Jul, day: 19 },
			},
			{
				location: {
					name: "Renaissance Brussels Hotel",
					address: "Rue du Parnasse 19, 1050 Bruxelles, Belgien",
					url: "marriott.com",
					position: [50.838156, 4.371605],
				},
				start: { year: 2015, month: Jul, day: 19 },
				end: { year: 2015, month: Jul, day: 21 },
			},
			{
				location: {
					name: "Colourful Bed And Breakfast",
					address: "Eerste Helmersstraat 55, 1054 DB Amsterdam, Nederländerna",
					url: "colourfulbedandbreakfast.nl",
					position: [52.363445, 4.875349],
				},
				start: { year: 2015, month: Jul, day: 21 },
				end: { year: 2015, month: Jul, day: 23 },
			},
			{
				location: {
					name: "Park Hotel Lübeck Am Lindenplatz",
					address: "Lindenpl. 2, 23554 Lübeck, Tyskland",
					url: "parkhotel-luebeck.de",
					position: [53.865974, 10.673168],
				},
				start: { year: 2015, month: Jul, day: 23 },
				end: { year: 2015, month: Jul, day: 24 },
			},
			{
				location: {
					name: "Lalandia Rødby",
					address: "Lalandia Centret 1, 4970 Rødby, Danmark",
					url: "lalandia.dk",
					position: [54.670150, 11.333352],
				},
				start: { year: 2015, month: Jul, day: 24 },
				end: { year: 2015, month: Jul, day: 26 },
			},
			{
				location: {
					name: "Bandholm Hotel",
					address: "Havnegade 37, 4941 Bandholm, Danmark",
					url: "bandholmhotel.dk",
					position: [54.836738, 11.485400],
				},
				start: { year: 2015, month: Jul, day: 26 },
				end: { year: 2015, month: Jul, day: 28 },
			},
		]
	},
	{
		name: "Teneriffa",
		start: { year: 2015, month: Oct, day: 25 },
		end: { year: 2015, month: Nov, day: 1 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Tagoro Family & Fun Costa Adeje",
					address: "Calle Galicia, 3, 38660 Costa Adeje, Santa Cruz de Tenerife, Spanien",
					url: "dreamplacehotels.com",
					position: [28.087854, -16.727005],
				},
			},
		]
	},
	{
		name: "Utkörda hemifrån pga tjejfest - husbilen",
		start: { year: 2015, month: Nov, day: 28 },
		end: { year: 2015, month: Nov, day: 29 },
		people: [Johan, Aston],
		stops: [
			{
				location: {
					name: "Hafsten Resort",
					address: "Hafsten 120, 451 96 Uddevalla",
					url: "hafsten.se",
					position: [58.315056, 11.722576],
				},
			},
		]
	},
	{
		name: "Jamaica",
		start: { year: 2015, month: Dec, day: 16 },
		end: { year: 2016, month: Jan, day: 2 },
		stops: [
			{
				location: {
					name: "Tobys Resort",
					address: "1 Kent Avenue, Montego Bay, Jamaica",
					url: "tobysresorthotel-montegobay.com",
					position: [18.490698, -77.926854],
				},
				start: { year: 2015, month: Dec, day: 16 },
				end: { year: 2015, month: Dec, day: 17 },
			},
			{
				location: {
					name: "Travellers Beach Resort",
					address: "Norman Manley Blvd, Negril JMDWD14, Jamaica",
					url: "tbr.travel",
					position: [18.284631, -78.342686],
				},
				start: { year: 2015, month: Dec, day: 17 },
				end: { year: 2015, month: Dec, day: 21 },
			},
			{
				location: {
					name: "Kaz Kreol Beach Lodge",
					address: "White River Bay, Ocho Rios 0000, Jamaica",
					url: "",
					position: [18.414713, -77.073344],
				},
				start: { year: 2015, month: Dec, day: 21 },
				end: { year: 2015, month: Dec, day: 25 },
			},
			{
				location: {
					name: "The Spanish Court Hotel",
					address: "1 St Lucia Avenue, Kingston, Saint Andrew, 5, Jamaica",
					url: "spanishcourthotel.com",
					position: [18.008328, -76.783747],
				},
				start: { year: 2015, month: Dec, day: 25 },
				end: { year: 2015, month: Dec, day: 27 },
			},
			{
				location: {
					name: "Royal Decameron Club Caribbean",
					address: "Main Road, Runaway Bay, Jamaica",
					url: "decameron.com",
					position: [18.469348, -77.304464],
				},
				start: { year: 2015, month: Dec, day: 27 },
				end: { year: 2015, month: Dec, day: 30 },
			},
			{
				location: {
					name: "Scandic Klara",
					address: "Slöjdgatan 7, 111 57 Stockholm",
					url: "scandichotels.se",
					position: [59.333847, 18.062448],
				},
				start: { year: 2015, month: Dec, day: 31 },
				end: { year: 2016, month: Jan, day: 2 },
			},
		]
	},
	{
		name: "Fredrikshavn med Maria och Mario",
		start: { year: 2016, month: Feb, day: 18 },
		end: { year: 2016, month: Feb, day: 20 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Scandic The Reef",
					address: "Tordenskjoldsgade 14, 9900 Frederikshavn, Danmark",
					url: "scandichotels.dk",
					position: [57.439373, 10.536760],
				},
			},
		]
	},
	{
		name: "Skåne och Danmark över påsk med Liljeblads",
		start: { year: 2016, month: Mar, day: 24 },
		end: { year: 2016, month: Mar, day: 28 },
		stops: [
			{
				location: {
					name: "Elite Hotel Mollberg",
					address: "Stortorget 18, 251 14 Helsingborg, Sverige",
					url: "elite.se",
					position: [56.046851, 12.695774],
				},
				start: { year: 2016, month: Mar, day: 24 },
				end: { year: 2016, month: Mar, day: 25 },
			},
			{
				location: {
					name: "Scandic Hotel Silkeborg",
					address: "Udgårdsvej 2, 8600 Silkeborg, Danmark",
					url: "scandichotels.dk",
					position: [56.170600, 9.514757],
				},
				start: { year: 2016, month: Mar, day: 25 },
				end: { year: 2016, month: Mar, day: 27 },
			},
			{
				location: {
					name: "Hotel Royal",
					address: "Store Torv 4, 8000 Aarhus C, Danmark",
					url: "hotelroyal.dk",
					position: [56.157592, 10.210016],
				},
				start: { year: 2016, month: Mar, day: 27 },
				end: { year: 2016, month: Mar, day: 28 },
			},
		]
	},
	{
		name: "Småland (husbil)",
		start: { year: 2016, month: May, day: 4 },
		end: { year: 2016, month: May, day: 8 },
		stops: [
			{
				location: {
					name: "Villa Björkhagen",
					address: "Friggagatan 31, 554 54 Jönköping, Sverige",
					url: "villabjorkhagen.se",
					position: [57.787228, 14.216812],
				},
				start: { year: 2016, month: May, day: 4 },
				end: { year: 2016, month: May, day: 5 },
			},
			{
				location: Paula,
				start: { year: 2016, month: May, day: 5 },
				end: { year: 2016, month: May, day: 6 },
			},
			{
				location: {
					name: "Västervik Resort",
					address: "Lysingsvägen, 593 53 Västervik, Sverige",
					url: "vastervikresort.se",
					position: [57.737664, 16.676493],
				},
				start: { year: 2016, month: May, day: 6 },
				end: { year: 2016, month: May, day: 8 },
			},
		]
	},
	{
		name: "London med Heffa, Luhr, Richard, Ricke och Björnström",
		start: { year: 2016, month: May, day: 27 },
		end: { year: 2016, month: May, day: 29 },
		stops: [
			{
				location: {
					name: "TODO",
					address: "TODO",
					url: "",
					position: [0, 0],
				},
			},
		]
	},
	{
		name: "Dyrön, Karin 70 år",
		start: { year: 2016, month: Jun, day: 4 },
		end: { year: 2016, month: Jun, day: 6 },
		stops: [
			{
				location: {
					name: "Annikas stuga",
					address: "Hagvägen 8, 471 43 Dyrön, Sverige",
					url: "facebook.com/pg/annikapadyron/about",
					position: [57.929188, 11.611811],
				},
			},
		]
	},
	{
		name: "Kalifornien + New York",
		start: { year: 2016, month: Jun, day: 24 },
		end: { year: 2016, month: Jul, day: 23 },
		stops: [
			{
				location: {
					name: "Pier 2620 Hotel Fisherman's Wharf",
					address: "2620 Jones St, San Francisco, CA 94133, USA",
					url: "",
					position: [37.805399, -122.416749],
				},
				start: { year: 2016, month: Jun, day: 24 },
				end: { year: 2016, month: Jun, day: 28 },
			},
			{
				location: {
					name: "Inns of California",
					address: "350 S Washington St, Sonora, CA 95370, USA",
					url: "",
					position: [37.980104, -120.381885],
				},
				start: { year: 2016, month: Jun, day: 28 },
				end: { year: 2016, month: Jun, day: 30 },
			},
			{
				location: {
					name: "Quality Inn & Suites Santa Cruz Mountains",
					address: "9733 CA-9, Ben Lomond, CA 95005, USA",
					url: "",
					position: [37.089875, -122.094208],
				},
				start: { year: 2016, month: Jun, day: 30 },
				end: { year: 2016, month: Jul, day: 1 },
			},
			{
				location: {
					name: "Coastview Inn",
					address: "301 Beach St, Santa Cruz, CA 95060, USA",
					url: "",
					position: [36.964223, -122.021118],
				},
				start: { year: 2016, month: Jul, day: 1 },
				end: { year: 2016, month: Jul, day: 2 },
			},
			{
				location: {
					name: "Silver Surf Motel",
					address: "9390 Castillo Dr, San Simeon, CA 93452, USA",
					url: "silversurfmotel.com",
					position: [35.613899, -121.144261],
				},
				start: { year: 2016, month: Jul, day: 2 },
				end: { year: 2016, month: Jul, day: 3 },
			},
			{
				location: {
					name: "Le Parc Suite Hotel",
					address: "733 N W Knoll Dr, West Hollywood, CA 90069, USA",
					url: "leparcsuites.com",
					position: [34.084264, -118.377848],
				},
				start: { year: 2016, month: Jul, day: 3 },
				end: { year: 2016, month: Jul, day: 6 },
			},
			{
				location: {
					name: "Sheraton Universal Hotel",
					address: "333 Universal Hollywood Dr, Universal City, CA 91608, USA",
					url: "sheratonuniversal.com",
					position: [34.137521, -118.360037],
				},
				start: { year: 2016, month: Jul, day: 6 },
				end: { year: 2016, month: Jul, day: 7 },
			},
			{
				location: {
					name: "Residence Inn by Marriott Anaheim Maingate",
					address: "1700 S Clementine St, Anaheim, CA 92802, USA",
					url: "marriott.com",
					position: [33.806579, -117.909014],
				},
				start: { year: 2016, month: Jul, day: 7 },
				end: { year: 2016, month: Jul, day: 10 },
			},
			{
				location: {
					name: "Jens Agby",
					address: "Sea Wind Court, Carlsbad, CA 92011, USA",
					url: "",
					position: [33.117831, -117.314204],
				},
				start: { year: 2016, month: Jul, day: 10 },
				end: { year: 2016, month: Jul, day: 19 },
			},
			{
				location: {
					name: "Radisson Martinique on Broadway",
					address: "49 W 32nd St, New York, NY 10001, USA",
					url: "radisson.com",
					position: [40.748242, -73.987779],
				},
				start: { year: 2016, month: Jul, day: 20 },
				end: { year: 2016, month: Jul, day: 22 },
			},
		]
	},
	{
		name: "Skåne och Småland (husbil)",
		start: { year: 2016, month: Jul, day: 29 },
		end: { year: 2016, month: Aug, day: 4 },
		stops: [
			{
				location: {
					name: "Farmor och Farfar",
					address: "Bankogårdsgatan 25, Helsingborg, Sverige",
					url: "",
					position: [56.032159, 12.745075],
				},
				start: { year: 2016, month: Jul, day: 29 },
				end: { year: 2016, month: Jul, day: 30 },
			},
			{
				location: {
					name: "SvampaCampingen",
					address: "273 97 Tomelilla, Sverige",
					url: "tomelilla.se",
					position: [55.559237, 13.909400],
				},
				start: { year: 2016, month: Jul, day: 30 },
				end: { year: 2016, month: Jul, day: 31 },
			},
			{
				location: {
					name: "Sjöstugans Camping & Vandrarhem",
					address: "343 94 Bökhult, Sverige",
					url: "sjostugan.com",
					position: [56.568858, 14.132451],
				},
				start: { year: 2016, month: Jul, day: 31 },
				end: { year: 2016, month: Aug, day: 1 },
			},
			{
				location: {
					name: "Växjö Swecamp Evedal",
					address: "Evedal, 352 63 Växjö",
					url: "evedalscamping.com",
					position: [56.922865, 14.817520],
				},
				start: { year: 2016, month: Aug, day: 1 },
				end: { year: 2016, month: Aug, day: 2 },
			},
			{
				location: {
					name: "High Chaparral",
					address: "High Chaparral, 330 31 Kulltorp",
					url: "highchaparral.se",
					position: [57.259675, 13.830396],
				},
				start: { year: 2016, month: Aug, day: 2 },
				end: { year: 2016, month: Aug, day: 4 },
			},
		]
	},
	{
		name: "Fotbollsresa med MBK till England",
		start: { year: 2016, month: Aug, day: 18 },
		end: { year: 2016, month: Aug, day: 22 },
		people: [Johan, Aston],
		stops: [
			{
				location: {
					name: "Engelsk värdfamilj",
					address: "Shakespeare Ave, Bath BA2 4RG, Storbritannien",
					url: "",
					position: [51.373756, -2.363491],
				},
				start: { year: 2016, month: Aug, day: 18 },
				end: { year: 2016, month: Aug, day: 19 },
			},
			{
				location: {
					name: "Skern Lodge Outdoor Activity Centre",
					address: "Appledore, Bideford EX39 1NG, Storbritannien",
					url: "skernlodge.co.uk",
					position: [51.053165, -4.204548],
				},
				start: { year: 2016, month: Aug, day: 19 },
				end: { year: 2016, month: Aug, day: 21 },
			},
			{
				location: {
					name: "Engelsk värdfamilj",
					address: "Shakespeare Ave, Bath BA2 4RG, Storbritannien",
					url: "",
					position: [51.373756, -2.363491],
				},
				start: { year: 2016, month: Aug, day: 21 },
				end: { year: 2016, month: Aug, day: 22 },
			},
		]
	},
	{
		name: "Leetspeak",
		start: { year: 2016, month: Oct, day: 14 },
		end: { year: 2016, month: Oct, day: 15 },
		stops: [
			{
				location: {
					name: "First Hotel Mortensen",
					address: "Baltzarsgatan 45, 211 36 Malmö",
					url: "firsthotels.se",
					position: [55.604718, 13.001451],
				},
				start: { year: 2016, month: Oct, day: 14 },
				end: { year: 2016, month: Oct, day: 15 },
			},
		]
	},
	{
		name: "Maldiverna med Maria, Mario och Nicholas",
		start: { year: 2016, month: Oct, day: 30 },
		end: { year: 2016, month: Nov, day: 7 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Seashore Beach Inn",
					address: "Maafushi, Maldiverna",
					url: "",
					position: [3.945374, 73.492261],
				},
			},
		]
	},
	{
		name: "Konferens (Combination), Rom",
		start: { year: 2016, month: Nov, day: 25 },
		end: { year: 2016, month: Nov, day: 28 },
		people: [Johan],
		stops: [
			{
				location: {
					name: "Grand Hotel Palatino",
					address: "Via Cavour, 213/M, 00184 Roma RM, Italien",
					url: "https://www.fhhotelgroup.it/it/grand-hotel-palatino-roma/index",
					position: [41.894531679749036, 12.492277458200505],
				},
			},
		]
	},
	{
		name: "La Palma",
		start: { year: 2016, month: Dec, day: 23 },
		end: { year: 2016, month: Dec, day: 30 },
		stops: [
			{
				location: {
					name: "La Palma & Teneguía Princess",
					address: "Ctra. la Costa Cerca Vieja, 10, 38740 Fuencaliente de la Palma, Santa Cruz de Tenerife, Spanien",
					url: "princess-hotels.com",
					position: [28.501867, -17.874973],
				},
			},
		]
	},
	{
		name: "Jönköping (Johans födelsedag)",
		start: { year: 2017, month: Jan, day: 7 },
		end: { year: 2017, month: Jan, day: 8 },
		stops: [
			{
				location: {
					name: "Elite Stora Hotellet",
					address: "Hotellplan, 553 20 Jönköping",
					url: "elite.se",
					position: [57.783292, 14.169588],
				},
			},
		]
	},
	{
		name: "Barnfria i Malmö",
		start: { year: 2017, month: Jan, day: 21 },
		end: { year: 2017, month: Jan, day: 22 },
		people: [Johan, Jannike],
		stops: [
			{
				location: {
					name: "BEST WESTERN Hotel Royal",
					address: "Norra Vallgatan 94, 211 22 Malmö",
					url: "https://www.bestwestern.se/hotell/best-western-hotel-royal-88144",
					position: [55.60658287252464, 12.995409152094984],
				},
			},
		]
	},
	{
		name: "ICE Totally Gaming Exhibition, ExCel London",
		start: { year: 2017, month: Feb, day: 6 },
		end: { year: 2017, month: Feb, day: 8 },
		people: [Johan],
		stops: [
			{
				location: {
					name: "The Corner | London City",
					address: "42 Adler St, London E1 1EE, Storbritannien",
					url: "https://www.thecornerlondoncity.co.uk/",
					position: [51.51617878203535, -0.0675236718669839],
				},
			},
		]
	},
	{
		name: "Falkenberg, Astons 11-årsdag med Farmor och Farfar",
		start: { year: 2017, month: Apr, day: 8 },
		end: { year: 2017, month: Apr, day: 9 },
		stops: [
			{
				location: {
					name: "Hertigen Bungalow",
					address: "Elvägen, Falkenberg, Sverige",
					url: "",
					position: [56.900512, 12.518918],
				},
			},
		]
	},
	{
		name: "Oslo över påsk",
		start: { year: 2017, month: Apr, day: 13 },
		end: { year: 2017, month: Apr, day: 17 },
		stops: [
			{
				location: {
					name: "Hotell Park Inn by Radisson",
					address: "Øvre Slottsgate 2C, 0157 Oslo, Norge",
					url: "parkinn.com",
					position: [59.911038, 10.740566],
				},
				start: { year: 2017, month: Apr, day: 13 },
				end: { year: 2017, month: Apr, day: 16 },
			},
			{
				location: {
					name: "Scandic Holmenkollen Park",
					address: "Kongeveien 26, 0787 Oslo, Norge",
					url: "scandichotels.no",
					position: [59.962803, 10.662736],
				},
				start: { year: 2017, month: Apr, day: 16 },
				end: { year: 2017, month: Apr, day: 17 },
			},
		]
	},
	{
		name: "Legoland (husbil)",
		start: { year: 2017, month: Jun, day: 2 },
		end: { year: 2017, month: Jun, day: 6 },
		stops: [
			{
				location: {
					name: "Legoland Holiday Village",
					address: "Ellehammers Alle 2, 7190 Billund, Danmark",
					url: "legoland.dk",
					position: [55.729693, 9.134079],
				},
			},
		]
	},
	{
		name: "Segling",
		start: { year: 2017, month: Jun, day: 10 },
		end: { year: 2017, month: Jun, day: 12 },
		people: [Johan],
		stops: [
			{
				location: {
					name: "Knippla Gästhamn",
					address: "Hamnbergsvägen 55G, 475 51 Källö-knippla",
					url: "http://www.knipplahamn.se",
					position: [57.749757787568846, 11.653727189263748],
				},
				start: { year: 2017, month: Jun, day: 10 },
				end: { year: 2017, month: Jun, day: 11 },
			},
			{
				location: {
					name: "Åstols gästhamn",
					address: "",
					url: "",
					position: [57.9240427108852, 11.58582388035606],
				},
				start: { year: 2017, month: Jun, day: 11 },
				end: { year: 2017, month: Jun, day: 12 },
			},
		]
	},
	{
		name: "Midsommar",
		start: { year: 2017, month: Jun, day: 23 },
		end: { year: 2017, month: Jun, day: 25 },
		stops: [
			{
				location: {
					name: "Familjen Luhr",
					address: "Onsala snäckväg 17",
					url: "",
					position: [57.433127, 12.043810],
				},
				start: { year: 2017, month: Jun, day: 23 },
				end: { year: 2017, month: Jun, day: 24 },
			},
			{
				location: {
					name: "Vallersvik Camping och Vandrarhem",
					address: "Vallersviksvägen 28, 439 61 Frillesås",
					url: "vallersvik.com",
					position: [57.320295, 12.159033],
				},
				start: { year: 2017, month: Jun, day: 24 },
				end: { year: 2017, month: Jun, day: 25 },
			},
		]
	},
	{
		name: "Europa med husbilen",
		start: { year: 2017, month: Jul, day: 1 },
		end: { year: 2017, month: Jul, day: 28 },
		stops: [
			{
				location: {
					name: "Reisemobilhafen Wohnmobil-Oase Rügen",
					address: "Proraer Chaussee 60, 18609 Ostseebad Binz, Tyskland",
					url: "reisemobilhafen-ostseebad-binz.de",
					position: [54.449144, 13.559387],
				},
				start: { year: 2017, month: Jul, day: 1 },
				end: { year: 2017, month: Jul, day: 2 },
			},
			{
				location: {
					name: "Comfortcamping Senftenberger See",
					address: "Senftenberger Str. 10, 01968 Senftenberg, Tyskland",
					url: "komfortcamping-see.de",
					position: [51.498682, 13.983877],
				},
				start: { year: 2017, month: Jul, day: 2 },
				end: { year: 2017, month: Jul, day: 3 },
			},
			{
				location: {
					name: "Camp-Pension Dana",
					address: "Trojská 357/129, 171 00 Praha-Troja, Tjeckien",
					url: "campdana.cz",
					position: [50.116885, 14.431657],
				},
				start: { year: 2017, month: Jul, day: 3 },
				end: { year: 2017, month: Jul, day: 6 },
			},
			{
				location: {
					name: "Neue Donau Camping",
					address: "Campingplatz Ost, 1220 Wien, Österrike",
					url: "wiencamping.at",
					position: [48.210152, 16.446802],
				},
				start: { year: 2017, month: Jul, day: 6 },
				end: { year: 2017, month: Jul, day: 8 },
			},
			{
				location: {
					name: "Städtisches Bad & Camping Leibnitz",
					address: "Rudolf-Hans-Bartsch-Gasse 33, 8430 Leibnitz, Österrike",
					url: "leibnitz.at",
					position: [46.777625, 15.530789],
				},
				start: { year: 2017, month: Jul, day: 8 },
				end: { year: 2017, month: Jul, day: 10 },
			},
			{
				location: {
					name: "Camp Lucija",
					address: "Seča 204, 6320 Portorož-Portorose, Slovenien",
					url: "camp-lucija.si",
					position: [45.503073, 13.591335],
				},
				start: { year: 2017, month: Jul, day: 10 },
				end: { year: 2017, month: Jul, day: 12 },
			},
			{
				location: {
					name: "Camping Miramare",
					address: "Lungomare Dante Alighieri, 29, 30013 Località Punta Sabbioni, Cavallino-Treporti VE, Italien",
					url: "camping-miramare.it",
					position: [45.440271, 12.423095],
				},
				start: { year: 2017, month: Jul, day: 12 },
				end: { year: 2017, month: Jul, day: 14 },
			},
			{
				location: {
					name: "Campeggio Gasparina",
					address: "Via Gasparina, 13, 37014 Castelnuovo del Garda VR, Italien",
					url: "gasparina.com",
					position: [45.454444, 10.698865],
				},
				start: { year: 2017, month: Jul, day: 14 },
				end: { year: 2017, month: Jul, day: 16 },
			},
			{
				location: {
					name: "Hotel Löwenhof",
					address: "Via Brennero, 60, 39040 Varna BZ, Italien",
					url: "loewenhof.it",
					position: [46.734934, 11.647002],
				},
				start: { year: 2017, month: Jul, day: 16 },
				end: { year: 2017, month: Jul, day: 19 },
			},
			{
				location: {
					name: "Campeggio di Merano",
					address: "Via Piave, 44, 39012 Merano BZ, Italien",
					url: "meran.eu",
					position: [46.662995, 11.159075],
				},
				start: { year: 2017, month: Jul, day: 19 },
				end: { year: 2017, month: Jul, day: 20 },
			},
			{
				location: {
					name: "Seecamping Bregenz",
					address: "Hechtweg 1, 6900 Bregenz, Österrike",
					url: "seecamping.at",
					position: [47.505330, 9.714047],
				},
				start: { year: 2017, month: Jul, day: 20 },
				end: { year: 2017, month: Jul, day: 21 },
			},
			{
				location: {
					name: "Campingplatz Rausenbach",
					address: "Rausenbachweg 8, 8124 Maur, Schweiz",
					url: "camping-rausenbach.jimdo.com",
					position: [47.345985, 8.669371],
				},
				start: { year: 2017, month: Jul, day: 21 },
				end: { year: 2017, month: Jul, day: 22 },
			},
			{
				location: {
					name: "Müller-See Camping und Freizeit",
					address: "Müller-See 1, 79359 Riegel am Kaiserstuhl, Tyskland",
					url: "muellersee.de",
					position: [48.162519, 7.742272],
				},
				start: { year: 2017, month: Jul, day: 22 },
				end: { year: 2017, month: Jul, day: 24 },
			},
			{
				location: {
					name: "Camping Indigo Strasbourg",
					address: "9 Rue de l'Auberge de jeunesse, 67200 Strasbourg, Frankrike",
					url: "camping-indigo.com",
					position: [48.575277, 7.716483],
				},
				start: { year: 2017, month: Jul, day: 24 },
				end: { year: 2017, month: Jul, day: 26 },
			},
			{
				location: {
					name: "Campingplatz Auf dem Simpel",
					address: "Auf dem Simpel, 29614 Soltau, Tyskland",
					url: "auf-dem-simpel.de",
					position: [53.022929, 9.859005],
				},
				start: { year: 2017, month: Jul, day: 26 },
				end: { year: 2017, month: Jul, day: 28 },
			},
		]
	},
	{
		name: "ComicCon Stockholm",
		start: { year: 2017, month: Sep, day: 15 },
		end: { year: 2017, month: Sep, day: 17 },
		stops: [
			{
				location: {
					name: "Grand Central by Scandic",
					address: "Kungsgatan 70, 111 20 Stockholm",
					url: "scandichotels.com",
					position: [59.333728, 18.055572],
				},
				start: { year: 2017, month: Sep, day: 15 },
				end: { year: 2017, month: Sep, day: 16 },
			},
			{
				location: {
					name: "Scandic Victoria Tower",
					address: "Arne Beurlings Torg 3, 164 40 Kista",
					url: "scandichotels.com",
					position: [59.406980, 17.957548],
				},
				start: { year: 2017, month: Sep, day: 16 },
				end: { year: 2017, month: Sep, day: 17 },
			},
		]
	},
	{
		name: "Legoland med Jessica (husbil)",
		start: { year: 2017, month: Sep, day: 29 },
		end: { year: 2017, month: Sep, day: 31 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Legoland Holiday Village",
					address: "Ellehammers Alle 2, 7190 Billund, Danmark",
					url: "legoland.dk",
					position: [55.729941, 9.135055],
				},
			},
		]
	},
	{
		name: "Sri Lanka",
		start: { year: 2017, month: Oct, day: 28 },
		end: { year: 2017, month: Nov, day: 4 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Calamander Unawatuna Beach",
					address: "Unawatuna, 80600, Sri Lanka",
					url: "unawatunabeachresort.com",
					position: [6.009855, 80.248804],
				},
				start: { year: 2017, month: Oct, day: 28 },
				end: { year: 2017, month: Nov, day: 2 },
			},
			{
				location: {
					name: "Mount Lavinia Hotel",
					address: "100 Hotel Rd, Dehiwala-Mount Lavinia, Sri Lanka",
					url: "mountlaviniahotel.com",
					position: [6.833491, 79.861665],
				},
				start: { year: 2017, month: Nov, day: 2 },
				end: { year: 2017, month: Nov, day: 4 },
			},
		]
	},
	{
		name: "Gran Canaria",
		start: { year: 2017, month: Dec, day: 23 },
		end: { year: 2017, month: Dec, day: 30 },
		stops: [
			{
				location: {
					name: "Hotel Paradise Costa Taurito",
					address: "Calle Alcazaba, 4, 35138 Taurito, Las Palmas, Spanien",
					url: "paradisehotels.es",
					position: [27.817603, -15.750591],
				},
			},
		]
	},
	{
		name: "Linköping (Melwins dop)",
		start: { year: 2018, month: Jan, day: 26 },
		end: { year: 2018, month: Jan, day: 28 },
		stops: [
			{
				location: {
					name: "Elite Stora Hotellet",
					address: "Stora Torget 9, 582 19 Linköping",
					url: "elite.se",
					position: [58.410909, 15.622113],
				},
			},
		]
	},
	{
		name: "Fuerteventura",
		start: { year: 2018, month: Feb, day: 12 },
		end: { year: 2018, month: Feb, day: 19 },
		stops: [
			{
				location: {
					name: "Playitas Resort",
					address: "35629 Tuineje, Las Palmas, Spanien",
					url: "playitas.net",
					position: [28.226858, -13.991994],
				},
			},
		]
	},
	{
		name: "Skidåkning på Hovfjället",
		start: { year: 2018, month: Mar, day: 29 },
		end: { year: 2018, month: Apr, day: 2 },
		stops: [
			{
				location: {
					name: "Hovfjället",
					address: "Överbyn 63, 685 94 Torsby",
					url: "hovfjallet.se",
					position: [60.294786, 12.965671],
				},
			},
		]
	},
	{
		name: "Husbilstur valborgshelgen",
		start: { year: 2018, month: Apr, day: 27 },
		end: { year: 2018, month: May, day: 1 },
		stops: [
			{
				location: {
					name: "Prångens Camping och Stugby",
					address: "Prångenvägen 3, 523 37 Ulricehamn",
					url: "prangenscamping.se",
					position: [57.802778, 13.406214],
				},
				start: { year: 2018, month: Apr, day: 27 },
				end: { year: 2018, month: Apr, day: 28 },
			},
			{
				location: {
					name: "Vadstena Camping",
					address: "Hofslagaregatan 11, 592 30 Vadstena",
					url: "vadstenacamping.se",
					position: [58.468567, 14.939141],
				},
				start: { year: 2018, month: Apr, day: 28 },
				end: { year: 2018, month: Apr, day: 29 },
			},
			{
				location: {
					name: "Skeppsdockans Camping och Vandrarhem",
					address: "Dockan 1, 614 92 Söderköping",
					url: "soderkopingscamping.se",
					position: [58.490455, 16.306382],
				},
				start: { year: 2018, month: Apr, day: 29 },
				end: { year: 2018, month: Apr, day: 30 },
			},
			{
				location: Paula,
				start: { year: 2018, month: Apr, day: 30 },
				end: { year: 2018, month: May, day: 1 },
			},
		]
	},
	{
		name: "Bohuslän över Kristi Himmelsfärdshelgen",
		start: { year: 2018, month: May, day: 9 },
		end: { year: 2018, month: May, day: 13 },
		stops: [
			{
				location: {
					name: "Hafsten Resort",
					address: "Hafsten 120, 451 96 Uddevalla",
					url: "hafsten.se",
					position: [58.316647, 11.722298],
				},
			},
		]
	},
	{
		name: "Motorcykel till Danmark",
		start: { year: 2018, month: May, day: 25 },
		end: { year: 2018, month: May, day: 27 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Lökken Badehotel",
					address: "Torvet 8, 9480 Løkken, Danmark",
					url: "loekken-badehotel.dk",
					position: [57.370858, 9.711917],
				},
			},
		]
	},
	{
		name: "Kortutflykt med husbilen till Askims camping",
		start: { year: 2018, month: Jun, day: 8 },
		end: { year: 2018, month: Jun, day: 9 },
		stops: [
			{
				location: {
					name: "Lisebergs camping Askim Strand",
					address: "Marholmsvägen 124, 436 45 Askim",
					url: "liseberg.se",
					position: [57.627411, 11.921246],
				},
			},
		]
	},
	{
		name: "Midsommarutflykt med husbilen",
		start: { year: 2018, month: Jun, day: 22 },
		end: { year: 2018, month: Jun, day: 24 },
		stops: [
			{
				location: {
					name: "Luhrs",
					address: "Onsala Snäckväg 17, 439 37 Onsala",
					url: "",
					position: [57.433071152244906, 12.043827129500125],
				},
				start: { year: 2018, month: Jun, day: 22 },
				end: { year: 2018, month: Jun, day: 23 },
			},
			{
				location: {
					name: "First Camp Mölle - Höganäs",
					address: "Kullabergsvägen 286, 263 77 Mölle",
					url: "https://firstcamp.se/destination/molle-hoganas/",
					position: [56.27029908247391, 12.529169554950863],
				},
				start: { year: 2018, month: Jun, day: 23 },
				end: { year: 2018, month: Jun, day: 24 },
			},
		]
	},
	{
		name: "Europaresa med husbilen",
		start: { year: 2018, month: Jul, day: 6 },
		end: { year: 2018, month: Aug, day: 5 },
		stops: [
			{
				location: GoteborgKiel,
				start: { year: 2018, month: Jul, day: 6 },
				end: { year: 2018, month: Jul, day: 7 },
			},
			{
				location: {
					name: "Alfsee Ferien und Erlebnis Park",
					address: "Am Campingpark 10, 49597 Rieste, Tyskland",
					url: "alfsee.de",
					position: [52.484763, 7.988014],
				},
				start: { year: 2018, month: Jul, day: 7 },
				end: { year: 2018, month: Jul, day: 8 },
			},
			{
				location: {
					name: "De Zuidercluft",
					address: "Jonenweg 1g, 8355 CH Giethoorn, Nederländerna",
					url: "havensweerribbenwieden.nl",
					position: [52.721653, 6.073913],
				},
				start: { year: 2018, month: Jul, day: 8 },
				end: { year: 2018, month: Jul, day: 9 },
			},
			{
				location: {
					name: "Parking Kanaaleiland",
					address: "Bargeweg 0, 8000 Brugge, Belgien",
					url: "https://www.brugge.be/parkeren-kampeerwagens",
					position: [51.1966892,3.2258324],
				},
				start: { year: 2018, month: Jul, day: 9 },
				end: { year: 2018, month: Jul, day: 10 },
			},
			{
				location: {
					name: "Camping Campix",
					address: "48 Avenue Guy Môquet, 60340 Saint-Leu-d'Esserent, Frankrike",
					url: "campingcampix.com",
					position: [49.224587, 2.426136],
				},
				start: { year: 2018, month: Jul, day: 10 },
				end: { year: 2018, month: Jul, day: 12 },
			},
			{
				location: {
					name: "Camping de Paris",
					address: "2 Allée du Bord de l'Eau, 75016 Paris, Frankrike",
					url: "campingparis.fr",
					position: [48.869804, 2.235945],
				},
				start: { year: 2018, month: Jul, day: 12 },
				end: { year: 2018, month: Jul, day: 15 },
			},
			{
				location: {
					name: "Camping Val de Blois",
					address: "Le Lac de Loire, 41350 Vineuil, Frankrike",
					url: "camping-loisir-blois.com",
					position: [47.604991, 1.373235],
				},
				start: { year: 2018, month: Jul, day: 15 },
				end: { year: 2018, month: Jul, day: 16 },
			},
			{
				location: {
					name: "Camping Les Peupliers",
					address: "Avenue de Paris, 86700 Couhé, Frankrike",
					url: "http://camping-les-peupliers.com/",
					position: [46.312156, 0.178223],
				},
				start: { year: 2018, month: Jul, day: 16 },
				end: { year: 2018, month: Jul, day: 17 },
			},
			{
				location: {
					name: "Camping Tohapi La Foret du Pyla",
					address: "Avenue de Biscarrosse, 33115 La Teste-de-Buch, Frankrike",
					url: "tohapi.fr",
					position: [44.584626, -1.210847],
				},
				start: { year: 2018, month: Jul, day: 17 },
				end: { year: 2018, month: Jul, day: 18 },
			},
			{
				location: {
					name: "Camping Le Pavillon Royal",
					address: "Avenue Prince de Galles, 64210 Bidart, Frankrike",
					url: "pavillon-royal.com",
					position: [43.454771, -1.577509],
				},
				start: { year: 2018, month: Jul, day: 18 },
				end: { year: 2018, month: Jul, day: 19 },
			},
			{
				location: {
					name: "Nou Camping",
					address: "Carretera C-13, km-156, 25597 La Guingueta d'Àneu, Lérida, Spanien",
					url: "noucamping.com",
					position: [42.592652, 1.131717],
				},
				start: { year: 2018, month: Jul, day: 19 },
				end: { year: 2018, month: Jul, day: 20 },
			},
			{
				location: {
					name: "Camping Santa Creu",
					address: "AD100 Canillo, Andorra",
					url: "elsmeners.com",
					position: [42.565335, 1.599647],
				},
				start: { year: 2018, month: Jul, day: 20 },
				end: { year: 2018, month: Jul, day: 22 },
			},
			{
				location: {
					name: "Camping La Chicanette",
					address: "7 Rue de la Chicanette, 30800 Saint-Gilles, Frankrike",
					url: "campinglachicanette.fr",
					position: [43.675345, 4.428642],
				},
				start: { year: 2018, month: Jul, day: 22 },
				end: { year: 2018, month: Jul, day: 23 },
			},
			{
				location: {
					name: "Camping Des Embruns",
					address: "63 Route de Biot, 06600 Antibes, Frankrike",
					url: "lesembrunscamping.jimdo.com",
					position: [43.612387, 7.125503],
				},
				start: { year: 2018, month: Jul, day: 23 },
				end: { year: 2018, month: Jul, day: 26 },
			},
			{
				location: {
					name: "Camping Tranquilla",
					address: "Via alle Cave, 2, 28831 Baveno VB, Italien",
					url: "tranquilla.com",
					position: [45.912599, 8.488642],
				},
				start: { year: 2018, month: Jul, day: 26 },
				end: { year: 2018, month: Jul, day: 28 },
			},
			{
				location: {
					name: "Rive-Bleue",
					address: "1897 Port-Valais, Schweiz",
					url: "http://www.camping-rive-bleue.ch/",
					position: [46.386229, 6.859643],
				},
				start: { year: 2018, month: Jul, day: 28 },
				end: { year: 2018, month: Jul, day: 30 },
			},
			{
				location: {
					name: "TCS Camping Solothurn",
					address: "Glutzenhofstrasse 5, 4500 Solothurn, Schweiz",
					url: "tcs.ch",
					position: [47.197697, 7.521869],
				},
				start: { year: 2018, month: Jul, day: 30 },
				end: { year: 2018, month: Jul, day: 31 },
			},
			{
				location: {
					name: "Camping Sonneneck am Haselbachsee",
					address: "Haselbach 12, 73488 Ellenberg, Tyskland",
					url: "camping-sonneneck.de",
					position: [48.986185, 10.215245],
				},
				start: { year: 2018, month: Jul, day: 31 },
				end: { year: 2018, month: Aug, day: 1 },
			},
			{
				location: {
					name: "Camping Furlbach",
					address: "Am Furlbach 33, 33758 Schloß Holte-Stukenbrock, Tyskland",
					url: "campingplatzamfurlbach.de",
					position: [51.870484, 8.671016],
				},
				start: { year: 2018, month: Aug, day: 1 },
				end: { year: 2018, month: Aug, day: 2 },
			},
			{
				location: Paula,
				start: { year: 2018, month: Aug, day: 2 },
				end: { year: 2018, month: Aug, day: 5 },
			},
		]
	},
	{
		name: "Motorcykel till Danmark",
		start: { year: 2018, month: Aug, day: 16 },
		end: { year: 2018, month: Aug, day: 18 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Hotel Fårup",
					address: "Pirupvejen 151, 9492 Blokhus, Denmark",
					url: "faarupsommerland.dk",
					position: [57.270145, 9.643621],
				},
			},
		]
	},
	{
		name: "Florida",
		start: { year: 2018, month: Oct, day: 26 },
		end: { year: 2018, month: Nov, day: 4 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Best Western Airport Inn & Suites",
					address: "8101 Aircenter Ct, Orlando, FL 32809, USA",
					url: "bworlandoairport.com",
					position: [28.450687, -81.356314],
				},
				start: { year: 2018, month: Oct, day: 26 },
				end: { year: 2018, month: Oct, day: 27 },
			},
			{
				location: {
					name: "Barefoot Beach Club",
					address: "13238 Gulf Blvd, Madeira Beach, FL 33708, USA",
					url: "barefootbeachclub.com",
					position: [27.788433, -82.787025],
				},
				start: { year: 2018, month: Oct, day: 27 },
				end: { year: 2018, month: Oct, day: 29 },
			},
			{
				location: {
					name: "The Boat House Motel",
					address: "2006, 1180 Edington Pl, Marco Island, FL 34145, USA",
					url: "theboathousemotel.com",
					position: [25.973193, -81.731510],
				},
				start: { year: 2018, month: Oct, day: 29 },
				end: { year: 2018, month: Oct, day: 30 },
			},
			{
				location: {
					name: "The Sea Lord Hotel & Suites",
					address: "4140 El Mar Dr, Lauderdale-By-The-Sea, FL 33308, USA",
					url: "sealordhotel.com",
					position: [26.185289, -80.095767],
				},
				start: { year: 2018, month: Oct, day: 30 },
				end: { year: 2018, month: Oct, day: 31 },
			},
			{
				location: {
					name: "Radisson Resort at the Port",
					address: "8701 Astronaut Blvd, Cape Canaveral, FL 32920, USA",
					url: "radisson.com",
					position: [28.395194, -80.612405],
				},
				start: { year: 2018, month: Oct, day: 31 },
				end: { year: 2018, month: Nov, day: 1 },
			},
			{
				location: {
					name: "Universal's Cabana Bay Beach Resort",
					address: "6550 Adventure Way, Orlando, FL 32819, USA",
					url: "universalorlando.com",
					position: [28.465461, -81.473651],
				},
				start: { year: 2018, month: Nov, day: 1 },
				end: { year: 2018, month: Nov, day: 3 },
			},
		]
	},
	{
		name: "Julresa till Innsbruck",
		start: { year: 2018, month: Dec, day: 21 },
		end: { year: 2018, month: Dec, day: 31 },
		stops: [
			{
				location: {
					name: "Kielfärjan",
					address: "",
					url: "stena.se",
					position: [56.431173, 11.349044],
				},
				start: { year: 2018, month: Dec, day: 21 },
				end: { year: 2018, month: Dec, day: 22 },
			},
			{
				location: {
					name: "Nattåg Hamburg - Innsbruck",
					address: "",
					url: "https://www.oebb.at/",
					position: [48.364875, 10.885127],
				},
				start: { year: 2018, month: Dec, day: 22 },
				end: { year: 2018, month: Dec, day: 23 },
			},
			{
				location: {
					name: "Altstadthotel Weisses Kreuz",
					address: "Herzog-Friedrich-Straße 31, 6020 Innsbruck, Österrike",
					url: "weisseskreuz.at",
					position: [47.267706, 11.393572],
				},
				start: { year: 2018, month: Dec, day: 23 },
				end: { year: 2018, month: Dec, day: 29 },
			},
			{
				location: {
					name: "Nattåg Innsbruck - Hamburg",
					address: "",
					url: "https://www.oebb.at/",
					position: [48.364875, 10.885127],
				},
				start: { year: 2018, month: Dec, day: 29 },
				end: { year: 2018, month: Dec, day: 30 },
			},
			{
				location: {
					name: "Kielfärjan",
					address: "",
					url: "stena.se",
					position: [56.431173, 11.349044],
				},
				start: { year: 2018, month: Dec, day: 30 },
				end: { year: 2018, month: Dec, day: 31 },
			},
		]
	},
	{
		name: "Med Richard, Jessica och Wilhelm i Småland (MC-inköp)",
		start: { year: 2019, month: Jan, day: 4 },
		end: { year: 2019, month: Jan, day: 5 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Elite Stadshotellet Växjö",
					address: "Kungsgatan 6, 352 33 Växjö",
					url: "elite.se",
					position: [56.877891, 14.808869],
				},
			},
		]
	},
	{
		name: "Fuerteventura",
		start: { year: 2019, month: Feb, day: 9 },
		end: { year: 2019, month: Feb, day: 17 },
		people: [Johan, Aston],
		stops: [
			{
				location: {
					name: "Clarion Hotel Arlanda Airport",
					address: "Tornvägen 2, 190 45 Stockholm-Arlanda",
					url: "https://www.strawberry.se/hotell/sverige/stockholm-arlanda-airport/clarion-hotel-arlanda-airport",
					position: [59.64895923022927, 17.931203072973695],
				},
				start: { year: 2019, month: Feb, day: 9 },
				end: { year: 2019, month: Feb, day: 10 },
			},
			{
				location: {
					name: "Playitas Resort",
					address: "35629 Tuineje, Las Palmas, Spanien",
					url: "playitas.net",
					position: [28.230066956537957, -13.987383137788283],
				},
				start: { year: 2019, month: Feb, day: 10 },
				end: { year: 2019, month: Feb, day: 16 },
			},
			{
				location: {
					name: "Radisson Blu Airport Terminal Hotel, Stockholm-Arlanda Airport",
					address: "Pelargången 1, 190 45 Stockholm",
					url: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-stockholm-airport",
					position: [59.64879672948632, 17.929107513282617],
				},
				start: { year: 2019, month: Feb, day: 16 },
				end: { year: 2019, month: Feb, day: 17 },
			},
		]
	},
	{
		name: "Tjänsteresa (Combination), Mexico City",
		start: { year: 2019, month: Mar, day: undefined },
		end: { year: 2019, month: Mar, day: undefined },
		people: [Johan],
		stops: [
			{
				location: {
					name: "Flowsuites Polanco",
					address: "Av. Emilio Castelar 34, Polanco, Polanco IV Secc, Miguel Hidalgo, 11560 Ciudad de México, CDMX, Mexiko",
					url: "http://flowsuites.com/",
					position: [19.42920022728263, -99.19297853305774],
				},
			},
		]
	},

	{
		name: "Skidresa i Österrike",
		start: { year: 2019, month: Apr, day: 13 },
		end: { year: 2019, month: Apr, day: 20 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Hotel Marietta",
					address: "Ringstraße 8, 5562 Obertauern, Österrike",
					url: "marietta.at",
					position: [47.250169, 13.554718],
				},
			},
		]
	},
	{
		name: "Med husbilen i Västervik",
		start: { year: 2019, month: May, day: 30 },
		end: { year: 2019, month: Jun, day: 1 },
		stops: [
			{
				location: {
					name: "Västervik Resort",
					address: "Lysingsvägen, 593 53 Västervik, Sverige",
					url: "vastervikresort.se",
					position: [57.737664, 16.676493],
				},
			},
		]
	},
	{
		name: "Med husbilen i Marstrand",
		start: { year: 2019, month: Jun, day: 6 },
		end: { year: 2019, month: Jun, day: 8 },
		stops: [
			{
				location: {
					name: "Marstrands Familjecamping",
					address: "Långedalsvägen 16, 442 66 Marstrand",
					url: "marstrandscamping.se",
					position: [57.895254, 11.606876],
				},
			},
		]
	},
	{
		name: "Englandsresa",
		start: { year: 2019, month: Jul, day: 7 },
		end: { year: 2019, month: Jul, day: 28 },
		stops: [
			{
				location: {
					name: "Legoland Hotel",
					address: "Windsor Resort, Winkfield Rd, Windsor SL4 4AY, UK",
					url: "legoland.co.uk",
					position: [51.464669, -0.645779],
				},
				start: { year: 2019, month: Jul, day: 7 },
				end: { year: 2019, month: Jul, day: 8 },
			},
			{
				location: {
					name: "The Christopher Hotel",
					address: "110 High St, Eton, Windsor SL4 6AN, UK",
					url: "thechristopher.co.uk",
					position: [51.488146, -0.610209],
				},
				start: { year: 2019, month: Jul, day: 8 },
				end: { year: 2019, month: Jul, day: 9 },
			},
			{
				location: {
					name: "Queens Hotel",
					address: "1-3 Kings Road, Brighton BN1 1NS, UK",
					url: "queenshotelbrighton.com",
					position: [50.819639, -0.139471],
				},
				start: { year: 2019, month: Jul, day: 9 },
				end: { year: 2019, month: Jul, day: 10 },
			},
			{
				location: {
					name: "Seacrest Hotel",
					address: "12 S Parade, Portsmouth, Southsea PO5 2JB, UK",
					url: "seacresthotel.co.uk",
					position: [50.779850, -1.082472],
				},
				start: { year: 2019, month: Jul, day: 10 },
				end: { year: 2019, month: Jul, day: 11 },
			},
			{
				location: {
					name: "Marsham Court Hotel",
					address: "3 Russell Cotes Rd, Bournemouth BH1 3AB, UK",
					url: "marshamcourthotel.co.uk",
					position: [50.717933, -1.870465],
				},
				start: { year: 2019, month: Jul, day: 11 },
				end: { year: 2019, month: Jul, day: 12 },
			},
			{
				location: {
					name: "The Abbey Sands Hotel",
					address: "Belgrave Rd, Torquay TQ2 5HG, UK",
					url: "abbeysandshotel.co.uk",
					position: [50.464470, -3.536761],
				},
				start: { year: 2019, month: Jul, day: 12 },
				end: { year: 2019, month: Jul, day: 13 },
			},
			{
				location: {
					name: "YHA Eden Project",
					address: "Eden Project, Bodelva Rd, Bodelva, Par PL24 2SG, UK",
					url: "yha.org.uk",
					position: [50.364011, -4.748957],
				},
				start: { year: 2019, month: Jul, day: 13 },
				end: { year: 2019, month: Jul, day: 14 },
			},
			{
				location: {
					name: "Poldhu Guest House",
					address: "60 Fore St, Saint Ives TR26 1HW, UK",
					url: "",
					position: [50.214743, -5.480119],
				},
				start: { year: 2019, month: Jul, day: 14 },
				end: { year: 2019, month: Jul, day: 15 },
			},
			{
				location: {
					name: "Lifeboat Inn",
					address: "Wharf Rd, Saint Ives TR26 1LF, UK",
					url: "lifeboatinnstives.co.uk",
					position: [50.213293, -5.479805],
				},
				start: { year: 2019, month: Jul, day: 15 },
				end: { year: 2019, month: Jul, day: 16 },
			},
			{
				location: {
					name: "Gordons Hotel",
					address: "Cliff St, Cheddar BS27 3PT, UK",
					url: "gordonshotel.co.uk",
					position: [51.279224, -2.774703],
				},
				start: { year: 2019, month: Jul, day: 16 },
				end: { year: 2019, month: Jul, day: 17 },
			},
			{
				location: {
					name: "Llanerch Vineyard Hotel",
					address: "Hensol Rd, Pontyclun CF72 8GG, UK",
					url: "llanerch.co.uk",
					position: [51.507401, -3.369802],
				},
				start: { year: 2019, month: Jul, day: 17 },
				end: { year: 2019, month: Jul, day: 18 },
			},
			{
				location: {
					name: "Hotel Portmeirion",
					address: "Portmeirion, Penrhyndeudraeth LL48 6ER, UK",
					url: "portmeirion-village.com",
					position: [52.913642, -4.098372],
				},
				start: { year: 2019, month: Jul, day: 18 },
				end: { year: 2019, month: Jul, day: 19 },
			},
			{
				location: {
					name: "Jurys Inn Liverpool",
					address: "31 Keel Wharf, Liverpool L3 4FN, UK",
					url: "jurysinns.com",
					position: [53.398397, -2.989831],
				},
				start: { year: 2019, month: Jul, day: 19 },
				end: { year: 2019, month: Jul, day: 21 },
			},
			{
				location: {
					name: "Shakespeare Hotel",
					address: "Chapel St, Stratford-upon-Avon CV37 6ER, UK",
					url: "https://www.accorhotels.com/gb/hotel-6630-mercure-stratford-upon-avon-shakespeare-hotel/index.shtml",
					position: [52.191099, -1.707101],
				},
				start: { year: 2019, month: Jul, day: 21 },
				end: { year: 2019, month: Jul, day: 22 },
			},
			{
				location: {
					name: "De Vere Horwood Estate",
					address: "Mursley Rd, Little Horwood, Milton Keynes MK17 0PH, UK",
					url: "https://www.devere.co.uk/horwood-estate",
					position: [51.958902, -0.844210],
				},
				start: { year: 2019, month: Jul, day: 22 },
				end: { year: 2019, month: Jul, day: 23 },
			},
			{
				location: {
					name: "The Galaxie",
					address: "180 Banbury Rd, Oxford OX2 7BT, UK",
					url: "galaxie-booking.com",
					position: [51.775220, -1.263666],
				},
				start: { year: 2019, month: Jul, day: 23 },
				end: { year: 2019, month: Jul, day: 24 },
			},
			{
				location: {
					name: "Grand Hotel",
					address: "King Edward's Parade, Eastbourne BN21 4EQ, UK",
					url: "grandeastbourne.com",
					position: [50.759998, 0.282634],
				},
				start: { year: 2019, month: Jul, day: 24 },
				end: { year: 2019, month: Jul, day: 27 },
			},
			{
				location: {
					name: "Safari Hotel",
					address: "Leatherhead Rd, Chessington KT9 2NE, UK",
					url: "https://www.chessington.com/resort-hotels/chessington-safari-hotel.aspx",
					position: [51.350513, -0.316280],
				},
				start: { year: 2019, month: Jul, day: 27 },
				end: { year: 2019, month: Jul, day: 28 },
			},
		]
	},
	{
		name: "Florida",
		start: { year: 2019, month: Oct, day: 25 },
		end: { year: 2019, month: Nov, day: 3 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Riviera Suites South Beach",
					address: "318 20th St, Miami Beach, FL 33139, United States",
					url: "rivierahotelsouthbeach.com",
					position: [25.795762, -80.130384],
				},
				start: { year: 2019, month: Oct, day: 25 },
				end: { year: 2019, month: Oct, day: 26 },
			},
			{
				location: {
					name: "Embassy Suites Hotel",
					address: "1100 SE 17th St, Fort Lauderdale, FL 33316, USA",
					url: "https://embassysuites3.hilton.com/en/hotels/florida/embassy-suites-by-hilton-fort-lauderdale-17th-street-FLLSOES/index.html",
					position: [26.099800, -80.131393],
				},
				start: { year: 2019, month: Oct, day: 26 },
				end: { year: 2019, month: Oct, day: 27 },
			},
			{
				location: {
					name: "The Sunset Inn - Islamorada",
					address: "82200 Overseas Hwy, Islamorada, FL 33036, United States",
					url: "",
					position: [24.923076, -80.630022],
				},
				start: { year: 2019, month: Oct, day: 27 },
				end: { year: 2019, month: Oct, day: 28 },
			},
			{
				location: {
					name: "Southernmost Point Guest House",
					address: "1327 Duval St, Key West, FL 33040, United States",
					url: "https://southernmostpoint.com/",
					position: [24.547345, -81.796623],
				},
				start: { year: 2019, month: Oct, day: 28 },
				end: { year: 2019, month: Oct, day: 29 },
			},
			{
				location: {
					name: "Oceans Edge Key West Resort & Marina",
					address: "5950 Peninsular Ave, Key West, FL 33040, USA",
					url: "oceansedgekeywest.com",
					position: [24.564209, -81.729960],
				},
				start: { year: 2019, month: Oct, day: 29 },
				end: { year: 2019, month: Oct, day: 30 },
			},
			{
				location: {
					name: "The Diplomat Beach Resort Hollywood",
					address: "3555 S Ocean Dr, Hollywood, FL 33019, United States",
					url: "https://www.diplomatresort.com/",
					position: [25.991730, -80.117802],
				},
				start: { year: 2019, month: Oct, day: 30 },
				end: { year: 2019, month: Nov, day: 2 },
			},
		]
	},
	{
		name: "Konferens (Combination), Prag",
		start: { year: 2019, month: Nov, day: 20 },
		end: { year: 2019, month: Nov, day: 24 },
		stops: [
			{
				location: {
					name: "Central Hotel",
					address: "8, Rybná 677, Staré Město, 110 00 Praha 1, Tjeckien",
					url: "http://hoteldetail.co/central",
					position: [50.08884817974845, 14.426224405692764],
				},
			},
		]
	},
	{
		name: "Thailand över jul",
		start: { year: 2019, month: Dec, day: undefined },
		end: { year: 2019, month: Dec, day: undefined },
		stops: [
			{
				location: {
					name: "Emporium Suites by Chatrium",
					address: "622 Sukhumvit 24 Alley, Klongton klongtoey Bangkok 10110, Thailand",
					url: "https://www.chatrium.com/emporiumsuitesbangkok",
					position: [13.729877, 100.568257],
				},
				start: { year: 2019, month: Dec, day: 21 },
				end: { year: 2019, month: Dec, day: 23 },
			},
			{
				location: {
					name: "Samed Pavilion Resort",
					address: "89/1 หมู่ 4 อ่าวไผ่ เกาะเสม็ด Phe, Mueang Rayong District, Rayong 21160, Thailand",
					url: "https://samedpavilionresort.com/",
					position: [12.564083, 101.456045],
				},
				start: { year: 2019, month: Dec, day: 23 },
				end: { year: 2019, month: Dec, day: 30 },
			},
		]
	},
	{
		name: "Husbilshelg, Öströö och Åkulla",
		start: { year: 2020, month: Apr, day: 30 },
		end: { year: 2020, month: May, day: 2 },
		stops: [
			{
				location: {
					name: "Öströö fårfarm",
					address: "Öströö Gård, 432 77 Tvååker",
					url: "http://www.ostroofarfarm.com/",
					position: [57.067953, 12.507665],
				},
				start: { year: 2020, month: Apr, day: 30 },
				end: { year: 2020, month: May, day: 1 },
			},
			{
				location: {
					name: "Åkulla Outdoor Resort",
					address: "Åkulla Friluftsgård, 432 97 Rolfstorp",
					url: "http://www.akullaresort.se/",
					position: [57.124877, 12.564680],
				},
				start: { year: 2020, month: May, day: 1 },
				end: { year: 2020, month: May, day: 2 },
			},
		]
	},
	{
		name: "Husbilshelg, Trollhättan och Malö",
		start: { year: 2020, month: Jul, day: 10 },
		end: { year: 2020, month: Jul, day: 12 },
		stops: [
			{
				location: {
					name: "Ställplats Trollhätte kanal",
					address: "461 53 Trollhättan",
					url: "",
					position: [58.265361, 12.265800],
				},
				start: { year: 2020, month: Jul, day: 10 },
				end: { year: 2020, month: Jul, day: 11 },
			},
			{
				location: {
					name: "Malö camping",
					address: "Malön 203, 474 91 Ellös",
					url: "http://www.malo.se/",
					position: [58.199634, 11.481639],
				},
				start: { year: 2020, month: Jul, day: 11 },
				end: { year: 2020, month: Jul, day: 12 },
			},
		]
	},
	{
		name: "Sverigeresa med husbilen",
		start: { year: 2020, month: Jul, day: 16 },
		end: { year: 2020, month: Aug, day: 2 },
		stops: [
			{
				location: {
					name: "Vänersborg Guest Harbour and Marina",
					address: "VÄNERPARKEN 12, 462 35 Vänersborg",
					url: "http://www.vanersborgsmarina.se/sv/",
					position: [58.377271, 12.316189],
				},
				start: { year: 2020, month: Jul, day: 16 },
				end: { year: 2020, month: Jul, day: 17 },
			},
			{
				location: {
					name: "Rådastrands camping",
					address: "Rådastrand, Riksväg 62, 683 93 Råda, Sweden",
					url: "radastrand.com",
					position: [60.016659, 13.600117],
				},
				start: { year: 2020, month: Jul, day: 17 },
				end: { year: 2020, month: Jul, day: 19 },
			},
			{
				location: {
					name: "Lugnets camping",
					address: "Lugnetvägen 14, 791 31 Falun",
					url: "https://firstcamp.se/destination/lugnet-falun/",
					position: [60.620164, 15.652048],
				},
				start: { year: 2020, month: Jul, day: 19 },
				end: { year: 2020, month: Jul, day: 21 },
			},
			{
				location: {
					name: "Ställplats Gavleån, Gävle",
					address: "Södra Skeppsbron 9, 802 80 Gävle",
					url: "https://www2.visitgavle.se/sv/boende/a810987/st%C3%A4llplats-gavle%C3%A5n/detaljer",
					position: [60.676706, 17.159800],
				},
				start: { year: 2020, month: Jul, day: 21 },
				end: { year: 2020, month: Jul, day: 22 },
			},
			{
				location: {
					name: "Järvsö Bergscamping",
					address: "Alpvägen 7, 820 40 Järvsö",
					url: "https://jarvsobergscamping.se/",
					position: [61.721047, 16.160722],
				},
				start: { year: 2020, month: Jul, day: 22 },
				end: { year: 2020, month: Jul, day: 24 },
			},
			{
				location: {
					name: "Östersund Stugby och camping",
					address: "Krondikesvägen 95 C, 831 46 Östersund",
					url: "http://www.ostersundscamping.se/",
					position: [63.158652, 14.679418],
				},
				start: { year: 2020, month: Jul, day: 24 },
				end: { year: 2020, month: Jul, day: 25 },
			},
			{
				location: {
					name: "Hotell Fjällgården",
					address: "Fjällgårdsvägen 35, 837 52 Åre",
					url: "https://www.fjallgarden.se/",
					position: [63.404468, 13.090496],
				},
				start: { year: 2020, month: Jul, day: 25 },
				end: { year: 2020, month: Jul, day: 29 },
			},
			{
				location: {
					name: "Orsa camping",
					address: "Bowlingvägen 1, 794 31 Orsa",
					url: "http://www.orsacamping.se/",
					position: [61.122458, 14.590618],
				},
				start: { year: 2020, month: Jul, day: 29 },
				end: { year: 2020, month: Jul, day: 31 },
			},
			{
				location: {
					name: "Dalhalla",
					address: "Sätra Dalhallavägen 201, 795 91 Rättvik",
					url: "dalhalla.se",
					position: [60.948018, 15.103063],
				},
				start: { year: 2020, month: Jul, day: 31 },
				end: { year: 2020, month: Aug, day: 1 },
			},
			{
				location: {
					name: "Husabergsudde Camping",
					address: "Stockshammar 318, 696 92 Askersund",
					url: "http://www.husabergsudde.se/",
					position: [58.867677, 14.909223],
				},
				start: { year: 2020, month: Aug, day: 1 },
				end: { year: 2020, month: Aug, day: 2 },
			},
		]
	},
	// TODO Jönköping runt 10 augusti. 
	{
		name: "Höstlov med Richard, Jessica och Wilhelm",
		start: { year: 2020, month: Oct, day: 27 },
		end: { year: 2020, month: Oct, day: 29 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Route 154 Hotell & Restaurang",
					address: "Falkenbergsvägen 10, 311 63 Älvsered",
					url: "https://www.route154.se/",
					position: [57.239225, 12.858502],
				},
			},
		]
	},
	{
		name: "Trollhättan med Jessica och Wilhelm",
		start: { year: 2021, month: Jan, day: undefined },
		end: { year: 2021, month: Jan, day: undefined },
		people: [Johan, Jannike, Aston],
		stops: [
			{
				location: {
					name: "Scandic Swania",
					address: "Storgatan 47-49, 461 30 Trollhättan",
					url: "http://www.scandichotels.se/swania",
					position: [58.28460064721551, 12.285404223565024],
				},
			},
		]
	},
	{
		name: "Astons födelsedag",
		start: { year: 2021, month: Apr, day: 8 }, // TODO datum?
		end: { year: 2021, month: Apr, day: 9 },
		people: [Johan, Jannike, Aston],
		stops: [
			{
				location: {
					name: "Strandflickornas Havshotell",
					address: "Turistgatan 13, 453 30 Lysekil",
					url: "https://strandflickorna.com/strandflickornas-havshotell/",
					position: [58.26794437404685, 11.429500917314453],
				},
			},
		]
	},
	{
		name: "MTB i Åre",
		start: { year: 2021, month: Jul, day: 8 },
		end: { year: 2021, month: Jul, day: 16 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Parkvillan",
					address: "Parkvägen 6, 837 52 Åre",
					url: "http://www.parkvillan.se/",
					position: [63.399842, 13.077593],
				},
				start: { year: 2021, month: Jul, day: 9 },
				end: { year: 2021, month: Jul, day: 11 },
			},
			{
				location: {
					name: "Hotel Åregården",
					address: "Årevägen 81, 837 52 Åre",
					url: "http://aregarden.com/",
					position: [63.399551, 13.079172],
				},
				start: { year: 2021, month: Jul, day: 11 },
				end: { year: 2021, month: Jul, day: 15 },
			},
		]
	},
	{
		name: "Sverigeresa med husbilen",
		start: { year: 2021, month: Jul, day: 16 },
		end: { year: 2021, month: Aug, day: 10 },
		stops: [
			{
				location: {
					name: "Lisebergs camping Askim Strand",
					address: "Marholmsvägen 124, 436 45 Askim",
					url: "https://www.liseberg.se/boende/former/camping/lisebergs-camping-askim-strand/",
					position: [57.62784740465234, 11.921300016677085],
				},
				start: { year: 2021, month: Jul, day: 16 },
				end: { year: 2021, month: Jul, day: 17 },
			},
			{
				location: {
					name: "Håverud Camping",
					address: "Kanalvägen 4, 464 72 Håverud",
					url: "",
					position: [58.8198813266567, 12.41424143032982],
				},
				start: { year: 2021, month: Jul, day: 17 },
				end: { year: 2021, month: Jul, day: 18 },
			},
			{
				location: {
					name: "Degernäs camping",
					address: "Degernäs Camping, 693 80 Degerfors",
					url: "https://www.degernascamping.se/",
					position: [59.25065794644466, 14.460338687792664],
				},
				start: { year: 2021, month: Jul, day: 18 },
				end: { year: 2021, month: Jul, day: 19 },
			},
			{
				location: {
					name: "First Camp Västerås-Mälaren",
					address: "Johannisbergsvägen, 725 91 Västerås",
					url: "https://firstcamp.se/destination/vasteras-malaren",
					position: [59.576213751492126, 16.520390487591854],
				},
				start: { year: 2021, month: Jul, day: 19 },
				end: { year: 2021, month: Jul, day: 20 },
			},
			{
				location: {
					name: "Hos Sören och Lena, Jessicas föräldrar",
					address: "Sundbro 118, 743 82 Bälinge",
					url: "",
					position: [59.9339498, 17.5358329],
				},
				start: { year: 2021, month: Jul, day: 20 },
				end: { year: 2021, month: Jul, day: 21 },
			},
			{
				location: {
					name: "Gräsöbadens Familjecamping",
					address: "Västerbyn 296, 742 97 Gräsö",
					url: "http://grasobadenscamping.se/",
					position: [60.35194095492653, 18.444404422329722],
				},
				start: { year: 2021, month: Jul, day: 21 },
				end: { year: 2021, month: Jul, day: 22 },
			},
			{
				location: {
					name: "Delsbo Camping",
					address: "Hammarsvall, 820 60 Delsbo",
					url: "http://www.delsbocamping.se/",
					position: [61.79958655141179, 16.53690985280605],
				},
				start: { year: 2021, month: Jul, day: 22 },
				end: { year: 2021, month: Jul, day: 23 },
			},
			{
				location: {
					name: "Järvsö Camping",
					address: "Turistvägen 76, 820 40 Järvsö",
					url: "http://www.jarvsocamping.se/",
					position: [61.71986315063674, 16.170445235515043],
				},
				start: { year: 2021, month: Jul, day: 23 },
				end: { year: 2021, month: Jul, day: 27 },
			},
			{
				location: {
					name: "Eskilns Camping",
					address: "Köpingsvägen, 737 92 Fagersta",
					url: "http://www.eskilnscamping.se/",
					position: [59.98022919261825, 15.79475183292106],
				},
				start: { year: 2021, month: Jul, day: 27 },
				end: { year: 2021, month: Jul, day: 28 },
			},
			{
				location: {
					name: "Trosa Havsbad Camping",
					address: "Rävuddsvägen 42, 619 31 Trosa",
					url: "https://www.trosahavsbad.se/",
					position: [58.87292457252458, 17.575299423756594],
				},
				start: { year: 2021, month: Jul, day: 28 },
				end: { year: 2021, month: Jul, day: 29 },
			},
			{
				location: {
					name: "First Camp Kolmården-Norrköping",
					address: "Kvarsebovägen 2, 618 34 Kolmården",
					url: "https://firstcamp.se/destination/kolmarden-norrkoping/",
					position: [58.66110134105309, 16.404723631890192],
				},
				start: { year: 2021, month: Jul, day: 29 },
				end: { year: 2021, month: Jul, day: 30 },
			},
			{
				location: {
					name: "Chris och Anna",
					address: "Fredsgatan 1, 598 35 Vimmerby, Sverige",
					url: "",
					position: [57.673178, 15.866224],
				},
				start: { year: 2021, month: Jul, day: 30 },
				end: { year: 2021, month: Aug, day: 1 },
			},
			{
				location: {
					name: "KustCamp Gamleby",
					address: "Hammarsvägen 10, 594 32 Gamleby",
					url: "http://www.campa.se/",
					position: [57.888494228923584, 16.415507791723734],
				},
				start: { year: 2021, month: Aug, day: 1 },
				end: { year: 2021, month: Aug, day: 2 },
			},
			{
				location: {
					name: "Oskarshamns hamnställplats",
					address: "",
					url: "",
					position: [57.2661335174505, 16.45441466439865],
				},
				start: { year: 2021, month: Aug, day: 2 },
				end: { year: 2021, month: Aug, day: 3 },
			},
			{
				location: {
					name: "Kronocamping Saxnäs",
					address: "Södra Saxnäsvägen 16, 386 95 Färjestaden",
					url: "http://www.kcsaxnas.se/",
					position: [56.68558958440196, 16.478493710763097],
				},
				start: { year: 2021, month: Aug, day: 3 },
				end: { year: 2021, month: Aug, day: 5 },
			},
			{
				location: {
					name: "First Camp Skönstavik-Karlskrona",
					address: "Ronnebyvägen 17, 371 45 Karlskrona",
					url: "https://firstcamp.se/destination/skonstavik-karlskrona/",
					position: [56.199198630313035, 15.604683646376742],
				},
				start: { year: 2021, month: Aug, day: 5 },
				end: { year: 2021, month: Aug, day: 6 },
			},
			{
				location: {
					name: "Kolleviks Camping",
					address: "374 30 Karlshamn",
					url: "https://mycamping.se/destinationer/kollevik/",
					position: [56.15959248345763, 14.892310921761764],
				},
				start: { year: 2021, month: Aug, day: 6 },
				end: { year: 2021, month: Aug, day: 8 },
			},
			{
				location: {
					name: "First Camp Råå Vallar-Helsingborg",
					address: "Kustgatan 95, 252 70 Råå",
					url: "https://firstcamp.se/destination/raa-vallar-helsingborg",
					position: [56.00403387859757, 12.726936751439428],
				},
				start: { year: 2021, month: Aug, day: 8 },
				end: { year: 2021, month: Aug, day: 9 },
			},
			{
				location: {
					name: "Norra Hamnen Marina Ställplats",
					address: "252 67 Helsingborg",
					url: "https://www.husbil.se/stallplatser/p/395/",
					position: [56.04839880071368, 12.684802691605476],
				},
				start: { year: 2021, month: Aug, day: 9 },
				end: { year: 2021, month: Aug, day: 10 },
			},
		]
	},
	{
		name: "Olof fyller 50",
		start: { year: 2021, month: Oct, day: 15 },
		end: { year: 2021, month: Oct, day: 17 },
		stops: [
			{
				location: {
					name: "Elite Hotel Mollberg",
					address: "Stortorget 18, 251 14 Helsingborg, Sweden",
					url: "http://www.elite.se/",
					position: [56.046677532252914, 12.696048718935954],
				},
			},
		]
	},
	{
		name: "Danmark med Richard, Jessica och Wilhelm",
		start: { year: 2021, month: Oct, day: 31 },
		end: { year: 2021, month: Nov, day: 5 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "TODO",
					address: "TODO",
					url: "TODO",
					position: [0, 0],
				},
			},
		]
	},
	{
		name: "Helsingborg i mellandagarna",
		start: { year: 2021, month: Dec, day: 25 },
		end: { year: 2021, month: Dec, day: 27 },
		stops: [
			{
				location: {
					name: "Clarion Grand Hotel Helsingborg",
					address: "Stortorget 8, 252 23 Helsingborg, Sweden",
					url: "https://www.nordicchoicehotels.se/hotell/sverige/helsingborg/clarion-grand-hotel-helsingborg",
					position: [56.04626893416911, 12.694605690486272],
				},
			},
		]
	},
	{
		name: "Skidsemester i Stöten",
		start: { year: 2022, month: Jan, day: 1 },
		end: { year: 2022, month: Jan, day: 6 },
		stops: [
			{
				location: {
					name: "Hotel Frykenstrand",
					address: "By 80, 686 93 Sunne, Sweden",
					url: "http://www.frykenstrand.se/",
					position: [59.88684000803969, 13.140842058716869],
				},
				start: { year: 2022, month: Jan, day: 1 },
				end: { year: 2022, month: Jan, day: 2 },
			},
			{
				location: {
					name: "Stöten",
					address: "",
					url: "",
					position: [61.265059061620306, 12.883567901584065],
				},
				start: { year: 2022, month: Jan, day: 2 },
				end: { year: 2022, month: Jan, day: 5 },
			},
			{
				location: {
					name: "Hotel Frykenstrand",
					address: "By 80, 686 93 Sunne, Sweden",
					url: "http://www.frykenstrand.se/",
					position: [59.88684000803969, 13.140842058716869],
				},
				start: { year: 2022, month: Jan, day: 5 },
				end: { year: 2022, month: Jan, day: 6 },
			},
		]
	},
	{ 
		name: "Skidor i Åre",
		start: { year: 2022, month: Feb, day: 13 },
		end: { year: 2022, month: Feb, day: 15 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "Hotell Fjällgården",
					address: "Fjällgårdsvägen 35, 837 52 Åre",
					url: "https://www.fjallgarden.se/",
					position: [63.404468, 13.090496],
				},
			},
		]
	},
	{
		name: "Skidresa till Ischgl",
		start: { year: 2022, month: Apr, day: 9 },
		end: { year: 2022, month: Apr, day: 16 },
		stops: [
			{
				location: {
					name: "Hotel Piz Buin",
					address: "Dorfstr. 16, 6561 Ischgl, Austria",
					url: "http://www.pizbuin-ischgl.at/",
					position: [47.01367946725322, 10.295222104724015],
				},
			},
		]
	},
	{
		name: "MTB i Isaberg",
		start: { year: 2022, month: Apr, day: 23 },
		end: { year: 2022, month: Apr, day: 24 },
		stops: [
			{
				location: {
					name: "Isaberg Mountain Resort",
					address: "Nissastigen, 330 27 Hestra, Sweden",
					url: "http://www.isaberg.com/",
					position: [57.43454936618097, 13.619902330659304],
				},
			},
		]
	},
	{
		name: "Långhelg i Halland med husbilen",
		start: { year: 2022, month: May, day: 26 },
		end: { year: 2022, month: May, day: 29 },
		people: [Johan, Jannike],
		stops: [
			{
				location: {
					name: "Bua Hamn Camping Park",
					address: "Hamnvägen 2, 432 64 Bua",
					url: "",
					position: [57.2398512473669, 12.114912665299906],
				},
				start: { year: 2022, month: May, day: 26 },
				end: { year: 2022, month: May, day: 27 },
			},
			{
				location: {
					name: "Varberg Ställplats",
					address: "Otto Torells gata 24, 432 44 Varberg",
					url: "https://www.visitvarberg.se/arkiv/sova/camping/stallplatser-for-husbilar.html",
					position: [57.10885827712236, 12.243754290000401],
				},
				start: { year: 2022, month: May, day: 27 },
				end: { year: 2022, month: May, day: 28 },
			},
			{
				location: {
					name: "Falkenbergs Båtsällskap",
					address: "Gröningevägen, 311 45 Falkenberg",
					url: "https://falkenbergs-batsallskap.se/",
					position: [56.89407469816066, 12.493681914463522],
				},
				start: { year: 2022, month: May, day: 28 },
				end: { year: 2022, month: May, day: 29 },
			},
		]
	},
	{
		name: "Långhelg i Småland med husbilen",
		start: { year: 2022, month: Jun, day: 3 },
		end: { year: 2022, month: Jun, day: 6 },
		stops: [
			{
				location: {
					name: "Villa Björkhagen",
					address: "Friggagatan 31, 554 54 Jönköping, Sverige",
					url: "villabjorkhagen.se",
					position: [57.787228, 14.216812],
				},
				start: { year: 2022, month: Jun, day: 3 },
				end: { year: 2022, month: Jun, day: 4 },
			},
			{
				location: {
					name: "Paula och Jan-Åke (torpet)",
					address: "",
					url: "",
					position: [57.8424731, 16.0566513],
				},
				start: { year: 2022, month: Jun, day: 4 },
				end: { year: 2022, month: Jun, day: 5 },
			},
			{
				location: {
					name: "Vadstena Camping",
					address: "Hofslagaregatan 11, 592 30 Vadstena",
					url: "http://www.vadstenacamping.se/",
					position: [58.468567, 14.939141],
				},
				start: { year: 2022, month: Jun, day: 5 },
				end: { year: 2022, month: Jun, day: 6 },
			},
		]
	},
	{
		name: "Europaresa med husbilen",
		start: { year: 2022, month: Jul, day: 6 },
		end: { year: 2022, month: Aug, day: 14 },
		stops: [
			{
				location: GoteborgKiel,
				start: { year: 2022, month: Jul, day: 6 },
				end: { year: 2022, month: Jul, day: 7 },
			},
			{
				location: {
					name: "Campingplatz Sinntal-Oberzell",
					address: "Alfred-Kühnert-Straße 1, 36391 Sinntal, Tyskland",
					url: "http://campingplatz-sinntal-oberzell.de/",
					position: [50.33834960625175, 9.710938752691831],
				},
				start: { year: 2022, month: Jul, day: 7 },
				end: { year: 2022, month: Jul, day: 8 },
			},
			{
				location: {
					name: "Bikepark Brandnertal",
					address: "Tschengla 3, 6707 Bürserberg, Österrike",
					url: "http://www.bikepark-brandnertal.at",
					position: [47.14631259761436, 9.759379389490038],
				},
				start: { year: 2022, month: Jul, day: 8 },
				end: { year: 2022, month: Jul, day: 10 },
			},
			{
				location: {
					name: "Campeggio di Merano",
					address: "Via Piave, 44, 39012 Merano BZ, Italien",
					url: "meran.eu",
					position: [46.662995, 11.159075],
				},
				start: { year: 2022, month: Jul, day: 10 },
				end: { year: 2022, month: Jul, day: 12 },
			},
			{
				location: {
					name: "La Rocca Camping Village",
					address: "Via Gardesana dell'Acqua, 37, 37011 Bardolino VR, Italien",
					url: "https://www.campinglarocca.com/",
					position: [45.56426864089334, 10.711727335662241],
				},
				start: { year: 2022, month: Jul, day: 12 },
				end: { year: 2022, month: Jul, day: 15 },
			},
			{
				location: {
					name: "Camping Seeblick - Toni",
					address: "Moosen 46, 6233 Kramsach, Österrike",
					url: "https://www.camping-seeblick.tirol/",
					position: [47.46052088057337, 11.906459271083722],
				},
				start: { year: 2022, month: Jul, day: 15 },
				end: { year: 2022, month: Jul, day: 17 },
			},
			{
				location: {
					name: "Camping Lampenhäusl",
					address: "5672, Gemeinde, 5672 Fusch an der Großglocknerstraße, Österrike",
					url: "https://www.lampenhaeusl.at/",
					position: [47.2239589645775, 12.82693601097002],
				},
				start: { year: 2022, month: Jul, day: 17 },
				end: { year: 2022, month: Jul, day: 18 },
			},
			{
				location: {
					name: "Lago 3 Comuni Camping",
					address: "Via Tolmezzo, 52, 33010 Trasaghis UD, Italien",
					url: "http://www.lago3comuni.com/",
					position: [46.32559362197108, 13.064472426091063],
				},
				start: { year: 2022, month: Jul, day: 18 },
				end: { year: 2022, month: Jul, day: 19 },
			},
			{
				location: {
					name: "Camping Opatija",
					address: "Poljanska cesta 16, 51414, Ičići, Kroatien",
					url: "http://www.rivijera-opatija.hr/",
					position: [45.30859961646848, 14.28534691429489],
				},
				start: { year: 2022, month: Jul, day: 19 },
				end: { year: 2022, month: Jul, day: 22 },
			},
			{
				location: {
					name: "Camping Plitvice",
					address: "Smoljanac 67, 53231, Smoljanac, Kroatien",
					url: "http://www.campingplitvice.hr/",
					position: [44.9339635846878, 15.629290539263188],
				},
				start: { year: 2022, month: Jul, day: 22 },
				end: { year: 2022, month: Jul, day: 24 },
			},
			{
				location: {
					name: "Camping Cortina",
					address: "Via Campo, 2, 32043 Cortina d'Ampezzo BL, Italien",
					url: "http://www.campingcortina.it/",
					position: [46.52141857856073, 12.134370538637732],
				},
				start: { year: 2022, month: Jul, day: 24 },
				end: { year: 2022, month: Jul, day: 25 },
			},
			{
				location: {
					name: "Camper Schneeburghof",
					address: "Via Monte Benedetto, 26, 39019 Tirolo BZ, Italien",
					url: "http://www.schneeburghof.com/",
					position: [46.675552036542, 11.166594800451175],
				},
				start: { year: 2022, month: Jul, day: 25 },
				end: { year: 2022, month: Jul, day: 28 },
			},
			{
				location: {
					name: "Camping Ötztal Längenfeld",
					address: "Unterlängenfeld 220, 6444 Längenfeld, Österrike",
					url: "http://www.camping-oetztal.com/",
					position: [47.072791950811755, 10.962662018246142],
				},
				start: { year: 2022, month: Jul, day: 28 },
				end: { year: 2022, month: Jul, day: 30 },
			},
			{
				location: {
					name: "Camping Lido Mappo",
					address: "Via Mappo 20, 6598 Tenero-Contra, Schweiz",
					url: "http://www.lidomappo.ch/",
					position: [46.176499742869694, 8.842449552152258],
				},
				start: { year: 2022, month: Jul, day: 30 },
				end: { year: 2022, month: Aug, day: 2 },
			},
			{
				location: {
					name: "Camping Municipal des Thézières",
					address: "166 route du stade, 74440 Taninges, Frankrike",
					url: "https://camping-taninges.fr/",
					position: [46.099189684852455, 6.5870617989228855],
				},
				start: { year: 2022, month: Aug, day: 2 },
				end: { year: 2022, month: Aug, day: 4 },
			},
			{
				location: {
					name: "Camping Le Clos Don Jean",
					address: "435 Rte du Clos Don Jean, 74290 Menthon-Saint-Bernard, Frankrike",
					url: "https://www.campingclosdonjean.com/",
					position: [45.863142729437726, 6.198197375717023],
				},
				start: { year: 2022, month: Aug, day: 4 },
				end: { year: 2022, month: Aug, day: 6 },
			},
			{
				location: {
					name: "Camping Kirchzarten KG",
					address: "Dietenbacher Str. 17, 79199 Kirchzarten, Tyskland",
					url: "https://www.camping-kirchzarten.de/",
					position: [47.95898326615601, 7.952174316840061],
				},
				start: { year: 2022, month: Aug, day: 6 },
				end: { year: 2022, month: Aug, day: 7 },
			},
			{
				location: {
					name: "Campingplatz Hohensyburg",
					address: "Syburger Dorfstraße 69, 44265 Dortmund, Tyskland",
					url: "http://www.camping-hohensyburg.de/",
					position: [51.41925128934742, 7.493042637907155],
				},
				start: { year: 2022, month: Aug, day: 7 },
				end: { year: 2022, month: Aug, day: 10 },
			},
			{
				location: KielGoteborg,
				start: { year: 2022, month: Aug, day: 10 },
				end: { year: 2022, month: Aug, day: 11 },
			},
		]
	},
	{
		name: "Konferens (Griffeye), Köpenhamn",
		start: { year: 2022, month: Sep, day: 14 },
		end: { year: 2022, month: Sep, day: 17 },
		people: [Johan],
		stops: [
			{
				location: {
					name: "Scandic Falkoner",
					address: "Falkoner Alle 9, 2000 Frederiksberg, Danmark",
					url: "https://www.scandichotels.dk/hoteller/danmark/kobenhavn/scandic-falkoner",
					position: [55.679723952840845, 12.53295013141262],
				},
			},
		]
	},
	{
		name: "Mauritius",
		start: { year: 2022, month: Oct, day: 28 },
		end: { year: 2022, month: Nov, day: 6 },
		people: [Jannike, Aston],
		stops: [
			{
				location: {
					name: "InterContinental Resort Mauritius",
					address: "Fort Coastal Road, MU, Balaclava 21306, Mauritius",
					url: "https://www.ihg.com/intercontinental/hotels/gb/en/balaclava/mruma/hoteldetail",
					position: [-20.09148242089895, 57.509482874018694],
				},
			},
		]
	},
	{
		name: "Skidresa till Obertauern",
		start: { year: 2022, month: Dec, day: 23 },
		end: { year: 2022, month: Dec, day: 31 },
		stops: [
			{
				location: TrelleborgRostock,
				start: { year: 2023, month: Dec, day: 23 },
				end: { year: 2023, month: Dec, day: 24 },
			},
			{
				location: {
					name: "Hotel Garni Haus Tyrol",
					address: "Familie Aichmann, Gamsleitenstraße 5, 5562 Obertauern, Österrike",
					url: "https://www.tyrol-obertauern.at/",
					position: [47.24620408713833, 13.563108304329605],
				},
				start: { year: 2022, month: Dec, day: 24 },
				end: { year: 2022, month: Dec, day: 30 },
			},
			{
				location: RostockTrelleborg,
				start: { year: 2022, month: Dec, day: 30 },
				end: { year: 2022, month: Dec, day: 31 },
			},
		]
	},
	{
		name: "Bengt fyller 80",
		start: { year: 2023, month: Mar, day: 10 },
		end: { year: 2023, month: Mar, day: 12 },
		stops: [
			{
				location: {
					name: "Clarion Grand Hotel Helsingborg",
					address: "Stortorget 8, 252 23 Helsingborg, Sweden",
					url: "https://www.nordicchoicehotels.se/hotell/sverige/helsingborg/clarion-grand-hotel-helsingborg",
					position: [56.04626893416911, 12.694605690486272],
				},
			},
		]
	},
	{
		name: "Skidresa till Sölden med avstickare till Berlin",
		start: { year: 2023, month: Apr, day: 7 },
		end: { year: 2023, month: Apr, day: 16 },
		stops: [
			{
				location: TrelleborgRostock,
				start: { year: 2023, month: Apr, day: 7 },
				end: { year: 2023, month: Apr, day: 8 },
			},
			{
				location: {
					name: "Hotel Bäckelar Wirt",
					address: "Dorfstraße 125, 6450 Sölden, Österrike",
					url: "https://www.baeckelarwirt-soelden.at",
					position: [46.95866806767012, 11.009835076112967],
				},
				start: { year: 2023, month: Apr, day: 8 },
				end: { year: 2023, month: Apr, day: 14 },
			},
			{
				location: {
					name: "Mercure Hotel & Residenz Berlin Checkpoint Charlie",
					address: "Schützenstraße 11, 10117 Berlin, Tyskland",
					url: "https://all.accor.com/lien_externe.svlt?goto=fiche_hotel&code_hotel=3120",
					position: [52.508539068392324, 13.393512340632013],
				},
				start: { year: 2023, month: Apr, day: 14 },
				end: { year: 2023, month: Apr, day: 15 },
			},
			{
				location: RostockTrelleborg,
				start: { year: 2023, month: Apr, day: 15 },
				end: { year: 2023, month: Apr, day: 16 },
			}
		]
	},
	{
		name: "Långhelg i Dalsland",
		start: { year: 2023, month: May, day: 17 },
		end: { year: 2023, month: May, day: 21 },
		people: [Johan, Jannike],
		stops: [
			{
				location: Askim,
				start: { year: 2023, month: May, day: 17 },
				end: { year: 2023, month: May, day: 18 },
			},
			{
				location: {
					name: "Ställplats, Trollhättans slussar",
					address: "Åkerssjövägen 50, 461 53 Trollhättan",
					url: "",
					position: [58.265306377851196, 12.265930938983901],
				},
				start: { year: 2023, month: May, day: 18 },
				end: { year: 2023, month: May, day: 19 },
			},
			{
				location: {
					name: "Håverud Camping",
					address: "Kanalvägen 10, 464 72 Håverud",
					url: "https://www.hafrestromsif.se/haveruds-camping/",
					position: [58.81975163751612, 12.41472465997779],
				},
				start: { year: 2023, month: May, day: 19 },
				end: { year: 2023, month: May, day: 20 },
			},
			{
				location: {
					name: "First Camp City-Strömstad",
					address: "Uddevallavägen 50, 452 30 Strömstad",
					url: "https://firstcamp.se/destinationer/city-stromstad",
					position: [58.92964933658473, 11.17965097079511],
				},
				start: { year: 2023, month: May, day: 20 },
				end: { year: 2023, month: May, day: 21 },
			},
		]
	},
	{
		name: "Skadevi Cup, MBK P07",
		start: { year: 2023, month: Jun, day: 30 },
		end: { year: 2023, month: Jul, day: 2 },
		people: [Aston],
		stops: [
			{
				location: {
					name: "Västerhöjdsgymnasiet, Skövde",
					address: "Gymnasiegatan, 541 31 Skövde",
					url: "https://www.gymnasiumskovde.se/vasterhojd/",
					position: [58.38939488660359, 13.83995995705171],
				}
			},
		]
	},
	{
		name: "Europaresa med husbilen",
		start: { year: 2023, month: Jul, day: 2 },
		end: { year: 2023, month: Jul, day: 19 },
		stops: [
			{
				location: KielGoteborg,
				start: { year: 2023, month: Jul, day: 2 },
				end: { year: 2023, month: Jul, day: 3 },
			},
			{
				location: {
					name: "Knaus Campingpark Essen-Werden",
					address: "Im Löwental 67, 45239 Essen, Tyskland",
					url: "https://www.knauscamp.de/essen-werden/",
					position: [51.380769431048435, 6.992010967555431],
				},				
				start: { year: 2023, month: Jul, day: 3 },
				end: { year: 2023, month: Jul, day: 4 },
			},
			{
				location: {
					name: "Camperplaats Helenawerf",
					address: "De Ster 26, 6041 LP Roermond, Nederländerna",
					url: "http://www.helenawerf.nl/wohnmobilstellplatze.shtml",
					position: [51.19278410264541, 5.978955411926727],
				},
				start: { year: 2023, month: Jul, day: 4 },
				end: { year: 2023, month: Jul, day: 5 },
			},
			{
				location: {
					name: "Moselle Camping",
					address: "7 Av. Eugène Lerebourg, 54460 Liverdun, Frankrike",
					url: "https://www.lesbouclesdelamoselle.com/",
					position: [48.74813912955007, 6.05647016062765],
				},
				start: { year: 2023, month: Jul, day: 5 },
				end: { year: 2023, month: Jul, day: 6 },
			},
			{
				location: {
					name: "TCS Camping Genève-Vésenaz",
					address: "Chem. de la Bise 19, 1222 Vésenaz, Schweiz",
					url: "https://www.tcs.ch/de/camping-reisen/camping/alle-campingplaetze/camping-genf-vesenaz.php",
					position: [46.24522576915356, 6.193693315257437],
				},
				start: { year: 2023, month: Jul, day: 6 },
				end: { year: 2023, month: Jul, day: 8 },
			},
			{
				location: {
					name: "Camping Les Prés Hauts",
					address: "44 Chem. des Prés Hauts, 04200 Sisteron, Frankrike",
					url: "http://www.camping-sisteron.com/",
					position: [44.21534121709534, 5.937412498437262],
				},
				start: { year: 2023, month: Jul, day: 8 },
				end: { year: 2023, month: Jul, day: 9 },
			},
			{
				location: {
					name: "Camping Embruns",
					address: "63 Rte de Biot, 06600 Antibes, Frankrike",
					url: "https://lesembrunscamping.jimdo.com/",
					position: [43.61214358501269, 7.125204620782939],
				},
				start: { year: 2023, month: Jul, day: 9 },
				end: { year: 2023, month: Jul, day: 13 },
			},
			{
				location: {
					name: "Camping Marina",
					address: "Via Angiolo Silvio Novaro, 15, 18013 Diano Marina IM, Italien",
					url: "http://www.campingmarino.it/",
					position: [43.90588217088675, 8.076375214193423],
				},
				start: { year: 2023, month: Jul, day: 13 },
				end: { year: 2023, month: Jul, day: 14 },
			},
			{
				location: {
					name: "Camping Village city of Milan",
					address: "Via Gaetano Airaghi, 61, 20153 Milano MI, Italien",
					url: "http://www.campingmilano.it/",
					position: [45.473977223490756, 9.085512923333502],
				},
				start: { year: 2023, month: Jul, day: 14 },
				end: { year: 2023, month: Jul, day: 16 },
			},
			{
				location: {
					name: "Camping Ansitz Wildberg",
					address: "St. Martin 16a, 39030 San Lorenzo di Sebato BZ, Italien",
					url: "https://www.campingwildberg.com/",
					position: [46.7808963466012, 11.898627770025511],
				},
				start: { year: 2023, month: Jul, day: 16 },
				end: { year: 2023, month: Jul, day: 18 },
			},
			{
				location: {
					name: "Wohnmobilstellplatz am Steinberger See",
					address: "Am Steinberger See 6, 92449 Steinberg am See, Tyskland",
					url: "https://www.wohnmobil-stellplatz-steinberger-see.de/",
					position: [49.282410624524815, 12.173980340693292],
				},
				start: { year: 2023, month: Jul, day: 18 },
				end: { year: 2023, month: Jul, day: 19 },
			},
		]
	},
	{
		name: "Konferens (Griffeye), Berlin",
		start: { year: 2023, month: Sep, day: 5 },
		end: { year: 2023, month: Sep, day: 11 },
		stops: [
			{
				location: TrelleborgRostock,
				start: { year: 2023, month: Sep, day: 5 },
				end: { year: 2023, month: Sep, day: 6 }
			},
			{
				location: {
					name: "The Social Hub Berlin",
					address: "Alexanderstraße 40, 10179 Berlin, Tyskland",
					url: "https://www.thesocialhub.co/berlin-mitte",
					position: [52.51685335399883, 13.417768427384054],
				},
				start: { year: 2023, month: Sep, day: 6 },
				end: { year: 2023, month: Sep, day: 8 }
			},
			{
				location: {
					name: "Schulz Hotel Berliner Mauer",
					address: "Stralauer Pl. 36, 10243 Berlin, Tyskland",
					url: "http://www.schulzhotels.com",
					position: [52.50866438264668, 13.433819664844952],
				},
				start: { year: 2023, month: Sep, day: 8 },
				end: { year: 2023, month: Sep, day: 10 }
			},
			{
				location: RostockTrelleborg,
				start: { year: 2023, month: Sep, day: 10 },
				end: { year: 2023, month: Sep, day: 11 }
			},
		]
	},
	{
		name: "Skidresa, Saalbach",
		start: { year: 2023, month: Dec, day: 22 },
		end: { year: 2023, month: Dec, day: 30 },
		stops: [
			{
				location: TrelleborgRostock,
				start: { year: 2023, month: Dec, day: 22 },
				end: { year: 2023, month: Dec, day: 23 }
			},
			{
				location: {
					name: "Pension Wallner",
					address: "Oberdorf 153, 5753 Saalbach, Österrike",
					url: "https://www.pension-saalbach.com/",
					position: [47.393030786128215, 12.636378593152392],
				},
				start: { year: 2023, month: Dec, day: 23 },
				end: { year: 2023, month: Dec, day: 29 }
			},
			{
				location: RostockTrelleborg,
				start: { year: 2023, month: Dec, day: 29 },
				end: { year: 2023, month: Dec, day: 30 }
			},
		]
	},
	{
		name: "Mauritius med Richard, Jessica och Wilhelm",
		start: { year: 2024, month: Feb, day: undefined },
		end: { year: 2024, month: Feb, day: undefined },
		stops: [
			{
				location: {
					name: "Long Beach Mauritius",
					address: "MU, Coastal Road, 41601, Mauritius",
					url: "https://www.yoursunlife.com/longbeachmauritius",
					position: [-20.17005973811346, 57.77119495610884],
				},
			},
		]
	},
	{
		name: "Helg i Stockholm",
		start: { year: 2024, month: Mar, day: 15 },
		end: { year: 2024, month: Mar, day: 17 },
		people: [Johan, Jannike],
		stops: [
			{
				location: {
					name: "Unique Hotel Jungfrugatan",
					address: "Jungfrugatan 7A, 114 44 Stockholm",
					url: "https://uniquehotel.se/",
					position: [59.336379303402865, 18.08100688521006],
				},
			},
		]
	},
	{
		name: "Skidresa, Sölden över påsk",
		start: { year: 2024, month: Mar, day: 31 },
		end: { year: 2024, month: Apr, day: 8 },
		stops: [
			{
				location: TrelleborgRostock,
				start: { year: 2024, month: Mar, day: 31 },
				end: { year: 2024, month: Apr, day: 1 }
			},
			{
				location: {
					name: "Hotel Bäckelar Wirt",
					address: "Dorfstraße 125, 6450 Sölden, Österrike",
					url: "https://www.baeckelarwirt-soelden.at",
					position: [46.95862239431298, 11.01003896060611],
				},
				start: { year: 2024, month: Apr, day: 1 },
				end: { year: 2024, month: Apr, day: 7 }
			},
			{
				location: RostockTrelleborg,
				start: { year: 2024, month: Apr, day: 7 },
				end: { year: 2024, month: Apr, day: 8 }
			},
		]
	},
	{
		name: "Stockholm Marathon, Aston",
		start: { year: 2024, month: May, day: 31 },
		end: { year: 2024, month: Jun, day: 2 },
		stops: [
			{
				location: {
					name: "Best Western Hotel at 108",
					address: "Sveavägen 108, 113 50 Stockholm",
					url: "http://www.hotelat108.se/",
					position: [59.34336353239535, 18.056551636467056],
				},
			},
		]
	},
	{
		name: "Europaresa med husbilen",
		start: { year: 2024, month: Jul, day: 12 },
		end: { year: 2024, month: Aug, day: 10 },
		stops: [
			{
				location: KielGoteborg,
				start: { year: 2024, month: Jul, day: 12 },
				end: { year: 2024, month: Jul, day: 13 }
			},
			{
				location: {
					name: "Wellness-Rheinpark-Camping Bad Hönningen",
					address: "Allee St.Pierre Les Nemours 1, 53557 Bad Hönningen, Tyskland",
					url: "http://www.wellness-rheinpark-camping.de/",
					position: [50.50897008315918, 7.309644488712306],
				},
				start: { year: 2024, month: Jul, day: 13 },
				end: { year: 2024, month: Jul, day: 14 }
			},
			{
				location: {
					name: "Knaus Campingpark Bernkastel-Kues",
					address: "Am Hafen 2, 54470 Bernkastel-Kues, Tyskland",
					url: "http://www.knauscamp.de/",
					position: [49.90778811439937, 7.057462337120981],
				},
				start: { year: 2024, month: Jul, day: 14 },
				end: { year: 2024, month: Jul, day: 15 }
			},
			{
				location: {
					name: "Champagne Felix Des Lys",
					address: "4 Rue Principale, 51700 Champvoisy, Frankrike",
					url: "http://www.champagnefelixdeslys.com/",
					position: [49.12180802062872, 3.633801249970427],
				},
				start: { year: 2024, month: Jul, day: 15 },
				end: { year: 2024, month: Jul, day: 16 }
			},
			{
				location: {
					name: "Camping de Paris",
					address: "2 Allée du Bord de l'Eau, 75016 Paris, Frankrike",
					url: "campingparis.fr",
					position: [48.8695916527174, 2.236517428163089],
				},
				start: { year: 2024, month: Jul, day: 16 },
				end: { year: 2024, month: Jul, day: 19 }
			},
			{
				location: {
					name: "Nantes Camping",
					address: "21 Bd du Petit Port, 44300 Nantes, Frankrike",
					url: "https://www.nantes-camping.fr/",
					position: [47.24304554955478, -1.5606320267555718],
				},
				start: { year: 2024, month: Jul, day: 19 },
				end: { year: 2024, month: Jul, day: 20 }
			},
			{
				location: {
					name: "Camping Le Cadoret",
					address: "Bd de Chaterny, 17450 Fouras, Frankrike",
					url: "http://www.campings-fouras.com/camping-le-cadoret-fouras.php",
					position: [45.9939141160536, -1.0860548968953934],
				},
				start: { year: 2024, month: Jul, day: 20 },
				end: { year: 2024, month: Jul, day: 22 }
			},
			{
				location: {
					name: "Camping de mon Village (Aire Camping-Car Park)",
					address: "7 Rue Lurien, 64260 Buzy, Frankrike",
					url: "https://www.campingcarpark.com/fr_FR/sejour/camping/nouvelle-aquitaine/64-pyrenees-atlantiques/buzy",
					position: [43.124610881393636, -0.46206748060741937],
				},
				start: { year: 2024, month: Jul, day: 22 },
				end: { year: 2024, month: Jul, day: 23 }
			},
			{
				location: {
					name: "Camping Bellavista",
					address: "Mequinenza, Spanien",
					url: "",
					position: [41.37684119767618, 0.3143143447423806],
				},
				start: { year: 2024, month: Jul, day: 23 },
				end: { year: 2024, month: Jul, day: 24 }
			},
			{
				location: {
					name: "Camping 3 Estrellas",
					address: "C-31, km 186,2, 08850, Barcelona, Spanien",
					url: "http://tresestrellascampings.com/barcelona",
					position: [41.270423081619896, 2.0433536830521275],
				},
				start: { year: 2024, month: Jul, day: 24 },
				end: { year: 2024, month: Jul, day: 27 }
			},
			{
				location: {
					name: "Camping l'Enclave",
					address: "Carrer dels, 2 Els Vinyals, 66800 Estavar, Frankrike",
					url: "http://www.camping-lenclave.com/",
					position: [42.47059409395558, 2.003096894805335],
				},
				start: { year: 2024, month: Jul, day: 27 },
				end: { year: 2024, month: Jul, day: 29 }
			},
			{
				location: {
					name: "Camping FUN",
					address: "Croix du Bayle, 11510 Fitou, Frankrike",
					url: "http://www.lefun-camping.com/",
					position: [42.914664294200236, 3.0008771237697536],
				},
				start: { year: 2024, month: Jul, day: 29 },
				end: { year: 2024, month: Jul, day: 30 }
			},
			{
				location: {
					name: "Camping Lou Souleï",
					address: "76 Av. Draio de la Mar, 13620 Carry-le-Rouet, Frankrike",
					url: "https://www.lousoulei.com/",
					position: [43.33267032484824, 5.136369068063109],
				},
				start: { year: 2024, month: Jul, day: 30 },
				end: { year: 2024, month: Jul, day: 31 }
			},
			{
				location: {
					name: "Campeggio Camper il Pozzo",
					address: "Via Gaetano Salvemini, 18017 San Lorenzo al Mare IM, Italien",
					url: "http://www.campeggioilpozzo.it/",
					position: [43.85519684321393, 7.960414219511584],
				},
				start: { year: 2024, month: Jul, day: 31 },
				end: { year: 2024, month: Aug, day: 1 }
			},
			{
				location: {
					name: "La Rocca Camping Village",
					address: "Via Gardesana dell'Acqua, 37, 37011 Bardolino VR, Italien",
					url: "https://www.campinglarocca.com/",
					position: [45.5646635972039, 10.712020624126094],
				},
				start: { year: 2024, month: Aug, day: 1 },
				end: { year: 2024, month: Aug, day: 4 }
			},
			{
				location: {
					name: "Hotel Löwenhof",
					address: "Via Brennero, 60, 39040 Bressanone BZ, Italien",
					url: "http://loewenhof.it/",
					position: [46.735005765653014, 11.646981363783112],
				},
				start: { year: 2024, month: Aug, day: 4 },
				end: { year: 2024, month: Aug, day: 6 }
			},
			{
				location: {
					name: "Campingplatz Landsberg am Lech",
					address: "Pössinger Au 1, 86899 Landsberg am Lech, Tyskland",
					url: "https://www.camping-landsberg.com/",
					position: [48.03072716910102, 10.88382170788571],
				},
				start: { year: 2024, month: Aug, day: 6 },
				end: { year: 2024, month: Aug, day: 7 }
			},
			{
				location: {
					name: "Schloss Issigau - Stefan Braitmaier",
					address: "Altes Schloß 3, 95188 Issigau, Tyskland",
					url: "http://www.schloss-issigau.de/",
					position: [50.37398202534288, 11.72150838345746],
				},
				start: { year: 2024, month: Aug, day: 7 },
				end: { year: 2024, month: Aug, day: 8 }
			},
			{
				location: {
					name: "Wohnmobilhafen Hamburg",
					address: "Süderstraße 8, 20097 Hamburg, Tyskland",
					url: "http://www.wohnmobilhafen-hamburg.de/",
					position: [53.543325141927056, 10.026099764296765],
				},
				start: { year: 2024, month: Aug, day: 8 },
				end: { year: 2024, month: Aug, day: 9 }
			},
			{
				location: RostockTrelleborg,
				start: { year: 2024, month: Aug, day: 9 },
				end: { year: 2024, month: Aug, day: 10 }
			},
		]
	},
	{
		name: "Köpenhamn med bröderna",
		start: { year: 2024, month: Sep, day: 28 },
		end: { year: 2024, month: Sep, day: 29 },
		people: [Johan],
		stops: [
			{
				location: {
					name: "Cabinn City",
					address: "Mitchellsgade 14, 1568 København, Danmark",
					url: "https://www.cabinn.com/hoteller-danmark/cabinn-city/",
					position: [55.67066897383098, 12.57060257760567],
				},
			},
		]
	},
	{
		name: "Skidresa med Emma, Schladming över jul",
		start: { year: 2024, month: Dec, day: 20 },
		end: { year: 2024, month: Dec, day: 28 },
		stops: [
			{
				location: TrelleborgRostock,
				start: { year: 2024, month: Dec, day: 20 },
				end: { year: 2024, month: Dec, day: 21 }
			},
			{
				location: {
					name: "Pension Götschlhof",
					address: "Rohrmoosstraße 54, 8971 Schladming, Österrike",
					url: "https://www.goetschlhof.at/",
					position: [47.386842970414236, 13.677771256170448],
				},
				start: { year: 2024, month: Dec, day: 21 },
				end: { year: 2024, month: Dec, day: 27 }
			},
			{
				location: RostockTrelleborg,
				start: { year: 2024, month: Dec, day: 27 },
				end: { year: 2024, month: Dec, day: 28 }
			},
		]
	},
	{
		name: "Helg i Växjö",
		start: { year: 2025, month: Feb, day: 7 },
		end: { year: 2025, month: Feb, day: 9 },
		people: [Johan, Jannike],
		stops: [
			{
				location: {
					name: "Elite Stadshotellet, Växjö",
					address: "Kungsgatan 6, 352 33 Växjö",
					url: "https://www.elite.se/hotell/vaxjo/elite-stadshotellet-vaxjo",
					position: [56.87815269410974, 14.809208041833067],
				},
			},
		]
	},
	{
		name: "Aston, praktik i Sydafrika",
		start: { year: 2025, month: Mar, day: 15 },
		end: { year: 2025, month: Apr, day: 5 },
		people: [Aston],
		stops: [
			StopAt(Landvetter.position),
			StopAt([-26.136980574240035, 28.246026751667838]),
			{
				location: {
					name: "Airport Bird & Game Lodge",
					address: "21 4th Rd, Kempton Park, Johannesburg, 1624, Sydafrika",
					url: "http://www.airport-game-lodge.co.za/",
					position: [-26.07286275094143, 28.295749132977278],
				},
				start: { year: 2025, month: Mar, day: 16 },
				end: { year: 2025, month: Mar, day: 17 },
			},
			{
				location: {
					name: "Pridelands Conservancy",
					address: "Balule Nature Reserve, 1380, Sydafrika",
					url: "http://www.pridelands.co.za/",
					position: [-24.32929901253447, 30.972590893161883],
				},
				start: { year: 2025, month: Mar, day: 17 },
				end: { year: 2025, month: Apr, day: 4 },
			},
			StopAt([-26.136980574240035, 28.246026751667838]),
			StopAt(Landvetter.position),
		]
	},
	{
		name: "Jannike i Seattle",
		start: { year: 2025, month: Mar, day: 19 },
		end: { year: 2025, month: Mar, day: 31 },
		people: [Jannike],
		stops: [
			StopAt(Landvetter.position),
			StopAt([47.45623489588673, -122.31425588803795]),
			{
				location: {
					name: "Saratoga Inn",
					address: "201 Cascade Ave, Langley, WA 98260, USA",
					url: "http://saratogainnlangley.com/",
					position: [48.039641671554016, -122.40619666505505],
				},
				start: { year: 2025, month: Mar, day: 19 },
				end: { year: 2025, month: Mar, day: 20 },
			},
			{
				location: {
					name: "Palihotel Seattle",
					address: "107 Pine St, Seattle, WA 98101, USA",
					url: "https://www.palisociety.com/hotels/seattle",
					position: [47.60972736123222, -122.3406423488521],
				},
				start: { year: 2025, month: Mar, day: 20 },
				end: { year: 2025, month: Mar, day: 22 },
			},
			{
				location: {
					name: "Salish Lodge & Spa",
					address: "6501 Railroad Ave, Snoqualmie, WA 98065, USA",
					url: "http://www.salishlodge.com/",
					position: [47.5420822022271, -121.83675553695757],
				},
				start: { year: 2025, month: Mar, day: 22 },
				end: { year: 2025, month: Mar, day: 23 },
			},
			{
				location: {
					name: "Bavarian Lodge",
					address: "810 US Hwy 2, Leavenworth, WA 98826, USA",
					url: "http://www.bavarianlodge.com/",
					position: [47.595854494902, -120.66286273202343],
				},
				start: { year: 2025, month: Mar, day: 23 },
				end: { year: 2025, month: Mar, day: 24 },
			},
			{
				location: {
					name: "Archer Hotel Redmond",
					address: "7200 164th Ave NE, Redmond, WA 98052, USA",
					url: "https://archerhotel.com/redmond",
					position: [47.669096194830495, -122.12024237468383],
				},
				start: { year: 2025, month: Mar, day: 24 },
				end: { year: 2025, month: Mar, day: 28 },
			},
			{
				location: {
					name: "Ocean Crest Resort",
					address: "4651 WA-109, Moclips, WA 98562, USA",
					url: "https://www.oceancrestresort.com/",
					position: [47.22365333882162, -124.20898088261306],
				},
				start: { year: 2025, month: Mar, day: 28 },
				end: { year: 2025, month: Mar, day: 30 },
			},
			StopAt([47.45623489588673, -122.31425588803795]),
			StopAt(Landvetter.position),
		]
	},
	{
		name: "Påskresa med husbilen",
		start: { year: 2025, month: May, day: 1 },
		end: { year: 2025, month: May, day: 5 },
		people: [Johan, Jannike],
		stops: [
			{
				location: Askim,
				start: { year: 2025, month: May, day: 1 },
				end: { year: 2025, month: May, day: 2 },
			},
			StopAt([57.71532236951819, 11.994432030548978]),
			StopAt([57.926764391874066, 12.545289920933115]),
			{
				location: {
					name: "Nossebro bad och camping",
					address: "Marknadsgatan 4, 465 30 Nossebro",
					url: "https://www.essunga.se/nossebrobadochcamping.htm",
					position: [58.19229754945541, 12.721858864646219],
				},
				start: { year: 2025, month: May, day: 2 },
				end: { year: 2025, month: May, day: 3 },
			},
			{
				location: {
					name: "Ställplats Gästhamnen Mariestad",
					address: "Hamngatan 43, 542 30 Mariestad",
					url: "",
					position: [58.71318028852726, 13.819095689264238],
				},
				start: { year: 2025, month: May, day: 3 },
				end: { year: 2025, month: May, day: 4 },
			},
			{
				location: {
					name: "Lokstallet Ställplats Hjo",
					address: "Änggatan 10, 544 36 Hjo",
					url: "https://www.lokstallethjo.se/",
					position: [58.30896286375425, 14.292645833180032],
				},
				start: { year: 2025, month: May, day: 4 },
				end: { year: 2025, month: May, day: 5 },
			},
			StopAt([57.763819245574936, 13.829379935515274]),
			StopAt(Askim.position),
		]
	},
	{
		name: "Smålandsresa med husbilen",
		start: { year: 2025, month: May, day: 14 },
		end: { year: 2025, month: May, day: 18 },
		people: [Johan, Jannike],
		stops: [
			{
				location: Askim,
				start: { year: 2025, month: May, day: 14 },
				end: { year: 2025, month: May, day: 15 },
			},
			{
				location: Paula,
				start: { year: 2025, month: May, day: 15 },
				end: { year: 2025, month: May, day: 16 },
			},
			{
				location: {
					name: "Hultsfred Strandcamping",
					address: "Folkparksvägen 10, 577 36 Hultsfred",
					url: "http://www.hultsfredstrandcamping.se/",
					position: [57.491319755951984, 15.860945757849825],
				},
				start: { year: 2025, month: May, day: 16 },
				end: { year: 2025, month: May, day: 17 },
			},
			{
				location: {
					name: "Elin och Andreas",
					address: "Kuskvägen 11, 593 93 Västervik",
					url: "",
					position: [57.72117009407849, 16.668030092245242],
				},
				start: { year: 2025, month: May, day: 17 },
				end: { year: 2025, month: May, day: 18 },
			},
			StopAt(Askim.position),
		]
	},
	{
		name: "Kristi himmelsfärdsresa med husbilen",
		start: { year: 2025, month: May, day: 28 },
		end: { year: 2025, month: Jun, day: 1 },
		people: [Johan, Jannike],
		stops: [
			{
				location: Askim,
				start: { year: 2025, month: May, day: 28 },
				end: { year: 2025, month: May, day: 29 },
			},
			{
				location: {
					name: "Hyppelns Hamn",
					address: "475 52 Hyppeln",
					url: "http://hyppeln.com/",
					position: [57.75784812674132, 11.615236761449921],
				},
				start: { year: 2025, month: May, day: 29 },
				end: { year: 2025, month: May, day: 30 },
			},
			StopAt([57.710030609617895, 11.772505069341264]),
			{
				location: {
					name: "Vänersborg Guest Harbour and Marina",
					address: "VÄNERPARKEN 12, 462 35 Vänersborg",
					url: "http://www.vanersborgsmarina.se/sv/",
					position: [58.377271, 12.316189],
				},
				start: { year: 2025, month: May, day: 30 },
				end: { year: 2025, month: May, day: 31 },
			},
			{
				location: {
					name: "Henåns Ställplats",
					address: "Ängsvägen 16, 473 33 Henån",
					url: "https://www.henansstallplats.com/",
					position: [58.24005993103237, 11.6760724004725],
				},
				start: { year: 2025, month: May, day: 31 },
				end: { year: 2025, month: Jun, day: 1 },
			},
			StopAt(Askim.position),
		]
	},
	{
		name: "Greta och Hedvigs student",
		start: { year: 2025, month: Jun, day: 4 },
		end: { year: 2025, month: Jun, day: 7 },
		people: [Johan, Jannike],
		stops: [
			{
				location: {
					name: "First Camp Råå Vallar-Helsingborg",
					address: "Kustgatan 95, 252 70 Råå",
					url: "https://firstcamp.se/destination/raa-vallar-helsingborg",
					position: [56.00483370178907, 12.723468543750982],
				},
				start: { year: 2025, month: Jun, day: 4 },
				end: { year: 2025, month: Jun, day: 5 },
			},
		]
	},
]
