export class Country
{
    public id! : number;
    public name! : string;
    public code! : string;

    constructor(init?: Partial<Country>) { Object.assign(this, init); }
}