import { lazy } from 'solid-js';
import { createRouter } from '@solidjs/router';
import About from './pages/About';

export const Router = createRouter({
	routes: [
		{ path: '/', component: About },
		{ path: '/skills', component: lazy(() => import('./pages/Skills')) },
		{ path: '/projects', component: lazy(() => import('./pages/Projects')) },
		{ path: '/contact', component: lazy(() => import('./pages/Contact')) },
		{ path: '/about', component: lazy(() => import('./pages/RedirectHome')) },
		{ path: '/experience', component: lazy(() => import('./pages/RedirectHome')) }
	]
});
