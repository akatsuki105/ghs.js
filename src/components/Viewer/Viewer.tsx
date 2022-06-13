import React, { useEffect, useRef, useState } from 'react';
import { RGB } from '../../utils';
import { ScrollableCanvas } from '../atoms/Canvas';
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

export const Viewer: React.VFC<Props> = React.memo(({ rgb, w, visible, mag = 4 }) => {
  const allCanvasSize = [w * mag, (rgb.length * mag) / w];
  const visibleSize = [w * mag, visible.h];
  const grid = 8 * mag;

  const canvas = useRef<HTMLCanvasElement>(null);
  const [start, setStart] = useState<[number, number]>([0, 0]); // tile x, y

  useEffect(() => {
    if (!canvas || !canvas.current) return;
    const ctx = canvas.current.getContext('2d', { alpha: false })!;
    ctx.fillRect(0, 0, visibleSize[0], visibleSize[1]);
    const tileYMax = visibleSize[1] / grid;
    const tileXMax = visibleSize[0] / grid;

    for (let y = 0; y < tileYMax; y++) {
      for (let x = 0; x < tileXMax; x++) {
        const [tileX, tileY] = [start[0] + x, start[1] + y];
        const tile = ctx.createImageData(grid, grid);
        const ofs = (tileY * tileXMax + tileX) * 64;
        const data = rgb.slice(ofs, ofs + 64); // 8x8
        setTileImage(tile, data, mag);
        ctx.putImageData(tile, x * grid, y * grid);
      }
    }
  }, [rgb, w, visible, mag, start[0], start[1]]); // eslint-disable-line

  const onScroll = (top: number, left: number, setScroll: (y: number, x: number) => void) => {
    const [tileX, tileY] = [Math.floor(left / grid), Math.floor(top / grid)];
    setScroll(tileY * grid, tileX * grid);
    setStart([tileX, tileY]);
  };

  return (
    <ScrollableCanvas
      width={visibleSize[0]}
      height={visibleSize[1]}
      largeWidth={allCanvasSize[0]}
      largeHeight={allCanvasSize[1]}
      onScroll={onScroll}
      ref={canvas}
    />
  );
});
