export const read24 = (arr: Uint8Array, i: number): number => {
  return arr[i] | (arr[i + 1] << 8) | (arr[i + 2] << 16);
};

/**
 * Change number into string.
 * @param val Number to convert.
 * @param maxLength Maximum length of string. e.g. 2 is ~0xFF, 4 is ~0xFFFF
 * @param prefix Prefix to append. e.g. '0x'
 */
export const toHex = (val: number, maxLength: number, prefix = ''): string => {
  return prefix + val.toString(16).toUpperCase().padStart(maxLength, '0');
};

/** `[addr, compressed_data_size, decompressed_data_size]` */
export type DataInfo = [number, number, number];

export const loadU16 = (src: Uint8Array, addr: number, start = 0x0800_0000): number => {
  const lo = src[addr - start];
  const hi = src[addr + 1 - start];

  return lo | (hi << 8);
};
