import type { Country } from "../../Data/Country";
import ApiConstants from "../ApiConstants";
import type { RequestResult } from "../RequestResult";
import YusrApiHelper from "../YusrApiHelper";

export default class CountriesApiService
{
    routeName: string = "Countries";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<Country>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter&pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}