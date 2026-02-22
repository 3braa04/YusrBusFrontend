import type { Passenger } from "@/app/features/Passengers/Data/Passenger";
import BaseApiService from "../BaseApiService";

export default class PassengersApiService extends BaseApiService<Passenger>
{
    routeName: string = "Passengers";
}