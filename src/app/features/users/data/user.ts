import { BaseEntity } from "@/app/core/data/baseEntity";
import type { ColumnName } from "@/app/core/types/ColumnName";
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

export class UserFilterColumns 
{
    public static columnsNames: ColumnName[] = [
        { label: "اسم المستخدم", value: "Username" },
        { label: "رقم المستخدم", value: "Id" }, 
    ];
}

