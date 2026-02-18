import { BaseEntity } from "@/app/core/Data/BaseEntity";

export default class User extends BaseEntity
{
    public username! : string;
    public isActive! : boolean;
    public permissions! : number;

    constructor(init?: Partial<User>) { super(); Object.assign(this, init); }
}

export const sampleUsersList:User[] = [
    {id:1, username: "AhmedM204", isActive:true, permissions: 2},
    {id:2, username: "BaraaBarmo", isActive:true, permissions: 6},
    {id:3, username: "KhalidNass", isActive:false, permissions: 5},
    {id:4, username: "MohammedAbdo", isActive:true, permissions: 0},
    {id:5, username: "MohamedBakri", isActive:true, permissions: 1},
];