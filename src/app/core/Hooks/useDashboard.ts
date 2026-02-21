import { useEffect, useState } from "react";
import { Dashboard } from "../Data/Dashboard";
import DashboardApiService from "../Networking/Services/DashboardApiService";

export default function useDashbaord()
{
    const [data, setData] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const dashboardFetch = async ()=>{
            const service = new DashboardApiService();
            setLoading(true);
            const response = await service.get();
            setLoading(false);
            setData(response.data);
        }
        dashboardFetch();
    }, [])


    return {data, loading}
}