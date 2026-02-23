import { BaseEntity } from "@/app/core/data/baseEntity";
import type { ColumnName } from "@/app/core/types/ColumnName";

export default class User extends BaseEntity
{
    public username! : string;
    public password! : string;
    public isActive! : boolean;
    public permissions! : number;

    constructor(init?: Partial<User>) { super(); Object.assign(this, init); }
}

export class UserFilterColumns 
{
    public static columnsNames: ColumnName[] = [
        { label: "اسم المستخدم", value: "Username" },
        { label: "رقم المستخدم", value: "Id" }, 
    ];
}

