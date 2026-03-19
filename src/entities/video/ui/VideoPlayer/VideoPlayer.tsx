'use client';

import clsx from 'clsx';
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
	const isInitialized = useRef(false);

	useEffect(() => {
		let plyr: Plyr | null = null;
		let isMounted = true;

		const initializePlyr = async () => {
			if (!videoRef.current || isInitialized.current) return;

			const PlyrClass = (await import('plyr')).default;

			if (!isMounted || !videoRef.current) return;

			plyr = new PlyrClass(videoRef.current, {
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
				autoplay,
				loop: { active: loop },
				muted,
			});

			plyrInstance.current = plyr;
			isInitialized.current = true;

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
				if (isMounted) {
					video.removeEventListener('timeupdate', handleTimeUpdate);
				}
			};
		};

		initializePlyr();

		return () => {
			isMounted = false;
			if (plyrInstance.current) {
				plyrInstance.current.destroy();
				plyrInstance.current = null;
				isInitialized.current = false;
			}
		};
	}, []);

	useEffect(() => {
		if (plyrInstance.current && src) {
			plyrInstance.current.source = {
				type: 'video',
				sources: [{ src, type: 'video/mp4' }],
			};
		}
	}, [src]);

	useEffect(() => {
		if (videoRef.current && previewUrl) {
			videoRef.current.poster = previewUrl;
		}
	}, [previewUrl]);

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
