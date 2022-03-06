export const convert4BppToRGB = (bpp: Uint8Array, pal: Uint16Array): number[] => {
  let ofs = 0;
  const result: number[] = [];
  while (true) {
    if (ofs >= bpp.length) return result;

    const data = bpp[ofs++];
    const c = [data & 0xf, data >> 4];
    c.forEach((elm) => {
      const c = pal[elm];
      const red = (c & 0x1f) * 8;
      const green = ((c >> 5) & 0x1f) * 8;
      const blue = ((c >> 10) & 0x1f) * 8;
      result.push(red);
      result.push(green);
      result.push(blue);
    });
  }
};

export const convert8BppToRGB = (bpp: Uint8Array, pal: Uint16Array): number[] => {
  let ofs = 0;
  const result: number[] = [];
  while (true) {
    if (ofs >= bpp.length) return result;

    const data = bpp[ofs++];
    const c = pal[data];
    const red = (c & 0x1f) * 8;
    const green = ((c >> 5) & 0x1f) * 8;
    const blue = ((c >> 10) & 0x1f) * 8;
    result.push(red);
    result.push(green);
    result.push(blue);
  }
};
