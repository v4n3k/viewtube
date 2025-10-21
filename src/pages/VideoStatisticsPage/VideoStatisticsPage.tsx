'use client';

import { useGetVideo } from '@/features/video/getVideo';
import { useGetVideoLikesStats } from '@/features/video/getVideoLikesStats';
import { useChartTimeRange } from '@/shared/lib/useChartTimeRange';
import { TimeRangeChart } from '@/shared/ui';
import { useParams } from 'next/navigation';

export const VideoStatisticsPage = () => {
	const videoId = Number(useParams()?.videoId);

	const { video, isLoading: isVideoLoading } = useGetVideo();

	const {
		selectedRange,
		setSelectedRange,
		startDate,
		endDate,
	} = useChartTimeRange(video?.createdAt);

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
