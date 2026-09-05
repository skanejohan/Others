const PLAYING = 1;
const GAMEOVER = 2;
const LEVELCLEARED = 3;

const W = 160;
const H = 100;

let level = 0;
let state = PLAYING;

let energy = 100;
let distance = 0; // Distance car has travelled around track
let curvature = 0; // Current track curvature, lerped between track sections
let trackCurvature = 0; // Accumulation of track curvature
let trackDistance = 0; // Total distance of track
let car = { pos : 0 }; // Current car position
let steeringFactor = 2; // Steering factor, can be modified by power-ups
let playerCurvature = 0; // Accumulation of player curvature
let speed = 0; // Current player speed
let tracks = []; // Track sections, sharpness of bend, length of section
let rainbowCoins = [];
let increaseSpeedCoins = [];
let decreaseSpeedCoins = [];
let increaseSteeringFactorCoins = [];
let decreaseSteeringFactorCoins = [];
let unicorns = [];

let visualCoordinates = {};
let deadObjects = {};
let debug = true;

let infoFont;
let infoTimer;

let nextLevel = () => {
    level++;

    energy = 100;
    distance = 0;
    curvature = 0;
    trackCurvature = 0;
    trackDistance = 0;
    car = { pos : 0 };
    steeringFactor = 2;
    playerCurvature = 0;
    speed = 0;

    tracks = [[0, 100]];
    for (let i = 0; i < 20 + 3 * level; i++) {
        let sharpness = Math.random() * 1.8 - 0.8;
        let length = Math.random() * 100 + 50;
        tracks.push([sharpness, length]);
    }
    trackDistance = 0;
    for (let t of tracks) {
        trackDistance += t[1];
    }

    rainbowCoins = [];
    increaseSpeedCoins = [];
    decreaseSpeedCoins = [];
    increaseSteeringFactorCoins = [];
    decreaseSteeringFactorCoins = [];
    unicorns = [];
    let d = 10 + Math.random() * 50;
    while (d < trackDistance) {
        let type = Math.floor(Math.random() * 6);
        let x = Math.random() * 0.8 + 0.1;
        if (type === 0) {
            rainbowCoins.push({ ahead: d, left: x });
        } else if (type === 1) {
            increaseSpeedCoins.push({ ahead: d, left: x });
        } else if (type === 2) {
            decreaseSpeedCoins.push({ ahead: d, left: x });
        } else if (type === 3) {
            increaseSteeringFactorCoins.push({ ahead: d, left: x });
        } else if (type ===4){
            decreaseSteeringFactorCoins.push({ ahead: d, left: x });
        } else {
            unicorns.push({ ahead: d, left: x });
        }
        d += 10 + Math.random() * 50;
    }

    visualCoordinates = {};
    deadObjects = {};

    infoFont = 10;
    infoTimer = 0;
}

nextLevel();

let increaseEnergy = by => {
    energy += by;
    if (energy > 100) {
        energy = 100;
    }
}

let decreaseEnergy = by => {
    energy -= by;
    if (energy < 0) {
        energy = 0;
    }
}

let increaseSpeed = by => {
    speed += by;
    if (speed > 5) {
        speed = 5;
    }
}

let decreaseSpeed = by => {
    speed -= by;
    if (speed < 0.5) {
        speed = 0.5;
    }
}

let increaseSteeringFactor = by => {
    steeringFactor += by;
    if (steeringFactor > 5) {
        steeringFactor = 5;
    }
}

let decreaseSteeringFactor = by => {
    steeringFactor -= by;
    if (steeringFactor < 1) {
        steeringFactor = 1;
    }
}