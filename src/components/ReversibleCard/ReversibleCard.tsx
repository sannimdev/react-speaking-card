import { css } from '../../../styled-system/css';
import AudioController from '../AudioController';
import Badge from '../Badge';
import { IReversibleCardProps } from './types';
import useReversibleCard from './useReversibleCard';

const cardContainerStyle = css({
  alignSelf: 'flex-start',
  width: '100%',
  padding: '8px',
  marginTop: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#2a2a2a',
  color: '#fff',
  '@media (prefers-color-scheme: light)': {
    backgroundColor: '#fafafa',
  },
});

const cardInformationStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '8px',
});

const badgeStyle = css({
  display: 'flex',
  alignItems: 'center',
  height: '24px',
  userSelect: 'none',
  '& > li': {
    '&:not(:last-child)': {
      marginRight: '8px',
    },
  },
});

const cardContentStyle = css({
  width: '100%',
  height: '62vh',
  padding: '8px',
  borderWidth: '1px',
  borderColor: 'gray',
  borderRadius: '8px',
  fontSize: '1.1rem',
  overflowY: 'auto',
  backgroundColor: '#f9f9f9',
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: '#242424',
    borderColor: '#404040',
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
    paddingLeft: '1.5rem',
  },

  '& ul': {
    listStyleType: 'disc',
    paddingLeft: '1.5rem',
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
    getter: {
      answer,
      displayedQuestions,
      isFront,
      position,
      swapLabel,
      questionsCount,
      audioSource,
      audioAutoPlay,
      scores,
      priority,
    },
    setter: { setAudioAutoPlay },
    methods: { triggerAudioEasterEgg, prev, next, swap },
  } = useReversibleCard({ questions, shuffle });

  const ulDisplayedQuestions = (
    <ul>
      {displayedQuestions.map((question) => (
        <li>{question}</li>
      ))}
    </ul>
  );
  const cardContent = isFront ? (
    <div className={cardContentStyle}>{ulDisplayedQuestions}</div>
  ) : (
    <div className={cardContentStyle} dangerouslySetInnerHTML={{ __html: answer }} />
  );

  return (
    <div className={cardContainerStyle}>
      {cardContent}
      <div className={cardInformationStyle} onClick={triggerAudioEasterEgg}>
        <ul className={badgeStyle}>
          {scores?.gpt4o && (
            <li>
              G <Badge number={scores.gpt4o} />
            </li>
          )}
          {scores?.claudeOpus && (
            <li>
              C <Badge number={scores.claudeOpus} />
            </li>
          )}
        </ul>
        <div>
          <p>
            {'🔥'.repeat(priority)} {position + 1}/{questionsCount} Questions
          </p>
        </div>
      </div>
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
