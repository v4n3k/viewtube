interface PaginationMetadata {
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

export interface PaginationLimit {
	limit: number;
}

export interface PaginationParams extends PaginationLimit {
	page: number;
}

export type PaginatedResponse<K extends string, T> = {
	[P in K]: T[];
} & PaginationMetadata;
