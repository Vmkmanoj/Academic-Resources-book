import { useEffect, useState } from 'react';
import { Question, QuizState } from '../types/quiz';

export function useQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
  });

  // Fetch questions from the backend
  const getQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3000/getquestion', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data: Question[] = await response.json();
      setQuestions(data); // Update the questions state
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Populate state.questions after fetching
  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setState(prev => ({
        ...prev,
        questions,
      }));
    }
  }, [questions]);

  // Add a new question manually
  const addQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
    };

    setState(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  // Handle answering a question
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
        isFinished,
      };
    });
  };

  // Restart the quiz
  const restartQuiz = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
    }));
  };

  return {
    state,
    addQuestion,
    answerQuestion,
    restartQuiz,
  };
}
