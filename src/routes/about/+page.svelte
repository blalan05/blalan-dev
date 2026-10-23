<script lang="ts">
	type Kind = 'punct' | 'name' | 'role' | 'text' | 'string' | 'global' | 'keyword' | 'link';
	type Token = { kind: Kind; text: string; href?: string };

	const company = 'Foundational Technologies LLC';
	const links: Record<string, string> = {
		[company]: 'https://foundtechsolutions.com',
		FullVue: 'https://fullvue.io',
		ShowVue: 'https://showvue.io'
	};
	const globals = [
		'JavaScript',
		'TypeScript',
		'Svelte',
		'Solid',
		'Vue',
		'Node.js',
		'PHP',
		'Python',
		'Raspberry Pi',
		'Elixir',
		'Postgres',
		'MySQL',
		'HTML',
		'CSS',
	];

	function tag(name: string, close = false, kind: Kind = 'name'): Token[] {
		return [
			{ kind: 'punct', text: close ? '</' : '<' },
			{ kind, text: name },
			{ kind: 'punct', text: '>' }
		];
	}

	function tokenize(source: string, keywords = false): Token[] {
		const names = [...Object.keys(links), ...globals].join('|');
		const pattern = new RegExp(
			keywords ? `\\b(${names})\\b|\\b(and|for)\\b|(,)` : `\\b(${names})\\b`,
			'g'
		);
		const tokens: Token[] = [];
		let cursor = 0;

		for (const match of source.matchAll(pattern)) {
			const index = match.index ?? 0;
			if (index > cursor) tokens.push({ kind: 'text', text: source.slice(cursor, index) });
			const href = match[1] ? links[match[1]] : undefined;
			if (href && match[1]) tokens.push({ kind: 'link', text: match[1], href });
			else if (match[1]) tokens.push({ kind: 'global', text: match[1] });
			else if (match[2]) tokens.push({ kind: 'keyword', text: match[2] });
			else tokens.push({ kind: 'punct', text: match[3] ?? match[0] });
			cursor = index + match[0].length;
		}

		if (cursor < source.length) tokens.push({ kind: 'text', text: source.slice(cursor) });
		return tokens;
	}

	function leaf(name: string, value: string, href?: string): Token[] {
		return [
			{ kind: 'text', text: '  ' },
			...tag(name),
			{ kind: href ? 'link' : 'string', text: value, href },
			...tag(name, true)
		];
	}

	function child(
		name: string,
		value: string,
		keywords = false,
		depth = 1,
		kind: Kind = 'name'
	): Token[] {
		return [
			{ kind: 'text', text: '  '.repeat(depth) },
			...tag(name, false, kind),
			...tokenize(value, keywords),
			...tag(name, true, kind)
		];
	}

	function block(name: string, body: string[]): Token[][] {
		return [tag(name), tokenize(`  ${body.join(' ')}`), tag(name, true)];
	}

	const yearsOfSoftware = new Date().getFullYear() - 2011;

	const lines: Token[][] = [
		tag('person'),
		leaf('name', 'Blaine Landowski'),
		leaf('role', 'Software Engineer'),
		leaf('experience', `${yearsOfSoftware} years`),
		leaf('title', 'CEO and co-founder'),
		leaf('company', company, links[company]),
		tag('person', true),
		[],
		...block('summary', [
			'I build the software a business actually runs on: custom web apps, internal',
			'tools, and product work that continues after the first release. I also help',
			'teams settle the architecture before they build the wrong thing.'
		]),
		[],
		tag('practice'),
		tokenize('  Foundational Technologies LLC is a veteran-owned studio in Appleton, Wisconsin.'),
		child('product', 'FullVue, an ERP toolbox for operations and production.'),
		child(
			'product',
			'ShowVue connects theaters, performers, and audiences.'
		),
		[{ kind: 'text', text: '  ' }, ...tag('hardware')],
		tokenize(
			'    Raspberry Pi projects in Python, including a presence-sensing interactive screen for a museum and a live streaming monitor and recording system for our local community theater.'
		),
		[{ kind: 'text', text: '  ' }, ...tag('hardware', true)],
		tag('practice', true),
		[],
		...block('perspective', [
			'From theater, set design, set building, and directing taught me to see',
			'the work from several seats at once. Enterprise software asks for the',
			'same thing: operators, customers, and the people who maintain it do not',
			'share one view.'
		]),
		[],
		tag('background'),
		[{ kind: 'text', text: '  ' }, ...tag('roles')],
		child('Marines', 'Earned the rank of Sergeant and lead a squad of 13 Marines.', false, 2, 'role'),
		child('Floor', 'A machine on a shop floor, and other entry level positions.', false, 2, 'role'),
		child('Sales', 'Salesman - cold calls, emails, mass mailings, door-to-door, and public speaking.', false, 2, 'role'),
		child('Office', 'Office manager (two companies).', false, 2, 'role'),
		child('II', 'IT manager - PCs, printers, phones, tablets and networks.', false, 2, 'role'),
		child('People', 'HR manager - hiring, training, and managing employees.', false, 2, 'role'),
		child('Web', 'client work, contract work, hosting, domains, and support.', false, 2, 'role'),
		[{ kind: 'text', text: '  ' }, ...tag('roles', true)],
		[],
		tokenize('  I learned to follow, then to lead a small team, then to lead teams.'),
		tokenize(
			'  I understand the work from the floor, from sales, and from managing people and information.'
		),
		tag('background', true),
		[],
		tag('stack'),
		child('interfaces', 'JavaScript, TypeScript, Svelte, Solid, and Vue', true),
		child('server', 'Node.js, PHP, Python, and Elixir', true),
		child('data', 'Postgres and MySQL', true),
		child('foundation', 'HTML and CSS', true),
		tag('stack', true)
	];

	type Scope = { name: string; kind: Kind; start: number; end: number };

	function tagInfo(tokens: Token[]) {
		let opens = false;
		let closes = false;
		let name = '';
		let kind: Kind = 'name';

		for (const token of tokens) {
			if (token.kind === 'punct' && token.text === '<') opens = true;
			if (token.kind === 'punct' && token.text === '</') closes = true;
			if (!name && (token.kind === 'name' || token.kind === 'role')) {
				name = token.text;
				kind = token.kind;
			}
		}

		return name ? { name, kind, opens, closes } : null;
	}

	const scopes: Scope[] = [];
	{
		const stack: Scope[] = [];
		for (let index = 0; index < lines.length; index++) {
			const info = tagInfo(lines[index]);
			if (!info) continue;
			if (info.closes && !info.opens) {
				const open = stack.pop();
				if (open) open.end = index;
			} else if (info.opens && !info.closes) {
				const scope = { name: info.name, kind: info.kind, start: index, end: lines.length - 1 };
				scopes.push(scope);
				stack.push(scope);
			}
		}
	}

	let codeEl = $state<HTMLDivElement | null>(null);
	let firstLine = $state(0);

	const stickyScopes = $derived(
		scopes.filter((scope) => scope.start < firstLine && scope.end >= firstLine)
	);

	const breadcrumb = $derived.by(() => {
		const trail = scopes.filter((scope) => scope.start <= firstLine && scope.end >= firstLine);
		const info = tagInfo(lines[firstLine] ?? []);
		if (info?.opens && info.closes) trail.push({ ...info, start: firstLine, end: firstLine });
		return trail;
	});

	function visibleLine() {
		if (!codeEl) return 0;
		const sticky = codeEl.parentElement?.querySelector('.sticky');
		const edge = codeEl.getBoundingClientRect().top + (sticky?.getBoundingClientRect().height ?? 0) + 4;
		const rows = codeEl.querySelectorAll<HTMLElement>(':scope > .row');
		for (let index = 0; index < rows.length; index++) {
			if (rows[index].getBoundingClientRect().bottom > edge) return index;
		}
		return Math.max(0, rows.length - 1);
	}

	function onScroll() {
		const next = visibleLine();
		if (next !== firstLine) firstLine = next;
	}

	function scrollToLine(index: number) {
		const row = codeEl?.querySelectorAll<HTMLElement>(':scope > .row')[index];
		if (!row || !codeEl) return;
		const delta = row.getBoundingClientRect().top - codeEl.getBoundingClientRect().top;
		codeEl.scrollTop += delta;
	}
