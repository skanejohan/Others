function Model() {


    var UNIVERSITIES = [ 
        { id: "MAQ", name: "Macquarie University", city: "Sydney, Australia", lat: -33.775001, lng: 151.112886, url: "https://www.mq.edu.au" },
        { id: "RIT", name: "Rochester Institute of Technology", city: "Rochester, NY, U.S.", lat: 43.085773, lng: -77.670407, url: "https://www.rit.edu//" },
        { id: "WIK", name: "University of Warwick", city: "Coventry, England", lat: 52.380864, lng: -1.561610, url: "http://www2.warwick.ac.uk/" },
        { id: "DUT", name: "Delft University of Technology", city: "Delft, the Netherlands", lat: 52.000744, lng: 4.371223, url: "http://www.tudelft.nl/en" },
        { id: "MSF", name: "Microsoft", city: "Redmond, WA, U.S.", lat: 47.639585, lng: -122.128436, url: "https://www.microsoft.com/" },
        { id: "UNM", name: "University of New Mexico", city: "Albuquerque, NM, U.S.", lat: 35.084566, lng: -106.620266, url: "https://www.unm.edu/" },
        { id: "UDA", name: "Udacity", city: "San Francisco, CA, U.S.", lat: 37.399871, lng: -122.108247, url: "https://www.udacity.com/" },
        { id: "STA", name: "Stanford University", city: "San Francisco, CA, U.S.", lat: 37.427581, lng: -122.171455, url: "http://www.stanford.edu/" },
        { id: "BER", name: "University of California, Berkeley", city: "San Francisco, CA, U.S.", lat: 37.871759, lng: -122.261199, url: "http://www.berkeley.edu/" },
        { id: "LAU", name: "École Polytechnique Fédérale de Lausanne", city: "Lausanne, Switzerland", lat: 46.519662, lng: 6.56532, url: "http://www.epfl.ch/" },
        { id: "DUK", name: "Duke University", city: "Durham, NC, U.S.", lat: 35.999727, lng: -78.910331, url: "http://www.duke.edu/" },
        { id: "IIT", name: "Indian Institute of Technology", city: "Delhi, India", lat: 28.545568, lng: 77.19507, url: "http://www.iitd.ac.in/" },
        { id: "RIC", name: "Rice University", city: "Houston, Texas, U.S.", lat: 29.715884, lng: -95.404148, url: "http://www.rice.edu/" },
        { id: "MEL", name: "University of Melbourne", city: "Melbourne, Australia", lat: -37.799035, lng: 144.962533, url: "http://www.unimelb.edu.au/" },
        { id: "PSU", name: "Pennsylvania State University", city: "State College, PA, U.S.", lat: 40.799127, lng: -77.860306, url: "http://www.psu.edu/" },
        { id: "JER", name: "Hebrew University of Jerusalem", city: "Jerusalem, Isreal", lat: 31.794722, lng: 35.243183, url: "http://new.huji.ac.il/en" },
        { id: "UVA", name: "University of Virginia", city: "Charlottesville, VA, U.S.", lat: 38.033486, lng: -78.507821, url: "http://www.virginia.edu/" },
        { id: "UBC", name: "University of British Columbia", city: "Vancouver, BC, Canada", lat: 49.260556, lng: -123.246230, url: "http://www.ubc.ca/" },
        { id: "GAT", name: "Georgia Institute of Technology", city: "Atlanta, GA, U.S.", lat: 33.775473, lng: -84.396667, url: "http://www.gatech.edu/" }
    ];

    var COURSES = [ // Note: month = 0 - 11!
        { unis: ["MAQ"], name: "Big History: Connecting Knowledge", date: new Date(2017, 1), url: "https://www.coursera.org/learn/big-history"},
        { unis: ["RIC"], name: "America Through Foreign Eyes", date: new Date(2017, 1), url: "https://www.coursera.org/learn/america-through-foreign-eyes"},
        { unis: ["RIT"], name: "Video Game Design History", date: new Date(2016, 10), url: "https://www.edx.org/course/video-game-design-history-ritx-game101x"},
        { unis: ["WIK"], name: "Shakespeare and his World", date: new Date(2016, 3), url: "https://www.futurelearn.com/courses/shakespeare-and-his-world"},
        { unis: ["DUT"], name: "Introduction to Functional Programming", date: new Date(2015, 11), url: "https://courses.edx.org/courses/course-v1:DelftX+FP101x+3T2015/info"},
        { unis: ["UVA"], name: "Fundamentals of Project Planning and Management", date: new Date(2015, 7), url: "https://www.coursera.org/learn/project-management"},
        { unis: ["STA"], name: "Cryptography 1", date: new Date(2015, 4), url: "https://www.coursera.org/course/crypto" },
        { unis: ["MSF"], name: "Programming with C#", date: new Date(2015, 3), url: "https://www.edx.org/course/programming-c-microsoft-dev204x" },
        { unis: ["MSF"], name: "Introduction to Bootstrap", date: new Date(2015, 2), url: "https://www.edx.org/course/introduction-bootstrap-tutorial-microsoft-dev203x" },
        { unis: ["UNM"], name: "Web Application Architectures", date: new Date(2015, 2), url: "https://www.coursera.org/course/webapplications" },
        { unis: ["STA"], name: "Introduction to Mathematical Thinking", date: new Date(2015, 2), url: "https://www.coursera.org/course/maththink" },
        { unis: ["PSU"], name: "Geospatial Intelligence and the Geospatial Revolution", date: new Date(2015, 0), url: "https://www.coursera.org/course/geoint" },
        { unis: ["GAT"], name: "Computational Investing, Part I", date: new Date(2014, 10), url: "https://www.coursera.org/course/compinvesting1" },
        { unis: ["STA", "UBC"], name: "Game Theory", date: new Date(2014, 10), url: "https://www.coursera.org/course/gametheory" },
        { unis: ["STA"], name: "Machine Learning", date: new Date(2014, 4), url: "https://www.coursera.org/course/ml" },
        { unis: ["UVA"], name: "The Modern World: Global History since 1760", date: new Date(2014, 4), url: "https://www.coursera.org/course/modernworld" },
        { unis: ["LAU"], name: "Principles of Reactive Programming", date: new Date(2013, 9), url: "https://www.coursera.org/course/reactive" },
        { unis: ["UDA"], name: "Web Development", date: new Date(2013, 7), url: "https://www.udacity.com/course/cs253" },
        { unis: ["DUK"], name: "Understanding 9/11", date: new Date(2013, 7), url: "https://www.coursera.org/course/911aftermath" },
        { unis: ["JER"], name: "A Brief History of Humankind", date: new Date(2013, 6), url: "http://www.coursera.org/course/humankind" },
        { unis: ["UDA"], name: "HTML5 Game Development", date: new Date(2013, 6), url: "https://www.udacity.com/course/cs255" },
        { unis: ["PSU"], name: "Maps and the Geospatial Revolution", date: new Date(2013, 5), url: "https://www.coursera.org/course/maps" },
        { unis: ["MEL"], name: "Discrete Optimization", date: new Date(2013, 4), url: "https://www.coursera.org/course/optimization" },
        { unis: ["RIC"], name: "An Introduction to Interactive Programming in Python", date: new Date(2013, 3), url: "https://www.coursera.org/course/interactivepython" },
        { unis: ["IIT"], name: "Web Intelligence and Big Data", date: new Date(2013, 1), url: "https://www.coursera.org/course/bigdata" },
        { unis: ["STA"], name: "Algorithms: Design and Analysis, Part 2", date: new Date(2012, 10), url: "https://www.coursera.org/course/algo2" },
        { unis: ["DUK"], name: "Think Again: How to Reason and Argue", date: new Date(2012, 9), url: "https://www.coursera.org/course/thinkagain" },
        { unis: ["LAU"], name: "Functional Programming Principles in Scala", date: new Date(2012, 7), url: "https://www.coursera.org/course/progfun" },
        { unis: ["STA"], name: "Compilers", date: new Date(2012, 2), url: "https://www.coursera.org/course/compilers" },
        { unis: ["STA"], name: "Algorithms: Design and Analysis, Part 1", date: new Date(2012, 1), url: "https://www.coursera.org/course/algo" },
        { unis: ["BER"], name: "Software Engineering for SaaS", date: new Date(2012, 0), url: "https://www.coursera.org/course/saas" },
        { unis: ["STA"], name: "Introduction to Databases", date: new Date(2011, 9), url: "https://class2go.stanford.edu/db/Winter2013/preview/" },
    ];

    /* Given a string, e.g. "STA", returns the corresponding university object */
    function university(uni) {
        return UNIVERSITIES.filter(function (u) { return u.id === uni; })[0];
    }

    /* Given a Course object, returns an array of the universities giving the course. 
       In most cases, the array will contain just one University object. */
    function universitiesForCourse(course) {
        return course.unis.reduce(function (s, u, index, array) {
            s.push(university(u));
            return s;
        }, []);
    }

    /* Given a Course object, returns a new object that is a combination of 
       the course and its universities. */
    function courseAndUni(c) {
        return { unis: universitiesForCourse(c), name: c.name, date: c.date, url: c.url };
    };

    /* Returns an array of objects, where each object is a course, and its 
       universities, as returned by the courseAndUni method above. */
    this.coursesAndUnis = function(orderby, desc, filter) {
        orderByName = function(cs) {
            cs.sort(
                function (l, r) {
                    return l.name.localeCompare(r.name);
                });
        }
        orderByNameDesc = function(cs) {
            cs.sort(
                function (l, r) {
                    return r.name.localeCompare(l.name);
                });
        }
        orderByDate = function(cs) {
            cs.sort(
                function (l, r) {
                    return l.date - r.date;
                });
        }
        orderByDateDesc = function(cs) {
            cs.sort(
                function (l, r) {
                    return r.date - l.date;
                });
        }

        cu = COURSES.map(courseAndUni);
        if (filter != "") {
            cu = cu.filter(
            function (c) {
                if (c.name.toLowerCase().includes(filter.toLowerCase()))
                    return true;
                if (c.unis.reduce(function (truefalse, uni) { return truefalse || uni.name.toLowerCase().includes(filter.toLowerCase()) }, false))
                    return true;
                return false;
            });
        }
        if (orderby === "name") {
            if (desc) {
                orderByNameDesc(cu);
            }
            else {
                orderByName(cu);
            }
        }
        else {
            if (desc) {
                orderByDateDesc(cu);
            }
            else {
                orderByDate(cu);
            }
        }

        return cu;
    }

    this.universities = function()
    {
        return UNIVERSITIES;
    }
    //this.uniPositions = function () {
    //    return UNIVERSITIES.reduce(function (s, u, index, array) {
    //        s.push(new google.maps.LatLng(u.lat, u.lng));
    //        return s;
    //    }, []);

    //}

    return {
        coursesAndUnis: this.coursesAndUnis,
        universities: this.universities
    }
}









