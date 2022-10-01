import { throttle } from 'lodash-es';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: auto;
  overflow-y: scroll;
`;

const StyledDiv = styled.div`
  position: relative;
  outline: none;
`;

type Props = {
  width: number;
  height: number; // 可視部分の高さ
  largeWidth: number;
  largeHeight: number; // 内部データを全部一気に表示した場合の高さ
  wait?: number;
  onScroll?: (x: number, y: number) => void;
  className?: string;
  children: React.ReactNode;

  // スクロール位置を強制的に変えたい時(-1 で変えない)
  scx?: number;
  scy?: number;
};

export const ScrollableCanvasContainer: React.VFC<Props> = React.memo(
  ({
    width,
    height,
    largeWidth,
    largeHeight,
    wait = 10,
    onScroll,
    className,
    children,
    scx = -1,
    scy = -1,
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    const _onScroll = throttle(() => {
      if (ref.current === null || onScroll == null) {
        return;
      }
      const { scrollTop, scrollLeft } = ref.current;
      onScroll(scrollLeft, scrollTop);
    }, wait);

    useEffect(() => {
      if (ref.current == null) {
        return;
      }
      ref.current.addEventListener('scroll', _onScroll);

      return () => {
        if (ref?.current) {
          ref.current.removeEventListener('scroll', _onScroll); // eslint-disable-line
        }
      };
    }, [ref, _onScroll]);

    useEffect(() => {
      if (ref.current === null) {
        return;
      }

      const x = scx >= 0 ? scx : ref.current.scrollLeft;
      const y = scx >= 0 ? scy : ref.current.scrollTop;
      ref.current.scrollTo(x, y);
    }, [scx, scy]);

    return (
      <ScrollContainer width={width} height={height} ref={ref} className={className}>
        <div style={{ overflow: 'hidden', width: largeWidth, height: largeHeight }}>
          <StyledDiv>{children}</StyledDiv>
        </div>
      </ScrollContainer>
    );
  },
);