</script>

<section class="editor" aria-label="About">
	<div class="tabbar">
		<div class="tab">
			<span class="mark" aria-hidden="true"></span>
			src/view/About
		</div>
	</div>

	<nav class="crumbs" aria-label="Breadcrumbs">
		<button type="button" onclick={() => scrollToLine(0)}>src/view/About</button>
		{#each breadcrumb as crumb (crumb.start)}
			<span class="sep" aria-hidden="true">›</span>
			<button type="button" class={crumb.kind} onclick={() => scrollToLine(crumb.start)}>
				{crumb.name}
			</button>
		{/each}
	</nav>

	<div class="viewport">
		{#if stickyScopes.length}
			<div class="sticky">
				{#each stickyScopes as scope (scope.start)}
					<button type="button" class="row" onclick={() => scrollToLine(scope.start)}>
						{@render lineBody(lines[scope.start], scope.start)}
					</button>
				{/each}
			</div>
		{/if}

		<div class="code" bind:this={codeEl} onscroll={onScroll}>
			{#each lines as tokens, index (index)}
				<div class="row">
					{@render lineBody(tokens, index)}
				</div>
			{/each}
		</div>
	</div>

	<footer>
		<span>src/view/About</span>
		<span class="status-right">
			<span>Spaces: 2</span>
			<span>UTF-8</span>
			<span>XML</span>
		</span>
	</footer>
</section>

{#snippet lineBody(tokens: Token[], index: number)}
	<span class="gutter">{index + 1}</span>
	<code>
		{#each tokens as token, tokenIndex (`${index}-${tokenIndex}`)}
			{#if token.href}
				<a class={token.kind} href={token.href}>{token.text}</a>
			{:else}
				<span class={token.kind}>{token.text}</span>
			{/if}
		{/each}
		{#if tokens.length === 0}
			<span class="text">&nbsp;</span>
		{/if}
	</code>
{/snippet}

<style>
	.editor {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: var(--bg);
		color: var(--text);
		font-family: 'Cascadia Code', 'Cascadia Mono', Consolas, 'Segoe UI Mono', ui-monospace, monospace;
		font-size: 14px;
	}

	.tabbar {
		display: flex;
		flex: none;
		height: 36px;
		background: var(--bg-raised);
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 16px;
		background: var(--bg);
		border-right: 1px solid var(--bg-raised);
		color: #fff;
		font-family: Roboto, sans-serif;
		font-size: 13px;
	}

	.mark {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		background: var(--scarlet);
	}

	.crumbs {
		display: flex;
		align-items: center;
		gap: 6px;
		flex: none;
		height: 26px;
		padding: 0 12px;
		overflow: auto;
		background: var(--bg);
		border-bottom: 1px solid var(--line);
		font-family: Roboto, sans-serif;
		font-size: 12px;
	}

	.crumbs button {
		flex: none;
		padding: 0;
		border: 0;
		background: none;
		color: var(--muted);
		font: inherit;
		cursor: pointer;
	}

	.crumbs button:hover {
		text-decoration: underline;
	}

	.crumbs button.name {
		color: var(--green);
	}

	.crumbs button.role {
		color: var(--scarlet);
	}

	.crumbs .sep {
		color: var(--muted);
	}

	.viewport {
		position: relative;
		flex: 1;
		min-height: 0;
	}

	.code {
		height: 100%;
		overflow: auto;
		padding: 8px 0 24px;
	}

	.sticky {
		position: absolute;
		z-index: 2;
		top: 0;
		right: 0;
		left: 0;
		background: var(--bg);
		border-bottom: 1px solid var(--line);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
	}

	.sticky .row {
		background: color-mix(in srgb, var(--bg-raised) 88%, transparent);
	}

	.row {
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		align-items: start;
		min-height: 22px;
		line-height: 22px;
	}

	button.row {
		width: 100%;
		padding: 0;
		border: 0;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.row:hover {
		background: rgba(255, 255, 255, 0.04);
	}

	.gutter {
		padding-right: 16px;
		color: var(--muted);
		text-align: right;
		user-select: none;
	}

	code {
		display: block;
		max-width: 93ch;
		white-space: pre-wrap;
	}

	.punct {
		color: var(--muted);
	}

	.name {
		color: var(--green);
	}

	.role {
		color: var(--scarlet);
	}

	.string,
	.global {
		color: var(--gold);
	}

	a.link {
		color: var(--scarlet);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.keyword {
		color: var(--blue);
	}

	.text {
		color: var(--text);
	}

	footer {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		flex: none;
		height: 24px;
		padding: 0 12px;
		background: var(--scarlet-strong);
		color: #fff;
		font-family: Roboto, sans-serif;
		font-size: 12px;
		line-height: 24px;
	}

	.status-right {
		display: flex;
		gap: 16px;
	}
</style>
