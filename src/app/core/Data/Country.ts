export class Country
{
    public name! : string;
    public code! : string;

    constructor(init?: Partial<Country>) { Object.assign(this, init); }
}