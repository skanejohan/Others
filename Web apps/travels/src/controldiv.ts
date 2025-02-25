import * as L from 'leaflet';
import { trips } from './data/trips';
import { renderTrips } from './render';
import { Aston, Jannike, Johan, Trip } from './data/types';

export default class ControlDiv extends L.Control {

    map!: L.Map;
    div!: HTMLDivElement;
    tripSelect!: HTMLSelectElement;
    participantSelect!: HTMLSelectElement;
    showMarkersCheckbox!: HTMLInputElement;
    showPathsCheckbox!: HTMLInputElement;
   
    initialize() {
        for (let i = 0; i < trips.length; i++) {
            trips[i].id = i.toString();
        }
    }

    // Determines which trips to display, given the selected participants. This list is used to filter the "trips" selector.
    private participantsPredicate() : (trip: Trip) => boolean {
        switch(this.participantSelect.value) {
            case Johan: return t => t.people === undefined || t.people.indexOf('Johan') > -1;
            case Jannike: return t => t.people === undefined || t.people.indexOf('Jannike') > -1;
            case Aston: return t => t.people === undefined || t.people.indexOf('Aston') > -1;
            default: return _ => true; 
        }
    }

    // Determines which trips to display in the map. Either all trips in the "trips" selector, or only the selected trip.
    private tripsPredicate() : (trip: Trip) => boolean {
        if (this.tripSelect.value === "Alla") {
            return this.participantsPredicate();
        }
        return t => (t.id !== undefined) && (t.id === this.tripSelect.value);
    }

    private addOption(text: string, value: any, select: HTMLSelectElement) {
        let opt = L.DomUtil.create('option', undefined, select);
        opt.value = value;
        opt.text = text;
    }

    private selectTrips() {
        this.tripSelect.innerHTML = ""; // Clear existing options
        this.addOption("Alla", "Alla", this.tripSelect);
        trips.filter(this.participantsPredicate()).reverse().map(t => this.addOption(t.name, t.id, this.tripSelect));
    }

    render() {
        renderTrips(trips.filter(this.tripsPredicate()), this.map, this.showMarkersCheckbox.checked);
    }

    private onParticipantChanged() {
        this.selectTrips();
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
        this.addOption("Alla", undefined, this.participantSelect);
        this.addOption(Johan, undefined, this.participantSelect);
        this.addOption(Jannike, undefined, this.participantSelect);
        this.addOption(Aston, undefined, this.participantSelect);

        this.tripSelect = L.DomUtil.create('select', "header-margin-left", this.div);
        this.selectTrips();

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
        L.DomEvent.on(this.tripSelect, 'change', this.onTripChanged, this);
        L.DomEvent.on(this.showMarkersCheckbox, 'change', this.render, this);
        L.DomEvent.on(this.showPathsCheckbox, 'change', this.render, this);
        return this.div;
    };

    onRemove() {
        L.DomEvent.off(this.participantSelect, 'change', this.onParticipantChanged, this);
        L.DomEvent.off(this.tripSelect, 'change', this.onTripChanged, this);
        L.DomEvent.off(this.showMarkersCheckbox, 'change', this.render, this);
        L.DomEvent.off(this.showPathsCheckbox, 'change', this.render, this);
    }
}
