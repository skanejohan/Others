const W = 160;
const H = 100;

let distance = 0; // Distance car has travelled around track
let curvature = 0; // Current track curvature, lerped between track sections
let trackCurvature = 0; // Accumulation of track curvature
let trackDistance = 0; // Total distance of track

let car = { pos : 0 }; // Current car position
let playerCurvature = 0; // Accumulation of player curvature
let speed = 0; // Current player speed

let tracks = [[0, 10], [0, 600], [0.6, 200], [0, 400], [-1, 100], [0, 200], [-1, 200], [1, 200], [0, 200], [0.2, 500], [0, 200]]; // Track sections, sharpness of bend, length of section

let goodRainbows = [ 
    { ahead: 300, left: 0.5 },
    { ahead: 800, left: 0.2 },
    { ahead: 1400, left: 0.8 },
];

let badRainbows = [ 
    { ahead: 500, left: 0.5 },
    { ahead: 600, left: 0.2 },
    { ahead: 800, left: 0.8 },
];

let unicorns = [ 
    { ahead: 400, left: 0.5 },
    { ahead: 800, left: 0.8 }
];

let listLapTimes = [0.0, 0.0, 0.0, 0.0, 0.0]; // List of previous lap times
let currentLapTime = 0.0; // Current lap time

for (let t of tracks) {
    trackDistance += t[1];
}

let endRainbow = { ahead: 500, left: 0, visual: {} }; // Rainbow at the end of the track

let level = 1;
let energy = 100;

let visualCoordinates = {};
let deadObjects = {};

let debug = true;

const PLAYING = 1;
const GAMEOVER = 2;

let state = PLAYING;
