export interface TypingStats {
  wordsPerMinute: number;
  accuracy: number;
  timeElapsedInMinutes: number;
  totalCharacters: number;
  correctCharacters: number;
}

export type TextType = 'paragraphs' | 'sentences';
