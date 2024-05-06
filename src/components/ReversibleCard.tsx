import { useEffect, useState } from 'react';
import { IQuestion } from '../types';
import { css } from '../../styled-system/css';
import useAudioEasterEgg from '../hooks/useAudioEasterEgg';

interface IProps {
  questions: IQuestion[];
  shuffle?: boolean;
}

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

const soundControllerStyle = {
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

function ReversibleCard({ questions, shuffle }: IProps) {
  const questionsCount = questions.length;
  const { audioEasterEgg, triggerAudioEasterEgg } = useAudioEasterEgg();

  const [cards, setCards] = useState<IQuestion[]>([]);
  const [position, setPosition] = useState(0);
  const [isFront, setIsFront] = useState(true);

  const card = cards[position];
  const content = isFront ? card?.question : card?.answer;

  useEffect(() => {
    setCards(shuffle ? questions.slice().sort(() => Math.random() - 0.5) : questions.slice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => {
    setPosition((position) => (position - 1 >= 0 ? position - 1 : questionsCount - 1));
    setIsFront(true);
  };

  const next = () => {
    setPosition((position) => (position + 1) % questionsCount);
    setIsFront(true);
  };
  const swapLabel = isFront ? '정답 보기' : '질문 보기';
  const swap = () => {
    setIsFront(!isFront);
  };

  return (
    <div className={css(cardContainerStyle)}>
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
      {/* TODO: 컴포넌트 만들기 */}
      {audioEasterEgg > 15 && card?.audio && isFront && (
        <div className={css(soundControllerStyle)}>
          <audio controls>
            <source src={card.audio.question} type="audio/mp4" />이 브라우저는 오디오 요소를 지원하지 않습니다.
          </audio>
        </div>
      )}
      {audioEasterEgg > 15 && card?.audio && !isFront && (
        <div className={css(soundControllerStyle)}>
          <audio controls>
            <source src={card.audio.answer} type="audio/mp4" />이 브라우저는 오디오 요소를 지원하지 않습니다.
          </audio>
        </div>
      )}
    </div>
  );
}

export default ReversibleCard;
