import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChartBar, faEnvelope, faSitemap, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from '@solidjs/router';
import type { JSX } from '@solidjs/web';
import { createEffect, createSignal, For, onSettled, Show } from 'solid-js';
import { Icon } from './icons';

const navigation: { name: string; href: string; tone: string; icon: IconDefinition }[] = [
	{ name: 'About', href: '/', tone: 'scarlet', icon: faUser },
	{ name: 'Skills', href: '/skills', tone: 'green', icon: faChartBar },
	{ name: 'Projects', href: '/projects', tone: 'blue', icon: faSitemap },
	{ name: 'Contact', href: '/contact', tone: 'muted', icon: faEnvelope }
];

export function Shell(props: { children: JSX.Element }) {
	const location = useLocation();
	const [crayons, setCrayons] = createSignal(false);
	const [park, setPark] = createSignal(false);
	const [devNote, setDevNote] = createSignal('');
	const [devOn, setDevOn] = createSignal(false);
	const [devSettings, setDevSettings] = createSignal(false);
	let typed = '';
	let skillTaps = 0;
	let skillTimer: ReturnType<typeof setTimeout> | undefined;

	onSettled(() => {
		setCrayons(sessionStorage.getItem('crayons') === '1');
		const onKey = (event: KeyboardEvent) => {
			const target = event.target;
			if (target instanceof HTMLElement && target.closest('input, textarea, [contenteditable="true"]')) return;
			if (event.key === 'Escape') {
				setPark(false);
				setDevSettings(false);
				setDevNote('');
				return;
			}
			if (event.key.length !== 1) return;

			typed = (typed + event.key.toLowerCase()).slice(-32);
			const compact = typed.replace(/[\s,./-]/g, '');

			if (compact.endsWith('11101775')) {
				const next = !crayons();
				setCrayons(next);
				sessionStorage.setItem('crayons', next ? '1' : '0');
				typed = '';
			}

			if (typed.endsWith('please')) {
				setPark(true);
				typed = '';
			}
		};
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			clearTimeout(skillTimer);
		};
	});

	createEffect(
		() => crayons(),
		(on) => {
			document.documentElement.classList.toggle('crayons', on);
		}
	);

	function onNavClick(href: string) {
		if (href !== '/skills') {
			skillTaps = 0;
			setDevNote('');
			clearTimeout(skillTimer);
			return;
		}

		clearTimeout(skillTimer);
		skillTaps += 1;
		skillTimer = setTimeout(() => {
			skillTaps = 0;
			setDevNote('');
		}, 8000);

		if (skillTaps < 4) return;

		if (skillTaps < 7) {
			const left = 7 - skillTaps;
			setDevNote(`You are now ${left} ${left === 1 ? 'step' : 'steps'} away from being a developer.`);
			return;
		}

		skillTaps = 0;
		clearTimeout(skillTimer);
		if (devOn()) {
			setDevNote('No need, you are already a developer.');
			return;
		}

		setDevOn(true);
		setDevNote('');
		setDevSettings(true);
	}

	return (
		<div class="shell">
			<aside>
				<a class="brand" href="/">
					blalan.DEV
				</a>
				<div class="identity">
					<img src="/img/profile.jpg" alt="Blaine Landowski Profile Avatar" />
					<div class="name">Blaine Landowski</div>
					<div class="role">Software Engineer</div>
					<a class="company" href="https://foundtechsolutions.com">
						CEO, Foundational Technologies
					</a>
				</div>
				<nav>
					<For each={navigation}>
						{(item) => (
							<a
								class={{ [item.tone]: true, active: location.pathname === item.href }}
								href={item.href}
								onClick={() => onNavClick(item.href)}
							>
								<Icon icon={item.icon} />
								<span>{item.name}</span>
							</a>
						)}
					</For>
				</nav>
			</aside>
			<main>{props.children}</main>
			<Show when={crayons()}>
				<button
					class="crayon-tag"
					type="button"
					onClick={() => {
						setCrayons(false);
						sessionStorage.setItem('crayons', '0');
					}}
				>
					Crayons
				</button>
			</Show>
			<Show when={park()}>
				<button class="park" type="button" onClick={() => setPark(false)}>
					<span>Ah ah ah</span>
					<strong>You didn't say the magic word!</strong>
				</button>
			</Show>
			<Show when={devNote()}>
				<p class="dev-toast" role="status">
					{devNote()}
				</p>
			</Show>
			<Show when={devSettings()}>
				<button class="dev-pop" type="button" onClick={() => setDevSettings(false)}>
					<strong>You've now turned on developer settings.</strong>
					<span>There aren't any.</span>
				</button>
			</Show>
		</div>
	);
}
