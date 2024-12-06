import { useState } from 'react';
import { Question, QuizState } from '../types/quiz';

const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'What is React?',
    options: [
      'A JavaScript library for building user interfaces',
      'A programming language',
      'A database management system',
      'An operating system'
    ],
    correctAnswer: 0
  },
  {
    id: '2',
    text: 'Which hook is used for side effects in React?',
    options: [
      'useState',
      'useEffect',
      'useContext',
      'useReducer'
    ],
    correctAnswer: 1
  }
];

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false
  });

  const addQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString()
    };
    setState(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const deleteQuestion = (id: string) => {
    setState(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const answerQuestion = (selectedAnswer: number) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setState(prev => {
      const newIndex = prev.currentQuestionIndex + 1;
      const isFinished = newIndex >= prev.questions.length;

      return {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentQuestionIndex: newIndex,
        isFinished
      };
    });
  };

  const restartQuiz = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false
    }));
  };

  return {
    state,
    addQuestion,
    deleteQuestion,
    answerQuestion,
    restartQuiz
  };
}