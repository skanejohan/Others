const W = 160;
const H = 100;

let distance = 0; // Distance car has travelled around track
let curvature = 0; // Current track curvature, lerped between track sections
let trackCurvature = 0; // Accumulation of track curvature
let trackDistance = 0; // Total distance of track

let car = { pos : 0 }; // Current car position
let playerCurvature = 0; // Accumulation of player curvature
let speed = 0; // Current player speed

let tracks = [
    [0, 100], 
    [0.6, 50], 
    [0, 100], 
    [-1, 50], 
    [0, 100], 
    [-1, 50], 
    [1, 50], 
    [0, 100], 
    [0.2, 30], 
    [-0.2, 30], 
    [0.2, 30], 
    [0, 200]]; // Track sections, sharpness of bend, length of section

let goodRainbows = [];

let badRainbows = [];

let unicorns = [];

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

let breaking = false;

let debug = true;

const PLAYING = 1;
const GAMEOVER = 2;
const LEVELCLEARED = 3;

let state = PLAYING;

let populateTrackObjects = () => {
    let d = 10 + Math.random() * 50;
    while (d < trackDistance) {
        let type = Math.floor(Math.random() * 3);
        let x = Math.random() * 0.8 + 0.1;
        if (type === 0) {
            goodRainbows.push({ ahead: d, left: x });
        } else if (type === 1) {
            badRainbows.push({ ahead: d, left: x });
        } else {
            unicorns.push({ ahead: d, left: x });
        }
        d += 10 + Math.random() * 50;
    }
}

populateTrackObjects();