import type { Currency } from "../../data/currency";
import type { FilterResult } from "../../data/filterResult";
import type { RequestResult } from "../../data/requestResult";
import ApiConstants from "../apiConstants";
import YusrApiHelper from "../yusrApiHelper";

export default class CurrenciesApiService
{
    routeName: string = "Currencies";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<FilterResult<Currency>>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}