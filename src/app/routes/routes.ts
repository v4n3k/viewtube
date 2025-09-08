export const ROUTE_TEMPLATES = {
	// static
	HOME: '/',
	SUBSCRIPTIONS: '/subscriptions',
	CHANNELS: '/channels',
	HISTORY: '/history',
	WATCH_LATER: '/watch-later',
	MY_VIDEOS: '/my-videos',
	LIKED_VIDEOS: '/liked-videos',
	UPLOAD: '/upload-video',
	SETTINGS: '/settings',
	SIGN_IN: '/auth/sign-in',
	SIGN_UP: '/auth/sign-up',

	// dynamic
	WATCH_VIDEO: '/watch/[videoId]',
	CHANNEL: '/channel/[channelId]',

	// with query params (base path)
	SEARCH_RESULTS: '/results',
} as const;
