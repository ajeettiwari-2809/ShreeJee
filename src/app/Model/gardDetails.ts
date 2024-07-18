export interface GardDetail {
    code:      string;
    userName:  UserName;
    location:  Location;
    qrCode:    string;
    lat:       number;
    long:      number;
    address:   Address;
    visitDate: Date;
    status:    null;
}

export enum Address {
    PrismPlantMankahari = "Prism Plant Mankahari",
}

export enum Location {
    ColonyA = "COLONY-A",
    ColonyB = "COLONY-B",
}

export enum UserName {
    GateSecurity = "Gate Security",
    HODSecurity = "HOD Security",
}
