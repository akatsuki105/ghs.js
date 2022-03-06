import React, { useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  id: string;
  colors: number[];
  width?: number;
};

export const Palette: React.VFC<Props> = React.memo(({ id, colors, width = 16 }) => {
  useEffect(() => {
    const canvas = document.getElementById(id)! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', { alpha: false })!;
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
      ctx.putImageData(imageData, idx * 16, 0);
    });
  });

  return (
    <StyledDiv>
      <canvas id={id} width={width * 16} height="16"></canvas>
    </StyledDiv>
  );
});

const StyledDiv = styled.div`
  height: 16px;
`;
