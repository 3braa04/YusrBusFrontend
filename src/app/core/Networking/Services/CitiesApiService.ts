import type { City } from "../../Data/City";
import ApiConstants from "../ApiConstants";
import type { RequestResult } from "../RequestResult";
import YusrApiHelper from "../YusrApiHelper";

export default class CitiesApiService
{
    routeName: string = "Cities";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<City>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter&pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}