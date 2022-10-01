import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { ScrollableCanvasContainer } from './ScrollableCanvasContainer';

type Props = {
  width: number;
  height: number; // 可視部分の高さ
  largeWidth: number;
  largeHeight: number; // 内部データを全部一気に表示した場合の高さ
  wait?: number;
  className?: string;
  onScroll?: (x: number, y: number) => void;

  // スクロール位置を強制的に変えたい時(-1 で変えない)
  scx?: number;
  scy?: number;
};

export const ScrollableCanvas = React.forwardRef<HTMLCanvasElement, Props>(
  (
    { width, height, largeWidth, largeHeight, wait = 10, className, onScroll, scx = -1, scy = -1 },
    ref,
  ) => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const _onScroll = (x: number, y: number) => {
      setScrollX(x);
      setScrollY(y);

      if (onScroll) {
        onScroll(x, y);
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
        scx={scx}
        scy={scy}
      >
        <Canvas ref={ref} width={width} height={height} translateX={scrollX} translateY={scrollY} />
      </ScrollableCanvasContainer>
    );
  },
);
