import { DataInfo, read24 } from './helper';

/**
 * Analysis GBA rom and look up Run-length compressed data.
 * @returns Array of `[addr, compressed_data_size, decompressed_data_size]`
 */
export const lookupRLE = (gbaRomData: Uint8Array): DataInfo[] => {
  const result: DataInfo[] = [];
  for (let i = 0; i < gbaRomData.byteLength; i += 4) {
    const id = gbaRomData[i];
    if (id === 0x30) {
      const size = read24(gbaRomData, i + 1);
      if (256 < size && size < 0xffff) {
        try {
          const [_, compressed_size] = decompressRLE(gbaRomData, i);
          result.push([i, compressed_size, size]);
        } catch (e) {}
      }
    }
  }

  return result;
};

/**
 * Decompresse Run-length compressed data.
 * @param data Original binary. Normally, this is GBA ROM data
 * @param addr Offset for compressed data in `data`
 * @returns `[decompressed_data_binary, compressed_data_size]`
 */
export const decompressRLE = (data: Uint8Array, addr: number): [Uint8Array, number] => {
  const oldAddr = addr;

  const id = data[addr++];
  if (id !== 0x30) {
    return [new Uint8Array(0), 0];
  }

  const decompressedSize = read24(data, addr);
  addr += 3;

  const result = new Uint8Array(decompressedSize);
  let resultOfs = 0;

  let flags = 0;
  while (resultOfs < decompressedSize) {
    flags = data[addr++] & 0xff;
    const size = flags & 0b0111_1111;

    if ((flags & 0x80) != 0) {
      // Compressed
      const n = (size & 0x7f) + 3;
      for (let i = 0; i < n; i++) {
        result[resultOfs++] = data[addr] & 0xff;
      }
      addr++;
    } else {
      // Uncompressed
      const n = size + 1;
      for (let i = 0; i < n; i++) {
        result[resultOfs++] = data[addr++] & 0xff;
      }
    }
  }

  return [result, addr - oldAddr];
};
