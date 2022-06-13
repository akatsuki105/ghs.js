import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { ScrollableCanvasContainer } from './ScrollableCanvasContainer';

type Props = {
  width: number;
  height: number;
  largeWidth: number;
  largeHeight: number;
  wait?: number;
  noScrollBar?: boolean;
  onScroll?: (
    scrollTop: number,
    scrollLeft: number,
    setScroll: (top: number, left: number) => void,
  ) => void;
};

export const ScrollableCanvas = React.forwardRef<HTMLCanvasElement, Props>(
  ({ width, height, largeWidth, largeHeight, wait = 10, noScrollBar = false, onScroll }, ref) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const _onScroll = (scrollTop: number, scrollLeft: number) => {
      setScrollTop(scrollTop);
      setScrollLeft(scrollLeft);

      if (onScroll) {
        const callback = (y: number, x: number) => {
          setScrollTop(y);
          setScrollLeft(x);
        };
        onScroll(scrollTop, scrollLeft, callback);
      }
    };

    return (
      <ScrollableCanvasContainer
        noScrollBar={noScrollBar}
        onScroll={_onScroll}
        wait={wait}
        width={width}
        height={height}
        largeWidth={largeWidth}
        largeHeight={largeHeight}
      >
        <Canvas
          ref={ref}
          width={width}
          height={height}
          translateX={scrollLeft}
          translateY={scrollTop}
        />
      </ScrollableCanvasContainer>
    );
  },
);
