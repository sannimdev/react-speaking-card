import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SPEAKING_INDEX_URL } from '../constants';
import { questionsAtom } from '../atoms';
import { IQuestion, ISubject } from '../types';
import ReversibleCard from '../components/ReversibleCard';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSubjects] = useState<ISubject[]>([]);
  const [questions, setQuestions] = useAtom(questionsAtom);

  useEffect(() => {
    async function fetchSpeakingIndex() {
      try {
        const response = await axios.get(SPEAKING_INDEX_URL);
        const subjects = response.data as ISubject[];
        const questions = subjects.reduce((result: IQuestion[], subject) => {
          return [...result, ...subject.questions];
        }, []);

        setSubjects(subjects);
        setQuestions(questions);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSpeakingIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {questions.length && <ReversibleCard questions={questions} />}
      {/* <section>
        <h1 className={css({ color: 'primary' })}>과목 선택</h1>
        <ul>
          <li>
            <button>전체</button>
          </li>
          {subjects.map((subject) => (
            <li key={subject.label}>
              <button>{subject.label}</button>
            </li>
          ))}
        </ul>
      </section> */}
    </>
  );
}
