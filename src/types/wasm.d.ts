/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} compressed
* @param {number} decompressed_size
* @returns {Uint8Array}
*/
export function decode(compressed: Uint8Array, decompressed_size: number): Uint8Array;
/**
* @param {Uint8Array} bpp
* @param {Uint16Array} pal
* @returns {Uint8Array}
*/
export function convert_4bpp_to_rgb(bpp: Uint8Array, pal: Uint16Array): Uint8Array;
/**
* @returns {Uint16Array}
*/
export function default_palette(): Uint16Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly decode: (a: number, b: number, c: number) => number;
  readonly convert_4bpp_to_rgb: (a: number, b: number, c: number, d: number) => number;
  readonly default_palette: () => number;
  readonly __wbindgen_malloc: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
