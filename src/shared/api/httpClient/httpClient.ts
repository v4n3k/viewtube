import type {
	ErrorInterceptor,
	HttpClientConfig,
	RequestBody,
	RequestConfig,
	RequestInterceptor,
	ResponseData,
	ResponseInterceptor,
} from '.';
import { AbortError, HttpError, NetworkError, TimeoutError } from '.';
import { API_CONFIG, DEFAULT_HEADERS } from './constants';
import {
	errorInterceptor,
	requestInterceptor,
	responseInterceptor,
} from './interceptors';

export class HttpClient {
	private config: HttpClientConfig;
	private requestInterceptors: RequestInterceptor[] = [];
	private responseInterceptors: ResponseInterceptor<any>[] = [];
	private errorInterceptors: ErrorInterceptor[] = [];

	constructor(config?: Partial<HttpClientConfig>) {
		this.config = {
			baseURL: config?.baseURL ?? API_CONFIG.baseURL,
			timeout: config?.timeout ?? API_CONFIG.timeout,
			credentials: config?.credentials ?? API_CONFIG.credentials,
			headers: { ...DEFAULT_HEADERS, ...config?.headers },
		};

		this.addRequestInterceptor(requestInterceptor);
		this.addResponseInterceptor(responseInterceptor);
		this.addErrorInterceptor(errorInterceptor);
	}

	addRequestInterceptor(interceptor: RequestInterceptor) {
		this.requestInterceptors.push(interceptor);
	}

	addResponseInterceptor<T>(interceptor: ResponseInterceptor<T>) {
		this.responseInterceptors.push(interceptor as ResponseInterceptor<any>);
	}

	addErrorInterceptor(interceptor: ErrorInterceptor) {
		this.errorInterceptors.push(interceptor);
	}

	private isServer(): boolean {
		return typeof window === 'undefined';
	}

