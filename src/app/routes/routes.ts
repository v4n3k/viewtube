export const ROUTE_TEMPLATES = {
	// static
	HOME: '/',
	SUBSCRIPTIONS: '/subscriptions',
	CHANNELS: '/channels',
	CREATE_CHANNEL: '/create-channel',
	HISTORY: '/history',
	WATCH_LATER: '/watch-later',
	MY_VIDEOS: '/my-videos',
	MY_CHANNELS: '/my-channels',
	LIKED_VIDEOS: '/liked-videos',
	UPLOAD: '/upload-video',
	SETTINGS: '/settings',
	SIGN_IN: '/auth/sign-in',
	SIGN_UP: '/auth/sign-up',

	// dynamic
	WATCH_VIDEO: '/videos/[videoId]',
	VIDEO_STATISTICS: 'videos/[videoId]/statistics',
	CHANNEL: '/channels/[channelId]',
	EDIT_CHANNEL: '/edit-channel/[channelId]',
	EDIT_VIDEO: '/edit-video/[videoId]',

	// with query params (base path)
	SEARCH_RESULTS: '/results',
} as const;
