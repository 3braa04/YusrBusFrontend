import { BaseEntity } from "@/app/core/data/baseEntity";
import type Branch from "../../branches/data/branch";

export default class User extends BaseEntity
{
    public username! : string;
    public password! : string;
    public isActive! : boolean;
    public permissions! : number;
    public branches!: Branch[];
    
    constructor(init?: Partial<User>) { super(); Object.assign(this, init); }
}