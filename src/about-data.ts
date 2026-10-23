export type Kind = 'punct' | 'name' | 'role' | 'text' | 'string' | 'global' | 'keyword' | 'link';
	export type Token = { kind: Kind; text: string; href?: string };

	const company = 'Foundational Technologies LLC';
	const links: Record<string, string> = {
		[company]: 'https://foundtechsolutions.com',
		FullVue: 'https://fullvue.io',
		ShowVue: 'https://showvue.io',
		Vuetify: 'https://vuetifyjs.com'
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

	export const lines: Token[][] = [
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
			'    Raspberry Pi projects in Python, including a presence-sensing interactive screen for a museum and a live streaming monitor and recording system for our local community theater. I have also built servers from the hardware up, including the software on them.'
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
		child('Sales', 'Salesman - cold calls, emails, mass mailings, and presentations.', false, 2, 'role'),
		child('Office', 'Office manager (two companies).', false, 2, 'role'),
		child('II', 'IT manager - PCs, printers, phones, tablets and networks.', false, 2, 'role'),
		child('People', 'HR manager - hiring, training, and managing employees.', false, 2, 'role'),
		child('Web', 'client work, contract work, hosting, domains, and support.', false, 2, 'role'),
		child('Open source', 'Vuetify core team member since 2021.', false, 2, 'role'),
		[{ kind: 'text', text: '  ' }, ...tag('roles', true)],
		[],
		[{ kind: 'text', text: '  ' }, ...tag('summary')],
		tokenize('    I learned to follow, then to lead a small team, then to lead teams.'),
		tokenize(
			'    I understand the work from the floor, from sales, and from managing people and information.'
		),
		[{ kind: 'text', text: '  ' }, ...tag('summary', true)],
		tag('background', true),
		[],
		tag('stack'),
		child('interfaces', 'JavaScript, TypeScript, Svelte, Solid, and Vue', true),
		child('server', 'Node.js, PHP, Python, and Elixir', true),
		child('data', 'Postgres and MySQL', true),
		child('foundation', 'HTML and CSS', true),
		tag('stack', true)
	];

	export type Scope = { name: string; kind: Kind; start: number; end: number };

	export function tagInfo(tokens: Token[]) {
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

	export const scopes: Scope[] = [];
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
