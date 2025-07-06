import { VideoPlayer } from '@/entities/video/ui';
import { CreateCommentForm } from '@/features/createComment/ui';
import { CommentsList } from '@/features/getComments/ui';
import styles from './WatchPage.module.css';

export const WatchPage = () => {
	return (
		<div className={styles.page}>
			<VideoPlayer src='/video.mp4' />
			<CreateCommentForm />
			<CommentsList />
		</div>
	);
};
