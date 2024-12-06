import React from 'react';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (selectedIndex: number) => void;
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className="w-full p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-md transition-colors duration-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}