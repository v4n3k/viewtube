import { VideoPlayer } from '@/entities/video/ui';
import { CommentsList } from '@/features/getComments/ui';

export const WatchPage = () => {
	return (
		<>
			<VideoPlayer src='/video.mp4' />
			<CommentsList />
		</>
	);
};
