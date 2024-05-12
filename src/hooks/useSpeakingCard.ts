import CryptoJS from 'crypto-js';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { allQuestionsAtom, subjectsAtom } from '../atoms';
import axios from 'axios';
import { SPEAKING_INDEX_URL, SPEAKING_SECRET_KEY } from '../constants';
import { IEncryptedData, IQuestion, ISubject } from '../types';

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

        const { encryptedData } = response.data as IEncryptedData;

        const bytes = CryptoJS.AES.decrypt(encryptedData, SPEAKING_SECRET_KEY);

        const decryptedJsonData = bytes.toString(CryptoJS.enc.Utf8);

        const jsonData = JSON.parse(decryptedJsonData);

        const subjects = jsonData as ISubject[];
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
