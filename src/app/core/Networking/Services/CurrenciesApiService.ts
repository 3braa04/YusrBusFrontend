import type { Currency } from "../../Data/Currency";
import ApiConstants from "../ApiConstants";
import type { RequestResult } from "../RequestResult";
import YusrApiHelper from "../YusrApiHelper";

export default class CurrenciesApiService
{
    routeName: string = "Currencies";
    
    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<Currency>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter&pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }
}