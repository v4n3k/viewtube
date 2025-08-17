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
	onWatch?: () => void;
}

export const VideoPlayer = ({
	src,
	previewUrl,
	className,
	autoplay = false,
	loop = false,
	muted = false,
	onWatch,
}: VideoPlayerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const plyrInstance = useRef<Plyr | null>(null);
	const hasWatched = useRef(false);

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

				const video = videoRef.current;

				const handleTimeUpdate = () => {
					if (hasWatched.current || !video || !onWatch) return;

					const { currentTime, duration } = video;

					if (!duration || duration === Infinity) return;

					const fiveSecondsWatched = currentTime >= 5;
					const twentyPercentWatched = currentTime >= duration * 0.2;

					if (fiveSecondsWatched || twentyPercentWatched) {
						hasWatched.current = true;
						onWatch();
					}
				};

				video.addEventListener('timeupdate', handleTimeUpdate);

				return () => {
					video.removeEventListener('timeupdate', handleTimeUpdate);
				};
			}, 0);
		};

		initializePlyr();

		return () => {
			if (plyrInstance.current) {
				plyrInstance.current.destroy();
				plyrInstance.current = null;
			}
		};
	}, [src, autoplay, loop, muted, onWatch]);

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
