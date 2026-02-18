import { BaseEntity } from "@/app/core/Data/BaseEntity";
import type { Route } from "../../Routes/Data/Route";
import type { Ticket } from "./Ticket";

export class Trip extends BaseEntity
{
    public mainCaptainName! : string;
    public secondaryCaptainName? : string;
    public busName? : string;
    public routeId! : number;
    public startDate! : Date;
    public route! : Route;
    public tickets! : Ticket[];

    constructor(init?: Partial<Trip>) { super(); Object.assign(this, init); }
}