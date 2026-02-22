import type { Country } from "./Country";

export class City
{
    public id! : number;
    public name! : string;
    public countryId! : number;
    public country! : Country;

    constructor(init?: Partial<City>) { Object.assign(this, init); }
}