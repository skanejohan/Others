var ui = (function() {

    return {
        div : div,
        img : img,
        select : select,
        option : option,
        labelFor : labelFor,
    }

    function _elem(type, atts) {
        var e = document.createElement(type);
        if (atts != undefined && atts.id) e.id = atts.id;
        if (atts != undefined && atts.className) e.className = atts.className;
        return e;
    }

    function div(atts) {
        return _elem("div", atts);
    }

    function img(src, atts) {
        var i = _elem("img", atts);
        i.src = src;
        return i;
    }

    function select(cb, atts) {
        var s = _elem("select", atts);
        s.onchange = cb;
        return s;
    }

    function option(text, select, atts) {
        var o = _elem("option", atts);
        o.text = text;
        select.add(o);
    }

    function labelFor(control, text, atts) {
        var l = _elem('label', atts);
        l.htmlFor = control.id;
        l.control = control;
        l.appendChild(document.createTextNode(text));
        return l;
    }

})();
