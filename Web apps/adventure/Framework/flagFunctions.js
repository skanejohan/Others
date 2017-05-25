function setFlag(flag, flags) {
	flags.add(flag);
}

function clearFlag(flag, flags) {
	flags.delete(flag);
}

function replaceFlag(oldFlag, newFlag, flags) {
	clearFlag(oldFlag, flags);
	setFlag(newFlag, flags)
}

function flagIsSet(flag, flags) {
	return flags.has(flag);
}
