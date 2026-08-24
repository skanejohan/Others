const screenWidth = 160;
const screenHeight = 100;

let distance = 0; // Distance car has travelled around track
let curvature = 0; // Current track curvature, lerped between track sections
let trackCurvature = 0; // Accumulation of track curvature
let trackDistance = 0; // Total distance of track

let carPos = 0.0; // Current car position
let playerCurvature = 0; // Accumulation of player curvature
let speed = 0; // Current player speed

let tracks = [[0, 10], [0, 200], [1, 200], [0, 400], [-1, 100], [0, 200], [-1, 200], [1, 200], [0, 200], [0.2, 500], [0, 200]]; // Track sections, sharpness of bend, length of section
let goodRainbows = [ 
    [350, 0], // center of track, after first straight
    [800, -0.5], // slightly left, mid-track
    [1400, 0.5], // slightly right, on the long bend
];

let listLapTimes = [0.0, 0.0, 0.0, 0.0, 0.0]; // List of previous lap times
let currentLapTime = 0.0; // Current lap time

for (let t of tracks) {
    trackDistance += t[1];
}
