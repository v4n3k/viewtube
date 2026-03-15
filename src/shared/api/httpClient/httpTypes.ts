import { AbortError, HttpError, NetworkError, TimeoutError } from '.';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestBody = Record<string, unknown> | FormData | null;

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface HttpClientConfig {
	baseURL: string;
	timeout?: number;
	headers?: HeadersInit;
	credentials?: RequestCredentials;
}

export interface RequestConfig extends Omit<RequestInit, 'body' | 'method'> {
	method?: HttpMethod;
	body?: RequestBody;
	url?: string;
	params?: QueryParams;
	timeout?: number;
	revalidate?: number | false;
	tags?: string[];
	useServerCookies?: boolean;
	headers?: HeadersInit;
}

export interface ResponseData<T> {
	data: T;
	status: number;
	statusText: string;
	headers: Headers;
}

export type RequestInterceptor = (
	config: RequestConfig,
) => RequestConfig | Promise<RequestConfig>;

export type ResponseInterceptor<T> = (
	response: ResponseData<T>,
) => ResponseData<T> | Promise<ResponseData<T>>;

export type ErrorInterceptor = (
	error: HttpError | NetworkError | TimeoutError | AbortError,
) => Promise<void> | void;
