function setupTimeLine(container, movie, cb) {

    function projectMovieSequences() {
        var sequenceId = 0;
        function projectSequence(s) {
            return {
                id : sequenceId++,
                start : s.start,
                end : s.end,
                title : s.description
            }
        }
        return movie.sequences.map(projectSequence);
    }

    var items = new vis.DataSet(projectMovieSequences());


    // create visualization
    var options = {
        height: '60px',
        min: new Date(2000, 1, 1, 0, 0, 0),
        max: new Date(2000, 1, 1, 3, 0, 0),
        zoomMin: 20000,  // 20 seconds
        zoomMax: 3600000 * 2,         // 2 hours
        stack: false,
        showMajorLabels: false,
        format: {
            minorLabels: {
                millisecond:'H:mm:ss',
                second:     'H:mm:ss',
                minute:     'H:mm:ss',
                hour:       'H:mm:ss',
            },
        }
    };

    var timeline = new vis.Timeline(container);
    timeline.setOptions(options);
    timeline.setItems(items);

    timeline.on('select', function (properties) {
        cb(properties.items[0]);
    });
}
