import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { ScrollableCanvasContainer } from './ScrollableCanvasContainer';

type Props = {
  width: number;
  height: number;
  largeWidth: number;
  largeHeight: number;
  wait?: number;
  className?: string;
  onScroll?: (x: number, y: number, setScroll: (x: number, y: number) => void) => void;
};

export const ScrollableCanvas = React.forwardRef<HTMLCanvasElement, Props>(
  ({ width, height, largeWidth, largeHeight, wait = 10, className, onScroll }, ref) => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const _onScroll = (x: number, y: number) => {
      setScrollX(x);
      setScrollY(y);

      if (onScroll) {
        const callback = (x: number, y: number) => {
          setScrollX(x);
          setScrollY(y);
        };
        onScroll(x, y, callback);
      }
    };

    return (
      <ScrollableCanvasContainer
        onScroll={_onScroll}
        wait={wait}
        width={width}
        height={height}
        largeWidth={largeWidth}
        largeHeight={largeHeight}
        className={className}
      >
        <Canvas ref={ref} width={width} height={height} translateX={scrollX} translateY={scrollY} />
      </ScrollableCanvasContainer>
    );
  },
);
