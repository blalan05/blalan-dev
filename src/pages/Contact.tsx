import { createSignal, Show } from 'solid-js';

export default function Contact() {
	const [status, setStatus] = createSignal<'idle' | 'sending' | 'sent' | 'error'>('idle');

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const body = new URLSearchParams();
		for (const [key, value] of data) body.append(key, String(value));

		setStatus('sending');
		try {
			const response = await fetch('/netlify-form.html', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: body.toString()
			});
			if (!response.ok) throw new Error('Form was not accepted');
			form.reset();
			setStatus('sent');
		} catch {
			setStatus('error');
		}
	}

	return (
		<div class="page contact">
			<header>
				<h1>Contact</h1>
				<p>Send a note about a project, a system, or a question. I read these myself.</p>
			</header>
			<Show
				when={status() !== 'sent'}
				fallback={<p class="thanks">Thanks. I have your message and I'll get back to you.</p>}
			>
					<form
						name="contact"
						method="post"
						action="/netlify-form.html"
						data-netlify="true"
						netlify-honeypot="bot-field"
						onSubmit={submit}
					>
						<input type="hidden" name="form-name" value="contact" />
						<p class="hp" aria-hidden="true">
							<label>
								Don't fill this out
								<input name="bot-field" tabindex="-1" autocomplete="off" />
							</label>
						</p>
						<label>
							Name
							<input name="name" type="text" autocomplete="name" required />
						</label>
						<label>
							Email
							<input name="email" type="email" autocomplete="email" required />
						</label>
						<label>
							Message
							<textarea name="message" rows={6} required />
						</label>
						<button type="submit" disabled={status() === 'sending'}>
							{status() === 'sending' ? 'Sending' : 'Send'}
						</button>
						<Show when={status() === 'error'}>
							<p class="error">The message did not send. Try again in a moment.</p>
						</Show>
					</form>
			</Show>
		</div>
	);
}
