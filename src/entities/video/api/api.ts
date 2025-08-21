import { api, PaginatedResponse, PaginationParams } from '@/shared/api';
import { getVideoActionPath } from '../lib';
import { Video, VideoActionParams, VideoWithoutChannel } from '../model';

interface GetRecommendedVideosParams extends PaginationParams {}

interface GetRecommendedVideosResponse
	extends PaginatedResponse<'recommendedVideos', Video> {}

interface GetSavedVideosParams extends PaginationParams {
	channelId: number;
}

interface GetSavedVideosResponse
	extends PaginatedResponse<'savedVideos', Video> {}

interface GetLikedVideosParams extends PaginationParams {
	channelId: number;
}

interface getHistoryVideosParams extends PaginationParams {
	channelId: number;
}

interface GetHistoryVideosResponse
	extends PaginatedResponse<'historyVideos', Video> {}

interface GetLikedVideosResponse
	extends PaginatedResponse<'likedVideos', Video> {}

export const getRecommendedVideos = async (
	params: GetRecommendedVideosParams
) => {
	const response = await api.get<GetRecommendedVideosResponse>('/videos', {
		params,
	});

	return response.data;
};

export const getSavedVideos = async (params: GetSavedVideosParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await api.get<GetSavedVideosResponse>(
		`/channels/${channelId}/watchLater`,
		{ params: paginationParams }
	);

	return response.data;
};

export const getLikedVideos = async (params: GetLikedVideosParams) => {
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

export const getVideosByChannelId = async (channelId: number) => {
	const response = await api.get<VideoWithoutChannel[]>(
		`channels/${channelId}/videos`
	);

	return response.data;
};

export const getHistoryVideos = async (params: getHistoryVideosParams) => {
	const { channelId, ...paginationParams } = params;

	const response = await api.get<GetHistoryVideosResponse>(
		`/channels/${channelId}/history`,
		{ params: paginationParams }
	);

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
