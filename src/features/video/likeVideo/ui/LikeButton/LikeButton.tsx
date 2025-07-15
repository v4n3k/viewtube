'use client';

import { Button, Show } from '@/shared/ui';
import { FillLikeIcon, LikeIcon } from '@/shared/ui/icons';
import { ComponentProps } from 'react';
import { useLikeVideo, useUnlikeVideo } from '../../model';

const ICON_SIZE = 20;

interface LikeButtonProps extends ComponentProps<'button'> {
	isLiked: boolean;
}

export const LikeButton = ({ isLiked, ...props }: LikeButtonProps) => {
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
		<Button fullWidth={false} onClick={toggleLike} {...props}>
			<Show when={isLiked}>
				<FillLikeIcon size={ICON_SIZE} />
			</Show>
			<Show when={!isLiked}>
				<LikeIcon size={ICON_SIZE} />
			</Show>
		</Button>
	);
};
