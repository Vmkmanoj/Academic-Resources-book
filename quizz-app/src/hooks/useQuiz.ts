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
  },{
    id: '3',
    text: 'What is the default value of the `useState` hook?',
    options: [
      'null',
      'undefined',
      'false',
      'initial value passed to useState'
    ],
    correctAnswer: 3
  },
  {
    id: '4',
    text: 'Which method is used to update state in React?',
    options: [
      'setState',
      'updateState',
      'changeState',
      'modifyState'
    ],
    correctAnswer: 0
  },
  {
    id: '5',
    text: 'What is JSX in React?',
    options: [
      'JavaScript and XML',
      'JavaScript Syntax Extension',
      'JavaScript XML Extension',
      'JavaScript Execution'
    ],
    correctAnswer: 1
  },
  {
    id: '6',
    text: 'What does the `useContext` hook do?',
    options: [
      'It creates a new context',
      'It allows you to access values from a parent component’s context',
      'It is used for side effects',
      'It replaces useReducer'
    ],
    correctAnswer: 1
  },
  {
    id: '7',
    text: 'What is the purpose of the `useEffect` hook?',
    options: [
      'To manage state',
      'To handle side effects like fetching data or subscribing to events',
      'To create context',
      'To update the DOM directly'
    ],
    correctAnswer: 1
  },
  {
    id: '8',
    text: 'Which React hook is used for performance optimization?',
    options: [
      'useMemo',
      'useState',
      'useContext',
      'useEffect'
    ],
    correctAnswer: 0
  },
  {
    id: '9',
    text: 'What does `useRef` do in React?',
    options: [
      'It stores mutable values that do not trigger re-renders',
      'It is used to manage state',
      'It accesses DOM elements directly',
      'It creates a context'
    ],
    correctAnswer: 0
  },
  {
    id: '10',
    text: 'What does the `useReducer` hook do in React?',
    options: [
      'It updates state with complex logic',
      'It is used for handling side effects',
      'It is a replacement for `useState`',
      'It is used for routing'
    ],
    correctAnswer: 0
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


const questions = [
  {
    id: '1',
    text: 'What is the default value of the `useState` hook?',
    options: [
      'null',
      'undefined',
      'false',
      'initial value passed to useState'
    ],
    correctAnswer: 3
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
  },
  {
    id: '3',
    text: 'Which of the following is used to manage routing in React?',
    options: [
      'react-router-dom',
      'useNavigate',
      'react-router',
      'react-route'
    ],
    correctAnswer: 0
  },
  {
    id: '4',
    text: 'Which method is used to update state in React?',
    options: [
      'setState',
      'updateState',
      'changeState',
      'modifyState'
    ],
    correctAnswer: 0
  },
  {
    id: '5',
    text: 'What is JSX in React?',
    options: [
      'JavaScript and XML',
      'JavaScript Syntax Extension',
      'JavaScript XML Extension',
      'JavaScript Execution'
    ],
    correctAnswer: 1
  },
  {
    id: '6',
    text: 'What does the `useContext` hook do?',
    options: [
      'It creates a new context',
      'It allows you to access values from a parent component’s context',
      'It is used for side effects',
      'It replaces useReducer'
    ],
    correctAnswer: 1
  },
  {
    id: '7',
    text: 'What is the purpose of the `useEffect` hook?',
    options: [
      'To manage state',
      'To handle side effects like fetching data or subscribing to events',
      'To create context',
      'To update the DOM directly'
    ],
    correctAnswer: 1
  },
  {
    id: '8',
    text: 'Which React hook is used for performance optimization?',
    options: [
      'useMemo',
      'useState',
      'useContext',
      'useEffect'
    ],
    correctAnswer: 0
  },
  {
    id: '9',
    text: 'What does `useRef` do in React?',
    options: [
      'It stores mutable values that do not trigger re-renders',
      'It is used to manage state',
      'It accesses DOM elements directly',
      'It creates a context'
    ],
    correctAnswer: 0
  },
  {
    id: '10',
    text: 'What does the `useReducer` hook do in React?',
    options: [
      'It updates state with complex logic',
      'It is used for handling side effects',
      'It is a replacement for `useState`',
      'It is used for routing'
    ],
    correctAnswer: 0
  }
];
