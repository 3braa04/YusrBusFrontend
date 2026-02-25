import { BaseEntity } from "@/app/core/data/baseEntity";
import type { Route } from "../../routes/data/route";
import type { Ticket } from "./ticket";
import type { ColumnName } from "@/app/core/types/ColumnName";

export class Trip extends BaseEntity
{
    public mainCaptainName! : string;
    public secondaryCaptainName? : string;
    public busName? : string;
    public routeId! : number;
    public branchId! : number;
    public startDate! : Date;
    public ticketPrice! : number;
    public route! : Route;
    public tickets! : Ticket[];

    constructor(init?: Partial<Trip>) { super(); Object.assign(this, init); }
}

export class TripFilterColumns 
{
    public static columnsNames: ColumnName[] = [
        { label: "رقم الرحلة", value: "Id" }, 
        { label: "اسم القائد", value: "MainCaptainName" },
        { label: "اسم المساعد", value: "SecondaryCaptainName" },
        { label: "الحافلة", value: "BusName" },
    ];
}