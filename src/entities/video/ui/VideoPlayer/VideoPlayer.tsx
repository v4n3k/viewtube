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
		console.log('VideoPlayer useEffect triggered', {
			src,
			autoplay,
			loop,
			muted,
		}); // Debug

		if (!src) {
			console.warn('Video src is missing!');
			return; // Don't initialize if src is missing
		}

		let plyr: Plyr | null = null; // Local variable

		const initializePlyr = () => {
			if (videoRef.current) {
				console.log('Initializing Plyr...'); // Debug
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
				plyrInstance.current = plyr; // Update the ref
			} else {
				console.warn('videoRef.current is null. Plyr initialization failed.');
			}
		};

		// Initialize Plyr after the component is mounted.
		initializePlyr();

		return () => {
			console.log('Destroying Plyr...'); // Debug
			if (plyrInstance.current) {
				plyrInstance.current.destroy();
				plyrInstance.current = null;
			}
		};
	}, [src, autoplay, loop, muted]);

	return (
		<div className={clsx(styles.videoPlayerWrapper, className)}>
			<video
				ref={videoRef}
				poster={previewUrl}
				playsInline
				className={styles.video}
			>
				<source src={src} type='video/mp4' />
				{/* Add other source elements for different formats if needed */}
				Your browser does not support the video tag.
			</video>
		</div>
	);
};
