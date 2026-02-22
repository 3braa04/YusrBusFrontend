import type { RequestResult } from "../../data/requestResult";
import type { Setting } from "../../data/setting";
import ApiConstants from "../apiConstants";
import YusrApiHelper from "../yusrApiHelper";

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