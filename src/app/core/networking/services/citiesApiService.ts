import type { City } from "../../Data/City";
import type { FilterResult } from "../../Data/FilterResult";
import type { RequestResult } from "../../Data/RequestResult";
import ApiConstants from "../ApiConstants";
import YusrApiHelper from "../YusrApiHelper";

export default class CitiesApiService
{
    routeName: string = "Cities";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<FilterResult<City>>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}