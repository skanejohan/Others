class GoogleMaps {
    constructor(lat, lng, zoom) {
        this._mapSettings = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(lat, lng),
            zoom: zoom,
        }
        this._map = undefined;
    }

    get mapSettings() {
        return this._mapSettings;
    }

    setup(div) {
        this._map = new google.maps.Map(div, this._mapSettings);
    }

    navigateTo(pos, zoom) {
        this._map.center = pos; //map.fitBounds(bounds);
        this._map.setZoom(zoom);
    }
}

