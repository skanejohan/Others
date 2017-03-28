var mapdata = {
    gamedata: null,
    map: null,
    zoom: 14,
    center: { 
        latitude: 57.707141, 
        longitude: 11.966826 
    },
    circle: null,
    eventsAdded: false,
    validselection: null,

    addCircle: function(latLng) {
        mapdata.circle = new google.maps.Circle({ 
            center: latLng, 
            radius: gamedata.file.radius, 
            map: mapdata.map
        });
    },

    removeCircle: function() {
        if(mapdata.circle) {
            mapdata.circle.setMap(null);
            mapdata.circle = null;
        }
    },

    handleClick: function(event) {
        if (gamedata.gsInProgress()) {
            mapdata.removeCircle();
            mapdata.addCircle(event.latLng);
        }
        mapdata.validselection(true);
    },
  
    initialize: function(gamedata, map, validselection) {
        this.gamedata = gamedata;
        this.map = map;
        this.validselection = validselection;

        this.map.setOptions({
            mapTypeControl: false,
            streetViewControl: false,
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            styles: [{
                featureType: "poi",
                stylers: [ { visibility: "off" } ]   
            }] 
        });
        
        if (!this.eventsAdded) {
            google.maps.event.addListener(this.map, 'click', this.handleClick);
            this.eventsAdded = true;
        }
    }

};

