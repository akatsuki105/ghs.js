import React, { useEffect, useRef } from 'react';
import { RGB } from '../../utils';
import { ScrollableCanvas } from '../atoms/ScrollableCanvas';
import { setTileImage } from './helper';

const mag = 4;

type Props = {
  rgb: RGB[];
  w: number;
  id: string;
};

export const GridViewer: React.VFC<Props> = React.memo(({ rgb, w, id }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const pixels = rgb.length;
  let h = pixels / w;
  if (h % 8 != 0) {
    h += 8 - (h % 8);
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
  }, [rgb, id, w, h]);

  return (
    <ScrollableCanvas id={id} mag={mag} w={w} h={h} visibleW={w} visibleH={500} ref={canvas} />
  );
});
