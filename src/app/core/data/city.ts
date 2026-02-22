import type { Country } from "./country";

export class City
{
    public id! : number;
    public name! : string;
    public countryId! : number;
    public country! : Country;

    constructor(init?: Partial<City>) { Object.assign(this, init); }
}