import React from 'react';

type Props = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  translateX?: number;
  translateY?: number;
};

export const Canvas = React.forwardRef<HTMLCanvasElement, Props>(
  ({ top = 0, left = 0, width = 500, height = 500, translateX = 0, translateY = 0 }, ref) => {
    return (
      <canvas
        style={{
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${translateX}px, ${translateY}px)`,
          position: 'absolute',
          outline: 'none',
          overflow: 'hidden',
          imageRendering: 'pixelated',
        }}
        ref={ref}
      />
    );
  },
);
