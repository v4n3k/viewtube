'use client';

import clsx from 'clsx';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect, useRef } from 'react';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
	className?: string;
	src: string;
	previewUrl?: string;
	autoplay?: boolean;
	loop?: boolean;
	muted?: boolean;
}

export const VideoPlayer = ({
	src,
	previewUrl,
	className,
	autoplay = false,
	loop = false,
	muted = false,
}: VideoPlayerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const plyrInstance = useRef<Plyr | null>(null);

	useEffect(() => {
		let plyr: Plyr | null = null;

		const initializePlyr = () => {
			setTimeout(() => {
				if (!videoRef.current) return;

				plyr = new Plyr(videoRef.current, {
					controls: [
						'play-large',
						'play',
						'progress',
						'current-time',
						'duration',
						'mute',
						'volume',
						'pip',
						'fullscreen',
						'settings',
					],
					autoplay: autoplay,
					loop: { active: loop },
					muted: muted,
				});

				plyrInstance.current = plyr;
			}, 0);
		};

		initializePlyr();

		return () => {
			if (!plyrInstance.current) return;

			plyrInstance.current.destroy();
			plyrInstance.current = null;
		};
	}, [src, autoplay, loop, muted]);

	return (
		<div className={clsx(styles.videoPlayerWrapper, className)}>
			<video
				className={styles.video}
				ref={videoRef}
				poster={previewUrl}
				playsInline
			>
				<source src={src} type='video/mp4' />
			</video>
		</div>
	);
};
