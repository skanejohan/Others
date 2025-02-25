export interface Date {
    year: number;
    month: typeof Jan | typeof Feb | typeof Mar | typeof Apr | typeof May | typeof Jun | typeof Jul | typeof Aug | typeof Sep | typeof Oct | typeof Nov | typeof Dec | undefined;
    day: number | undefined;
}

export interface Location {
    name: string;
    address: string;
    url: string | undefined;
    position: [number, number];
}

export interface Stop {
    location: Location;
    start?: Date;
    end?: Date;
}

export interface Trip {
    id?: string;
    name: string;
    start: Date;
    end: Date;
    stops: Stop[];
    people?: (typeof Johan | typeof Jannike | typeof Aston)[];
}

export const Johan = "Johan";
export const Jannike = "Jannike";
export const Aston = "Aston";

export const Jan = 0;
export const Feb = 1;
export const Mar = 2;
export const Apr = 3;
export const May = 4;
export const Jun = 5;
export const Jul = 6;
export const Aug = 7;
export const Sep = 8;
export const Oct = 9;
export const Nov = 10;
export const Dec = 11;
