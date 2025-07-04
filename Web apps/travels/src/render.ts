import * as L from 'leaflet';
import { Aston, Aug, Date, Jannike, Johan, LaterThan, Mar, Stop, Trip } from "./data/types";
import markerIconPng from "leaflet/dist/images/marker-icon.png"

const icon = new L.Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]});

let paths: L.Polyline[] = [];
let markers: L.Marker[] = [];

export const renderTrips = (trips: Trip[], map: L.Map, showMarkers: boolean, showPaths: boolean) => {
    markers.map(m => m.remove());
    markers = [];
    paths.map(p => p.remove());
    paths = [];

    trips.map(t => renderTrip(t, map, showMarkers, showPaths));

    if (markers.length > 0) {
        let group = L.featureGroup(markers);
        map.fitBounds(group.getBounds());
    }
}

const renderTrip = (trip: Trip, map: L.Map, showMarkers: boolean, showPaths: boolean) => {
    if (showMarkers) {
        trip.stops.filter(s => s.location.name).map(s => renderStop(s, trip, map));
    }
    if (showPaths) {
        let latlngs = trip.stops.map(s => s.location.position);
        latlngs.unshift(homePos(trip));
        latlngs.push(homePos(trip));
        let path = L.polyline(latlngs);
        paths.push(path); 
        path.addTo(map);
    }
}

const renderStop = (stop: Stop, trip: Trip, map: L.Map) => {
    let t = tripTitle(trip);
    let l = locationTitle(trip, stop);
    let p = trip.people === undefined ? [Johan, Jannike, Aston] : trip.people;
    let description = "<b>" + t + "</b><br>" + p + "<br><br>" + l + "<br>" + stop.location.address;
    let marker = L.marker(stop.location.position)
        .setIcon(icon)
        .addTo(map)
        .bindTooltip(description)
        .bindPopup(description);
    markers.push(marker);
}

const tripTitle = (t: Trip) => {
    return `${t.name} (${formatDate(t.start)} - ${formatDate(t.end)})`; 
}

const locationTitle = (t: Trip, s: Stop) => {
    return `${s.location.name} (${formatDate(s.start || t.start)} - ${formatDate(s.end || t.end)})`; 
}

const formatDate = (date: Date) => {
    if (date.month === undefined) {
        return date.year.toString();
    }
    if (date.day === undefined) {
        return monthNames[date.month] + ' ' + date.year;
    }
    return date.day + ' ' + monthNames[date.month] + ' ' + date.year;
}

const monthNames = [
    "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", 
    "Augusti", "September", "Oktober", "November", "December"
];

const homePos = (trip: Trip) : [number, number] => {
    if (LaterThan(trip.start, 2011, Aug, 10)) {
        return [57.69277507683475, 11.950727528589015]; // Nordenskiöldsgatan
    }
    if (LaterThan(trip.start, 2007, Mar, 15)) {
        return [57.444429584274964, 12.268926305606183]; // Slättängsvägen
    }
    if (LaterThan(trip.start, 2003, Mar, 3)) {
        return [57.810519129370064, 11.966354560331803]; // Lilla Tolsereds Väg
    }
    return [56.04192443908478, 12.717053343971886];
}

