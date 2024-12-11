import React, { useState } from 'react';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
// import { AdminPanel } from './components/AdminPanel';
import { useQuiz } from './hooks/useQuiz';
import { Settings } from 'lucide-react';

export const QuizzApp = () => {
  
  const { state, answerQuestion, restartQuiz} = useQuiz();

  const [showAdmin, setShowAdmin] = useState(false);

  const [testname,SetTestname] = useState("Quiz Programming")

  const [teststart,setTeststart] = useState(true);


  const currentQuestion = state.questions[state.currentQuestionIndex];

  return (
<>
{teststart ? (
  <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
    <div className="max-w-4xl mx-auto shadow-lg rounded-lg bg-white text-gray-900">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold">{testname}</h1>
      </div>

      <div className="p-6">
        {showAdmin ? null : (
          <div className="flex justify-center">
            {state.isFinished ? (
              <QuizResults
                score={state.score}
                totalQuestions={state.questions.length}
                onRestart={restartQuiz}
              />
            ) : (
              currentQuestion && (
                <QuizQuestion
                  question={currentQuestion}
                  onAnswer={answerQuestion}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  </div>
) : (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <h1 className="text-2xl font-bold text-gray-800">There is no test now</h1>
  </div>
)}
    </>
  );
}

