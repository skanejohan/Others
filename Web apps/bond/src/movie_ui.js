function setupUI(mapDiv) {

    var movieDiv;
    var movieSelector;

    var timeDiv;

    var movies;
    var markers;
    var bounds;

    function AddMarkers(locations) {
        // Delete existing markers
        markers.map(m => m.setMap(null));
        markers = [];

        // Add markers for selected movies
        bounds = new google.maps.LatLngBounds();
        locations.map(l => {
            var marker = new google.maps.Marker({position: l.position, map: map, title: l.movieName });
            markers.push(marker);
            bounds.extend(l.position);
        });
        
        // Zoom around the markers
        map.fitBounds(bounds);
        if (map.getZoom() > 15) {
            map.setZoom(15);
        }
    }

    function AddMovieMarkers(movies) {
        var locations = []; 
        movies.map(m => m.locations.map(l => locations.push(l)));
        AddMarkers(locations);
    }

    function AddSequenceMarkers(movie, sequence) {
        var locations = []; 
        movie.locations.filter(l => sequence.ids.includes(l.id)).map(l => locations.push(l));
        AddMarkers(locations);
        console.log("AddSequenceMarkers: " + sequence.start + " - " + sequence.end + " " + sequence.ids);
    }

    function selectMovie() {
        var selectedMovies = movieSelector.selectedIndex > 0 
            ? movies.byMovie(movieSelector.selectedIndex-1).get() 
            : movies.get();
        AddMovieMarkers(selectedMovies);

        // Display the time line if a specific movie was selected.
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
        if (movieSelector.selectedIndex > 0) {
            timeDiv.innerHTML = "";
            setupTimeLine(timeDiv, selectedMovies[0], index => AddSequenceMarkers(selectedMovies[0], selectedMovies[0].sequences[index]));
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(timeDiv);
        }
    }
    
    function createMovieDiv() {
        movieDiv = ui.div( { className : "control-panel control-panel-top" } );

        movieSelector = ui.select(selectMovie, { id : "movieSelector" });
        ui.option("--- All movies ---", movieSelector);
        movies.getTitles().map(t => ui.option(t, movieSelector));
    
        movieDiv.appendChild(ui.img("img/007_logo.png", { className : "logo-image logo-image-left" }));
        movieDiv.appendChild(ui.labelFor(movieSelector, "Click to choose a movie:"));
        movieDiv.appendChild(movieSelector);
        movieDiv.appendChild(ui.img("img/007_logo.png", { className : "logo-image logo-image-right" }));
    }
    
    function createTimeDiv() {
        timeDiv = ui.div( { className : "control-panel control-panel-bottom" } );
        timeDiv.appendChild(ui.select());
    }
    
    map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(57.692842, 11.950854),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    markers = [];
    movies = new Movies(movie_data);
    createMovieDiv();
    createTimeDiv();

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(movieDiv);
    selectMovie();
}