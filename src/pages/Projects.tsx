import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
	faArrowUpRightFromSquare,
	faMasksTheater,
	faToolbox
} from '@fortawesome/free-solid-svg-icons';
import { For } from 'solid-js';
import { Icon } from '../icons';

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

function Card(props: { project: Entry }) {
	return (
		<li class={props.project.tone}>
			<div class="top">
				<img class="logo" src={props.project.logo} alt="" />
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
				<h2>Products</h2>
				<ul>
					<For each={products}>{(project) => <Card project={project} />}</For>
				</ul>
			</section>
		</div>
	);
}
