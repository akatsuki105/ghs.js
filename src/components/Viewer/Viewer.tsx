import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RGB } from '../../utils';

const mag = 4;

type Props = {
  rgb: RGB[];
  w: number;
  id: string;
};

export const Viewer: React.VFC<Props> = React.memo(({ rgb, w, id }) => {
  const pixels = rgb.length;
  let h = pixels / w;
  if (h % 8 != 0) {
    h += 8 - (h % 8);
  }

  useEffect(() => {
    const canvas = document.getElementById(id)! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.fillRect(0, 0, w, h);
    const tileYMax = h / 8;
    const tileXMax = w / 8;
    for (let tileY = 0; tileY < tileYMax; tileY++) {
      for (let tileX = 0; tileX < tileXMax; tileX++) {
        const tile = ctx.createImageData(8 * mag, 8 * mag);
        const ofs = (tileY * tileXMax + tileX) * 64;
        const data = rgb.slice(ofs, ofs + 64); // 8x8
        setTileImage(tile, data);
        ctx.putImageData(tile, tileX * 8 * mag, tileY * 8 * mag);
      }
    }
  }, [rgb, id, w, h]);

  return <ScrollableCanvas id={id} mag={mag} w={w} h={h} />;
});

type CanvasProps = {
  id: string;
  w: number;
  h: number;
  mag?: number;
};

const ScrollableCanvas: React.VFC<CanvasProps> = React.memo(({ id, w, h, mag = 1 }) => {
  return (
    <div style={{ overflow: 'scroll', width: w * mag, height: 300 }}>
      <div style={{ overflow: 'hidden', width: w * mag, height: h * mag }}>
        <StyledDiv h={h * mag}>
          <StyledCanvas id={id} width={w * mag} height={h * mag}></StyledCanvas>
        </StyledDiv>
      </div>
    </div>
  );
});

/**
 * Draw 8x8 tilemap image using sequential RGB arraybuffer.
 * @param t Target 8x8 tilemap image
 * @param buf RGB array buffer. e.g. [R00, G00, B00, R01, G01, B01, ..., R10, G10, B10, R11, G11, B11, ..., Ryx, Gyx, Byx]
 */
const setTileImage = (t: ImageData, rgbs: RGB[]) => {
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

const StyledDiv = styled.div<{ h: number }>`
  position: relative;
`;

const StyledCanvas = styled.canvas`
  image-rendering: pixelated;
  position: absolute;
`;
