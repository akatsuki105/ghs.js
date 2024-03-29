import React, { useEffect, useRef, useState } from 'react';
import { RGB } from '../../utils';
import { ScrollableCanvas } from '../atoms';
import { setRGB, setTileImage, writeBorder } from './helper';

type Props = {
  rgb: RGB[];
  w: number;
  h: number; // キャンバス部分
  grid?: boolean;
  scale?: number; // キャンバスの高さは変わらない
  className?: string;
  onScroll?: (col: number, row: number) => void;
  jumpTo?: number;
};

export const TileViewer: React.VFC<Props> = React.memo(
  ({ rgb, w, h, grid = false, scale = 1, className, onScroll, jumpTo = -1 }) => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const canvasWidth = w * scale;
    const [start, setStart] = useState<[number, number]>([0, 0]); // 可視部分が全体データのどこから始まるか
    const canvasHeight = (rgb.length * scale) / w;
    const visibleHeight = h;
    const gridSize = 8 * scale;
    const dim = [w / 8, Math.ceil(visibleHeight / gridSize)]; // how many tiles are visible
    const [scroll, setScroll] = useState<[number, number]>([-1, -1]);

    const canvasBuffer = document.createElement('canvas');
    canvasBuffer.width = canvasWidth;
    canvasBuffer.height = visibleHeight;

    useEffect(() => {
      if (jumpTo === -1) {
        return;
      }

      const row = (jumpTo - 0x0800_0000) / ((w / 8) * 32);
      setScroll([0, row * gridSize]);
    }, [w, jumpTo]); // eslint-disable-line

    useEffect(() => {
      // startで指定したタイルからキャンバスで見える分までをcanvasに描画
      const refreshCanvas = () => {
        if (!canvas || !canvas.current) return;
        const ctx = canvasBuffer.getContext('2d', { alpha: false, desynchronized: true })!;
        ctx.clearRect(0, 0, canvas.current.width, visibleHeight);
        ctx.fillRect(0, 0, canvasWidth, visibleHeight);

        const c: RGB = [0x4f, 0x4f, 0x4f];
        const [startX, startY] = [start[0], start[1]];
        const tile = ctx.createImageData(gridSize, gridSize);
        for (let y = 0; y < dim[1]; y++) {
          for (let x = 0; x < dim[0]; x++) {
            const [tileX, tileY] = [startX + x, startY + y];
            const tileIdx = tileY * dim[0] + tileX;
            const ofs = tileIdx * 64;
            const data = rgb.slice(ofs, ofs + 64); // 8x8
            setTileImage(tile, data, scale);
            if (grid) writeBorder(tile, c);
            ctx.putImageData(tile, x * gridSize, y * gridSize);
          }
        }

        if (grid) {
          const c: RGB = [0x0f, 0x0f, 0x0f];
          const img = ctx.getImageData(0, 0, canvas.current.width, visibleHeight);
          writeBorder(img, c);
          for (let y = 0; y < visibleHeight; y++) {
            setRGB(img, canvas.current.width, canvas.current.width - 1, y, c);
          }
          ctx.putImageData(img, 0, 0);
        }
        canvas.current
          .getContext('2d', { alpha: false, desynchronized: true })!
          .drawImage(canvasBuffer, 0, 0);
      };
      refreshCanvas();
    }, [rgb, w, h, scale, start[0], start[1]]); // eslint-disable-line

    const _onScroll = (x: number, y: number) => {
      const col = Math.floor(x / gridSize);
      const row = Math.floor(y / gridSize);
      onScroll && onScroll(col, row);
      setStart([col, row]);
    };

    return (
      <ScrollableCanvas
        width={canvasWidth}
        height={visibleHeight}
        largeWidth={canvasWidth}
        largeHeight={canvasHeight}
        onScroll={_onScroll}
        ref={canvas}
        className={className}
        wait={30}
        scx={scroll[0]}
        scy={scroll[1]}
      />
    );
  },
);
