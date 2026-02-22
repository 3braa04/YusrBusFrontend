import type { City } from "../../data/city";
import type { FilterResult } from "../../data/filterResult";
import type { RequestResult } from "../../data/requestResult";
import ApiConstants from "../apiConstants";
import YusrApiHelper from "../yusrApiHelper";

export default class CitiesApiService
{
    routeName: string = "Cities";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<FilterResult<City>>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}