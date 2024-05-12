import { createFileRoute } from '@tanstack/react-router';
import ReversibleCard from '../components/ReversibleCard';
import useSpeakingCard from '../hooks/useSpeakingCard';

export const Route = createFileRoute('/card/$subjectId')({
  component: CardRenderComponent,
});

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

  return <ReversibleCard questions={questions || []} shuffle={subjectId === 'all'} subject={subject?.label} />;
}
