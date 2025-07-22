'use client';

import { Button, Show } from '@/shared/ui';
import { BookmarkIcon, FillBookmarkIcon } from '@/shared/ui/icons';
import { ComponentProps } from 'react';
import { useSaveVideo, useUnsaveVideo } from '../../model';
import styles from './SaveButton.module.css';

interface SaveButtonProps extends ComponentProps<'button'> {
	isSaved: boolean;
}

const ICON_SIZE = 20;

export const SaveButton = ({ isSaved, ...props }: SaveButtonProps) => {
	const { saveVideo } = useSaveVideo();
	const { unsaveVideo } = useUnsaveVideo();

	const toggleSaveVideo = () => {
		if (isSaved) {
			unsaveVideo();
		} else {
			saveVideo();
		}
	};

	return (
		<Button className={styles.saveButton} onClick={toggleSaveVideo} {...props}>
			<Show when={isSaved}>
				<FillBookmarkIcon size={ICON_SIZE} /> Saved
			</Show>
			<Show when={!isSaved}>
				<BookmarkIcon size={ICON_SIZE} /> Save
			</Show>
		</Button>
	);
};
