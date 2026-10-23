<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Fa from 'svelte-fa';
	import {
		faChartBar,
		faEnvelope,
		faSitemap,
		faUser
	} from '@fortawesome/free-solid-svg-icons';

	let { children } = $props();

	const navigation = [
		{ name: 'About', href: '/', tone: 'scarlet', icon: faUser },
		{ name: 'Skills', href: '/skills', tone: 'green', icon: faChartBar },
		{ name: 'Projects', href: '/projects', tone: 'blue', icon: faSitemap },
		{ name: 'Contact', href: '/contact', tone: 'muted', icon: faEnvelope }
	];

	const current = $derived(page.url.pathname);

	let typed = '';
	let crayons = $state(false);
	let park = $state(false);
	let skillTaps = 0;
	let skillTimer: ReturnType<typeof setTimeout> | undefined;
	let devNote = $state('');
	let devOn = $state(false);
	let devSettings = $state(false);

	$effect(() => {
		if (!browser) return;
		crayons = sessionStorage.getItem('crayons') === '1';
	});

	$effect(() => {
		if (!browser) return;
		document.documentElement.classList.toggle('crayons', crayons);
	});

	function onKey(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		if (target instanceof HTMLElement && target.closest('input, textarea, [contenteditable="true"]')) return;
		if (event.key === 'Escape') {
			park = false;
			devSettings = false;
			devNote = '';
			return;
		}
		if (event.key.length !== 1) return;

		typed = (typed + event.key.toLowerCase()).slice(-32);
		const compact = typed.replace(/[\s,./-]/g, '');

		if (compact.endsWith('11101775')) {
			crayons = !crayons;
			sessionStorage.setItem('crayons', crayons ? '1' : '0');
			document.documentElement.classList.toggle('crayons', crayons);
			typed = '';
		}

		if (typed.endsWith('please')) {
			park = true;
			typed = '';
		}
	}

	function onNavClick(href: string) {
		if (href !== '/skills') {
			skillTaps = 0;
			devNote = '';
			clearTimeout(skillTimer);
			return;
		}

		clearTimeout(skillTimer);
		skillTaps += 1;
		skillTimer = setTimeout(() => {
			skillTaps = 0;
			devNote = '';
		}, 8000);

		if (skillTaps < 4) return;

		if (skillTaps < 7) {
			const left = 7 - skillTaps;
			devNote = `You are now ${left} ${left === 1 ? 'step' : 'steps'} away from being a developer.`;
			return;
		}

		skillTaps = 0;
		clearTimeout(skillTimer);
		if (devOn) {
			devNote = 'No need, you are already a developer.';
			return;
		}

		devOn = true;
		devNote = '';
		devSettings = true;
	}
</script>

<svelte:window onkeydown={onKey} />

<svelte:head>
	<title>Welcome | Blalan's Personal Site</title>
</svelte:head>

