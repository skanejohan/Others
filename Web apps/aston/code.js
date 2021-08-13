var Travels = function() {

    var map;
    var trips;
    var paths;
    var bounds;
    var markers;
    var tripSelector;
    var showMarkersCheckBox;
    var showPathsCheckBox;
    
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
        if (showMarkersCheckBox == undefined || showMarkersCheckBox.checked) {
            trip.locations.map(loc => addLocation(trip, loc));
        }
        if (showPathsCheckBox != undefined && showPathsCheckBox.checked) {
            paths.add(trip);
        }
        bounds.addTrip(trip);
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
        bounds = new Bounds();

        if (!Utils.isMobileDevice()) {
            setupMapControls();
        }
    }

    function getTrips() {
        return trips.get();
    }

    function loadTrip(i, zoom) {
        paths.clear();
        markers.clear();
        bounds.clear();
        trips.select(i).map(addTrip);
        if(zoom) {
            zoomToFitTrips();
        }
    }
    
    function loadAll(zoom) {
        paths.clear();
        markers.clear();
        bounds.clear();
        trips.all().map(addTrip);
        if(zoom) {
            zoomToFitTrips();
        }
    }

    function zoomToFitTrips() {
        map.fitBounds(bounds.get());
        if (map.getZoom() > 15) {
            map.setZoom(15);
        }
    }

    function setupMapControls() {
        var control = document.createElement("div");
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);
        tripSelector = UI.select(control);
        UI.addSelectOption(tripSelector, "--- Alla resor ---")
        trips.get().map(t => UI.addSelectOption(tripSelector, t));
        tripSelector.onchange = () => loadSelectedTrips(true);
        showMarkersCheckBox = UI.checkbox(control, "showMarkersCheckBox", "Show markers", true, () => loadSelectedTrips(false));
        showPathsCheckBox = UI.checkbox(control, "showPathsCheckBox", "Show paths", false, () => loadSelectedTrips(false));
    }

    function loadSelectedTrips(zoom) {
        if (tripSelector.selectedIndex == 0) {
            loadAll(zoom);
        }
        else {
            loadTrip(tripSelector.selectedIndex - 1, zoom);
        }
    }
}

// ---------- Trips (used internally by Travels) --------------------------------------------------

var Trips = function(data) {

    var _data = data.reverse();

    return {
        all : all,
        select : select,
        get : get,
    }

    function all() {
        return _data;
    }

    function select(i) {
        var result = [];
        result.push(_data[i]);
        return result;
    }

    function get() {
        return _data.map(Utils.tripTitle);
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

// ---------- Bounds (used internally by Travels) --------------------------------------------------

var Bounds = function(map) {

    var _bounds = new google.maps.LatLngBounds();

    return {
        clear : clear,
        addTrip : addTrip,
        get : get,
    }

    function clear() {
        _bounds = new google.maps.LatLngBounds();
    }

    function addTrip(trip) {
        trip.locations.map(loc => _bounds.extend(loc.position));
    }

    function get() {
        return _bounds;
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
        isMobileDevice : isMobileDevice,
        formatDate : formatDate,
        tripTitle : tripTitle,
        locTitle : locTitle,
    }

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

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

// ---------- UI (used internally by Travels) -----------------------------------------------------

var UI = (function() {

    return {
        checkbox : checkbox,
        select : select,
        addSelectOption : addSelectOption,
    }

    function checkbox(container, id, caption, checked, callback) {
        var cb = document.createElement('input');
        cb.type = "checkbox";
        cb.checked = checked;
        cb.onchange = callback;
        cb.id = id;

        var l = document.createElement('label')
        l.htmlFor = id;
        l.appendChild(document.createTextNode(caption));

        container.appendChild(cb);
        container.appendChild(l);

        return cb;
    }

    function select(container) {
        var s = document.createElement("select");
        container.appendChild(s);
        return s;
    }

    function addSelectOption(checkBox, option) {
        var o = document.createElement("option");
        o.text = option;
        checkBox.add(o);
    }
})()