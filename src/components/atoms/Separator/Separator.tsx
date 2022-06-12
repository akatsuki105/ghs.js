import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

type SeparatorOrientation = 'horizontal' | 'vertical';

type SeparatorColor = 'grey' | 'blue' | 'green' | 'red';

interface SeparatorProps {
  color?: SeparatorColor;
  axis?: SeparatorOrientation;
  stretch?: boolean;
}

export const Separator: React.FC<SeparatorProps> = React.memo(({ color, axis, stretch }) => {
  const theme = useContext(ThemeContext);
  const palette = color ? theme.color[color] : theme.color.grey;

  let boxShadow = `0 -1px 0px ${palette[300]}`;
  if (axis === 'vertical') {
    boxShadow = `-1px 0px 0px ${palette[300]}ff`;
  }

  const Content = useMemo(() => {
    return <StyledSeparator color={palette[100]} boxShadow={boxShadow} axis={axis} />;
  }, [palette, boxShadow, axis]);

  if (stretch) {
    return <div className="self-stretch">{Content}</div>;
  }

  return Content;
});

interface StyledSeparatorProps {
  color: string;
  boxShadow: string;
  axis?: SeparatorOrientation;
}

const StyledSeparator = styled.div<StyledSeparatorProps>`
  background-color: ${(props) => props.color};
  box-shadow: ${(props) => props.boxShadow};
  height: ${(props) => (props.axis === 'vertical' ? '100%' : '1px')};
  width: ${(props) => (props.axis === 'vertical' ? '1px' : '100%')};
`;
