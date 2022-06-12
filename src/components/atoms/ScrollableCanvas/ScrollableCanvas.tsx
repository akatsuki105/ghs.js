import React from 'react';
import styled from 'styled-components';

export type Props = {
  // canvas tag id
  id: string;
  // canvas all width
  w: number;
  // canvas all height
  h: number;
  // canvas visible width
  visibleW: number;
  // canvas visible height
  visibleH: number;
  // scale (if mag is n, actual canvas size is (n*w)*(n*h)pixels)
  mag?: number;
};

export const ScrollableCanvas: React.VFC<Props> = React.memo(
  ({ id, w, h, visibleW, visibleH, mag = 1 }) => {
    return (
      <div style={{ overflow: 'scroll', width: visibleW * mag, height: visibleH }}>
        <div style={{ overflow: 'hidden', width: w * mag, height: h * mag }}>
          <StyledDiv h={h * mag}>
            <StyledCanvas id={id} width={w * mag} height={h * mag}></StyledCanvas>
          </StyledDiv>
        </div>
      </div>
    );
  },
);

const StyledDiv = styled.div<{ h: number }>`
  position: relative;
`;

const StyledCanvas = styled.canvas`
  image-rendering: pixelated;
  position: absolute;
`;
