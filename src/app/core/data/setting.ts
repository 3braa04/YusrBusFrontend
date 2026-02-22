import { Currency } from "./Currency";
import type { StorageFile } from "./StorageFile";

export class Setting
{
    public companyName! : string;
    public companyPhone! : string;
    public email! : string;
    public currencyId! : number;

    public logo? : StorageFile;
    public startDate! : Date;
    public endDate! : Date;
    public currency! : Currency;

    constructor(init?: Partial<Setting>) { Object.assign(this, init); }
}