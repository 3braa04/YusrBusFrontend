export class Route
{
    public id! : number;
    public name! : string;
    public fromCityId! : number;
    public toCityId! : number;

    public fromCityName! : string;
    public toCityName! : string;
    public routeStations! : RouteStation[];

    constructor(init?: Partial<Route>) { Object.assign(this, init); }
}

export class RouteStation
{
    public id! : number;
    public routeId! : number;
    public period! : number;
    public index! : number;
    public cityId! : number;

    public cityName! : string;

    constructor(init?: Partial<RouteStation>) { Object.assign(this, init); }
}

export const SampleRoutesList: Route[] = [
    { id: 1, name: "خط المدينة المنورة", fromCityId: 104, toCityId: 105, fromCityName: "المدينة المنورة", toCityName: "المدينة المنورة", routeStations: [] },
    { id: 2, name: "خط المدينة المنورة", fromCityId: 104, toCityId: 105, fromCityName: "المدينة المنورة", toCityName: "المدينة المنورة", routeStations: [] },
    { id: 3, name: "خط المدينة المنورة", fromCityId: 104, toCityId: 105, fromCityName: "المدينة المنورة", toCityName: "المدينة المنورة", routeStations: [] },
];