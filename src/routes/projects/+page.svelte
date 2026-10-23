<script lang="ts">
	import Fa from 'svelte-fa';
	import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
	import {
		faArrowUpRightFromSquare,
		faMasksTheater,
		faToolbox
	} from '@fortawesome/free-solid-svg-icons';

	type Tone = 'gold' | 'scarlet';

	type Entry = {
		name: string;
		href: string;
		tone: Tone;
		icon: IconDefinition;
		logo: string;
		paragraphs: string[];
	};

	const products: Entry[] = [
		{
			name: 'FullVue',
			href: 'https://fullvue.io',
			tone: 'gold',
			icon: faToolbox,
			logo: '/img/fullvue-logo.png',
			paragraphs: [
				'FullVue is an ERP toolbox for owners who run jobs, crews, and the books. Sales, schedules, field work, purchasing, invoicing, and payments stay on one job record, from the first opportunity through cash. The modules follow the work the company actually does. Quotes, schedules, and invoices share that record, so the margin stays visible from the bid to the payment.',
				'The accountant stays in QuickBooks Online. FullVue pushes invoices, credit memos, bills, and payments one way into QuickBooks. Jobs, purchase orders, and inventory stay where the work happens. Ask FullVue answers questions about that live data for the people allowed to see it, and it leaves the invoices and the books alone.'
			]
		},
		{
			name: 'ShowVue',
			href: 'https://showvue.io',
			tone: 'scarlet',
			icon: faMasksTheater,
			logo: '/img/showvue-logo.png',
			paragraphs: [
				'ShowVue is one platform for community theater. It connects theaters, performers, and audiences around tickets, auditions, volunteering, and show management. A theater keeps productions, schedules, cast, and crew together, and publishes a page patrons can find. Nearby shows and open auditions appear on a map.',
				'Theaters sell tickets through Square, take audition sign-ups, and manage volunteer crews and rentals, with roles for the board, staff, and cast. Performers use one account across theaters and keep a résumé of their credits. Patrons find shows, tickets, and auditions for the theaters near them.'
			]
		}
	];

	const clients: Entry[] = [];
</script>

<div class="page">
	<header>
		<h1>Projects</h1>
		<p>Products from Foundational Technologies. Client work is listed here when I have permission to name it.</p>
	</header>

	<section>
		<h2>Products</h2>
		<ul>
			{#each products as project (project.name)}
				{@render card(project)}
			{/each}
		</ul>
	</section>

	{#if clients.length}
		<section>
			<h2>Clients</h2>
			<ul>
				{#each clients as project (project.name)}
					{@render card(project)}
				{/each}
			</ul>
		</section>
	{/if}
</div>

{#snippet card(project: Entry)}
	<li class={project.tone}>
		<div class="top">
			<img class="logo" src={project.logo} alt="" />
			<a class="cta" href={project.href}>
				Visit {project.name}
				<Fa icon={faArrowUpRightFromSquare} />
			</a>
		</div>
		<div class="head">
			<Fa icon={project.icon} size="lg" />
			<h3>{project.name}</h3>
		</div>
		{#each project.paragraphs as paragraph}
			<p>{paragraph}</p>
		{/each}
	</li>
{/snippet}

<style>
	.page {
		max-width: 42rem;
		padding: 32px 28px 64px;
	}

	h1 {
		margin: 0;
		color: var(--gold);
		font-size: 28px;
		font-weight: 500;
	}

	header p {
		margin: 8px 0 0;
		color: var(--muted);
		font-size: 16px;
		line-height: 1.5;
	}

	section {
		margin-top: 28px;
	}

	h2 {
		margin: 0;
		color: var(--gold);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		margin-top: 16px;
		padding: 18px 18px 16px;
		background: var(--bg-raised);
		border-radius: 12px;
		border-left: 4px solid transparent;
	}

	li.gold {
		border-left-color: var(--gold);
	}

	li.scarlet {
		border-left-color: var(--scarlet);
	}

	.head {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 14px;
	}

	h3 {
		margin: 0;
		font-size: 22px;
		font-weight: 500;
	}

	li.gold h3,
	li.gold .head :global(svg) {
		color: var(--gold);
	}

	li.scarlet h3,
	li.scarlet .head :global(svg) {
		color: var(--scarlet);
	}

	p {
		margin: 12px 0 0;
		line-height: 1.6;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.logo {
		display: block;
		width: auto;
		max-width: 210px;
		height: 92px;
		object-fit: contain;
		object-position: left center;
	}

	li.scarlet .logo {
		height: 84px;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		flex: none;
		padding: 8px 14px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
	}

	.cta :global(svg) {
		width: 0.85em;
		height: 0.85em;
	}

	li.gold .cta {
		background: var(--gold);
		color: #1a1400;
	}

	li.scarlet .cta {
		background: var(--scarlet-strong);
		color: #fff;
	}

	li.gold .cta:hover {
		background: color-mix(in srgb, var(--gold) 82%, white);
	}

	li.scarlet .cta:hover {
		background: color-mix(in srgb, var(--scarlet-strong) 78%, white);
	}
</style>
