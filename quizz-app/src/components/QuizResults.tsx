import React from 'react';
import { Trophy } from 'lucide-react';
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100;

  const { width, height } = useWindowSize();

  return (
    <>
    <Confetti height={height} width={width}></Confetti>
     <div className="h-96 flex items-center justify-center bg-gradient-to-b from-indigo-100 via-white to-indigo-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-xl border border-gray-200 text-center transform transition-transform hover:scale-105">
        <div className="flex justify-center items-center mb-6">
          <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          🎉 Quiz Complete! 🎉
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Your score: <span className="font-bold text-indigo-600">{score}</span> out of{" "}
          <span className="font-bold text-indigo-600">{totalQuestions}</span> (<span className="font-bold">{percentage.toFixed(1)}%</span>)
        </p>
       
      </div>
    </div>
    </>
   
  );
}
  