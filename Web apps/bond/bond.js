const normalIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const highlightIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

class BondUI {
    constructor(map_div_id, scene_div_id, street_view_div_id) {
        this.defaultLat = 52.824699;
        this.defaultLng = -1.355846;
        this.defaultZoom = 7;
        this.movies = { 
            "Dr No" : dn,
            "On Her Majesty's Secret Service" : ohmss,
            "Diamonds are forever" : daf, 
        };
        this.map = new GMaps({ el: '#' + map_div_id, });
        this.streetView = GMaps.createPanorama({ el: "#" + street_view_div_id});
        this.sceneDiv = document.getElementById(scene_div_id);
        this.reset();
    }

    reset() {
        this.setMap(this.defaultLat, this.defaultLng, this.defaultZoom);
        this.setStreetView(NaN, NaN);
    }

    setMovie(movieName) {
        this.sceneDiv.innerHTML = "";
        this.movie = this.movies[movieName];
        this.movie.scenes.forEach(scene => {
            this._addSceneTitle(scene.title);
            this._addSceneDescription(scene.description);
        });
        this.movie.locations.forEach(location => 
            location.marker = this.map.addMarker({
                lat: location.position.lat(),
                lng: location.position.lng(),
                icon: normalIcon,
            })
        );
    }

    setMap(lat, lng, zoom) {
        this.map.setCenter(lat, lng);
        this.map.setZoom(zoom);
    }

    setStreetView(lat, lng) {
        this.streetView.setPosition(new google.maps.LatLng(lat, lng));
    }

    // ---------- Private functions ---------------------------------------------------------------

    _addSceneTitle(title) {
        let h = document.createElement("h4");
        h.appendChild(document.createTextNode(title));
        this.sceneDiv.appendChild(h);
    }

    _addSceneDescription(description) {
        var stringPos = 0, markerStart = 0, markerEnd = 0;
        while (true) {
            markerStart = description.indexOf("[", markerEnd);
            markerEnd = description.indexOf("]", markerStart);
            if (markerStart === -1 || markerEnd === -1) {
                break;
            }
            this.sceneDiv.appendChild(document.createTextNode(description.slice(stringPos, markerStart)));
            this._addControlSegment(description.slice(markerStart+1, markerEnd));
            stringPos = markerEnd + 1;
        }
        this.sceneDiv.appendChild(document.createTextNode(description.slice(stringPos)));
        this.sceneDiv.appendChild(document.createElement("br"));
        this.sceneDiv.appendChild(document.createElement("br"));
    }

    _addControlSegment(segment) {
        let text = segment.slice(0, segment.indexOf("|"));
        let loc_id = segment.slice(segment.indexOf("|")+1);
        let location = this.movie.locations.find(e => e.id === loc_id);

        text.split(" ").forEach(s => {
            let anchor = document.createElement("a");
            anchor.appendChild(document.createTextNode(s));
            anchor.href = "#";
            anchor.onclick = () => {
                this.setMap(location.position.lat(), location.position.lng(), 15); // TODO ZOOM
                this.setStreetView(location.position.lat(), location.position.lng());
            };
            anchor.onmouseenter = () => location.marker.setIcon(highlightIcon);
            anchor.onmouseleave = () => location.marker.setIcon(normalIcon);
            this.sceneDiv.appendChild(anchor);
            this.sceneDiv.appendChild(document.createTextNode(" "));
        });
    }
}