import { VideoAction, VideoActionParams } from '../model';

export const getVideoActionPath = (
	params: VideoActionParams,
	action: VideoAction
): string => {
	const { channelId, videoId } = params;

	return `/channels/${channelId}/videos/${videoId}/${action}`;
};
