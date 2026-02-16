import type { Currency } from "../../Data/Currency";
import type { FilterResult } from "../../Data/FilterResult";
import type { RequestResult } from "../../Data/RequestResult";
import ApiConstants from "../ApiConstants";
import YusrApiHelper from "../YusrApiHelper";

export default class CurrenciesApiService
{
    routeName: string = "Currencies";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<FilterResult<Currency>>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}