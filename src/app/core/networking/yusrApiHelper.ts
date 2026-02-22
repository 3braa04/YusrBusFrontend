import { AuthConstants } from "../auth/authConstants";
import type { RequestResult } from "../data/requestResult";

export default class YusrApiHelper 
{
    static async Get<T>(url: string, options?: RequestInit): Promise<RequestResult<T>> 
    {
        const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
        ...options,
        });
        return YusrApiHelper.handleResponse<T>(response);
    }

    private static async handleResponse<T>(response: Response): Promise<RequestResult<T>> 
    {
        if (response.status === 401) {
            window.dispatchEvent(new Event(AuthConstants.UnauthorizedEventName));
            return { data: null, status: 401, errorTitle: "Unauthorized", errorDetails: "Session expired" };
        }

        if (response.status === 404) {
            return { data: null, status: 404, errorTitle: "Not Found", errorDetails: "" };
        }

        if (!response.ok) 
        {
            const errorData = await response.json();
            console.log(errorData)
            console.error(`[Error ${response.status}]: ${errorData.title}`, errorData.detail);
            return {data:null, status:response.status, errorTitle: errorData.title, errorDetails: errorData.detail}
        }

        const data = await response.json() as T;
        return { data,status: response.status, errorTitle: "", errorDetails: "" };
    }
}