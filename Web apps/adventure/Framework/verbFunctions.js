function addVerb(item, verb) {
	if (item.verbs != null) {
		var s = _verbName(verb);	
		if (_indexOf(item.verbs, s) == -1) {
			item.verbs.push(s);
		}
	}
}

function removeVerb(item, verb) {
	var idx = _indexOf(item.verbs, verb);
	if (idx > -1) {
		item.verbs.splice(idx, 1);	
	}
}

function replaceVerb(item, oldVerb, newVerb) {
	removeVerb(item, oldVerb);
	addVerb(item, newVerb);
}

function hasVerb(item, verb) {
	return _indexOf(item.verbs, verb) > -1;
}

// Private

function _verbName(verb) {
	return verb.name == null ? verb : verb.name;
}

function _indexOf(verbs, verb) {
	if (verbs != null) {
		var verbName = _verbName(verb);
		for (var i = 0; i < verbs.length; i++) {
			if (_verbName(verbs[i]) === verbName) {
				return i;	
			}
		}
	}
	return -1;
}