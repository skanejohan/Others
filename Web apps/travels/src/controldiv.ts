import * as L from 'leaflet';
import { trips } from './data/trips';
import { renderTrips } from './render';
import { Aston, Jannike, Johan, Participant, Trip } from './data/types';

export default class ControlDiv extends L.Control {

    map!: L.Map;
    div!: HTMLDivElement;
    yearSelect!: HTMLSelectElement;
    tripSelect!: HTMLSelectElement;
    participantSelect!: HTMLSelectElement;
    showMarkersCheckbox!: HTMLInputElement;
    showPathsCheckbox!: HTMLInputElement;
   
    initialize() {
        for (let i = 0; i < trips.length; i++) {
            trips[i].id = i.toString();
        }
    }

    // Returns the currently selected participant, or undefined.
    private selectedParticipant() : Participant | undefined {
        return this.participantSelect.value === "Alla" ? undefined : this.participantSelect.value as Participant;
    }

    // Returns the currently selected year, or undefined.
    private selectedYear() : number | undefined {
        return this.yearSelect.value === "Alla" ? undefined : parseInt(this.yearSelect.value);
    }

    // Returns the id of the currently selected trip, or undefined.
    private selectedTripId() : string | undefined {
        return this.tripSelect.value === "Alla" ? undefined : this.tripSelect.value;
    }

    // Returns a function that determines if a trip should be included, based on the selected people and year.
    private tripIncluded(person: Participant | undefined, year: number | undefined) : (trip: Trip) => boolean {
        console.log("tripIncluded");
        if (person !== undefined && year !== undefined) {
            return t => (t.people === undefined || t.people.indexOf(person) > -1) && (t.start.year === year || t.end.year === year);
        }
        if (person !== undefined) {
            return t => t.people === undefined || t.people.indexOf(person) > -1;
        }
        if (year !== undefined) {
            return t => t.start.year === year || t.end.year === year;
        }
        console.log("tripIncluded: no filter");
        return _ => true;
    }
    
    // Add an options to a selector
    private addOption(text: string, value: any, select: HTMLSelectElement) {
        let opt = L.DomUtil.create('option', undefined, select);
        opt.value = value;
        opt.text = text;
    }

    // Which participants should be available in the "participants" selector.
    private populateParticipantSelector() {
        let options = ["Alla", Johan, Jannike, Aston];
        this.participantSelect.innerHTML = ""; // Clear existing options
        options.map(p => this.addOption(p, p, this.participantSelect));
    }

    // Which years should be available in the "years" selector, based on selected participant.
    private populateYearSelector() {
        let tripsForSelectedPerson = trips.filter(this.tripIncluded(this.selectedParticipant(), undefined));
        let years = new Set<number>();
        tripsForSelectedPerson.map(t => { years.add(t.start.year); years.add(t.end.year); });
        let availableYears = ["Alla"].concat(Array.from(years).sort().map(y => y.toString()));
        this.yearSelect.innerHTML = ""; // Clear existing options
        availableYears.map(y => this.addOption(y, y, this.yearSelect));
    }

    // Which trips should be available in the "trips" selector, based on selected participant and year.
    private populateTripSelector() {
        let selectableTrips = trips.filter(this.tripIncluded(this.selectedParticipant(), this.selectedYear()));
        this.tripSelect.innerHTML = ""; // Clear existing options
        this.addOption("Alla", "Alla", this.tripSelect)
        selectableTrips.map(t => this.addOption(t.name, t.id, this.tripSelect));
    }

    // Draw the selected trips in the map.
    render() {
        let selectedTripId = this.selectedTripId();
        let visibleTrips = selectedTripId === undefined 
            ? trips.filter(t => this.tripIncluded(this.selectedParticipant(), this.selectedYear())(t))
            : trips.filter(t => t.id === selectedTripId);
        renderTrips(visibleTrips, this.map, this.showMarkersCheckbox.checked);
    }

    private onParticipantChanged() {
        this.populateYearSelector();
        this.populateTripSelector();
        this.render();
    }

    private onYearChanged() {
        this.populateTripSelector();
        this.render();
    }
    
    private onTripChanged() {
        this.render();
    }
    
    setVisibility(v: boolean) {
        this.div.style.display = v ? "block" : "none";
    }

    onAdd(map: L.Map) {
        this.map = map;

        this.div = L.DomUtil.create('div');
        this.participantSelect = L.DomUtil.create('select', undefined, this.div);
        this.yearSelect = L.DomUtil.create('select', "header-margin-left", this.div);
        this.tripSelect = L.DomUtil.create('select', "header-margin-left", this.div);

        this.showMarkersCheckbox = L.DomUtil.create('input', undefined, this.div);
        this.showMarkersCheckbox.type = "checkbox";
        this.showMarkersCheckbox.checked = true;
        let showMarkersLabel = L.DomUtil.create('label', undefined, this.div);
        showMarkersLabel.innerHTML = "Show markers";

        this.showPathsCheckbox = L.DomUtil.create('input', undefined, this.div);
        this.showPathsCheckbox.type = "checkbox";
        this.showPathsCheckbox.checked = false;
        let showPathsLabel = L.DomUtil.create('label', undefined, this.div);
        showPathsLabel.innerHTML = "Show paths";

        L.DomEvent.on(this.participantSelect, 'change', this.onParticipantChanged, this);
        L.DomEvent.on(this.yearSelect, 'change', this.onYearChanged, this);
        L.DomEvent.on(this.tripSelect, 'change', this.onTripChanged, this);
        L.DomEvent.on(this.showMarkersCheckbox, 'change', this.render, this);
        L.DomEvent.on(this.showPathsCheckbox, 'change', this.render, this);

        this.populateParticipantSelector();
        this.populateYearSelector();
        this.populateTripSelector();
        this.render();

        return this.div;
    };

    onRemove() {
        L.DomEvent.off(this.participantSelect, 'change', this.onParticipantChanged, this);
        L.DomEvent.off(this.tripSelect, 'change', this.onTripChanged, this);
        L.DomEvent.off(this.showMarkersCheckbox, 'change', this.render, this);
        L.DomEvent.off(this.showPathsCheckbox, 'change', this.render, this);
    }
}
