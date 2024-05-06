import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { css } from '../../styled-system/css';
import useSpeakingCard from '../hooks/useSpeakingCard';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { subjects } = useSpeakingCard();

  return (
    <>
      {/* {questions.length && <ReversibleCard questions={questions} />} */}
      <section>
        <h2 className={css({ color: 'primary' })}>과목 선택</h2>
        <hr />
        <ul>
          <li>
            <Link to={'/card/all'}>
              <button>전체 보기</button>
            </Link>
          </li>
          {subjects.map((subject) => (
            <li key={subject.label}>
              <Link to={`/card/${subject.id}`}>
                <button>{subject.label}</button>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
