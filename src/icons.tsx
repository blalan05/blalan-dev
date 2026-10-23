import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { For } from 'solid-js';

export function Icon(props: { icon: IconDefinition }) {
	const paths = () => {
		const data = props.icon.icon[4];
		return Array.isArray(data) ? data : [data];
	};

	return (
		<svg
			aria-hidden="true"
			width="1em"
			height="1em"
			viewBox={`0 0 ${props.icon.icon[0]} ${props.icon.icon[1]}`}
		>
			<For each={paths()}>{(d) => <path fill="currentColor" d={d} />}</For>
		</svg>
	);
}
