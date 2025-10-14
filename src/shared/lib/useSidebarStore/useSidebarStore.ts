import { create } from 'zustand';

export type UseSidebarStore = {
	isSidebarExpanded: boolean;
	toggleSidebar: () => void;
};

export const useSidebarStore = create<UseSidebarStore>(set => ({
	isSidebarExpanded: true,
	toggleSidebar: () =>
		set(state => ({
			isSidebarExpanded: !state.isSidebarExpanded,
		})),
}));
