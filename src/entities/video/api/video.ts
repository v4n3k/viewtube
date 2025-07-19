import { api, PaginatedResponse, PaginationParams } from '@/shared/api';
import { getVideoActionPath } from './../lib';
import { Video, VideoActionParams } from './../model';

interface GetRecommendedVideosParams extends PaginationParams {}

interface GetRecommendedVideosResponse
	extends PaginatedResponse<'recommendedVideos', Video> {}

export const getRecommendedVideos = async (
	params: GetRecommendedVideosParams
) => {
	const response = await api.get<GetRecommendedVideosResponse>('/videos', {
		params,
	});

	return response.data;
};

export const getWatchLaterVideos = async (channelId: number) => {
	const response = await api.get<Video[]>(
		`/channels/${channelId}/videos/watchLater`
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

export const likeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'like');
	const response = await api.post<Video>(url);

	return response.data;
};

export const unlikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'unlike');
	const response = await api.delete<void>(url);

	return response.data;
};

export const dislikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'dislike');
	const response = await api.post<Video>(url);

	return response.data;
};

export const undislikeVideo = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'undislike');
	const response = await api.delete<void>(url);

	return response.data;
};

export const addVideoToWatchLater = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'watchLater');
	const response = await api.post<Video>(url);

	return response.data;
};

export const deleteVideoFromWatchLater = async (params: VideoActionParams) => {
	const url = getVideoActionPath(params, 'watchLater');
	const response = await api.delete<void>(url);

	return response.data;
};
