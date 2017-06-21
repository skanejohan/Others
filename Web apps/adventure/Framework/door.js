DoorMode = {
	Open : 1,
	Closed : 2,
	Locked : 3,
}

function simpleDoor(name, caption, mode) {
	var door = { 
		name : name,
		caption : caption,
		getVerbs : getVerbs,
		mode : mode,
		afterLock : () => {door.mode = DoorMode.Locked},
		afterUnlock : () => {door.mode = DoorMode.Closed},
		afterOpen : () => {door.mode = DoorMode.Open},
		afterClose : () => {door.mode = DoorMode.Closed},
	};

	function getVerbs() {
		var openVerb = door.mode == DoorMode.Closed ? ["open"] : []
		var closeVerb = door.mode == DoorMode.Open ? ["close"] : []
		return openVerb.concat(closeVerb);
	}

	return door;
}

function lockableDoor(name, caption, mode, key) {
	var door = { 
		name : name,
		caption : caption,
		getVerbs : getVerbs,
		mode : mode,
		afterLock : () => {door.mode = DoorMode.Locked},
		afterUnlock : () => {door.mode = DoorMode.Closed},
		afterOpen : () => {door.mode = DoorMode.Open},
		afterClose : () => {door.mode = DoorMode.Closed},
	};

	function getVerbs() {
		var openVerb = door.mode == DoorMode.Closed ? ["open"] : []
		var closeVerb = door.mode == DoorMode.Open ? ["close"] : []
		var lockVerb = game.inventory.has(key) && door.mode == DoorMode.Closed ? ["lock"] : []
		var unlockVerb = game.inventory.has(key) && door.mode == DoorMode.Locked ? ["unlock"] : []
		return openVerb.concat(closeVerb.concat(lockVerb.concat(unlockVerb)));
	}

	return door;
}

