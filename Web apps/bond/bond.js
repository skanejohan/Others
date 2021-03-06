// TODO when in street view on the main map, we should leave it when switching to another location. 

const normalIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#F00',
    fillOpacity: 0.6,
    strokeColor: '#00A',
    strokeOpacity: 0.9,
    strokeWeight: 1,
    scale: 3
}

const highlightIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#F00',
    fillOpacity: 0.8,
    strokeColor: '#00A',
    strokeOpacity: 0.9,
    strokeWeight: 2,
    scale: 9
}

class DescriptionUI {
    constructor(div, onAnchorAdded) {
        this.div = div;
        this.onAnchorAdded = onAnchorAdded;
    }

    setMovie(movie) {
        this.movie = movie;
        this.div.innerHTML = "";
        this.movie.scenes.forEach(scene => {
            this._addSceneTitle(scene.title);
            this._addSceneDescription(scene.description);
        });
    }

    _addSceneTitle(title) {
        let h = document.createElement("h4");
        h.appendChild(document.createTextNode(title));
        this.div.appendChild(h);
    }

    _addSceneDescription(description) {
        var stringPos = 0, markerStart = 0, markerEnd = 0;
        while (true) {
            markerStart = description.indexOf("[", markerEnd);
            markerEnd = description.indexOf("]", markerStart);
            if (markerStart === -1 || markerEnd === -1) {
                break;
            }
            this.div.appendChild(document.createTextNode(description.slice(stringPos, markerStart)));
            this._addControlSegment(description.slice(markerStart+1, markerEnd));
            stringPos = markerEnd + 1;
        }
        this.div.appendChild(document.createTextNode(description.slice(stringPos)));
        this.div.appendChild(document.createElement("br"));
        this.div.appendChild(document.createElement("br"));
    }

    _addControlSegment(segment) {
        let text = segment.slice(0, segment.indexOf("|"));
        let locationId = segment.slice(segment.indexOf("|")+1);

        text.split(" ").forEach(s => {
            let anchor = document.createElement("a");
            anchor.appendChild(document.createTextNode(s));
            anchor.href = "#";
            this.div.appendChild(anchor);
            this.div.appendChild(document.createTextNode(" "));
            this.onAnchorAdded(anchor, locationId);
        });
    }
}

class MapUI {
    constructor(div) {
        this.defaultLat = 52.824699;
        this.defaultLng = -1.355846;
        this.defaultZoom = 7;
        this.map = new google.maps.Map(div, {
            center: {lat: this.defaultLat, lng: this.defaultLng},
            zoom: this.defaultZoom,
            mapTypeId: 'roadmap',
        });
        this.movie = undefined;
    }

    setMovie(movie) {
        if (this.movie) {
            this.movie.locations.forEach(location => {
                location.marker.setMap(null);
            });
        }
        movie.locations.forEach(location => 
            location.marker = new google.maps.Marker({
                position: {
                    lat: location.position.lat, 
                    lng: location.position.lng 
                },
                map: this.map,
                title: location.name,
                icon: normalIcon,
            })
        );
        this.movie = movie;
    }

    navigateTo(lat, lng, zoom) {
        this.map.setCenter({ lat: lat, lng: lng });
        this.map.setZoom(zoom);
        this.movie.locations.forEach(location => {
            if (location.marker.position.equals(new google.maps.LatLng(lat, lng))) {
                location.marker.setIcon(highlightIcon);
            }
            else {
                location.marker.setIcon(normalIcon);
            }
        });
    }
}

class CurrentLocationUI {
    constructor(div, locationNameDiv, streetViewButton, overviewButton, imageviewButton) {
        this.locationNameDiv = locationNameDiv;

        this.streetViewButton = streetViewButton;
        div.appendChild(this.streetViewButton);

        this.overviewButton = overviewButton;
        div.appendChild(this.overviewButton);

        this.imageViewButton = imageviewButton;
        div.appendChild(this.imageViewButton);
    }

    setLocation(location, streetViewFunction, overviewFunction, imageViewFunction) {
        this.locationNameDiv.innerHTML = location.name;

        if (streetViewFunction === undefined) {
            this.streetViewButton.disabled = true;
        }
        else {
            this.streetViewButton.onclick = streetViewFunction;
            this.streetViewButton.disabled = false;
        }

        if (overviewFunction === undefined) {
            this.overviewButton.disabled = true;
        }
        else {
            this.overviewButton.onclick = overviewFunction;
            this.overviewButton.disabled = false;
        }

        if (imageViewFunction === undefined) {
            this.imageViewButton.disabled = true;
        }
        else {
            this.imageViewButton.onclick = imageViewFunction;
            this.imageViewButton.disabled = false;
        }
    }
}

