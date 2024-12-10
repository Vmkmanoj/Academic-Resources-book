import React from 'react';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (selectedIndex: number) => void;
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl p-8 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className="w-full p-4 text-lg text-gray-700 bg-gray-50 rounded-lg border border-gray-300 shadow transition-transform transform hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-lg"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
