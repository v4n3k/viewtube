import { api, PaginatedResponse, PaginationParams } from '@/shared/api';
import { getVideoActionPath } from '../lib';
import { Video, VideoActionParams } from '../model';

interface ChannelPaginationParams extends PaginationParams {
	channelId: number;
}

interface GetRecommendedVideosParams extends PaginationParams {}

interface GetRecommendedVideosResponse
	extends PaginatedResponse<'recommendedVideos', Video> {}
interface GetSavedVideosResponse
	extends PaginatedResponse<'savedVideos', Video> {}

interface GetHistoryVideosResponse
	extends PaginatedResponse<'historyVideos', Video> {}

interface GetLikedVideosResponse
	extends PaginatedResponse<'likedVideos', Video> {}

interface GetChannelVideosResponse<T>
	extends PaginatedResponse<'channelVideos', T> {}

export const getRecommendedVideos = async (
	params: GetRecommendedVideosParams
) => {
	const response = await api.get<GetRecommendedVideosResponse>('/videos', {
		params,
	});

	return response.data;
};

export const getSavedVideos = async (params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await api.get<GetSavedVideosResponse>(
		`/channels/${channelId}/watchLater`,
		{ params: paginationParams }
	);

	return response.data;
};

export const getLikedVideos = async (params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await api.get<GetLikedVideosResponse>(
		`/channels/${channelId}/liked`,
		{ params: paginationParams }
	);

	return response.data;
};

export const getVideoById = async (params: VideoActionParams) => {
	const { channelId, videoId } = params;

	const response = await api.get<Video>(
		`channels/${channelId}/videos/${videoId}`
	);

	return response.data;
};

export const getHistoryVideos = async (params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await api.get<GetHistoryVideosResponse>(
		`/channels/${channelId}/history`,
		{ params: paginationParams }
	);

	return response.data;
};

export const getChannelVideos = async <T>(params: ChannelPaginationParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await api.get<GetChannelVideosResponse<T>>(
		`/channels/${channelId}/videos`,
		{
			params: paginationParams,
		}
	);

	return response.data;
};

export const getSubscriptionVideos = async (
	params: ChannelPaginationParams
) => {
	const { channelId, ...paginationParams } = params;

	const response = await api.get(`/channels/${channelId}/subscribed`, {
		params: paginationParams,
	});

	return response.data;
};

export const likeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'like');
	const response = await api.post<Video>(url);

	return response.data;
};

export const unlikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'unlike');
	const response = await api.delete<Video>(url);

	return response.data;
};

export const dislikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'dislike');
	const response = await api.post<Video>(url);

	return response.data;
};

export const undislikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'undislike');
	const response = await api.delete<Video>(url);

	return response.data;
};

export const addVideoToWatchLater = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'watchLater');
	const response = await api.post<Video>(url);

	return response.data;
};

export const deleteVideoFromWatchLater = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'watchLater');
	const response = await api.delete<Video>(url);

	return response.data;
};

export const addVideoToHistory = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'history');
	const response = await api.post<Video>(url, params);

	return response.data;
};

interface UploadVideoParams {
	channelId: number;
	video: FormData;
}

export const uploadVideo = async ({ channelId, video }: UploadVideoParams) => {
	const response = await api.post<Video>(
		`/channels/${channelId}/videos/upload`,
		video,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);

	return response.data;
};