<div class="shell">
	<aside>
		<a class="brand" href="/">blalan.DEV</a>
		<div class="identity">
			<img src="/img/profile.jpg" alt="Blaine Landowski Profile Avatar" />
			<div class="name">Blaine Landowski</div>
			<div class="role">Software Engineer</div>
			<a class="company" href="https://foundtechsolutions.com">CEO, Foundational Technologies</a>
		</div>
		<nav>
			{#each navigation as item (item.href)}
				<a class="{item.tone}" class:active={current === item.href} href={item.href} onclick={() => onNavClick(item.href)}>
					<Fa icon={item.icon} size="2x" />
					<span>{item.name}</span>
				</a>
			{/each}
		</nav>
	</aside>
	<main>
		{@render children()}
	</main>
</div>

{#if crayons}
	<button class="crayon-tag" type="button" onclick={() => { crayons = false; sessionStorage.setItem('crayons', '0'); document.documentElement.classList.remove('crayons'); }}>
		Crayons
	</button>
{/if}

{#if park}
	<button class="park" type="button" onclick={() => (park = false)}>
		<span>Ah ah ah</span>
		<strong>You didn't say the magic word!</strong>
	</button>
{/if}

{#if devNote}
	<p class="dev-toast" role="status">{devNote}</p>
{/if}

{#if devSettings}
	<button class="dev-pop" type="button" onclick={() => (devSettings = false)}>
		<strong>You've now turned on developer settings.</strong>
		<span>There aren't any.</span>
	</button>
{/if}

<style>
	:global(:root) {
		--bg: #101418;
		--bg-raised: #1a2230;
		--text: #e8e6e3;
		--muted: #b0b0b0;
		--green: #81c784;
		--scarlet: #ff6b6b;
		--scarlet-strong: #c8102e;
		--gold: #ffc72c;
		--blue: #4da3ff;
		--line: #2a3344;
	}

	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--text);
		font-family: Roboto, sans-serif;
	}

	.shell {
		display: flex;
		height: 100vh;
		overflow: hidden;
		background: var(--bg);
	}

	aside {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		width: 320px;
		height: 100vh;
		flex: none;
		background: var(--bg-raised);
		color: var(--text);
		border-right: 1px solid var(--line);
		overflow: auto;
	}

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 64px;
		padding: 0 16px;
		color: var(--text);
		font-size: 1.25rem;
		text-decoration: none;
	}

	.identity {
		padding: 16px 16px 24px;
		text-align: center;
	}

	.identity img {
		width: 160px;
		height: 160px;
		margin-bottom: 12px;
		border-radius: 50%;
		object-fit: cover;
	}

	.name {
		font-size: 20px;
		font-weight: 500;
		line-height: 1.2;
	}

	.role {
		margin-top: 4px;
		color: var(--muted);
		font-size: 14px;
	}

	.company {
		display: block;
		margin-top: 2px;
		color: var(--gold);
		font-size: 13px;
		text-decoration: none;
	}

	.company:hover {
		text-decoration: underline;
	}

	nav {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 10px;
		padding: 8px 28px 32px;
	}

	nav a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		height: 96px;
		border-radius: 12px;
		background: var(--bg);
		color: var(--text);
		font-size: 14px;
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
	}

	nav a :global(svg) {
		width: 1.1em;
		height: 1.1em;
	}

	nav a.green :global(svg) {
		color: var(--green);
	}

	nav a.gold :global(svg) {
		color: var(--gold);
	}

	nav a.blue :global(svg) {
		color: var(--blue);
	}

	nav a.scarlet :global(svg) {
		color: var(--scarlet);
	}

	nav a.muted :global(svg) {
		color: var(--muted);
	}

	nav span {
		text-align: center;
	}

	nav a.active {
		background: color-mix(in srgb, var(--scarlet-strong) 28%, var(--bg));
		color: var(--gold);
	}

	nav a:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	nav a.active:hover {
		background: color-mix(in srgb, var(--scarlet-strong) 40%, var(--bg));
	}

	main {
		flex: 1;
		min-width: 0;
		min-height: 0;
		overflow: auto;
	}

	@media (max-width: 800px) {
		.shell {
			flex-direction: column;
		}

		aside {
			position: static;
			width: 100%;
			height: auto;
		}

		nav {
			flex-direction: row;
			justify-content: center;
		}

		nav a {
			flex: 1;
			height: 88px;
			gap: 6px;
			font-size: 11px;
		}

		nav a :global(svg) {
			width: 1.1em;
			height: 1.1em;
		}
	}

	@media (max-width: 600px) {
		.brand {
			height: 48px;
			font-size: 1.1rem;
		}

		.identity {
			display: grid;
			grid-template-columns: 80px 1fr;
			column-gap: 12px;
			align-items: center;
			padding: 4px 16px 12px;
			text-align: left;
		}

		.identity img {
			grid-row: 1 / span 3;
			width: 80px;
			height: 80px;
			margin: 0;
		}

		.name {
			font-size: 16px;
		}

		nav {
			gap: 8px;
			padding: 4px 12px 12px;
		}

		nav a {
			height: 68px;
			gap: 4px;
			font-size: 10px;
			letter-spacing: 0.04em;
		}
	}

	@media (max-height: 520px) {
		.shell {
			flex-direction: column;
		}

		aside {
			position: static;
			flex-direction: row;
			align-items: center;
			width: 100%;
			height: auto;
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.brand {
			width: auto;
			height: auto;
			padding: 0 12px;
			font-size: 1rem;
		}

		.identity {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 8px 8px 8px 0;
			text-align: left;
		}

		.identity img {
			width: 36px;
			height: 36px;
			margin: 0;
		}

		.role,
		.company {
			display: none;
		}

		.name {
			font-size: 14px;
		}

		nav {
			flex: 1;
			flex-direction: row;
			gap: 6px;
			padding: 8px 8px 8px 0;
		}

		nav a {
			flex: 1;
			height: 52px;
			gap: 2px;
			font-size: 10px;
			letter-spacing: 0.04em;
		}
	}

	:global(html.crayons) {
		--bg: #fff8dc;
		--bg-raised: #ffe14a;
		--text: #1a1a1a;
		--muted: #7a4e00;
		--green: #1f9d55;
		--scarlet: #ee204d;
		--scarlet-strong: #ed0a3f;
		--gold: #1f75fe;
		--blue: #1f75fe;
		--line: #f4a300;
	}

	.crayon-tag {
		position: fixed;
		right: 16px;
		bottom: 16px;
		z-index: 20;
		padding: 8px 12px;
		border: 3px solid #1a1a1a;
		border-radius: 999px;
		background: #ee204d;
		color: #fffef6;
		font: inherit;
		font-weight: 500;
		cursor: pointer;
	}

	.park {
		position: fixed;
		inset: 0;
		z-index: 30;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		border: 0;
		background: #000;
		color: #d6ff5c;
		font-family: 'Courier New', Courier, monospace;
		cursor: pointer;
	}

	.park span,
	.park strong {
		max-width: calc(100% - 32px);
		animation: deny 0.7s steps(2) infinite;
		font-size: 28px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-align: center;
		text-transform: uppercase;
	}

	@media (max-width: 600px) {
		.park span,
		.park strong {
			font-size: 18px;
		}
	}

	.dev-toast {
		position: fixed;
		left: 50%;
		bottom: 28px;
		z-index: 25;
		margin: 0;
		transform: translateX(-50%);
		padding: 12px 16px;
		border-radius: 8px;
		background: var(--bg-raised);
		color: var(--gold);
		box-shadow: 0 8px 24px rgb(0 0 0 / 35%);
	}

	.dev-pop {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 25;
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: min(22rem, calc(100% - 32px));
		transform: translate(-50%, -50%);
		padding: 24px;
		border: 0;
		border-radius: 12px;
		background: var(--bg-raised);
		color: var(--text);
		box-shadow: 0 16px 40px rgb(0 0 0 / 45%);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.dev-pop strong {
		color: var(--gold);
		font-size: 1.15rem;
	}

	.dev-pop span {
		color: var(--muted);
	}

	@keyframes deny {
		50% {
			transform: translateY(-8px);
		}
	}
</style>
