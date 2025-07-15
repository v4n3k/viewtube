'use client';

import { Button, Show } from '@/shared/ui';
import { DislikeIcon, FillDislikeIcon } from '@/shared/ui/icons';
import { ComponentProps } from 'react';
import { useDislikeVideo, useUndislikeVideo } from '../../model';

const ICON_SIZE = 20;

interface DislikeButtonProps extends ComponentProps<'button'> {
	isDisliked: boolean;
}

export const DislikeButton = ({ isDisliked, ...props }: DislikeButtonProps) => {
	const { dislikeVideo } = useDislikeVideo();
	const { undislikeVideo } = useUndislikeVideo();

	const toggleDislike = () => {
		if (isDisliked) {
			undislikeVideo();
		} else {
			dislikeVideo();
		}
	};

	return (
		<Button fullWidth={false} onClick={toggleDislike} {...props}>
			<Show when={isDisliked}>
				<FillDislikeIcon size={ICON_SIZE} />
			</Show>
			<Show when={!isDisliked}>
				<DislikeIcon size={ICON_SIZE} />
			</Show>
		</Button>
	);
};
