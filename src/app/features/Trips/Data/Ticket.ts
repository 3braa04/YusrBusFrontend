import { BaseEntity } from "@/app/core/Data/BaseEntity";

export class Ticket extends BaseEntity
{
    public tripId! : number;
    public fromCityId! : number;
    public toCityId! : number;
    public amount! : number;
    public paidAmount? : number;
    public issueDate? : Date;
    public issueCityId! : number;
    public chairNo! : number;
    public notes! : string;
    public fromCityName? : string;
    public toCityName? : string;
    public issueCityName? : string;

    constructor(init?: Partial<Ticket>) { super(); Object.assign(this, init); }
}