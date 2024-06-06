import { PropsWithChildren } from 'react';
import { css } from '../../styled-system/css';

const badgeContainerStyle = css({
  display: 'inline-block',
  fontWeight: 'bold',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  lineHeight: '24px',
  textAlign: 'center',
  backgroundColor: '#FFD700',
  border: '0',
  color: '#000',
  '@media (prefers-color-scheme: light)': {
    backgroundColor: '#007BFF',
    color: '#fff !important',
  },
});

function Badge({ children }: PropsWithChildren) {
  return <div className={badgeContainerStyle}>{children}</div>;
}

export default Badge;
