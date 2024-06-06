import { css } from '../../styled-system/css';

interface Props {
  number: number;
}

const badgeContainerStyle = css({
  display: 'inline-block',
  fontWeight: 'bold',
  borderRadius: '50%',
  letterSpacing: '-0.5px',
  width: '24px',
  height: '24px',
  lineHeight: '24px',
  textAlign: 'center',
  border: '0',
  color: '#000',
  backgroundColor: '#7BD3EA',

  '@media (prefers-color-scheme: light)': {
    backgroundColor: '#EE4E4E',
    color: '#fff !important',
  },
});

function Badge({ number }: Props) {
  return <div className={badgeContainerStyle}>{number}</div>;
}

export default Badge;
