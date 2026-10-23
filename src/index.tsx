import { render } from '@solidjs/web';
import { Router } from './router';
import { Shell } from './layout';
import './app.css';

const root = document.getElementById('app');
if (root) {
	render(
		() => (
			<Router>
				{(props) => <Shell>{props.children}</Shell>}
			</Router>
		),
		root
	);
}
