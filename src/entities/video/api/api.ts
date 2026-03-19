import { api, PaginatedResponse, PaginationParams } from '@/shared/api';
import { http } from '@/shared/api/httpClient';
import { StatsDataPoint } from '@/shared/ui/TimeRangeChart';
import { getVideoActionPath } from '../lib';
import { Video, VideoActionParams } from '../model';

interface ChannelPaginationParams extends PaginationParams {
	channelId: number;
}

interface GetRecommendedVideosParams extends PaginationParams {
	[key: string]: number | string | boolean | undefined;
}

export interface GetRecommendedVideosResponse extends PaginatedResponse<
	'recommendedVideos',
	Video
> {}

interface GetSavedVideosResponse extends PaginatedResponse<
	'savedVideos',
	Video
> {}

interface GetHistoryVideosResponse extends PaginatedResponse<
	'historyVideos',
	Video
> {}

interface GetLikedVideosResponse extends PaginatedResponse<
	'likedVideos',
	Video
> {}

export interface GetChannelVideosResponse<T> extends PaginatedResponse<
	'channelVideos',
	T
> {}

export type VideoMetricType = 'like' | 'dislike' | 'view';

export interface GetVideoStatsParams {
	videoId: number;
	startDate: string;
	endDate: string;
	metricType: VideoMetricType;
}

export const getRecommendedVideos = async (
	params: GetRecommendedVideosParams,
) => {
	const response = await http.get<GetRecommendedVideosResponse>('videos', {
		params,
	});

	return response;
};

export const getSavedVideos = async (params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await http.get<GetSavedVideosResponse>(
		`/channels/${channelId}/watchLater`,
		{ params: paginationParams },
	);

	return response;
};

export const getLikedVideos = async (params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await http.get<GetLikedVideosResponse>(
		`/channels/${channelId}/liked`,
		{ params: paginationParams },
	);

	return response;
};

export const getVideoById = async (params: VideoActionParams) => {
	const { channelId, videoId } = params;

	const response = await http.get<Video>(
		`channels/${channelId}/videos/${videoId}`,
	);

	return response;
};

export const getHistoryVideos = async (params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await http.get<GetHistoryVideosResponse>(
		`/channels/${channelId}/history`,
		{ params: paginationParams },
	);

	return response;
};

export const getChannelVideos = async <T>(params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await http.get<GetChannelVideosResponse<T>>(
		`/channels/${channelId}/videos`,
		{
			params: paginationParams,
		},
	);

	return response;
};

export const getSubscriptionVideos = async (
	params: ChannelPaginationParams,
) => {
	const { channelId, ...paginationParams } = params;

	const response = await http.get(`/channels/${channelId}/subscribed`, {
		params: paginationParams,
	});

	return response;
};

export const likeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'like');
	const response = await http.post<Video>(url);

	return response;
};

export const unlikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'unlike');
	const response = await http.delete<Video>(url);

	return response;
};

export const dislikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'dislike');
	const response = await http.post<Video>(url);

	return response;
};

export const undislikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'undislike');
	const response = await http.delete<Video>(url);

	return response;
};

export const addVideoToWatchLater = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'watchLater');
	const response = await http.post<Video>(url);

	return response;
};

export const deleteVideoFromWatchLater = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'watchLater');
	const response = await http.delete<Video>(url);

	return response;
};

export const addVideoToHistory = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'history');
	const response = await api.post<Video>(url, params);

	return response.data;
};

export const toggleVisibility = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'visibility');
	const response = await http.patch<Video>(url);

	return response;
};

interface UploadVideoParams {
	channelId: number;
	video: FormData;
}

export const uploadVideo = async ({ channelId, video }: UploadVideoParams) => {
	const response = await http.post<Video>(
		`/channels/${channelId}/videos/upload`,
		video,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
	);

	return response;
};

export const getVideoLikesStats = async (params: GetVideoStatsParams) => {
	const { videoId, startDate, endDate } = params;

	const response = await http.get(`/videos/${videoId}/likes-stats`, {
		params: {
			startDate,
			endDate,
		},
	});

	return response;
};

export const getVideoDislikesStats = async (params: GetVideoStatsParams) => {
	const { videoId, startDate, endDate } = params;

	const response = await http.get(`/videos/${videoId}/dislikes-stats`, {
		params: {
			startDate,
			endDate,
		},
	});

	return response;
};

export const getVideoStats = async (params: GetVideoStatsParams) => {
	const { videoId, startDate, endDate, metricType } = params;

	const response = await http.get<StatsDataPoint[]>(
		`/videos/${videoId}/stats`,
		{
			params: { startDate, endDate, metricType },
		},
	);

	return response;
};

export const deleteVideo = async (videoId: number) => {
	const response = await http.delete<Video>(`/videos/${videoId}`);

	return response;
};
