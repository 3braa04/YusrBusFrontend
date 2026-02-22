import { BaseEntity } from "@/app/core/data/baseEntity";
import type { Passenger } from "../../passengers/data/passenger";

export class Ticket extends BaseEntity
{
    public tripId! : number;
    public passengerId! : number;
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

    public passenger? : Passenger;

    constructor(init?: Partial<Ticket>) { super(); Object.assign(this, init); }
}