import { css } from '../../../styled-system/css';
import AudioController from '../AudioController';
import Badge from '../Badge';
import { IReversibleCardProps } from './types';
import useReversibleCard from './useReversibleCard';

const cardContainerStyle = css({
  width: '100%',
  padding: '16px',
  marginTop: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: '#333',
    color: '#fff',
  },
});

const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const badgeStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const scoreStyle = css({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginLeft: '8px',
});

const cardContentStyle = css({
  width: '100%',
  height: '55vh',
  margin: '8px 0',
  padding: '16px',
  borderWidth: '1px',
  borderColor: 'gray',
  borderRadius: '8px',
  fontSize: '1.1rem',
  overflowY: 'scroll',
  backgroundColor: '#f9f9f9',
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: '#444',
    borderColor: '#666',
  },

  '& table': {
    width: '100%',
  },

  '& table tr.strong-under-line': {
    borderBottomWidth: '1.5px',
  },

  '& table td': {
    minWidth: '4vw',
  },

  '& table, & th, & td': {
    borderWidth: '1px',
    borderColor: 'gray',
    borderCollapse: 'collapse',
    '@media (prefers-color-scheme: dark)': {
      borderColor: '#666',
    },
  },

  '& ol': {
    listStyleType: 'decimal',
    paddingLeft: '1.5em',
  },
});

const buttonControllerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
});

const buttonStyle = css({
  marginRight: '8px',
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  border: 'none',
  fontSize: '1rem',

  '&:hover': {
    backgroundColor: '#0056b3',
  },

  '&:last-child': {
    marginRight: '0',
  },

  '@media (prefers-color-scheme: dark)': {
    backgroundColor: '#0056b3',
    '&:hover': {
      backgroundColor: '#004494',
    },
  },
});

function ReversibleCard({ questions, shuffle }: IReversibleCardProps) {
  const {
    getter: { content, position, swapLabel, questionsCount, audioSource, audioAutoPlay, score },
    setter: { setAudioAutoPlay },
    methods: { triggerAudioEasterEgg, prev, next, swap },
  } = useReversibleCard({ questions, shuffle });

  return (
    <div className={cardContainerStyle}>
      <div className={headerStyle} onClick={triggerAudioEasterEgg}>
        <div className={badgeStyle}>
          <Badge>{score}</Badge>
          <span className={scoreStyle}>Score</span>
        </div>
        <p>
          {position + 1}/{questionsCount} Questions
        </p>
      </div>
      <div className={cardContentStyle} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={buttonControllerStyle}>
        <button className={buttonStyle} onClick={prev}>
          이전
        </button>
        <button className={buttonStyle} onClick={swap}>
          {swapLabel}
        </button>
        <button className={buttonStyle} onClick={next}>
          다음
        </button>
      </div>

      {audioSource && (
        <AudioController
          src={audioSource}
          autoPlay={audioAutoPlay}
          onAutoPlayChecked={() => setAudioAutoPlay(!audioAutoPlay)}
        />
      )}
    </div>
  );
}

export default ReversibleCard;
