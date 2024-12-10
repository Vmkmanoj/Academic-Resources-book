export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
}