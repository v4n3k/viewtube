import { addQueryParams, generatePath } from '@/shared/lib';
import { ROUTE_TEMPLATES } from './routes';

export const PATH_GENERATORS = {
	// static
	home: () => ROUTE_TEMPLATES.HOME,
	subscriptions: () => ROUTE_TEMPLATES.SUBSCRIPTIONS,
	channels: () => ROUTE_TEMPLATES.CHANNELS,
	createChannel: () => ROUTE_TEMPLATES.CREATE_CHANNEL,
	history: () => ROUTE_TEMPLATES.HISTORY,
	watchLater: () => ROUTE_TEMPLATES.WATCH_LATER,
	myVideos: () => ROUTE_TEMPLATES.MY_VIDEOS,
	myChannels: () => ROUTE_TEMPLATES.MY_CHANNELS,
	likedVideos: () => ROUTE_TEMPLATES.LIKED_VIDEOS,
	upload: () => ROUTE_TEMPLATES.UPLOAD,
	settings: () => ROUTE_TEMPLATES.SETTINGS,
	signIn: () => ROUTE_TEMPLATES.SIGN_IN,
	signUp: () => ROUTE_TEMPLATES.SIGN_UP,

	// dynamic
	video: (videoId: string | number) =>
		generatePath(ROUTE_TEMPLATES.WATCH_VIDEO, { videoId }),

	channel: (channelId: string | number) =>
		generatePath(ROUTE_TEMPLATES.CHANNEL, { channelId }),

	editChannel: (channelId: string | number) =>
		generatePath(ROUTE_TEMPLATES.EDIT_CHANNEL, { channelId }),

	editVideo: (videoId: string | number) =>
		generatePath(ROUTE_TEMPLATES.EDIT_VIDEO, { videoId }),

	// with query params
	searchResults: (query: string, page?: number) => {
		return addQueryParams(ROUTE_TEMPLATES.SEARCH_RESULTS, {
			search_query: query,
			page,
		});
	},
};
