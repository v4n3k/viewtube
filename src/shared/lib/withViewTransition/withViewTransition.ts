/*
	A higher-order function that wraps a callback in View Transitions API.
	Use it when updating external state (e.g., Zustand) that affects UI outside
	the <ViewTransition> subtree.
	Avoids the need for React's <ViewTransition> component
	or startTransition in such cases.
	Falls back to direct execution in unsupported browsers.
*/

export const withViewTransition = (callback: () => void) => {
	if (typeof document !== 'undefined' && document.startViewTransition) {
		document.startViewTransition(callback);
	} else {
		callback();
	}
};
