export const generatePath = (
	template: string,
	params: Record<string, string | number>
): string => {
	let path = template;

	for (const key in params) {
		path = path.replace(`[${key}]`, String(params[key]));
	}

	return path;
};

export const addQueryParams = (
	baseUrl: string,
	params: Record<string, string | number | boolean | undefined | null>
): string => {
	const searchParams = new URLSearchParams();

	for (const key in params) {
		const value = params[key];

		if (value !== undefined && value !== null) {
			searchParams.append(key, String(value));
		}
	}

	const queryString = searchParams.toString();

	return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
