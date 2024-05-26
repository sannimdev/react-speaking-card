import { Link, createFileRoute } from '@tanstack/react-router';
import ReversibleCard from '../components/ReversibleCard';
import useSpeakingCard from '../hooks/useSpeakingCard';
import { css } from '../../styled-system/css';

export const Route = createFileRoute('/card/$subjectId')({
  component: CardRenderComponent,
});

const gnbStyle = {
  display: 'flex',
};

function CardRenderComponent() {
  const { subjectId } = Route.useParams();
  const { subjects, allQuestions } = useSpeakingCard();
  if (subjects.length === 0) {
    return null;
  }

  const subject = subjects.find(({ id }) => id === subjectId);

  const questions =
    subjectId === 'all' //
      ? allQuestions
      : subject?.questions;

  return (
    <>
      <div className={css(gnbStyle)}>
        <h1>
          <Link to="/">구술카드</Link>
        </h1>
        &gt; {subject?.label}
      </div>
      <ReversibleCard questions={questions || []} shuffle={subjectId === 'all'} subject={subject?.label} />
    </>
  );
}
