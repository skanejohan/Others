var map = (function() {
	travelSection.exits = { E : fictionSection }
	fictionSection.exits = { S : kitchen, W : travelSection, E : artSection }
	kitchen.exits = { N : fictionSection, S : bathroom }
	bathroom.exits = { N : kitchen }
	artSection.exits = { W : fictionSection, S : historySection }
	historySection.exits = { }
	office.exits = { }
})();

