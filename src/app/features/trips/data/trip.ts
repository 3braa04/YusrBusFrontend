import { BaseEntity } from "@/app/core/data/baseEntity";
import type { Route } from "../../routes/data/route";
import type { Ticket } from "./ticket";

export class Trip extends BaseEntity
{
    public mainCaptainName! : string;
    public secondaryCaptainName? : string;
    public busName? : string;
    public routeId! : number;
    public startDate! : Date;
    public ticketPrice! : number;
    public route! : Route;
    public tickets! : Ticket[];

    constructor(init?: Partial<Trip>) { super(); Object.assign(this, init); }
}