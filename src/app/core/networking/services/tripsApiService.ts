import type { Trip } from "@/app/features/trips/data/trip";
import BaseApiService from "../baseApiService";
import type { FilterCondition } from "../../data/filterCondition";
import type { FilterResult } from "../../data/filterResult";
import type { RequestResult } from "../../data/requestResult";
import ApiConstants from "../apiConstants";
import YusrApiHelper from "../yusrApiHelper";

export default class TripsApiService extends BaseApiService<Trip>
{
    routeName: string = "Trips";

    async FilterInBranch(pageNumber: number, rowsPerPage: number, branchId: number, condition?: FilterCondition): Promise<RequestResult<FilterResult<Trip>>> 
    {    
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}&branchId=${branchId}`, condition);
    }
}