import React, { useState } from 'react';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (selectedIndex: number) => void;
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onAnswer(index);
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-xl border border-gray-200 transform transition-all duration-300 hover:scale-105">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">{question.text}</h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`relative bg-center px-6 py-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
              selectedIndex === index
                ? 'bg-blue-400 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-blue-200 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => handleClick(index)}
          >
            <span className="text-lg">{option}</span>
            {selectedIndex === index && (
              <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-lg"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
