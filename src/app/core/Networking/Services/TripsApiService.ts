import type { Trip } from "@/app/features/Trips/Data/Trip";
import BaseApiService from "../BaseApiService";

export default class TripsApiService extends BaseApiService<Trip>
{
    routeName: string = "Trips";
}