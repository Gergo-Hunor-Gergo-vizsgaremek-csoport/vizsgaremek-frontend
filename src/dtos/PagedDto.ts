export interface PagedDto<T>
{
    items: T[];
    pageCount: number;
}