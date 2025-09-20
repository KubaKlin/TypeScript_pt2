export interface TypingStats {
  wordsPerMinute: number;
  accuracy: number;
  timeElapsed: number;
  totalCharacters: number;
  correctCharacters: number;
}

export type TextType = 'paragraphs' | 'sentences';
