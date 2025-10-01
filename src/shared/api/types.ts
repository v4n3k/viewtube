interface PaginationMetadata {
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface PaginationLimit extends Pick<PaginationParams, 'limit'> {}

export type PaginatedResponse<K extends string, T> = {
	[P in K]: T[];
} & PaginationMetadata;

export type InfiniteQueryResponse<T> = {
	pages: T[];
	pageParams: unknown[];
};
