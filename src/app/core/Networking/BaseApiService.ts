import type { FilterResult } from "../Data/FilterResult";
import type { RequestResult } from "../Data/RequestResult";
import ApiConstants from "./ApiConstants";
import YusrApiHelper from "./YusrApiHelper";

 export default abstract class BaseApiService<T>
 {
    abstract routeName : string; 

    async Filter(pageNumber: number, rowsPerPage: number): Promise<RequestResult<FilterResult<T>>> 
    {        
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`);
    }

    async Get(id: number): Promise<RequestResult<T>>
    {
        return await YusrApiHelper.Get(`${ApiConstants.baseUrl}/${this.routeName}/${id}`);
    }

    async Add(entity: T)
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Add`, entity);
    }

    async Update(entity: T)
    {
        return await YusrApiHelper.Put(`${ApiConstants.baseUrl}/${this.routeName}/Update`, entity);
    }

    async Delete(id: number)
    {
        return await YusrApiHelper.Delete(`${ApiConstants.baseUrl}/${this.routeName}/${id}`);
    }
 }