import { useNavigate } from '@solidjs/router';
import { onSettled } from 'solid-js';

export default function RedirectHome() {
	const navigate = useNavigate();
	onSettled(() => {
		navigate('/', { replace: true });
	});
	return null;
}
