export class HttpError extends Error {
	constructor(
		public status: number,
		public statusText: string,
		public data?: unknown,
		public url?: string,
	) {
		super(`HTTP ${status}: ${statusText}`);
		this.name = 'HttpError';
	}
}

export class NetworkError extends Error {
	constructor(public url?: string) {
		super('Network error: failed to fetch');
		this.name = 'NetworkError';
	}
}

export class TimeoutError extends Error {
	constructor(public url?: string) {
		super('Request timeout');
		this.name = 'TimeoutError';
	}
}

export class AbortError extends Error {
	constructor() {
		super('Request aborted');
		this.name = 'AbortError';
	}
}
