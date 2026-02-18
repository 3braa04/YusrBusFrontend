import { BaseEntity } from "@/app/core/Data/BaseEntity";

export default class Branch extends BaseEntity
{
  public name! : string;
  public cityId! : number;
  public cityName! : string;

  constructor(init?: Partial<Branch>) { super(); Object.assign(this, init); }
}