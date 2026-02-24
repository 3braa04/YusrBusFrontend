import { BaseEntity } from "@/app/core/data/baseEntity";
import type { ColumnName } from "@/app/core/types/ColumnName";

export class UserBranch extends BaseEntity {
  public userId!: number;
  public branchId!: number;
  public username!: string;
  public branchName!: string;

  constructor(init?: Partial<UserBranch>) {
    super();
    Object.assign(this, init);
  }
}

export default class User extends BaseEntity {
  public username!: string;
  public password!: string;
  public isActive!: boolean;
  public permissions!: number;
  public userBranches!: UserBranch[];

  constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }
}

export class UserFilterColumns 
{
    public static columnsNames: ColumnName[] = [
        { label: "رقم المستخدم", value: "Id" }, 
        { label: "اسم المستخدم", value: "Username" },
    ];
}