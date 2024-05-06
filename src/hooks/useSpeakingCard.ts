import { useAtom } from 'jotai';
import { allQuestionsAtom, subjectsAtom } from '../atoms';
import { useEffect } from 'react';
import axios from 'axios';
import { SPEAKING_INDEX_URL } from '../constants';
import { IQuestion, ISubject } from '../types';

const useSpeakingCard = () => {
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [allQuestions, setAllQuestions] = useAtom(allQuestionsAtom);

  useEffect(() => {
    if (subjects.length !== 0) {
      return;
    }

    async function fetchSpeakingIndex() {
      try {
        const response = await axios.get(SPEAKING_INDEX_URL);
        const subjects = response.data as ISubject[];
        const allQuestions = subjects.reduce((result: IQuestion[], subject) => {
          return [...result, ...subject.questions];
        }, []);

        setSubjects(subjects);
        setAllQuestions(allQuestions);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSpeakingIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { subjects, allQuestions };
};

export default useSpeakingCard;