class StreetViewUI {
    constructor(containerDiv, contentDiv) {
        this.containerDiv = containerDiv;
        this.contentDiv = contentDiv;
    }

    show(lat, lng, zoom, heading, pitch) {
        this.contentDiv.innerHTML = "";
        new google.maps.StreetViewPanorama(this.contentDiv, {
            position: {lat: lat, lng: lng},
            pov: {
                heading: heading, 
                pitch: pitch,
            },
            zoom: zoom,
        });

        this.containerDiv.style.setProperty("visibility", "visible");
    }
}

class MapOverviewUI {
    constructor(containerDiv, contentDiv) {
        this.containerDiv = containerDiv;
        this.contentDiv = contentDiv;
    }

    show(lat, lng, zoom, heading) {
        this.contentDiv.innerHTML = "";
        new google.maps.Map(this.contentDiv, {
            center: {
                lat: lat, 
                lng: lng
            },
            zoom: zoom,
            heading: heading,
            mapTypeId: 'satellite',
        });

        this.containerDiv.style.setProperty("visibility", "visible");
    }

}

class ImageViewUI {
    constructor(containerDiv, contentDiv) {
        this.containerDiv = containerDiv;
        this.contentDiv = contentDiv;
    }

    show(title, href, alt, src) {
        this.contentDiv.innerHTML = "";
        let anchor = document.createElement("a");
        let image = document.createElement("img");
        image.src = src;
        image.alt = alt;
        image.id = "popupimage";
        anchor.href = "#";
        anchor.title = title;
        anchor.onclick = () => { window.open(href); };
        anchor.appendChild(image);
        this.contentDiv.appendChild(anchor);

        this.containerDiv.style.setProperty("visibility", "visible");
    }

}

class UI {
    constructor(def) {
        this.mapUI = new MapUI(def.mapDiv);
        this.imageViewUI = new ImageViewUI(def.popupDiv, def.popupContentDiv);
        this.streetViewUI = new StreetViewUI(def.popupDiv, def.popupContentDiv);
        this.mapOverviewUI = new MapOverviewUI(def.popupDiv, def.popupContentDiv);
        this.currentLocationUI = new CurrentLocationUI(
            def.currentLocationDiv, 
            def.locationNameDiv,
            def.streetViewButton, 
            def.overviewButton, 
            def.imageViewButton);
        this.descriptionUI = new DescriptionUI(def.descriptionDiv, (a,l) => this._onAnchorAdded(a, l));
        
        def.movies.forEach(m => {
            let o = document.createElement("option");
            o.text = m.name;
            o.movie = m;
            def.movieSelector.add(o);
        });
        def.movieSelector.onchange = o => {
            let obj = def.movieSelector.options[def.movieSelector.selectedIndex];
            this.setMovie(obj.movie);
        }
        this.setMovie(def.movie);
    }

    setMovie(movie) {
        this.movie = movie;
        this.descriptionUI.setMovie(movie);
        this.mapUI.setMovie(movie);
    }

    _onAnchorAdded(anchor, locationId) {
        var that = this;
        let location = this.movie.locations.find(e => e.id === locationId);
        if (location === undefined) {
            anchor.onclick = () => {
                window.open(locationId);
            }
        }
        else {
            anchor.onclick = () => {
                that.mapUI.navigateTo(
                    location.position.lat || 0,
                    location.position.lng || 0,
                    location.position.zoom || 15);

                var streetViewFunction = undefined;
                if (location.hasOwnProperty("streetView")) {
                    streetViewFunction = () => this.streetViewUI.show(
                        location.streetView.lat || location.position.lat || 0,
                        location.streetView.lng || location.position.lng || 0,
                        location.streetView.zoom || 0,
                        location.streetView.heading || 0,
                        location.streetView.pitch || 0);
                }

                var overviewFunction = undefined;
                if (location.hasOwnProperty("mapView")) {
                    overviewFunction = () => this.mapOverviewUI.show(
                        location.mapView.lat || location.position.lat || 0, 
                        location.mapView.lng || location.position.lng || 0,
                        location.mapView.zoom || 20,
                        location.mapView.heading || 0);
                }

                var imageViewFunction = undefined;
                if (location.hasOwnProperty("imageView")) {
                    imageViewFunction = () => this.imageViewUI.show(
                        location.imageView.title, 
                        location.imageView.href, 
                        location.imageView.alt, 
                        location.imageView.src); 
                }

                this.currentLocationUI.setLocation(location, streetViewFunction, overviewFunction, imageViewFunction);
            }
        }
    }
}
