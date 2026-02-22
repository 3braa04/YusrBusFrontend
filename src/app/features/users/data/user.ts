import { BaseEntity } from "@/app/core/Data/BaseEntity";

export default class User extends BaseEntity
{
    public username! : string;
    public password! : string;
    public isActive! : boolean;
    public permissions! : number;

    constructor(init?: Partial<User>) { super(); Object.assign(this, init); }
}