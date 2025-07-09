'use client';

import { createComment } from '@/entities/comment/api';
import { useCommentStore } from '@/entities/comment/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const channelId = 1;

export const useCreateComment = () => {
	const [text, setText] = useState('');

	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);
	const expandedCommentId = useCommentStore(state => state.parentCommentId);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () =>
			createComment({
				channelId,
				videoId,
				parentCommentId: expandedCommentId,
				text,
			}),

		onSuccess: () => {
			setText('');
			queryClient.invalidateQueries({ queryKey: ['comments'] });
		},
	});

	return {
		createComment: () => mutation.mutate(),
		...mutation,
		text,
		setText,
	};
};
