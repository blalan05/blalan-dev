import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
	faArrowUpRightFromSquare,
	faBookOpen,
	faGamepad,
	faGlobe,
	faMasksTheater,
	faToolbox
} from '@fortawesome/free-solid-svg-icons';
import { For, Show } from 'solid-js';
import { Icon } from '../icons';

type Tone = 'gold' | 'scarlet';

type Entry = {
	name: string;
	href: string;
	tone: Tone;
	icon: IconDefinition;
	logo?: string;
	mark?: boolean;
	pixel?: boolean;
	paragraphs: string[];
};

const kinds = [
	'Inventory control',
	'Media player',
	'Learning management',
	'Childcare management',
	'Email marketing',
	'Ecommerce',
	'Production tracking',
	'Kiosk',
	'Support desk',
	'Museum exhibit',
	'Sheet music',
	'Church and missions',
	'Show lighting',
	'Art project planning',
	'Marketing sites'
];

const recent: Entry[] = [
	{
		name: '8 Bit Bootcamp',
		href: 'https://8bitdiv.net',
		tone: 'gold',
		icon: faGamepad,
		logo: '/img/8bit-bootcamp.png',
		mark: true,
		pixel: true,
		paragraphs: [
			'8 Bit Bootcamp is an 8-bit isometric RPG set at MCRD San Diego. A recruit picks a save slot, builds a character, and works the receiving line: the yellow footprints, the ASVAB, pull-ups, and a 13-week schedule on the depot map.',
			'Graduation keeps the same Marine. Campaigns run from Belleau Wood and the Pacific through Korea, Vietnam, and Iraq. Readiness, hydration, and the stats from boot camp carry into the next operation.'
		]
	},
	{
		name: 'CoLaborer',
		href: 'https://colaborers.app',
		tone: 'scarlet',
		icon: faGlobe,
		logo: '/img/colaborer-logo.svg',
		mark: true,
		paragraphs: [
			'CoLaborer is the shared record for a mission board, the missionaries it sends, and the churches that support them. A missionary writes the update once. Boards, churches, and the people who pray read the same profile, the same posts, and the same prayer list.',
			'A post can be a designed newsletter. Prayer requests can be marked as prayed, then answered. Family, field, and contact details can be public, limited to supporters, or private. A sensitive assignment can use an alias and stay off the public list. Churches follow with a support code, and a short excerpt can rotate on a lobby screen or go out in the monthly summary.'
		]
	},
	{
		name: 'SYNC Ministries',
		href: 'https://app.syncministries.org',
		tone: 'gold',
		icon: faBookOpen,
		logo: '/img/sync-ministries.png',
		mark: true,
		paragraphs: [
			'SYNC is the app for SYNC Ministries. Studies and groups sit next to the library: videos, podcasts, series, dramas, sermons, and sheet music, with passages tied to the lesson.',
			'A study carries a schedule, pacing, and quizzes. A group has a join code. People open what is up this week, then search the library or follow a series from the same account.'
		]
	}
];

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

function Card(props: { project: Entry }) {
	return (
		<li class={props.project.tone}>
			<div class="top">
				<Show when={props.project.logo}>
					<img
						class={{
							logo: true,
							mark: !!props.project.mark,
							pixel: !!props.project.pixel
						}}
						src={props.project.logo ?? ''}
						alt=""
					/>
				</Show>
				<a class="cta" href={props.project.href}>
					Visit {props.project.name}
					<Icon icon={faArrowUpRightFromSquare} />
				</a>
			</div>
			<div class="head">
				<Icon icon={props.project.icon} />
				<h3>{props.project.name}</h3>
			</div>
			<For each={props.project.paragraphs}>{(paragraph) => <p>{paragraph}</p>}</For>
		</li>
	);
}

export default function Projects() {
	return (
		<div class="page projects">
			<header>
				<h1>Projects</h1>
				<p>
					Products from Foundational Technologies. Client work is listed here when I have permission to
					name it.
				</p>
			</header>
			<section>
				<h2>Recent</h2>
				<ul>
					<For each={recent}>{(project) => <Card project={project} />}</For>
				</ul>
			</section>
			<section>
				<h2>Products</h2>
				<ul>
					<For each={products}>{(project) => <Card project={project} />}</For>
				</ul>
			</section>
			<section>
				<h2>Other work</h2>
				<p>Kinds of apps I have built. Client names stay off this page until I have permission to use them.</p>
				<ul class="kinds">
					<For each={kinds}>{(kind) => <li>{kind}</li>}</For>
				</ul>
			</section>
		</div>
	);
}
