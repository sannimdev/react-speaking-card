import { useState } from 'react';
import { IQuestion } from '../types';
import { css } from '../../styled-system/css';

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
  padding: '16px',
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

function ReversibleCard({ questions, shuffle }: IProps) {
  const questionsCount = questions.length;
  const cards = shuffle ? questions.slice().sort(() => Math.random() - 0.5) : questions;
  const [position, setPosition] = useState(0);
  const [isFront, setIsFront] = useState(true);

  const next = () => {
    setPosition((position) => (position + 1) % questionsCount);
    setIsFront(true);
  };

  const swapLabel = isFront ? '정답 보기' : '질문 보기';
  const swap = () => {
    setIsFront(!isFront);
  };

  const card = cards[position];
  const content = isFront ? card.question : card.answer;

  return (
    <div className={css(cardContainerStyle)}>
      <div className={css(navigatorStyle)}>
        ({position + 1}/{questionsCount})
      </div>
      <div className={css(cardContentStyle)} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={css(buttonControllerStyle)}>
        <button className={css(buttonStyle)} onClick={swap}>
          {swapLabel}
        </button>
        <button className={css(buttonStyle)} onClick={next}>
          다음
        </button>
      </div>
    </div>
  );
}

export default ReversibleCard;
