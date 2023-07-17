export type RGB = [number, number, number];

export const convert4BppToRGB = (bpp: Uint8Array, pal: Uint16Array): RGB[] => {
  let ofs = 0;
  const result: RGB[] = new Array(bpp.length * 2);
  while (true) {
    if (ofs >= bpp.length) {
      return result;
    }

    const data = bpp[ofs];
    const [lo, hi] = convert1ByteToRGB(data, pal);
    result[ofs * 2] = lo;
    result[ofs * 2 + 1] = hi;
    ofs++;
  }
};

const convert1ByteToRGB = (byteData: number, pal: Uint16Array): [RGB, RGB] => {
  const [hi, lo] = [(byteData >> 4) & 0xf, byteData & 0xf];

  return [convert4BitToRGB(lo, pal), convert4BitToRGB(hi, pal)];
};

const convert4BitToRGB = (palIdx4Bit: number, pal: Uint16Array): RGB => {
  const c = pal[palIdx4Bit];
  const result: RGB = [0, 0, 0];
  result[0] = (c & 0x1f) * 8; // R
  result[1] = ((c >> 5) & 0x1f) * 8; // G
  result[2] = ((c >> 10) & 0x1f) * 8; // B

  return result;
};

export const convert8BppToRGB = (bpp: Uint8Array, pal: Uint16Array): RGB[] => {
  let ofs = 0;
  const result: RGB[] = [];
  while (true) {
    if (ofs >= bpp.length) return result;

    const data = bpp[ofs++];
    const c = pal[data];
    const red = (c & 0x1f) * 8;
    const green = ((c >> 5) & 0x1f) * 8;
    const blue = ((c >> 10) & 0x1f) * 8;
    result.push([red, green, blue]);
  }
};
