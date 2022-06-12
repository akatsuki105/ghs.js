import { RGB } from '../../utils';

/**
 * Draw 8x8 tilemap image using sequential RGB arraybuffer.
 * @param t Target 8x8 tilemap image
 * @param buf RGB array buffer. e.g. [[R00, G00, B00], [R01, G01, B01], ..., [R10, G10, B10], [R11, G11, B11], ..., [Ryx, Gyx, Byx]]
 */
export const setTileImage = (t: ImageData, rgbs: RGB[], mag = 1) => {
  for (let row = 0; row < 8; row++) {
    const y = row * mag;
    for (let col = 0; col < 8; col++) {
      const ofs = row * 8 + col;
      const x = col * mag;
      const rgb = rgbs[ofs];
      if (rgb) {
        const r = rgb[0];
        const g = rgb[1];
        const b = rgb[2];
        const a = 0xff;
        for (let py = 0; py < mag; py++) {
          for (let px = 0; px < mag; px++) {
            const imageOffset = ((y + py) * 32 + x + px) * 4;
            t.data[imageOffset] = r;
            t.data[imageOffset + 1] = g;
            t.data[imageOffset + 2] = b;
            t.data[imageOffset + 3] = a;
          }
        }
      } else {
        return;
      }
    }
  }
};
