import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { IQuestion, ISubject } from './types';

const SPEAKING_INDEX_URL = import.meta.env.VITE_SPEAKING_INDEX_URL;

function App() {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    async function fetchSpeakingIndex() {
      try {
        const response = await axios.get(SPEAKING_INDEX_URL);
        const subjects = response.data as ISubject[];

        setSubjects(subjects);

        const questions = subjects.reduce((result: IQuestion[], subject) => {
          return [...result, ...subject.questions];
        }, []);

        setQuestions(questions);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSpeakingIndex();
  }, []);

  return (
    <div>
      <section>
        <h1>과목 선택</h1>
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
    </div>
  );
}

export default App;
