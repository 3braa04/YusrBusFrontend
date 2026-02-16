export type RequestResult<T> = {
    data: T | null;
    status: number
}