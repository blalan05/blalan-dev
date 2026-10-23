<script lang="ts">
	const levels = ['Expert', 'Advanced', 'Intermediate', 'Novice', 'Beginner'];

	const languages = [
		{ name: 'HTML', value: 5 },
		{ name: 'CSS', value: 5 },
		{ name: 'JS', value: 4 },
		{ name: 'PHP', value: 5 },
		{ name: 'Nodejs', value: 3 }
	];

	const frameworks = [
		{ name: 'Wordpress', value: 4 },
		{ name: 'Codeigniter', value: 5 },
		{ name: 'ExpressionEngine', value: 3 },
		{ name: 'CraftPHP', value: 3 },
		{ name: 'jQuery', value: 4 },
		{ name: 'Vuejs', value: 4 },
		{ name: 'Vuetify', value: 4 },
		{ name: 'Bootstrap', value: 4 }
	];

	function points(items: { name: string; value: number }[]) {
		const width = 640;
		const height = 200;
		const padX = 28;
		const padY = 18;
		return items.map((item, index) => {
			const x =
				items.length === 1 ? width / 2 : padX + (index * (width - padX * 2)) / (items.length - 1);
			const y = padY + ((5 - item.value) / 4) * (height - padY * 2);
			return { ...item, x, y };
		});
	}

	function line(items: { name: string; value: number }[]) {
		return points(items)
			.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
			.join(' ');
	}
</script>

<div class="page">
	<section>
		<h2>Langauges</h2>
		<div class="chart">
			<ul>
				{#each levels as level (level)}
					<li>{level}</li>
				{/each}
			</ul>
			<div class="plot">
				<svg viewBox="0 0 640 200" role="img" aria-label="Language experience">
					<path d={line(languages)} />
				</svg>
				<div class="labels">
					{#each languages as item (item.name)}
						<span>{item.name}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section>
		<h2>Frameworks</h2>
		<div class="chart">
			<ul>
				{#each levels as level (level)}
					<li>{level}</li>
				{/each}
			</ul>
			<div class="plot">
				<svg viewBox="0 0 640 200" role="img" aria-label="Framework experience">
					<path d={line(frameworks)} />
				</svg>
				<div class="labels">
					{#each frameworks as item (item.name)}
						<span>{item.name}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.page {
		max-width: 960px;
		padding: 8px 16px 48px;
	}

	h2 {
		margin: 16px 0 8px;
		color: var(--gold);
		font-size: 1.5rem;
		font-weight: 400;
	}

	.chart {
		display: flex;
		gap: 8px;
		align-items: stretch;
	}

	ul {
		flex: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 120px;
		margin: 0;
		padding: 8px 0 36px;
		list-style: none;
		color: var(--muted);
		font-size: 14px;
	}

	.plot {
		flex: 1;
		min-width: 0;
	}

	svg {
		display: block;
		width: 100%;
		height: 200px;
	}

	path {
		fill: none;
		stroke: var(--scarlet);
		stroke-width: 18;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.labels {
		display: flex;
		justify-content: space-between;
		gap: 4px;
		color: var(--text);
		font-size: 16px;
	}

	.labels span {
		flex: 1;
		text-align: center;
	}
</style>
