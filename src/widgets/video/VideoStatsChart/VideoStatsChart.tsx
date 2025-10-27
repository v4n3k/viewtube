'use client';

import { VideoMetricType } from '@/entities/video/api';
import { useGetVideo } from '@/features/video/getVideo/';
import { useGetVideoStats } from '@/features/video/getVideoStats';
import { useChartTimeRange } from '@/shared/lib/useChartTimeRange';
import { TimeRangeChart } from '@/shared/ui';

interface VideoStatsChartProps {
	metricType: VideoMetricType;
}

const TITLES: Record<VideoMetricType, string> = {
	like: 'Likes',
	dislike: 'Dislikes',
	view: 'Views',
};

export const VideoStatsChart = ({ metricType }: VideoStatsChartProps) => {
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
		metricType,
	});

	if (isVideoLoading || isStatsLoading) {
		return <div>Loading {TITLES[metricType]}...</div>;
	}

	if (!video || !video.createdAt) {
		return <div>Video not found.</div>;
	}

	if (!stats) {
		return <div>Statistics not found.</div>;
	}

	return (
		<TimeRangeChart
			title={TITLES[metricType]}
			historicalData={stats}
			minDate={video.createdAt.toISOString()}
			selectedRange={selectedRange}
			onRangeChange={setSelectedRange}
			metricType={metricType}
		/>
	);
};
