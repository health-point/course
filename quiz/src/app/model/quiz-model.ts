export type QuizItemSelect = {
  id: number;
  type: 'select';
  options: string[];
};

export type QuizItemText = {
  id: number;
  type: 'text';
  placeholder: string;
};

export type QuizItem = QuizItemSelect | QuizItemText;

export interface QuizModel {
  id: number;
  title: string;
  description: string;
  items: QuizItem[];
}
