import { useLocation } from '@solidjs/router';
import { createEffect } from 'solid-js';

type PageViewEvent = {
	event: 'page_view';
	page_path: string;
	page_location: string;
	page_title: string;
};

declare global {
	interface Window {
		dataLayer?: Array<Record<string, unknown> | PageViewEvent>;
	}
}

export function PageView() {
	const location = useLocation();

	createEffect(
		() => `${location.pathname}${location.search}${location.hash}`,
		(page_path) => {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: 'page_view',
				page_path,
				page_location: window.location.href,
				page_title: document.title
			});
		},
		{ defer: true }
	);

	return null;
}
