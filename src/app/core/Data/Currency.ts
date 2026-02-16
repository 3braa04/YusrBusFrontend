export class Currency
{
    public name! : string;
    public code! : string;
    public isFeminine! : boolean;
    public plural! : string;
    public subName! : string;
    public subIsFeminine! : boolean;
    public subPlural! : string;

    constructor(init?: Partial<Currency>) { Object.assign(this, init); }
}