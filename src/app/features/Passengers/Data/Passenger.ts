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

export const SamplePassengersList: Passenger[] = [
  new Passenger({
    id: 1,
    name: "عبدالرحمن سعود",
    passportNo: "L1234567",
    phoneNumber: "0501234567",
    gender: GENDER.Male,
    nationalityId: 1, // السعودية
    dateOfBirth: new Date("1985-04-12"),
    passportExpiration: new Date("2030-04-12"),
    passportIssueLocation: "الرياض",
    email: "a.alharbi@example.com",
    nationality: new Country({Name: 'السعودية'})
  }),
  new Passenger({
    id: 2,
    name: "لينا محمود",
    passportNo: "K9876543",
    phoneNumber: "0559876543",
    gender: GENDER.Female,
    nationalityId: 1,
    dateOfBirth: new Date("1992-11-30"),
    passportExpiration: new Date("2030-04-12"),
    passportIssueLocation: "جدة",
    email: "lina.m@example.com",
    nationality: new Country({Name: 'السعودية'})
  }),
  new Passenger({
    id: 3,
    name: "ياسين إبراهيم",
    passportNo: "E4455667",
    phoneNumber: "0540001112",
    gender: GENDER.Male,
    nationalityId: 2, // مصر
    dateOfBirth: new Date("1988-01-15"),
    passportExpiration: new Date("2030-04-12"),
    passportIssueLocation: "القاهرة",
    email: "yassin.k@example.com",
    nationality: new Country({Name: 'السعودية'})
  }),
  new Passenger({
    id: 4,
    name: "نورة علي",
    passportNo: "P5566778",
    phoneNumber: "0561239876",
    gender: GENDER.Female,
    nationalityId: 1,
    dateOfBirth: new Date("1997-06-22"),
    passportExpiration: new Date("2030-04-12"),
    passportIssueLocation: "الدمام",
    email: "noura.s@example.com",
    nationality: new Country({Name: 'السعودية'})
  }),
  new Passenger({
    id: 5,
    name: "عمر خالد",
    passportNo: "J1122334",
    phoneNumber: "0533334445",
    gender: GENDER.Male,
    nationalityId: 3, // الأردن
    dateOfBirth: new Date("1990-09-09"),
    passportExpiration: new Date("2030-04-12"),
    passportIssueLocation: "عمان",
    email: "omar.kh@example.com",
    nationality: new Country({Name: 'السعودية'})
  })
];