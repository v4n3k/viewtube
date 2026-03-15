import type { HttpClientConfig } from '.';

export const API_CONFIG = {
	baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4200/api',
	timeout: 10000,
	credentials: 'include' as RequestCredentials,
} satisfies HttpClientConfig;

export const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
} as const;

export const PAGINATION_LIMIT = 30;
