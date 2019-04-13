const spectre = {
    name: "Spectre",
    year: 2015,
    scenes : [
        {
            // XX:XX:XX
            title: "Pre-credits sequence",
            description: "In the opening scene, recorded in Mexico City, we see Bond and Estrella walking from [Manuel Tolsá Square|tolsa] eastwards, entering a hotel. In reality, the house at [Calle de Tacuba 12|tacuba] is not a hotel and the ornaments were added in post-production. Once inside, the scene is shot at the [Gran Hotel Ciudad de México|gran], which was also used in License to Kill. Bond and Estrella take the elevator, which is the real thing, and enter room 327, which is recorded (both the door and the room itself) at Pinewood. Bond then leaves the room and walks out onto the roof of the [yellow building|girasoles] on the corner of  Calle de Tacuba and Xicotencatl. Bond fires his gun at the [house|donceles24] across the street, where Sciarra is on the fourth floor, causing the explosives to go off and the house to collapse. When the building collapses, the roof ornaments added in post-production become very obvious. In the pursuing chase, they both enter Manuel Tolsá Square [here|here]. The chase now moves westward along the square - we can see e.g. [\"Esquela nacional de ingenieros\"|ingenieros] as Sciarra runs away. Production then moves to another area where the chase continues northwards on [Avenida 20 de Noviembre|noviembre]. We clearly see them pass both the [\"Parisina\"|parisina] and [\"Junco\"|junco] signs. The chase then continues out onto [Zocalo Square|zocalo]. The helicopter sweeps in from the south, along Avenida 20 de Noviembre. Much of the fight in the helicopter is shot above [Zocalo Square|zocalo] (given the high altitude of Mexico City, it was however necessary to perform some of the stunts at a lower altitude). Once Bond has regained control of the helicopter, he flies away to the southwest, having a clear view of the skyscrapers along [Avenida Paseo de la Reforma|reforma], one of the major boulevards of Mexico City.",  
        },
    ],
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
        {
            id: "tacuba",
            name: "Calle de Tacuba 12",
            position: {
                lat: 19.435859, 
                lng: -99.138680,
                zoom: 17,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.\n\nThe hotel ornaments were added in post-production.",
                href: "#",
                alt: "Spectre - Calle de Tacuba 12",
                src: "img/spectre_tacuba12.jpg",
            },
            streetView: {
                lat: 19.4357994,
                lng: -99.1387531,
                heading: 40,
            },
        },
        {
            id: "gran",
            name: "Gran Hotel Ciudad de México",
            position: {
                lat: 19.432060, 
                lng: -99.134596,
                zoom: 17,
            },
        },
        {
            id: "girasoles",
            name: "Bond walks out onto the roof of this building",
            position: {
                lat: 19.435998,  
                lng: -99.138938,
                zoom: 17,
            },
            streetView: {
                lat: 19.4359632,
                lng: -99.1390236,
                heading: 40,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - Bond walks out onto the roof of this building",
                src: "img/spectre_girasoles.jpg",
            },
        },
        {
            id: "donceles24",
            name: "The terrorist meeting",
            position: {
                lat: 19.436736,  
                lng: -99.138697,
                zoom: 17,
            },
            streetView: {
                lat: 19.4366446,
                lng: -99.1385346,
                heading: 300,
                pitch: 30,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - the terrorist meeting",
                src: "img/spectre_donceles24.jpg",
            },
            // https://www.google.se/maps/@19.4366446,-99.1385346,3a,75y,317.35h,104.43t/data=!3m6!1e1!3m4!1sfWRHZawvbZjpxbRsq7SoAw!2e0!7i13312!8i6656
        },
        {
            id: "here",
            name: "Bond and Sciarra enter Manuel Tolsá Square",
            position: {
                lat: 19.436664, 
                lng: -99.138860,
                zoom: 17,
            },
            streetView: {
                lat: 19.4365083, 
                lng: -99.1389671,
                heading: 30,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - Bond and Sciarra enter Manuel Tolsá Square",
                src: "img/spectre_chase_start.jpg",
            },
        },
        {
            id: "ingenieros",
            name: "Bond chases Sciarra across Manuel Tolsá Square",
            position: {
                lat: 19.435943,  
                lng: -99.139521,
                zoom: 17,
            },
            streetView: {
                lat: 19.4359136, 
                lng: -99.1394084,
                heading: 240,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - Bond chases Sciarra across Manuel Tolsá Square",
                src: "img/spectre_ingenieros.jpg",
            },
        },
        {
            id: "noviembre",
            name: "Avenida 20 de Noviembre",
            position: {
                lat: 19.430212, 
                lng: -99.133672,
                zoom: 16,
            },
            streetView: {
                lat: 19.4302377,
                lng: -99.1336846,
                heading: 10,
            },
        },
        {
            id: "parisina",
            name: "During the chase along Avenida 20 de Noviembre",
            position: {
                lat: 19.430438, 
                lng: -99.133599,
                zoom: 17,
            },
            streetView: {
                lat: 19.4302377,
                lng: -99.1336846,
                heading: 60,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - During the chase along Avenida 20 de Noviembre",
                src: "img/spectre_parisina.jpg",
            },
        },
        {
            id: "junco",
            name: "During the chase along Avenida 20 de Noviembre",
            position: {
                lat: 19.430783, 
                lng: -99.133451,
                zoom: 17,
            },
            streetView: {
                lat: 19.4306165,
                lng: -99.1336309,
                heading: 56,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - During the chase along Avenida 20 de Noviembre",
                src: "img/spectre_junco.jpg",
            },
        },
        {
            id: "zocalo",
            name: "Zocalo Square - the helicopter fight",
            position: {
                lat: 19.432713,  
                lng: -99.133204,
                zoom: 16,
            },
            streetView: {
                lat: 19.4320965,
                lng: -99.1339309,
                heading: 50,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - Zocalo Square - the helicopter fight",
                src: "img/spectre_zocalo.jpg",
            },
        },
        {
            id: "reforma",
            name: "Paseo de la Reforma",
            position: {
                lat: 19.431489, 
                lng: -99.158135,
            },
            streetView: {
                lat: 19.4309169,
                lng: -99.1595877,
                heading: 250,
            },
            imageView: {
                title: "Photo by Johan Åhlgren, 24 March 2019.",
                href: "#",
                alt: "Spectre - Paseo de la Reforma",
                src: "img/spectre_reforma.jpg",
            },
        },
    ]
}