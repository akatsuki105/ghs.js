const rgb555 = (rgb: number): number => {
  const r = ((rgb >> 16) & 0xff) / 8;
  const g = ((rgb >> 8) & 0xff) / 8;
  const b = (rgb & 0xff) / 8;

  return (r << 10) | (g << 5) | b;
};

export const defaultPalette = new Uint16Array([
  rgb555(0xa5a5a5),
  rgb555(0x0042c6),
  rgb555(0x4229ce),
  rgb555(0x6b00bd),
  rgb555(0x942994),
  rgb555(0x9c1042),
  rgb555(0x9c3900),
  rgb555(0x8c6321),
  rgb555(0x637b29),
  rgb555(0x298c29),
  rgb555(0x189410),
  rgb555(0x318463),
  rgb555(0x29739c),
  rgb555(0x000000),
  rgb555(0x000000),
  rgb555(0x000000),
]);
