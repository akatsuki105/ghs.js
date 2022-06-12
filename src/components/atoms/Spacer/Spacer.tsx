import React from 'react';
import theme from '../../../theme';

type Size = keyof typeof sizes;

const sizes = {
  sm: theme.spacing[2],
  md: theme.spacing[4],
  lg: theme.spacing[6],
  xl: theme.spacing[8],
} as const;

type Props = {
  className?: string;
  axis?: 'vertical' | 'horizontal';
  size?: Size;
};

// https://www.joshwcomeau.com/react/modern-spacer-gif/
export const Spacer: React.VFC<Props> = ({ size = 'md', axis, className = '', ...delegated }) => {
  const width = axis === 'vertical' ? 1 : sizes[size];
  const height = axis === 'horizontal' ? 1 : sizes[size];

  return (
    <span
      className={className}
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
      {...delegated}
    />
  );
};
