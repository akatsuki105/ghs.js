export const lookupLZ77 = (data: Uint8Array): number[][] => {
  const result = [];
  for (let i = 0; i < data.byteLength; i += 4) {
    const id = data[i];
    if (id === 0x10) {
      const size = data[i + 1] | (data[i + 2] << 8) | (data[i + 3] << 16);
      if (256 < size && size < 0xffff) {
        try {
          const [_, compressed_size] = decompressLZ77(data, i);
          result.push([i, compressed_size, size]);
        } catch (e) {}
      }
    }
  }

  return result;
};

export const decompressLZ77 = (data: Uint8Array, addr: number): [Uint8Array, number] => {
  const oldAddr = addr;
  const id = data[addr++];
  if (id !== 0x10) {
    return [new Uint8Array(0), 0];
  }
  const decompressedSize = data[addr] | (data[addr + 1] << 8) | (data[addr + 2] << 16);
  addr += 3;
  const result = new Uint8Array(decompressedSize);
  let resultOfs = 0;

  const BUFFER_LENGTH = 0x1000;
  const buffer = new Uint8Array(BUFFER_LENGTH);
  let bufferOffset = 0;
  let currentOutsize = 0;
  let flags = 0;
  let mask = 1;

  while (currentOutsize < decompressedSize) {
    if (mask == 1) {
      flags = data[addr++] & 0xff;
      mask = 0x80;
    } else {
      mask = mask >> 1;
    }

    if ((flags & mask) > 0) {
      const byte1 = data[addr++];
      const byte2 = data[addr++];
      const len = (byte1 >> 4) + 3;
      const disp = (((byte1 & 0xf) << 8) | byte2) + 1;
      if (disp > currentOutsize) {
        throw new Error(`Size Error: ${disp} > ${currentOutsize}`);
      }

      let bufIdx = bufferOffset + BUFFER_LENGTH - disp;
      for (let i = 0; i < len; i++) {
        const next = buffer[bufIdx % BUFFER_LENGTH];
        bufIdx++;
        result[resultOfs++] = next;
        buffer[bufferOffset] = next;
        bufferOffset = (bufferOffset + 1) % BUFFER_LENGTH;
      }
      currentOutsize += len;
    } else {
      const next = data[addr++];
      currentOutsize++;
      result[resultOfs++] = next;
      buffer[bufferOffset] = next;
      bufferOffset = (bufferOffset + 1) % BUFFER_LENGTH;
    }
  }

  return [result, addr - oldAddr];
};
