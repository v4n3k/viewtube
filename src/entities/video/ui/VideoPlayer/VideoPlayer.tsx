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
	onWatch?: (videoSrc: string) => void;
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
	const hasWatchedMilestoneRef = useRef(false);

	useEffect(() => {
		let plyr: Plyr | null = null;
		let handleTimeUpdate: (() => void) | null = null;
		let handlePlay: (() => void) | null = null;

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

				if (onWatch) {
					handleTimeUpdate = () => {
						if (!plyrInstance.current || hasWatchedMilestoneRef.current) {
							return;
						}

						const currentTime = plyrInstance.current.currentTime;
						const duration = plyrInstance.current.duration;

						const isDurationValid =
							!isNaN(duration) && isFinite(duration) && duration > 0;

						const watchedEnoughTime = currentTime >= 5;
						const watchedEnoughPercentage =
							isDurationValid && currentTime / duration >= 0.2;

						if (watchedEnoughTime || watchedEnoughPercentage) {
							onWatch(src);
							hasWatchedMilestoneRef.current = true;
						}
					};
					plyr.on('timeupdate', handleTimeUpdate);

					handlePlay = () => {
						hasWatchedMilestoneRef.current = false;
					};
					plyr.on('play', handlePlay);
				}
			}, 0);
		};

		initializePlyr();

		return () => {
			if (!plyrInstance.current) return;

			if (handleTimeUpdate) {
				plyrInstance.current.off('timeupdate', handleTimeUpdate);
			}

			if (handlePlay) {
				plyrInstance.current.off('play', handlePlay);
			}

			plyrInstance.current.destroy();
			plyrInstance.current = null;
			hasWatchedMilestoneRef.current = false;
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
