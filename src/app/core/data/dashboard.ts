import { BaseEntity } from "./baseEntity";

export type TripInTimeData = {
    totalTrips:number;
    date:Date;

} 
export class Dashboard extends BaseEntity{
    public totalTrips!: number;
    public totalPassengers!:number;
    public totalIncome!:number;
    public grothRate!:number;

    constructor(init?: Partial<Dashboard>) { super(); Object.assign(this, init); }
}