export type RequestResult<T> = {
    data: T | null;
    status: number;
    errorTitle: string;
    errorDetails: string;
}

