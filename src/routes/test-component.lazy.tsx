import { createFileRoute } from '@tanstack/react-router';
import ReversibleCard from '../components/ReversibleCard';

export const Route = createFileRoute('/test-component')({
  component: CardRenderComponent,
});

function CardRenderComponent() {
  const questions = [
    {
      id: 8001,
      question: '생활체육의 정의에 대해 설명하세요',
      similarQuestions: [],
      answer: /*html*/ `
        <ul>
        <li>
            <strong>A</strong><br />
            <ol>
                <li><strong class="keyword">1</strong>과 <strong class="keyword">2</strong>을 높이고</li>
                <li><strong class="keyword">3</strong>하고</li>
            </ol>
        </li>
        <li>
            <br/>
            <strong>B</strong><br />
            <ol>
                <li><strong class="keyword">1</strong>하고</li>
                <li><strong class="keyword">2</strong>시키며</li>
                <li><strong class="keyword">3</strong>시킵니다</li>
            </ol>
        </li>
        </ul>
        `,
      keyword: ['Test', 'Sports for all'],
      mainKeyword: ['A', 'B'],
    },
  ];

  return <ReversibleCard questions={questions || []} subject={'테스트 중'} />;
}
