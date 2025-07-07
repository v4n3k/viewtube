import { create } from 'zustand';

interface CommentState {
	parentCommentId: number | null;
	setParentCommentId: (commentId: number | null) => void;
}

export const useCommentStore = create<CommentState>(set => ({
	parentCommentId: null,
	setParentCommentId: commentId => set({ parentCommentId: commentId }),
}));
