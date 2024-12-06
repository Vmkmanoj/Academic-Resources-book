import React, { useState } from 'react';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { AdminPanel } from './components/AdminPanel';
import { useQuiz } from './hooks/useQuiz';
import { Settings } from 'lucide-react';

function App() {
  const { state, addQuestion, deleteQuestion, answerQuestion, restartQuiz } = useQuiz();
  const [showAdmin, setShowAdmin] = useState(false);

  const currentQuestion = state.questions[state.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">React Quiz App</h1>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            <Settings size={20} />
            {showAdmin ? 'Take Quiz' : 'Admin Panel'}
          </button>
        </div>

        {showAdmin ? (
          <AdminPanel
            questions={state.questions}
            onAddQuestion={addQuestion}
            onDeleteQuestion={deleteQuestion}
          />
        ) : (
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
  );
}

export default App;