import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { questionsAtom } from './atoms';
import { IQuestion, ISubject } from './types';
import { css } from '../styled-system/css';
import ResponsiveLayout from './components/ResponsiveLayout';

const SPEAKING_INDEX_URL = import.meta.env.VITE_SPEAKING_INDEX_URL;

function App() {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQuestions] = useAtom(questionsAtom);

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
    <ResponsiveLayout>
      <section>
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
      </section>
    </ResponsiveLayout>
  );
}

export default App;
