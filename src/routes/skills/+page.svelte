<script lang="ts">
	const levels: { name: string; items: string[] }[] = [
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
		{ name: 'Used', items: ['Elixir', 'Python', 'Solid', 'Drizzle', 'Prisma', 'Bun', 'Electron', 'Docker', 'AWS'] }
	];
</script>

<div class="page">
	<header>
		<h1>Skills</h1>
		<p>Grouped by how well I know them.</p>
	</header>

	<dl>
		{#each levels as group (group.name)}
			<div>
				<dt>{group.name}</dt>
				<dd>
					<ul>
						{#each group.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</dd>
			</div>
		{/each}
	</dl>

	<p class="note">Business systems: ERP, point of sale, accounting, and printers.</p>
</div>

<style>
	.page {
		max-width: 40rem;
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

	dl {
		margin: 12px 0 0;
	}

	.note {
		margin: 28px 0 0;
		color: var(--muted);
		line-height: 1.5;
	}

	dl div {
		padding: 14px 0;
		border-top: 1px solid var(--line);
	}

	dt {
		color: var(--gold);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	dd {
		margin: 8px 0 0;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 4px 10px;
		background: var(--bg-raised);
		border-radius: 999px;
	}
</style>
