import ApiConstants from "../../apiConstants";
import YusrApiHelper from "../../yusrApiHelper";
import { ReportHelper } from "./reportHelper";

export default class TripDepositsReportApiService
{
    static async getReport(tripId: number, commission: number, userId: number) 
    {
        const url = `${ApiConstants.baseUrl}/Reports/TripDeposits`;
        const requestBody = { 
            tripId: tripId,
            commission: commission,
            userId: userId 
        };

        const blob = await YusrApiHelper.PostBlob(url, requestBody);
        
        if (blob) {
            ReportHelper.displayPdf(blob);
        }
    }  
}