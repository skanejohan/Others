var Travels = function() {

    var map;
    var trips;
    var paths;
    var markers;
    
    return {
        initialize : initialize,
        getTrips : getTrips,
        loadTrip : loadTrip,
        loadAll : loadAll,
    }

    function addLocation(trip, loc) {
        var tripTitle = Utils.tripTitle(trip);
        var locTitle = Utils.locTitle(loc);
        var hint = tripTitle + "\n\n" + locTitle + "\n" + loc.address;
        var popup = "<b>" + tripTitle + "</b><br>" + locTitle + "\n" + loc.address;
        markers.add(hint, popup, loc.position);
    }

    function addTrip(trip) {
        if (true) { // TODO should the marker be drawn?
            trip.locations.map(loc => addLocation(trip, loc));
        }
        if (false) { // TODO should the path be drawn?
            paths.add(trip);
        }
    }

    function initialize(canvas, data) {
        var mapOptions = {
            center: new google.maps.LatLng(57.692842, 11.950854),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(canvas, mapOptions);
        markers = new Markers(map);
        paths = new Paths(map);
        trips = new Trips(data);
    }

    function getTrips() {
        return trips.get();
    }

    function loadTrip(i) {
        paths.clear();
        markers.clear();
        trips.select(i).map(addTrip);
    }
    
    function loadAll() {
        paths.clear();
        markers.clear();
        trips.all().map(addTrip);
    }
}

// ---------- Trips (used internally by Travels) --------------------------------------------------

var Trips = function(data) {
    return {
        all : all,
        select : select,
        get : get,
    }

    function all() {
        return data;
    }

    function select(i) {
        var result = [];
        result.push(data[i]);
        return result;
    }

    function get() {
        return data.map(Utils.tripTitle);
    }
}

// ---------- Markers (used internally by Travels) ------------------------------------------------

var Markers = function(map) {

    var _markers = [];
    var currentInfoWindow = null;

    return {
        add : add,
        clear : clear,
    }

    function add(title, popup, position) {
        var marker = new google.maps.Marker({position: position, map: map, title: title });
        var infoWindow = new google.maps.InfoWindow({ content: popup });
        google.maps.event.addListener(marker, 'click', 
            function () 
            {
                if (currentInfoWindow == infoWindow) {
                    currentInfoWindow.close();
                    currentInfoWindow = null;
                }
                else {
                    if (currentInfoWindow != null) {
                        currentInfoWindow.close();
                    }
                     infoWindow.open(map, marker);
                     currentInfoWindow = infoWindow;
                }
            }
        );
        _markers.push(marker);
    }

    function clear() {
        _markers.map(m => m.setMap(null));
        _markers = [];
    }
}

// ---------- Paths (used internally by Travels) --------------------------------------------------

var Paths = function(map) {

    var _paths = [];

    return {
        add : add,
        clear : clear,
    }

    function add(trip) {
        var points = [];
        trip.locations.map(loc => points.push( { lat : loc.position.lat(), lng : loc.position.lng() } ));
        var path = new google.maps.Polyline({ path: points, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 });
        path.setMap(map);
        _paths.push(path);
    }

    function clear() {
        _paths.map(p => p.setMap(null));
        _paths = [];
    }
}

// ---------- Utils (used internally by Travels) --------------------------------------------------

var Utils = (function(data) {

    return {
        formatDate : formatDate,
        tripTitle : tripTitle,
        locTitle : locTitle,
    }

    function formatDate(date) {
        var monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", 
                          "September", "Oktober", "November", "December"];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    function tripTitle(trip) {
        return trip.name + " (" + Utils.formatDate(trip.start) + " - " + Utils.formatDate(trip.end) + ")";
    }

    function locTitle(loc) {
        return loc.name + " (" + Utils.formatDate(loc.start) + " - " + Utils.formatDate(loc.end) + ")"; 
    }
})();