import React, { useEffect } from 'react';

type Props = {
  id: string;
  colors: number[]; // uint32(rgb888) array
  width?: number;
};

export const Palette: React.VFC<Props> = React.memo(({ id, colors, width = 16 }) => {
  const row = Math.ceil(colors.length / width);

  useEffect(() => {
    const canvas = document.getElementById(id)! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })!;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    colors.map((c, idx) => {
      const r = (c >> 16) & 0xff;
      const g = (c >> 8) & 0xff;
      const b = c & 0xff;
      const imageData = ctx.createImageData(16, 16);
      let i = 0;
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          imageData.data[i++] = r;
          imageData.data[i++] = g;
          imageData.data[i++] = b;
          imageData.data[i++] = 0xff;
        }
      }

      const x = (idx % width) * 16;
      const y = Math.floor(idx / width) * 16;
      ctx.putImageData(imageData, x, y);
    });
  });

  return <canvas id={id} width={width * 16} height={row * 16}></canvas>;
});
