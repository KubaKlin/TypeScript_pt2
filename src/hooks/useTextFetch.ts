import {
  useGetTextWithParamsQuery,
  useGetTextWithSentencesQuery,
} from '../store/api';
import { TextType } from '../types';

export const useTextFetch = (textType: TextType, textAmount: number) => {
  const { data: paragraphText, refetch: refetchParagraphs } =
    useGetTextWithParamsQuery(textAmount, {
      skip: textType !== 'paragraphs',
    });

  const { data: sentenceText, refetch: refetchSentences } =
    useGetTextWithSentencesQuery(textAmount, {
      skip: textType !== 'sentences',
    });

  let targetText: string;
  if (textType === 'paragraphs') {
    targetText = paragraphText?.join(' ') || '';
  } else {
    targetText = sentenceText?.join(' ') || '';
  }

  const refetchText = () => {
    if (textType === 'paragraphs') {
      refetchParagraphs();
    } else {
      refetchSentences();
    }
  };

  return {
    targetText,
    refetchText,
  };
};
