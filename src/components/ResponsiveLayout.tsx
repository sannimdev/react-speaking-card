import React from 'react';
import { css } from '../../styled-system/css';

interface IProps extends React.PropsWithChildren {}

const style = {
  display: 'flex',
  padding: '16px',
  width: '768px',
  margin: '0 auto !important',
  '@media (max-width: 767px)': {
    width: '100vw',
  },
};

function ResponsiveLayout({ children }: IProps) {
  return <div className={css(style)}>{children}</div>;
}

export default ResponsiveLayout;
