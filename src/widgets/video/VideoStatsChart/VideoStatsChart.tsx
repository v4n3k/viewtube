'use client';

import { VideoStatsType } from '@/entities/video/api';
import { useGetVideo } from '@/features/video/getVideo/';
import { useGetVideoStats } from '@/features/video/getVideoStats';
import { useChartTimeRange } from '@/shared/lib/useChartTimeRange';
import { TimeRangeChart } from '@/shared/ui';

interface VideoStatsChartProps {
	type: VideoStatsType;
}

const TITLES: Record<VideoStatsType, string> = {
	like: 'Likes',
	dislike: 'Dislikes',
	view: 'Views',
};

export const VideoStatsChart = ({ type }: VideoStatsChartProps) => {
	const { video, isLoading: isVideoLoading } = useGetVideo();

	const {
		startDate,
		endDate,
		selectedRange,
		setSelectedRange,
	} = useChartTimeRange(video?.createdAt);

	const { data: stats, isLoading: isStatsLoading } = useGetVideoStats({
		startDate,
		endDate,
		type,
	});

	if (isVideoLoading || isStatsLoading) {
		return <div>Loading {TITLES[type]}...</div>;
	}

	if (!video || !video.createdAt) {
		return <div>Video not found.</div>;
	}

	if (!stats) {
		return <div>Statistics not found.</div>;
	}

	return (
		<TimeRangeChart
			title={TITLES[type]}
			historicalData={stats}
			minDate={video.createdAt.toISOString()}
			selectedRange={selectedRange}
			onRangeChange={setSelectedRange}
		/>
	);
};
