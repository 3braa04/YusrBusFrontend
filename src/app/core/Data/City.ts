import type { Country } from "./Country";

export class City
{
    public name! : string;
    public countryId! : number;
    public country! : Country;

    constructor(init?: Partial<City>) { Object.assign(this, init); }
}