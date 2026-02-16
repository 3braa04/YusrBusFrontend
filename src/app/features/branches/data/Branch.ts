export default class Branch {
  public id: number = 0;
  public name: string = "";
  public cityId: number = 0;
  public cityName: string = "";

  constructor(Id: number, Name: string, CityId: number, CityName: string) {
    this.id = Id;
    this.name = Name;
    this.cityId = CityId;
    this.cityName = CityName;
  }
}
export const SampleBranchsList: Branch[] = [
{ id: 1, name: "فرع المدينة المنورة", cityId: 104, cityName: "المدينة المنورة" },
  { id: 2, name: "فرع مكة المكرمة", cityId: 103, cityName: "مكة" },
  { id: 3, name: "فرع جدة", cityId: 102, cityName: "جدة" },
  { id: 4, name: "فرع الرياض", cityId: 101, cityName: "الرياض" },
];
