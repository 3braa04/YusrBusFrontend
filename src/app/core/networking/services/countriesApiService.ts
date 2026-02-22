import type { Country } from "../../Data/Country";
import type { FilterResult } from "../../Data/FilterResult";
import type { RequestResult } from "../../Data/RequestResult";
import ApiConstants from "../ApiConstants";
import YusrApiHelper from "../YusrApiHelper";

export default class CountriesApiService
{
    routeName: string = "Countries";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<FilterResult<Country>>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}