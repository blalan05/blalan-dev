import { count } from "./Widget.svelte";

export const precise = Math.sumPrecise([count, 0.2]);
export const decoded = Uint8Array.fromHex("00ff");
export const isError = Error.isError(precise);
