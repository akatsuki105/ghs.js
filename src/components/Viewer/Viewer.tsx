import React, { useEffect, useRef } from 'react';
import { RGB } from '../../utils';
import { ScrollableCanvas } from '../atoms/ScrollableCanvas';
import { setTileImage } from './helper';

type Props = {
  rgb: RGB[];
  w: number;
  visible: Dimension;
  id: string;
  mag?: number;
};

type Dimension = {
  w: number;
  h: number;
};

export const Viewer: React.VFC<Props> = React.memo(({ rgb, w, visible, id, mag = 4 }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const pixels = rgb.length;
  let h = pixels / w;
  if (h % 8 != 0) {
    h += 8 - (h % 8);
  }
  if (h * mag > 32768) {
    h = 32768 / mag;
  }

  useEffect(() => {
    if (!canvas || !canvas.current) return;
    const ctx = canvas.current.getContext('2d', { alpha: false })!;
    ctx.fillRect(0, 0, w, h);
    const tileYMax = h / 8;
    const tileXMax = w / 8;
    for (let tileY = 0; tileY < tileYMax; tileY++) {
      for (let tileX = 0; tileX < tileXMax; tileX++) {
        const tile = ctx.createImageData(8 * mag, 8 * mag);
        const ofs = (tileY * tileXMax + tileX) * 64;
        const data = rgb.slice(ofs, ofs + 64); // 8x8
        setTileImage(tile, data, mag);
        ctx.putImageData(tile, tileX * 8 * mag, tileY * 8 * mag);
      }
    }
  }, [rgb, id, w, visible, h, mag]);

  return (
    <ScrollableCanvas
      id={id}
      mag={mag}
      w={w}
      h={h}
      visibleW={visible.w}
      visibleH={visible.h}
      ref={canvas}
    />
  );
});
