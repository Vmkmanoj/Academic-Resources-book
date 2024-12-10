import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';


export function Test({ questions, onAddQuestion, onDeleteQuestion }) {
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddQuestion(newQuestion);
    setNewQuestion({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Quiz Admin Panel</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Question Text</label>
          <input
            type="text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Options</label>
          {newQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...newQuestion.options];
                newOptions[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options: newOptions });
              }}
              className="w-full p-2 border rounded-md mb-2"
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Correct Answer</label>
          <select
            value={newQuestion.correctAnswer}
            onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: Number(e.target.value) })}
            className="w-full p-2 border rounded-md"
          >
            {newQuestion.options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <PlusCircle size={20} />
          Add Question
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Questions</h3>
        {questions.map((question) => (
          <div key={question.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{question.text}</p>
                <ul className="mt-2 space-y-1">
                  {question.options.map((option, index) => (
                    <li key={index} className={index === question.correctAnswer ? 'text-green-600 font-medium' : ''}>
                      {index + 1}. {option}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onDeleteQuestion(question.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
