export const formatDuration = (durationInSeconds: number): string => {
	const hours = Math.floor(durationInSeconds / 3600);
	const minutes = Math.floor((durationInSeconds % 3600) / 60);
	const seconds = durationInSeconds % 60;

	const numberFormatter = new Intl.NumberFormat('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	let formattedDuration = '';

	if (hours > 0) {
		formattedDuration += `${hours}:${numberFormatter.format(minutes)}:`;
	} else {
		formattedDuration += `${minutes}:`;
	}

	formattedDuration += numberFormatter.format(seconds);

	return formattedDuration;
};

export const formatDate = (date: Date): string => {
	const formattedDate = date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});

	return formattedDate;
};

export const formatDateAgo = (date: Date): string => {
	if (!(date instanceof Date)) {
		console.error('Invalid date format:', date);
		return 'Invalid date';
	}

	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 },
	];

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
		}
	}

	return 'just now';
};

export const formatViews = (views: number): string => {
	const numberFormat = new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
	});

	return numberFormat.format(views);
};
