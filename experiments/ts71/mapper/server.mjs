import { stdin, stdout } from "node:process";

// Minimal TypeScript 7.1 content mapper.
// It lifts the first <script> block out of a .svelte file so tsc can check it,
// and maps those characters back onto the original file.

const Verbatim = 0;
let buffer = Buffer.alloc(0);

stdin.on("data", (chunk) => {
	buffer = Buffer.concat([buffer, chunk]);
	for (;;) {
		const headerEnd = buffer.indexOf("\r\n\r\n");
		if (headerEnd === -1) return;
		const header = buffer.subarray(0, headerEnd).toString("utf8");
		const match = /Content-Length:\s*(\d+)/i.exec(header);
		if (!match) {
			buffer = buffer.subarray(headerEnd + 4);
			continue;
		}
		const length = Number(match[1]);
		const start = headerEnd + 4;
		if (buffer.length < start + length) return;
		const body = buffer.subarray(start, start + length).toString("utf8");
		buffer = buffer.subarray(start + length);
		handle(JSON.parse(body));
	}
});

stdin.on("end", () => {
	process.exit(0);
});

function handle(message) {
	if (message.id === undefined) return;
	try {
		send({ jsonrpc: "2.0", id: message.id, result: dispatch(message.method, message.params ?? {}) });
	} catch (error) {
		send({
			jsonrpc: "2.0",
			id: message.id,
			error: { code: -32603, message: error instanceof Error ? error.message : String(error) },
		});
	}
}

function dispatch(method, params) {
	switch (method) {
		case "initialize":
			return { positionEncoding: "utf-16", diagnosticSource: "svelte-lab" };
		case "openProject":
			return {};
		case "closeProject":
			return null;
		case "transform":
			return transform(params.content ?? "");
		default:
			throw new Error(`Unknown method ${method}`);
	}
}

function transform(content) {
	const open = content.match(/<script\b[^>]*>/);
	if (!open || open.index === undefined) {
		return diagnostic("Expected a <script> block");
	}
	const start = open.index + open[0].length;
	const end = content.indexOf("</script>", start);
	if (end === -1) {
		return diagnostic("Unclosed <script> block", start, open[0].length);
	}
	const script = content.slice(start, end);
	return {
		text: script,
		extension: ".ts",
		mappings: [[0, script.length, start, script.length, Verbatim]],
	};
}

function diagnostic(messageText, start = 0, length = 0) {
	return {
		text: "",
		extension: ".ts",
		diagnostics: [{ messageText, start, length, code: 1 }],
	};
}

function send(message) {
	const body = Buffer.from(JSON.stringify(message), "utf8");
	stdout.write(`Content-Length: ${body.length}\r\n\r\n`);
	stdout.write(body);
}
