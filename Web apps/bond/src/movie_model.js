var Movies = function(data) {

    // Add properties that may be missing in original
    // data, and that can be deduced from others.
    data.map(
        movie => movie.locations.map(
            location => {
                if (!location.hasOwnProperty("movieName")) {
                    location.movieName = location.name;
                }
            }
        )
    );

    var selected = data;

    return {
        getTitles : getTitles,
        byMovie : byMovie,
        byArea : byArea,
        get : get,
    }

    function getTitles() {
        return data.map(m => m.title);
    }

    function byMovie(movieIndex) {
        selected = [selected[movieIndex]];
        return this;
    }

    function byArea(area) {
        // TODO selected = selected.where(each position inside area, removing movies that no longer have any positions)
        return this;
    }

    function get() {
        result = selected;
        selected = data;
        return result;
    }

};
