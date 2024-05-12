import { css } from '../../../styled-system/css';
import AudioController from '../AudioController';
import { IReversibleCardProps } from './types';
import useReversibleCard from './useReversibleCard';

const cardContainerStyle = {
  width: '100%',
};

const cardContentStyle = {
  width: '100%',
  height: '60vh',
  margin: '16px 0',
  padding: '8px',
  borderWidth: '1px',
  borderColor: 'gray',
  borderRadius: '8px',
  fontSize: '1.1rem',
  overflowY: 'scroll',

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
  },

  '& ol': {
    listStyleType: 'decimal',
    paddingLeft: '1.5em',
  },
};

const navigatorStyle = {
  textAlign: 'right',
  fontSize: '0.9rem;',
};

const buttonControllerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

const buttonStyle = {
  marginRight: '8px',
  _last: { marginRight: '0' },
};

function ReversibleCard({ questions, shuffle, subject }: IReversibleCardProps) {
  const {
    getter: { content, position, swapLabel, questionsCount, audioSource, audioAutoPlay },
    setter: { setAudioAutoPlay },
    methods: { triggerAudioEasterEgg, prev, next, swap },
  } = useReversibleCard({ questions, shuffle });

  return (
    <div className={css(cardContainerStyle)}>
      <div>{subject}</div>
      <div className={css(navigatorStyle)} onClick={triggerAudioEasterEgg}>
        ({position + 1}/{questionsCount})
      </div>
      <div className={css(cardContentStyle)} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={css(buttonControllerStyle)}>
        <button className={css(buttonStyle)} onClick={prev}>
          이전
        </button>
        <button className={css(buttonStyle)} onClick={swap}>
          {swapLabel}
        </button>
        <button className={css(buttonStyle)} onClick={next}>
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
