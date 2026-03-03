import ApiConstants from "../../apiConstants";
import YusrApiHelper from "../../yusrApiHelper";
import { ReportHelper } from "./reportHelper";

export default class TripTicketsReportApiService
{
    static async getReport(tripId: number, userId: number) 
    {
        const url = `${ApiConstants.baseUrl}/Reports/TripTickets`;
        const requestBody = { 
            tripId: tripId,
            userId: userId 
        };

        const blob = await YusrApiHelper.PostBlob(url, requestBody);
        
        if (blob) {
            ReportHelper.displayPdf(blob);
        }
    }  
}