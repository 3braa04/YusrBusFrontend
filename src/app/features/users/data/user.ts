import { BaseEntity } from "@/app/core/data/baseEntity";

export class UserBranchDto {
  public userId!: number;
  public branchId!: number;
  constructor(init?: Partial<UserBranchDto>) {
    Object.assign(this, init);
  }
}

export default class User extends BaseEntity {
  public username!: string;
  public password!: string;
  public isActive!: boolean;
  public permissions!: number;
  public branches!: UserBranchDto[];

  constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }
}
