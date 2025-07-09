'use client';

import { Button, Show } from '@/shared/ui';
import { FillLikeIcon, LikeIcon } from '@/shared/ui/icons';
import { useUnlikeVideo } from '../../model';
import { useLikeVideo } from '../../model/useLikeVideo';

const ICON_SIZE = 20;

interface LikeButtonProps {
	isLiked: boolean;
}

export const LikeButton = ({ isLiked }: LikeButtonProps) => {
	const { likeVideo } = useLikeVideo();
	const { unlikeVideo } = useUnlikeVideo();

	const toggleLike = () => {
		if (isLiked) {
			unlikeVideo();
		} else {
			likeVideo();
		}
	};

	return (
		<Button fullWidth={false} onClick={toggleLike}>
			<Show when={isLiked}>
				<FillLikeIcon size={ICON_SIZE} />
			</Show>
			<Show when={!isLiked}>
				<LikeIcon size={ICON_SIZE} />
			</Show>
		</Button>
	);
};
