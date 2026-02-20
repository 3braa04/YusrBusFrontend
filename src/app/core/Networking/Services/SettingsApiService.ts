import type { RequestResult } from "../../Data/RequestResult";
import type { Setting } from "../../Data/Setting";
import ApiConstants from "../ApiConstants";
import YusrApiHelper from "../YusrApiHelper";

export default class SettingsApiService
{
    routeName: string = "Settings";
    
    async Filter(): Promise<RequestResult<Setting>> 
    {
        return await YusrApiHelper.Post(`${ApiConstants.baseUrl}/${this.routeName}/Filter`);
    }

    async Update(entity: Setting)
    {
        return await YusrApiHelper.Put(`${ApiConstants.baseUrl}/${this.routeName}/Update`, entity);
    }
}