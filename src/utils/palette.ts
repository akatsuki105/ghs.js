const _rgb555 = (rgb: number): number => {
  const r = ((rgb >> 16) & 0xff) / 8;
  const g = ((rgb >> 8) & 0xff) / 8;
  const b = (rgb & 0xff) / 8;

  return (r << 10) | (g << 5) | b;
};

/**
 * Convert RGB888 array into RGB555 array.
 * @param rgb888s each element is 24bit and represents a RGB888.
 */
export const rgb555 = (rgb888s: number[]): Uint16Array => {
  return new Uint16Array(rgb888s.map((c) => _rgb555(c)));
};

/**
 * Convert RGB555 array into RGB888.
 * @param rgb555 `(r5 << 10) | (g5 << 5) | b5`
 * @returns `[R8, G8, B8]`
 */
export const rgb555To888 = (rgb555: number): [r8: number, g8: number, b8: number] => {
  const r5 = rgb555 & 0b11111;
  const g5 = (rgb555 >> 5) & 0b11111;
  const b5 = (rgb555 >> 10) & 0b11111;

  // 5bit color: abcde -> 8bit color: abcde abc
  const r = (r5 << 3) | (r5 >> 2);
  const g = (g5 << 3) | (g5 >> 2);
  const b = (b5 << 3) | (b5 >> 2);

  return [r, g, b];
};

const defaultPalette888 = [
  0xa5a5a5, 0x0042c6, 0x4229ce, 0x6b00bd, 0x942994, 0x9c1042, 0x9c3900, 0x8c6321, 0x637b29,
  0x298c29, 0x189410, 0x318463, 0x29739c, 0x000000, 0x000000, 0x000000,
];

const grayPalette888 = [
  0xf0f0f0, 0xe0e0e0, 0xd0d0d0, 0xc0c0c0, 0xb0b0b0, 0xa0a0a0, 0x909090, 0x808080, 0x707070,
  0x606060, 0x505050, 0x404040, 0x303030, 0x202020, 0x101010, 0x000000,
];

const yychrPalette1 = [
  0x000000, 0x8c6321, 0xadb531, 0xc6e79c, 0x000000, 0xefefef, 0xde7b52, 0x6b0010, 0x000000,
  0xefefef, 0xa5a5a5, 0x6b6b6b, 0x000000, 0x6b00bd, 0xa55aff, 0xceb5ff,
];

const yychrPalette2 = [
  0x000000, 0x29739c, 0x4ac694, 0xc6e79c, 0x000000, 0x630000, 0x9c1042, 0xf7c6b5, 0x215a10,
  0x6b0010, 0xde7b52, 0xefefef, 0x7b6bff, 0x9c3900, 0xce9c29, 0x637b29,
];

export const palettes = [defaultPalette888, grayPalette888, yychrPalette1, yychrPalette2];
