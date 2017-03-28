function initialize() {
    var map;

    function create_marker(file) {

        var marker = new google.maps.Marker({
	        position: file.loc, 
	        title: file.file,
	        map: map,
            radius: file.radius
	    });

        var infoWindow = new google.maps.InfoWindow({ 
            content: 'Hint: ' + file.hint + '<br>Solution: ' + file.solution + '<br>radius: ' + file.radius +
                     '<br><img src="' + file.url + '" height="100"/>' 
        });
        
	    google.maps.event.addListener(marker, 'click', function() { 
            infoWindow.open(map, marker); 
            infoWindow.circle = new google.maps.Circle({ 
                center: marker.position, 
                radius: marker.radius, 
                map: map
            });
        });

        google.maps.event.addListener(infoWindow, 'closeclick', function(){
            infoWindow.circle.setMap(null);
        });

	}
	
    function createMap() {
        var bounds = new google.maps.LatLngBounds();
	
        map = new google.maps.Map(
	        document.getElementById("map-canvas"), 
		    { mapTypeId: google.maps.MapTypeId.ROADMAP }
	    );
	
        for (var i = 0; i < mockserverif.files.length; i++) {
            file = mockserverif.accessFile(i);
            create_marker(file);
            bounds.extend(file.loc);
        }
        map.fitBounds (bounds);
	}
	
	createMap();
}

google.maps.event.addDomListener(window, 'load', initialize);
