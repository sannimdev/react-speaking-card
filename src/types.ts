export interface IEncryptedData {
  encryptedData: string;
}

export interface ISubject {
  id: string;
  label: string;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  similarQuestions?: string[];
  answer: string;
  keywords?: string[];
  mainKeywords?: string[];
  audio?: {
    question?: string;
    answer?: string;
  };
  scores?: {
    chatgpt_4o?: number;
    claude_opus?: number;
  };
}

export function generateSampleQuestion(): IQuestion {
  const rawAnswer = `<strong>ATP</strong>는 <strong class="keyword">사람의 몸에서 사용하는 에너지원</strong>으로 탄수화물, 지방, 단백질의 대사작용을 통해 몸이 즉시 사용할 수 있는 ATP 에너지를 만듭니다.`;
  const answer = rawAnswer.replace(/\n/g, ' <br />');
  const [keywords, mainKeywords] = extractKeywords(answer);

  return {
    question: 'ATP에 대해 설명해 보세요.',
    similarQuestions: ['인원질 시스템이란 무엇인지 설명해 보세요.', '젖산이 생기는 이유에 대해 설명해 보세요.'],
    answer,
    keywords,
    mainKeywords,
  };
}

function extractKeywords(text: string): [string[], string[]] {
  const keywordRegex = /<strong>([^<]+)<\/strong>/g;
  const mainKeywordRegex = /<strong class="keyword">([^<]+)<\/strong>/g;

  const keywords = [...text.matchAll(keywordRegex)].map((match) => match[1]);
  const mainKeywords = [...text.matchAll(mainKeywordRegex)].map((match) => match[1]);

  return [keywords, mainKeywords];
}
