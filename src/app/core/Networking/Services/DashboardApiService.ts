import { Dashboard } from "../../Data/Dashboard";
import type { RequestResult } from "../../Data/RequestResult";
import ApiConstants from "../ApiConstants";
import YusrApiHelper from "../YusrApiHelper";

export default class DashboardApiService
{
    routeName: string = "dashboard";

    async get(): Promise<RequestResult<Dashboard>>
    {
        const url = `${ApiConstants.baseUrl}/${this.routeName}`;
        console.log(url);
        
        return await YusrApiHelper.Get<Dashboard>(url);
    }
}