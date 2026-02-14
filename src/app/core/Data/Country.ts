export class Country
{
    public Name! : string;
    public Code! : string;

    constructor(init?: Partial<Country>) { Object.assign(this, init); }
}