export interface Pagination {
   currentPage: number;
   itemsPerPage: number;
   totalPages: number;
   totalItems: number; 
}

export class PaginationResult<T> {
    result?: T;
    pagination?: Pagination;
}