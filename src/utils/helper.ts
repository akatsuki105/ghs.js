export const read24 = (arr: Uint8Array, i: number): number => {
  return arr[i] | (arr[i + 1] << 8) | (arr[i + 2] << 16);
};

/** `[addr, compressed_data_size, decompressed_data_size]` */
export type DataInfo = [number, number, number];
