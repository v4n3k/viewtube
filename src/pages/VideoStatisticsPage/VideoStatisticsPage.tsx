'use client';

import { useGetVideo } from '@/features/video/getVideo';
import { useGetVideoLikesStats } from '@/features/video/getVideoLikesStats';
import { TimeRangeChart } from '@/shared/ui';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type TimeRange = '24h' | '7d' | '30d' | '90d' | 'All time';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getInitialRange = (ageInDays: number): TimeRange => {
	if (ageInDays >= 90) return '90d';
	if (ageInDays >= 30) return '30d';
	if (ageInDays >= 7) return '7d';
	return '24h';
};

export const VideoStatisticsPage = () => {
	const [selectedRange, setSelectedRange] = useState<TimeRange>('24h');
	const videoId = Number(useParams()?.videoId);
	const hasAutoSelectedRange = useRef(false);

	const { video, isLoading: isVideoLoading } = useGetVideo();

	useEffect(() => {
		if (!hasAutoSelectedRange.current && video?.createdAt) {
			const age = Math.max(
				0,
				Math.ceil((Date.now() - video.createdAt.getTime()) / MS_PER_DAY)
			);

			setSelectedRange(getInitialRange(age));
			hasAutoSelectedRange.current = true;
		}
	}, [video?.createdAt]);

	const videoCreatedAtIso = video?.createdAt?.toISOString();

	const { startDate, endDate } = useMemo(() => {
		const now = new Date();
		const nowIso = now.toISOString();

		if (selectedRange === 'All time') {
			return {
				startDate: videoCreatedAtIso || nowIso,
				endDate: nowIso,
			};
		}

		let start: Date;

		switch (selectedRange) {
			case '24h':
				start = new Date(now.getTime() - MS_PER_DAY);
				break;
			case '7d':
				start = new Date(now.getTime() - 7 * MS_PER_DAY);
				break;
			case '30d':
				start = new Date(now.getTime() - 30 * MS_PER_DAY);
				break;
			case '90d':
				start = new Date(now.getTime() - 90 * MS_PER_DAY);
				break;
			default:
				start = new Date(now.getTime() - 30 * MS_PER_DAY);
		}

		return {
			startDate: start.toISOString(),
			endDate: nowIso,
		};
	}, [selectedRange, videoCreatedAtIso]);

	const { likesStats, isLoading: isStatsLoading } = useGetVideoLikesStats({
		videoId,
		startDate,
		endDate,
	});

	if (isVideoLoading || isStatsLoading) {
		return <div>Loading statistics...</div>;
	}

	if (!video || !video.createdAt) {
		return <div>Video not found.</div>;
	}

	return (
		<TimeRangeChart
			title='Likes'
			historicalData={likesStats}
			minDate={video?.createdAt.toISOString()}
			selectedRange={selectedRange}
			onRangeChange={setSelectedRange}
		/>
	);
};
