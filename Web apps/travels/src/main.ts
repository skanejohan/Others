import './style.css';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ControlDiv from './controldiv';
import { map_key } from './env';

const tileLayer = L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${map_key}`, {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
});

const map = L.map('map');
map.setView([57.692851143117124, 11.950782888463818], 7);
tileLayer.addTo(map);

let controlDiv = new ControlDiv({ position: 'topright' }).addTo(map);
controlDiv.render();

map.addEventListener('resize', () => controlDiv.setVisibility(map.getSize().x > 600));
