import React from 'react';
import { Trophy } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-lg mb-4">
        Your score: {score} out of {totalQuestions} ({percentage.toFixed(1)}%)
      </p>
      <button
        onClick={onRestart}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}