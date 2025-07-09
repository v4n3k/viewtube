import { api, PaginatedResponse, PaginationParams } from '@/shared/api';
import { Video } from '../model';

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

export const getWatchLaterVideos = () => {
	return api.get<Video[]>('/videos/watch_later');
};

export const getVideoById = (videoId: number) => {
	return api.get<Video>(`/videos/${videoId}`);
};

export const likeVideo = (videoId: number) => {
	return api.post<Video>(`/videos/${videoId}/like`);
};

export const unlikeVideo = (videoId: number) => {
	return api.delete<void>(`/videos/${videoId}/like`);
};

export const dislikeVideo = (videoId: number) => {
	return api.post<Video>(`/videos/${videoId}/dislike`);
};

export const undislikeVideo = (videoId: number) => {
	return api.delete<void>(`/videos/${videoId}/dislike`);
};

export const addVideoToWatchLater = (videoId: number) => {
	return api.post<Video>(`/videos/${videoId}/watch_later`);
};

export const removeVideoFromWatchLater = (videoId: number) => {
	return api.delete<void>(`/videos/${videoId}/watch_later`);
};
