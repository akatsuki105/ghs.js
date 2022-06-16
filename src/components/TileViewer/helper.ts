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
        for (let py = 0; py < mag; py++) {
          for (let px = 0; px < mag; px++) {
            setRGB(t, 8 * mag, x + px, y + py, rgb);
          }
        }
      } else {
        return;
      }
    }
  }
};

/**
 * @param t Target 8x8 tilemap image
 * @param w tilemap row length for calculate offset
 * @param x horizontal pixel
 * @param y vertical pixel
 * @param rgb RGB888 data
 */
export const setRGB = (t: ImageData, w: number, x: number, y: number, rgb: RGB) => {
  const ofs = (y * w + x) * 4;
  t.data[ofs] = rgb[0];
  t.data[ofs + 1] = rgb[1];
  t.data[ofs + 2] = rgb[2];
  t.data[ofs + 3] = 0xff;
};

export const writeBorder = (t: ImageData, c: RGB) => {
  for (let y = 0; y < t.height; y++) {
    for (let x = 0; x < t.width; x++) {
      switch (y) {
        case 0:
          setRGB(t, t.width, x, 0, c);
          break;
      }
      switch (x) {
        case 0:
          setRGB(t, t.width, x, y, c);
          break;
      }
    }
  }
};
