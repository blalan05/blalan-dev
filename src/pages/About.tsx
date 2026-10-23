import { createMemo, createSignal, For, Show } from 'solid-js';
import { lines, scopes, tagInfo, type Token } from '../about-data';

function LineBody(props: { tokens: Token[]; index: number }) {
	return (
		<>
			<span class="gutter">{props.index + 1}</span>
			<code>
				<For each={props.tokens}>
					{(token) =>
						token.href ? (
							<a class={token.kind} href={token.href}>
								{token.text}
							</a>
						) : (
							<span class={token.kind}>{token.text}</span>
						)
					}
				</For>
				<Show when={props.tokens.length === 0}>
					<span class="text">&nbsp;</span>
				</Show>
			</code>
		</>
	);
}

export default function About() {
	const [firstLine, setFirstLine] = createSignal(0);
	let codeEl: HTMLDivElement | undefined;

	const stickyScopes = createMemo(() =>
		scopes.filter((scope) => scope.start < firstLine() && scope.end >= firstLine())
	);

	const breadcrumb = createMemo(() => {
		const line = firstLine();
		const trail = scopes.filter((scope) => scope.start <= line && scope.end >= line);
		const info = tagInfo(lines[line] ?? []);
		if (info?.opens && info.closes) trail.push({ ...info, start: line, end: line });
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
		if (next !== firstLine()) setFirstLine(next);
	}

	function scrollToLine(index: number) {
		const row = codeEl?.querySelectorAll<HTMLElement>(':scope > .row')[index];
		if (!row || !codeEl) return;
		const delta = row.getBoundingClientRect().top - codeEl.getBoundingClientRect().top;
		codeEl.scrollTop += delta;
	}

	return (
		<section class="editor" aria-label="About">
			<div class="tabbar">
				<div class="tab">
					<span class="mark" aria-hidden="true" />
					src/view/About
				</div>
			</div>
			<nav class="crumbs" aria-label="Breadcrumbs">
				<button type="button" onClick={() => scrollToLine(0)}>
					src/view/About
				</button>
				<For each={breadcrumb()}>
					{(crumb) => (
						<>
							<span class="sep" aria-hidden="true">
								›
							</span>
							<button type="button" class={crumb.kind} onClick={() => scrollToLine(crumb.start)}>
								{crumb.name}
							</button>
						</>
					)}
				</For>
			</nav>
			<div class="viewport">
				<Show when={stickyScopes().length > 0}>
					<div class="sticky">
						<For each={stickyScopes()}>
							{(scope) => (
								<button type="button" class="row" onClick={() => scrollToLine(scope.start)}>
									<LineBody tokens={lines[scope.start]} index={scope.start} />
								</button>
							)}
						</For>
					</div>
				</Show>
				<div class="code" ref={(el) => (codeEl = el)} onScroll={onScroll}>
					<For each={lines}>
						{(tokens, index) => (
							<div class="row">
								<LineBody tokens={tokens} index={index()} />
							</div>
						)}
					</For>
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
	);
}
