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
  height: number;
  largeWidth: number;
  largeHeight: number;
  wait?: number;
  onScroll?: (scrollTop: number, scrollLeft: number) => void;
  children: React.ReactNode;
};

export const ScrollableCanvasContainer: React.VFC<Props> = React.memo(
  ({ width, height, largeWidth, largeHeight, wait = 10, onScroll, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const _onScroll = throttle(() => {
      if (ref.current === null || onScroll == null) {
        return;
      }
      const { scrollTop, scrollLeft } = ref.current;
      onScroll(scrollTop, scrollLeft);
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

    return (
      <ScrollContainer width={width} height={height} ref={ref}>
        <div style={{ overflow: 'hidden', width: largeWidth, height: largeHeight }}>
          <StyledDiv>{children}</StyledDiv>
        </div>
      </ScrollContainer>
    );
  },
);
