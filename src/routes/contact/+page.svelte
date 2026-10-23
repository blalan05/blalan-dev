<script lang="ts">
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const body = new URLSearchParams();
		for (const [key, value] of data) body.append(key, String(value));

		status = 'sending';
		try {
			const response = await fetch('/netlify-form.html', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: body.toString()
			});
			if (!response.ok) throw new Error('Form was not accepted');
			form.reset();
			status = 'sent';
		} catch {
			status = 'error';
		}
	}
</script>

<div class="page">
	<header>
		<h1>Contact</h1>
		<p>Send a note about a project, a system, or a question. I read these myself.</p>
	</header>

	{#if status === 'sent'}
		<p class="thanks">Thanks. I have your message and I'll get back to you.</p>
	{:else}
		<form
			name="contact"
			method="POST"
			action="/netlify-form.html"
			data-netlify="true"
			netlify-honeypot="bot-field"
			onsubmit={submit}
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
				<textarea name="message" rows="6" required></textarea>
			</label>
			<button type="submit" disabled={status === 'sending'}>
				{status === 'sending' ? 'Sending' : 'Send'}
			</button>
			{#if status === 'error'}
				<p class="error">The message did not send. Try again in a moment.</p>
			{/if}
		</form>
	{/if}
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

	header p,
	.thanks,
	.error {
		margin: 8px 0 0;
		line-height: 1.5;
	}

	header p,
	.thanks {
		color: var(--muted);
		font-size: 16px;
	}

	form {
		margin-top: 28px;
	}

	label {
		display: block;
		margin-top: 16px;
		color: var(--gold);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	input,
	textarea {
		box-sizing: border-box;
		display: block;
		width: 100%;
		margin-top: 8px;
		padding: 10px 12px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: var(--bg-raised);
		color: var(--text);
		font: inherit;
		font-size: 16px;
		letter-spacing: 0;
		text-transform: none;
	}

	textarea {
		min-height: 140px;
		resize: vertical;
	}

	button {
		margin-top: 18px;
		padding: 10px 16px;
		border: 0;
		border-radius: 8px;
		background: var(--scarlet-strong);
		color: #fff;
		font: inherit;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
	}

	button:hover {
		background: color-mix(in srgb, var(--scarlet-strong) 78%, white);
	}

	button:disabled {
		cursor: progress;
		opacity: 0.7;
	}

	.error {
		color: var(--scarlet);
	}

	.hp {
		position: absolute;
		left: -10000px;
		height: 0;
		overflow: hidden;
	}
</style>
