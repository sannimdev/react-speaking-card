import React from 'react';
import { css } from '../../styled-system/css';

interface IProps extends React.PropsWithChildren {}

const style = {
  display: 'flex',
  padding: '16px',
  width: '768px',
  margin: '0 auto !important',
};

function ResponsiveLayout({ children }: IProps) {
  return <div className={`responsive-layout ${css(style)}`}>{children}</div>;
}

export default ResponsiveLayout;
