/* TODO
 - In "Looking for Blofeld", source: https://www.onthetracksof007.com/edenroc
 - In "Meeting with Sir Donald", create and use location "diamond_mine_overview"
 - In "Brothers", where was the airport scene taken? Lufthansa's hangar in Frankfurt has been listed, but this might be where Bond meets leiter over the coffin?
 - In "Circus", where is the parking lot where they lose Tiffany?
 - In "The Factory", which road do they travel to get there?
 - In "The chase", the parking lot scene is recorded in Universal City, but where?
 - In "Oil rig", fix the location. It is said to be ouside Oceanside.
 - Mention the Riviera hotel was used for indoor scenes.

 -  The are claims that some of the desert scenes were shot in the Black Rock Desert, but this is questioned on the web page of "Friends of Black Rock High Rock" (http://blackrockdesert.org/wiki/index.php/Motion_Pictures)
 - Is Southampton used? (https://en.wikipedia.org/wiki/Diamonds_Are_Forever_(film)#Filming)
 - Use pendleton for Blofeld's Oil Rig Lair (don't know which scene). Modify the coordinates - they are currently at the entrance.

  Made by EON PRODUCTIONS LIMITED on location in USA, Germany, Holland, France and at Pinewood Studios, London, England
 */

const daf = {
    scenes : [
        {
            // 0:00:00
            title: "Gun-barrel sequence",
            description: "The movie opens with the accustomed gun-barrel sequence.",
        },
        {
            // 0:00:30
            title: "Looking for Blofeld",
            description: "Bond is looking for Blofeld, starting in Japan, then moving to Cairo. Both of these are indoor locations, most likely recorded in the studio. In Cairo he is told to ask Marie. He finds Marie in an unnamed location where she provides him with the information he needs. The scene where he \"politely asks\" Marie about Blofeld's whereabouts was recorded at the [Hotel du Cap|hotel_du_cap] in the south of France. He locates Blofeld at at a clinic where it seems another man would be converted into Blofeld, using plastic surgey, in a few days, had Bond not killed both him and the real Blofeld.",
        },
        {
            // 0:04:35
            title: "Title song",
            description: "A diamond-heavy introduction this time.",
        },
        {
            // 0:07:15
            title: "A meeting with Sir Donald",
            description: "Sir Donald gives M and Bond an introduction to the international diamond trade. We understand that in particular place, a dentist - Dr. Tynan - is used to smuggle diamonds out of the mines.",
        },
        {
            // 0:09:58
            title: "A lethal encounter",
            description: "It is night in an unnamed desert, which we are to believe is somewhere in Africa. The diamond-smuggling dentist meets with the two killers, mr. Wint and mr. Kidd. They accept the diamonds and then kill him by dropping a scorpion down the neck of his shirt. They then pass on the diamonds to the pilot of a helicopter that lands in the desert. After it has taken off again, it gets blown out of the sky.",
        },
        {
            // 0:12:20
            title: "Why indeed?",
            description: "Sir Donald asks MI6 to investigate who is stock-piling diamonds, and to what purpose.",
        },
        {
            // 0:12:50
            title: "Mrs. Whistler",
            description: "Mr. Wint and Mr. Kidd hand the diamonds over to an old lady, Mrs. Wistler, a school teacher in an African village school. Her job is now to deliver the diamonds in Amsterdam.",
        },
        {
            // 0:13:30
            title: "Why indeed?",
            description: "In the meeting with Sir Donald, we are now told that several murders have taken place in South Africa that have \"complicated the situation\". Wanting to go to South Africa, Bond is slightly disappointed when he is instead sent to Amsterdam to investigate a professional diamond smuggler named Peter Franks. ",
        },
        {
            // 0:13:58
            title: "Departure",
            description: "As Peter Franks is about to board the cross-channel hovercraft, Bond takes his place. Driving Franks's Triumph Stag aboard the ferry, Bond [leaves Dover|hoverport] and England with \"The Princess Margaret\", a hovercraft which was taken out of service in 2000, and scrapped in 2018."
        },
        {
            // 0:15:20
            title: "In Amsterdam",
            description: "Arriving in Amsterdam, the first thing we see is a tourist boat passing under the [Magere Brug|skinny_bridge] (\"skinny bridge\"). The people on the boat probably become a bit upset immediately after, when they see mrs. Whistler, the school teacher, being [fished out|whistler] of the Amstel. We then see mr. Wint and mr. Kidd, standing on the skinny bridge, taking pictures of her body. As they walk away from the bridge, Bond arrives, driving the Triumph Stag [along the Amstel|amstel]. He has then obviously taken a left into Keizersgracht, because the next time we see him, he crosses the [Reguliersgracht|reguliersgracht], takes a left on [Keizersgracht|keizersgracht], then turns right and ends up outside [Tiffany Case's house|tiffany_house], where he gets the assigment of smuggling diamonds into the states."
        },
        {
            // 0:20:00
            title: "Deception and diamonds",
            description: "After a brief interlude during which Bond talks to Q, praising the fake fingerprints that saved his disguise, Bond returns to [Tiffany Case's home|tiffany_house]. He encounters Peter Franks, and they fight it out in the old elevator. After killing Franks, Bond manages to switch their wallets, leading Tiffany to believe that he, as Peter Franks, has just killed James Bond (a name Case clearly knows well... so much for secrecy). "
        },
        {
            // 0:24:25
            title: "Brothers",
            description: "Bond sees the casket containing Franks's body, and the diamonds, onto a plane bound for Los Angeles."
        },
        {
            // 0:25:25
            title: "Slumber, Inc.",
            description: "Bond arrives at Los Angeles International Airport, where the iconic [Theme Building|theme_building] is clearly seen in the background. Felix Leiter helps Bond clear the body with the diamonds, and Bond and the casket are driven away by three men in a hearse from \"Slumber inc.\". After a ride through the desert, they enter Nevada, and arrive at their destination, \"Slumber inc.\". When the movie was recorded, this seems to have been in a rather remote desert location. Today, however, the [Palm Boulder Highway Mortuary|slumber] is located in a densely populated area. The interior design, with the diamond-shaped window, is said to have been filmed at Pinewood. However, the inside of the mortuary bears a striking resemblance to the final set. At least today, the window doesn't have the psychedelic colors from the movie, but the shape is the same. The \"garden of remembrance\", where Bond is knocked unconscious by mr. Wint and mr. Kidd, is filmed at today's [Palm Downtown Mortuary & Cemetery|remembrance]. Bond is saved from being burned alive by the appearance of Shady Tree and Morton Slumber, who have realized that the diamonds are fake.",  
        },
        {
            // 0:32:40
            title: "The Tropicana",
            description: "Bond calls Felix from his room at the [hotel Tropicana|tropicana] to let him know that Bond needs the real diamonds.",
        },
        {
            // 0:33:00
            title: "The White House",
            description: "Willard Whyte's \"White House\" was in reality the [Las Vegas International Hotel|white_house] (today Westgate Las Vegas Resort and Casino}, with an extra tower added in post-production. At the White House, mr. Wint and mr. Kidd kill Shady Tree and Bond meets Plenty O'Toole, who gets thrown out the window by the Slumber goons. Bond meets Tiffany Case again.",
        },
        {
            // 0:42.00
            title: "Circus",
            description: "The circus scene, where Tiffany Case \"wins\" the diamonds in a rigged balloon game, is recorded inside the [Circus Circus hotel|circus]. After she disappears during the commotion, she runs out onto a parking lot and disappears with a green bunny containing the diamonds. Leiter breaks the bad news for Bond, who is standing with his car in what seems to be the [intersection between West Cleveland Avenue and South Las Vegas Boulevard|intersection]. The \"Bagdad Inn\" further down the road has been renamed and is today the Holiday House Motel.",
        },
        {
            // 0:48:05
            title: "A gruesome discovery",
            description: "Bond visits Tiffany Case in her house, where Plenty O'Toole has been drowned in the pool. The [house|house], at 515 West Vía Lola in Palm Springs, California, once belonged to actor Kirk Douglas."
        },
        {
            // 0:49:30
            title: "The diamonds",
            description: "Bond watches as the diamonds are removed from the locker at [McCarran International Airport|mccarran] into which Tiffany has locked them. Bond and Tiffany follows the van as it drives off with the diamonds. When Burt Saxby, Willard Whyte's right-hand man, stops for gas, he is probably at a gas station in the intersection between today's [Elvis Presley Boulevard and Paradise Road|gas]. Still today, there is a gas station here. We can clearly see the sign for [\"Alpine Village Inn\"|alpine] which was located at 3003 Paradise Road, the [Circus Circus hotel|circus] and the original silver-domed [Las Vegas Convention center|lvcc]. Tiffany distracts the others, while Bond sneaks into the back of the van. The van drives off, now with Professor Metz at the wheel, and we see it cross an intersection, where the [Dunes|dunes] hotel used to be. It was demolished in 1993 and its place now stands the Bellagio.",
        },
        {
            // 0:52:20
            title: "The factory",
            description: "The van takes Bond to the [Tectronics|tectronics] facility, in reality a gypsum plant, where he sees the diamonds being put to use. Bond then makes an unlikely escape in a moon buggy.",
        },
        {
            // 1:00:50
            title: "The chase",
            description: "Back in Las Vegas, the time has come for the famous car chase scene. The whole scene is filmed during three nights on Fremont Street in Downtown Las Vegas. Fremont Street has since been turned into the Fremont Street Experience and covered by a roof, and it is difficult to recognize anything from the movie. The sheriff notices Bond and Tiffany outside the [Las Vegas Club|lvclub] casino (demolished in 2017) and we see him approaching their car from the adjacent [Mint|mint] casino (now a part of Binion's Gambling Hall). Bond turns the car around and drives west on Fremont street, then, after another U-turn, drives east, passing the [Binion's Horseshoe|horseshoe] (today Binion's Gambling Hall). Here we also see the [Golden Nugget|nugget] casino and the [Fremont hotel|fremont], both still in operation. If you look carefully, you realise that these are the only locations we see for a long time during the chase. When Bond drives up on the sidewalk, this is done outside the [Horseshoe|horseshoe]. After a while, we also see the [Pioneer|pioneer] and the [Golden Gate|golden_gate] before Bond leaves Fremont Street opposite the [Fremont hotel|fremont], driving down [Second Street|2nd] (today South Casino Center Boulevard) to get to the parking lot where the police cars will get demolished. The scene in the parking lot was shot at Universal Studios in California. When Bond and Tiffany return and are again discovered by the sheriff, Bond drives into an alley, which is still [there|alley]. The scene where Bond turns the car on two wheels was also recorded in California, but when they re-emerge from the Alley, we are back in Vegas. The [alley where they emerge|lost_alley] was on First Street, but is no longer here.",
        },
        {
            // 1:05:07
            title: "Bumping upstairs",
            description: "We see Bond and Tiffany in her hotel room. After being denied access to Willard Whyte's penthouse, Bond decides to \"bump upstairs for a moment\". The scene with Bond riding on top of the elevator was filmed at the [Landmark hotel|landmark], which was closed in 1990, and demolished in 1995. The scene where Bond climbs on top of the roof was filmed in the studio, as was the scene where Bond meets the Blofelds again. After Bond has been sedated and taken away by Mr. Wint and Mr. Kidd, they drive through a long tunnel and end up in the desert, where Bond is placed in a large pipe. He wakes up inside the pipe after it has become part of a longer pipeline and buried under ground. After destroying a piece of machinery, thus attracting the workers who go there to repair it, Bond escapes from the pipe." ,
        },
        {
            // 1:19:40
            title: "Burt speaking",
            description: "Assisted by Q, Bond makes Blofeld tell him where Willard Whyte is kept, by using the voice machine to pretend to be Burt Saxby.",
        },
        {
            // 1:21:05
            title: "Bambi and Thumper",
            description: "Bond and the CIA men visit [Willard Whyte's house|elrod], in reality the Elrod House in Palm Springs, California. Bond is met by Bambi and Thumper, two very athletic girls who manage to teach him a lesson before becoming mysteriously un-athletic once they all enter the pool. They free Willard Whyte and the CIA men shoot Burt Saxby who has arrived to kill Whyte.",
        },
        {
            // 1:26:35
            title: "Blofeld in drag",
            description: "Back in Las Vegas, Q is busy cheating at the slot machines and chatting with Tiffany Case when she notices Blofeld trying to slip away. She follows him, but gets caught and is taken away in his car. Although [the hotel|white_house] has since been rebuilt, we can clearly see the structural elements still present today as the Mercedes 600 drives off.",
        },
        {
            // 1:28:05
            title: "The Satellite",
            description: "Bond, Whyte and the CIA men find out that Blofeld has had the diamond-encrusted satellite sent up into space and taken over its control. Using the satellite, Blofeld eliminates a missile at a base in North Dakota, as well as a Soviet submarine and a number of missiles at a Chinese base. Bond and Whyte realise that Blofeld has access to an oil rig in Baja California.",
        },
        {
            // 1:33:50
            title: "Baja",
            description: "After an incredibly stupid sequence on the [oil rig|oil_rig], Bond manages to send up a weather balloon that tells Leiter, Whyte and the others where he is, and they launch an attack on the platform. The attack on Washington, D.C. is prevented at the last minute.",
        },
        {
            // 1:49:25
            title: "Love Boat",
            description: "The final scene, where Mr. Wint and Mr. Kidd try to kill Bond on the boat is recorded on the ocean liner Canberra, a P&O liner at that time in traffic between Southampton and Australia. The scene where Leiter and Whyte bid them farewell is recorded in [Southampton|southampton].",
        },
    ],
    locations: [
        {
            id: "hotel_du_cap",
			name: "Hotel du Cap",
            position: { lat:43.547762, lng: 7.118418, zoom: 11 },
            mapView: { lat:43.547762, lng: 7.118418, zoom: 18 },
            _mapView: { lat: 45.518, lng: -122.672, zoom: 18 },
            description: "Hotel du Cap",
            sources: [], 
            // src="https://www.google.se/maps/embed/v1/@43.5477948,7.1171773,156a,35y,90h,39.52t/data=!3m1!1e3"
        },
        {
            id: "pendleton",
			name: "Camp Pendleton",
            position: { lat:33.214565, lng: -117.387323 },
            description: "Camp Pendleton",
            sources: [], 
        },


        {
            id: "hoverport",
			name: "Dover Hoverport",
            position: { lat:51.116817, lng: 1.315723 },
            description: "Dover Hoverport",
            sources: [], 
        },
        {
            id: "skinny_bridge",
			name: "Magere Brug",
            position: { lat:52.363577, lng: 4.902455 },
            description: "Magere Brug",
            sources: [], 
        },
        {
            id: "whistler",
			name: "",
            position: { lat:52.363851, lng: 4.901582 },
            description: "Mrs Whistler get fished out of the Amstel",
            sources: [], 
        },
        {
            id: "amstel",
			name: "",
            position: { lat:52.362663, lng: 4.902055 },
            description: "Bond drives along the Amstel",
            sources: [], 
        },
        {
            id: "reguliersgracht",
			name: "Reguliersgracht",
            position: { lat:52.363421, lng: 4.896150 },
            description: "Bond crosses the Reguliersgracht bridge",
            sources: [], 
        },
        {
            id: "keizersgracht",
			name: "",
            position: { lat:52.363579, lng: 4.895957 },
            description: "Bond crosses the Keizersgracht bridge",
            sources: [], 
        },
        {
            id: "tiffany_house",
			name: "Tiffany Case's house",
            position: { lat:52.363770, lng: 4.895769 },
            description: "Tiffany Case's house",
            sources: [], 
        },
        {
            id: "theme_building",
			name: "Theme Building",
            position: { lat:33.944157, lng: -118.402494 },
            description: "Theme Building at LAX",
            sources: [], 
        },
        {
            id: "slumber",
			name: "Slumber, Inc.",
            position: { lat:36.027636, lng: -114.967330 },
            description: "Slumber, Inc.",
            sources: [], 
        },
        {
            id: "remembrance",
			name: "Slumber, Inc's \"garden of remembrance\"",
            position: { lat:36.184583, lng: -115.136154 },
            description: "Slumber, Inc's \"garden of remembrance\"",
            sources: [], 
        },
        {
            id: "tropicana",
			name: "The Tropicana hotel",
            position: { lat:36.099704, lng: -115.171653 },
            description: "The Tropicana hotel",
            sources: [], 
        },
        {
            id: "white_house",
			name: "The White House",
            position: { lat:36.136146, lng: -115.151695 },
            description: "The White House",
            sources: [], 
        },
        {
            id: "circus",
			name: "Circus Circus hotel",
            position: { lat:36.137755, lng: -115.165231 },
            description: "Circus Circus hotel",
            sources: [], 
        },
        {
            id: "intersection",
			name: "Intersection between West Cleveland Avenue and South Las Vegas Boulevard",
            position: { lat:36.145417, lng: -115.156483 },
            description: "Intersection between West Cleveland Avenue and South Las Vegas Boulevard",
            sources: [], 
        },
        {
            id: "house",
			name: "515 West Vía Lola, Palm Springs, California",
            position: { lat:33.836944, lng: -116.552310 },
            description: "515 West Vía Lola, Palm Springs, California",
            sources: [], 
        },
        {
            id: "mccarran",
			name: "McCarran International Airport",
            position: { lat:36.086045, lng: -115.148433 },
            description: "McCarran International Airport",
            sources: [], 
        },
        {
            id: "gas",
			name: "Gas station",
            position: { lat:36.135891, lng: -115.155023 },
            description: "Gas station",
            sources: [], 
        },
        {
            id: "alpine",
			name: "\"Alpine Village Inn\"",
            position: { lat:36.135353, lng: -115.155032 },
            description: "\"Alpine Village Inn\"",
            sources: [], 
        },
        {
            id: "lvcc",
			name: "Las Vegas Convention center",
            position: { lat:36.132155, lng: -115.152414 },
            description: "Las Vegas Convention center",
            sources: [], 
        },
        {
            id: "dunes",
			name: "Dunes hotel",
            position: { lat:36.112645, lng: -115.177082 },
            description: "Dunes hotel",
            sources: [], 
        },
        {
            id: "tectronics",
			name: "Tectronics",
            position: { lat:36.225902, lng: -114.876266 },
            description: "Tectronics",
            sources: [], 
        },
        {
            id: "lvclub",
			name: "Las Vegas Club",
            position: { lat:36.171685, lng: -115.146017 },
            description: "Las Vegas Club",
            sources: [], 
        },
        {
            id: "mint",
			name: "The Mint",
            position: { lat:36.171263, lng: -115.144855 },
            description: "The Mint",
            sources: [], 
        },
        {
            id: "horseshoe",
			name: "Binion's Horseshoe",
            position: { lat:36.171079, lng: -115.144445 },
            description: "Binion's Horseshoe",
            sources: [], 
        },
        {
            id: "nugget",
			name: "Golden Nugget",
            position: { lat:36.170779, lng: -115.144611 },
            description: "Golden Nugget",
            sources: [], 
        },
        {
            id: "fremont",
			name: "Fremont hotel",
            position: { lat:36.170571, lng: -115.143302 },
            description: "Fremont hotel",
            sources: [], 
        },
        {
            id: "pioneer",
			name: "Pioneer",
            position: { lat:36.171136, lng: -115.145426 },
            description: "Pioneer",
            sources: [], 
        },
        {
            id: "golden_gate",
			name: "Golden Gate",
            position: { lat:36.171502, lng: -115.146124 },
            description: "Golden Gate",
            sources: [], 
        },
        {
            id: "2nd",
			name: "Second Street",
            position: { lat:36.170325, lng: -115.144384 },
            description: "Second Street",
            sources: [], 
        },
        {
            id: "alley",
			name: "Alley",
            position: { lat:36.170173, lng: -115.144272 },
            description: "Alley",
            sources: [], 
        },
        {
            id: "lost_alley",
			name: "Lost alley",
            position: { lat:36.170630, lng: -115.145623 },
            description: "Lost alley",
            sources: [], 
        },
        {
            id: "landmark",
			name: "Landmark hotel",
            position: { lat:36.133051, lng: -115.155473 },
            description: "Landmark hotel",
            sources: [], 
        },
        {

            id: "elrod",
			name: "Willard Whyte's house",
            position: { lat:33.793283, lng: -116.510965 },
            description: "Willard Whyte's house is in reality the Elrod House in Palm Springs, California",
            sources: [], 
        },
        {
            id: "oil_rig",
            name: "Oil rig",
            position: { lat:33.137172, lng: -117.465517 },
            description: "Oil rig",
            sources: [], 
        },
        {
            id: "southampton",
            name: "Southampton",
            position: { lat:50.904183, lng: -1.426977 },
            description: "Southampton",
            sources: [], 
        },
    ]
}