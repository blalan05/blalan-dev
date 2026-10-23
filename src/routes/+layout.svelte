<script lang="ts">
	import { page } from '$app/state';
	import Fa from 'svelte-fa';
	import {
		faBriefcase,
		faChartBar,
		faEnvelope,
		faSitemap,
		faUser
	} from '@fortawesome/free-solid-svg-icons';

	let { children } = $props();

	const navigation = [
		{ name: 'About', href: '/about', tone: 'scarlet', icon: faUser },
		{ name: 'Experience', href: '/experience', tone: 'gold', icon: faBriefcase },
		{ name: 'Skills', href: '/skills', tone: 'green', icon: faChartBar },
		{ name: 'Projects', href: '/projects', tone: 'blue', icon: faSitemap },
		{ name: 'Contact', href: '/contact', tone: 'muted', icon: faEnvelope }
	];

	const current = $derived(page.url.pathname);
</script>

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
				<a class="{item.tone}" class:active={current === item.href} href={item.href}>
					<Fa icon={item.icon} size="lg" />
					<span>{item.name}</span>
				</a>
			{/each}
		</nav>
	</aside>
	<main>
		{@render children()}
	</main>
</div>

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
		min-height: 100vh;
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

	nav a {
		display: grid;
		grid-template-columns: 56px 1fr 56px;
		align-items: center;
		height: 48px;
		padding: 0 8px;
		color: var(--text);
		font-size: 14px;
		letter-spacing: 0.04em;
		text-decoration: none;
		text-transform: uppercase;
	}

	nav a :global(svg) {
		justify-self: center;
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
		background: color-mix(in srgb, var(--scarlet-strong) 28%, transparent);
		color: var(--gold);
	}

	nav a:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	nav a.active:hover {
		background: color-mix(in srgb, var(--scarlet-strong) 40%, transparent);
	}

	main {
		flex: 1;
		min-width: 0;
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
	}
</style>
