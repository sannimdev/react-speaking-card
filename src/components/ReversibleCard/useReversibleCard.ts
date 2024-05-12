import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { audioAutoPlayAtom } from '../../atoms';
import useAudioEasterEgg from '../../hooks/useAudioEasterEgg';
import { IQuestion } from '../../types';
import { IReversibleCardProps } from './types';

const useReversibleCard = ({ questions, shuffle }: IReversibleCardProps) => {
  const questionsCount = questions.length;
  const [audioAutoPlay, setAudioAutoPlay] = useAtom(audioAutoPlayAtom);
  const { triggerAudioEasterEgg } = useAudioEasterEgg();

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

  const audioSource = card?.audio && isFront ? card?.audio?.question : card?.audio?.answer;

  return {
    getter: {
      audioAutoPlay,
      content,
      swapLabel,
      audioSource,
      position,
      questionsCount,
    },

    setter: {
      setAudioAutoPlay,
    },

    methods: {
      triggerAudioEasterEgg,
      prev,
      next,
      swap,
    },
  };
};

export default useReversibleCard;