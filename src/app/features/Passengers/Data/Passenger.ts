import { Country } from "@/app/core/Data/Country";

export class Passenger
{
    public id! : number;
    public name! : string;
    public passportNo! : string;
    public phoneNumber? : string;
    public gender! : Gender;
    public nationalityId? : number;
    public dateOfBirth? : Date;
    public passportExpiration? : Date;
    public passportIssueLocation? : string;
    public email? : string;

    public nationality? : Country;

    constructor(init?: Partial<Passenger>) { Object.assign(this, init); }
}

export type Gender = 0 | 1;

export const GENDER = {
  Male: 0 as Gender,
  Female: 1 as Gender,
} as const;