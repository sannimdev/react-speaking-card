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

  const questions =
    subjectId === 'all' //
      ? allQuestions
      : subjects.find(({ id }) => id === subjectId)?.questions;

  return <ReversibleCard questions={questions || []} />;
}
