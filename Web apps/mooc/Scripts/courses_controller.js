function Controller(model, rowSelector, tableSelector, filterSelector) {

    var sort = "name";
    var desc = false;

    formatDate = function (date) {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[date.getMonth()] + " " + date.getFullYear();
    };

    courseInfo = function(c) {
        return '<a title="Click to open the web page for ' + c.name + '" ' +
            "onclick=\"window.open('" + c.url + "');\" " +
            "href=\"#\">" + c.name + "</a>";
    }

    uniInfo = function (u) {
        return "<a title=\"Click to open the web page for " + u.name + "\" " +
            "onclick=\"window.open('" + u.url + "');\" " +
            "href=\"#\">" + u.name +
            "<a title=\"Click to navigate to " + u.name + " in the map\" " +
            "onclick=\"navigateTo(" + u.lat + "," + u.lng + ");\" " +
            "href=\"#\"> (map)</a>";
    }

    getTableHtml = function (orderby, desc, filter) {
        // Get complete list of courses and universities,
        // sorted and filtered appropriately
        var courses = model.coursesAndUnis(orderby, desc, filter);

        // Produce the final HTML for the table
        var s = "";
        courses.map(
            function (c) {
                var uni = "";
                c.unis.map(
                    function (u) {
                        if (uni != "")
                            uni += ", ";
                        uni += uniInfo(u);
                    });

                s += '<tr class="row course-row">';
                s += '<td>' + courseInfo(c) + '</td>';
                s += '<td>' + formatDate(c.date) + '</td>';
                s += '<td>' + uni + '</td>';
                s += '</td>';
            });
        return s;
    }

    return {
        setSort: function (s) {
            if (this.sort === s) {
                this.desc = !this.desc;
            }
            else {
                this.sort = s;
                this.desc = false;
            }
        },

        populate: function () {
            $(rowSelector).remove();
            $(tableSelector).append(getTableHtml(this.sort, this.desc, $(filterSelector).val()));
        }
    }

}


