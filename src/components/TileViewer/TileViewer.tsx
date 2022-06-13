import React, { useEffect, useRef, useState } from 'react';
import { RGB } from '../../utils';
import { ScrollableCanvas } from '../atoms';
import { setTileImage } from './helper';

type Props = {
  rgb: RGB[];
  w: number;
  h: number;
  id: string;
  mag?: number;
};

export const TileViewer: React.VFC<Props> = React.memo(({ rgb, w, h, mag = 4 }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasWidth = w * mag;
  const [start, setStart] = useState<[number, number]>([0, 0]); // tile x, y on canvas visible left top
  const canvasHeight = (rgb.length * mag) / w;
  const visibleHeight = h;
  const grid = 8 * mag;
  const dim = [w / 8, Math.ceil(visibleHeight / grid)]; // how many tiles are visible

  useEffect(() => {
    const refreshCanvas = () => {
      if (!canvas || !canvas.current) return;
      const ctx = canvas.current.getContext('2d', { alpha: false })!;
      ctx.clearRect(0, 0, canvas.current.width, visibleHeight);
      ctx.fillRect(0, 0, canvasWidth, visibleHeight);

      for (let y = 0; y < dim[1]; y++) {
        for (let x = 0; x < dim[0]; x++) {
          const [tileX, tileY] = [start[0] + x, start[1] + y];
          const tile = ctx.createImageData(grid, grid);
          const tileIdx = tileY * dim[0] + tileX;
          const ofs = tileIdx * 64;
          const data = rgb.slice(ofs, ofs + 64); // 8x8
          setTileImage(tile, data, mag);
          ctx.putImageData(tile, x * grid, y * grid);
        }
      }
    };
    refreshCanvas();
  }, [rgb, w, h, mag, start[0], start[1]]); // eslint-disable-line

  const onScroll = (top: number, left: number, setScroll: (y: number, x: number) => void) => {
    const [tileX, tileY] = [Math.floor(left / grid), Math.floor(top / grid)];
    setScroll(tileY * grid, tileX * grid);
    setStart([tileX, tileY]);
  };

  return (
    <ScrollableCanvas
      width={canvasWidth}
      height={visibleHeight}
      largeWidth={canvasWidth}
      largeHeight={canvasHeight}
      onScroll={onScroll}
      ref={canvas}
    />
  );
});
