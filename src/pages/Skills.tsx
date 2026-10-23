import { For } from 'solid-js';

const levels = [
	{
		name: 'Mastered',
		items: ['PHP', 'Node.js', 'Vue', 'JavaScript', 'jQuery', 'SQL', 'Postgres', 'MySQL', 'Eloquent', 'HTML', 'CSS']
	},
	{
		name: 'Comfortable',
		items: [
			'QuickBooks',
			'WordPress',
			'Sequelize',
			'TypeScript',
			'Svelte',
			'NetSuite',
			'Git',
			'REST APIs',
			'Servers',
			'Nginx',
			'Apache',
			'SSH',
			'Bash',
			'DNS',
			'Hosting',
			'Networking',
			'Project management',
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
		items: ['Elixir', 'Python', 'Solid', 'Drizzle', 'Prisma', 'Bun', 'Electron', 'Docker', 'AWS']
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
			<p class="note">Business systems: ERP, point of sale, accounting, and printers.</p>
		</div>
	);
}
