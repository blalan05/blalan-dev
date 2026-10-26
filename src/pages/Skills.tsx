import { For } from 'solid-js';

const levels = [
	{
		name: 'Mastered',
		items: ['PHP', 'Node.js', 'Vue', 'Vuetify', 'JavaScript', 'jQuery', 'SQL', 'Postgres', 'MySQL', 'Eloquent', 'HTML', 'CSS']
	},
	{
		name: 'Comfortable',
		items: [
			'QuickBooks',
			'WordPress',
			'Sequelize',
			'TypeScript',
			'Svelte',
			'SvelteKit',
			'Vite',
			'Express',
			'Pinia',
			'Vue Router',
			'PWA',
			'UI',
			'UX',
			'Responsive design',
			'NetSuite',
			'Git',
			'REST APIs',
			'Authentication',
			'Webhooks',
			'Database design',
			'Application security',
			'SaaS',
			'Servers',
			'Nginx',
			'Apache',
			'SSH',
			'Bash',
			'DNS',
			'Hosting',
			'SSL/TLS',
			'Firewalls',
			'Backups',
			'Monitoring',
			'cPanel',
			'Networking',
			'Project management',
			'Requirements gathering',
			'Agile',
			'Scrum',
			'Training',
			'Raspberry Pi',
			'Ubuntu',
			'Linux',
			'Windows'
		]
	},
	{
		name: 'Used',
		items: [
			'Elixir',
			'Phoenix',
			'Python',
			'Solid',
			'Drizzle',
			'Prisma',
			'Redis',
			'Tailwind',
			'Three.js',
			'Square',
			'Vitest',
			'Bun',
			'Electron',
			'Docker',
			'AWS'
		]
	}
];

export default function Skills() {
	return (
		<div class="page">
			<header>
				<h1>Skills</h1>
				<p>Grouped by how well I know them.</p>
			</header>
			<dl>
				<For each={levels}>
					{(group) => (
						<div>
							<dt>{group.name}</dt>
							<dd>
								<ul>
									<For each={group.items}>{(item) => <li>{item}</li>}</For>
								</ul>
							</dd>
						</div>
					)}
				</For>
			</dl>
			<p class="note">Business systems: ERP, point of sale, accounting, payments, and printers.</p>
		</div>
	);
}
