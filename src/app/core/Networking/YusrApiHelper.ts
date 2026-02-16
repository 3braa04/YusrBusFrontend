import type { RequestResult } from "../Data/RequestResult";

export default class YusrApiHelper 
{
    static async Get<T>(url: string, options?: RequestInit): Promise<RequestResult<T>> 
    {
        const response = await fetch(url, {
        method: 'GET',
        ...options,
        });
        return YusrApiHelper.handleResponse<T>(response);
    }

    static async Post<T>(url: string, body?: unknown, options?: RequestInit): Promise<RequestResult<T>> 
    {
        const isFormData = body instanceof FormData;
        const headers = {
        ...(options?.headers || {}),
        ...(!isFormData && body ? { 'Content-Type': 'application/json' } : {}),
        };

        const response = await fetch(url, {
        method: 'POST',
        headers,
        body: isFormData ? body : JSON.stringify(body),
        ...options,
        });
        return YusrApiHelper.handleResponse<T>(response);
    }

    static async Put<T>(url: string, body?: unknown, options?: RequestInit): Promise<RequestResult<T>> 
    {
        const isFormData = body instanceof FormData;
        const headers = {
        ...(options?.headers || {}),
        ...(!isFormData && body ? { 'Content-Type': 'application/json' } : {}),
        };

        const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: isFormData ? body : JSON.stringify(body),
        ...options,
        });
        return YusrApiHelper.handleResponse<T>(response);
    }

    static async Delete<T>(url: string, options?: RequestInit): Promise<RequestResult<T>> 
    {
        const response = await fetch(url, {
        method: 'DELETE',
        ...options,
        });
        return YusrApiHelper.handleResponse<T>(response);
    }

    private static async handleResponse<T>(response: Response): Promise<RequestResult<T>> 
    {
        if (!response.ok) 
        {
            const errorText = response.statusText;
            console.log(`[Status: ${response.status}]\nThere was an Error:\n${errorText}`);
            return {data:null, status:response.status}
        }

        if (response.status === 404) 
        {
            return { data: null, status: 404 };
        }

        const data = await response.json() as T;
        return { data,status: response.status };
    }
}