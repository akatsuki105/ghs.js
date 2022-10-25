// Type definitions for js-md5 0.4
// Project: https://github.com/emn178/js-md5
// Definitions by: Michael McCarthy <https://github.com/mwmccarthy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'js-sha1' {
  export let message: string | any[] | Uint8Array | ArrayBuffer;

  interface Sha1 {
    array(): number[];
    arrayBuffer(): ArrayBuffer;
    buffer(): ArrayBuffer;
    digest(): number[];
    hex(): string;
    toString(): string;
    update(message: message): Sha1;
    base64(): string;
  }

  export function hex(message: message): string;
  export function update(message: message): Sha1;
  export function create(): Sha1;
}
