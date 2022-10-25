import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Center: React.FC<Props> = React.memo(({ children, className }) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    }}
    className={className}
  >
    {children}
  </div>
));