	private buildURL(endpoint: string, params?: Record<string, unknown>): string {
		const normalizedEndpoint = endpoint.replace(/^\/+/, '');
		const baseUrlWithSlash = this.config.baseURL.replace(/\/+$/, '') + '/';
		const url = new URL(normalizedEndpoint, baseUrlWithSlash);

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					url.searchParams.append(key, String(value));
				}
			});
		}

		return url.toString();
	}

	private async getServerCookies(): Promise<string> {
		if (!this.isServer()) return '';

		try {
			const { cookies } = await import('next/headers');
			const cookieStore = await cookies();
			return cookieStore.toString();
		} catch {
			return '';
		}
	}

	private normalizeHeaders(headers?: HeadersInit): Record<string, string> {
		if (!headers) return {};

		if (headers instanceof Headers) {
			const result: Record<string, string> = {};
			headers.forEach((value, key) => {
				result[key] = value;
			});
			return result;
		}

		if (Array.isArray(headers)) {
			const result: Record<string, string> = {};
			headers.forEach(([key, value]) => {
				result[key] = value;
			});
			return result;
		}

		return { ...headers };
	}

	private async applyRequestInterceptors(
		config: RequestConfig,
	): Promise<RequestConfig> {
		let result = config;
		for (const interceptor of this.requestInterceptors) {
			result = await interceptor(result);
		}
		return result;
	}

	private async applyResponseInterceptors<T>(
		response: ResponseData<T>,
	): Promise<ResponseData<T>> {
		let result = response;
		for (const interceptor of this.responseInterceptors) {
			result = (await interceptor(result)) as ResponseData<T>;
		}
		return result;
	}

	private async applyErrorInterceptors(
		error: HttpError | NetworkError | TimeoutError | AbortError,
	): Promise<void> {
		for (const interceptor of this.errorInterceptors) {
			try {
				await interceptor(error);
			} catch (interceptorError) {
				console.error('[Error Interceptor Failed]', interceptorError);
			}
		}
	}

	private async parseResponse<T>(response: Response): Promise<T> {
		const contentType = response.headers.get('content-type');

		if (contentType?.includes('application/json')) {
			return response.json() as Promise<T>;
		}

		if (contentType?.includes('text/')) {
			return response.text() as unknown as T;
		}

		return response.blob() as unknown as T;
	}

	async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
		const {
			method = 'GET',
			body,
			params,
			timeout = this.config.timeout,
			revalidate,
			tags,
			useServerCookies = false,
			headers = {},
			...restConfig
		} = config;

		const interceptedConfig = await this.applyRequestInterceptors({
			method,
			body,
			params,
			timeout,
			revalidate,
			tags,
			useServerCookies,
			headers,
			...restConfig,
		});

		const url = this.buildURL(endpoint, interceptedConfig.params);
		const abortController = new AbortController();

		let timeoutId: NodeJS.Timeout | undefined;

		try {
			timeoutId = setTimeout(
				() => abortController.abort(),
				interceptedConfig.timeout,
			);

			const requestHeaders: Record<string, string> = {
				...this.normalizeHeaders(this.config.headers),
				...this.normalizeHeaders(interceptedConfig.headers),
			};

			if (this.isServer() && interceptedConfig.useServerCookies) {
				const cookieHeader = await this.getServerCookies();
				if (cookieHeader) {
					requestHeaders['Cookie'] = cookieHeader;
				}
			}

			let requestBody: BodyInit | null = null;
			if (interceptedConfig.body) {
				if (interceptedConfig.body instanceof FormData) {
					requestBody = interceptedConfig.body;
					delete requestHeaders['Content-Type'];
				} else {
					requestBody = JSON.stringify(interceptedConfig.body);
				}
			}

			const nextOptions: RequestInit['next'] = this.isServer()
				? {
						revalidate: interceptedConfig.revalidate,
						tags: interceptedConfig.tags,
					}
				: undefined;

			const fetchOptions: RequestInit = {
				method: interceptedConfig.method,
				headers: requestHeaders,
				body: requestBody,
				credentials: this.isServer() ? undefined : this.config.credentials,
				signal: abortController.signal,
				cache: interceptedConfig.revalidate === false ? 'no-store' : undefined,
				next: nextOptions,
				...restConfig,
			};

			const response = await fetch(url, fetchOptions);

			if (!response.ok) {
				let errorData: unknown;
				try {
					errorData = await this.parseResponse(response);
				} catch {
					errorData = await response.text();
				}
				throw new HttpError(
					response.status,
					response.statusText,
					errorData,
					url,
				);
			}

			const data = await this.parseResponse<T>(response);

			const responseData: ResponseData<T> = {
				data,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
			};

			const finalResponse = await this.applyResponseInterceptors(responseData);

			return finalResponse.data;
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				const timeoutError = new TimeoutError(url);
				await this.applyErrorInterceptors(timeoutError);
				throw timeoutError;
			}

			if (error instanceof TypeError && error.message.includes('fetch')) {
				const networkError = new NetworkError(url);
				await this.applyErrorInterceptors(networkError);
				throw networkError;
			}

			if (error instanceof HttpError) {
				await this.applyErrorInterceptors(error);
				throw error;
			}

			if (error instanceof AbortError) {
				throw error;
			}

			throw error;
		} finally {
			if (timeoutId) clearTimeout(timeoutId);
		}
	}

	get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
		return this.request<T>(endpoint, { ...config, method: 'GET' });
	}

	post<T>(
		endpoint: string,
		body?: RequestBody,
		config?: Omit<RequestConfig, 'method'>,
	) {
		return this.request<T>(endpoint, { ...config, method: 'POST', body });
	}

	put<T>(
		endpoint: string,
		body?: RequestBody,
		config?: Omit<RequestConfig, 'method'>,
	) {
		return this.request<T>(endpoint, { ...config, method: 'PUT', body });
	}

	patch<T>(
		endpoint: string,
		body?: RequestBody,
		config?: Omit<RequestConfig, 'method'>,
	) {
		return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
	}

	delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
		return this.request<T>(endpoint, { ...config, method: 'DELETE' });
	}
}

export const http = new HttpClient();

export const createHttpClient = (config?: Partial<HttpClientConfig>) => {
	return new HttpClient(config);
};
