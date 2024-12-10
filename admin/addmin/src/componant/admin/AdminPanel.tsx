import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Input, Select, Button, Card, Space, Form } from 'antd';  // Importing Ant Design components
import './AdminPanel.css';  // Import the external CSS file
import { Navigate, useNavigate } from 'react-router-dom';

export function AdminPanel({ questions, onAddQuestion, onDeleteQuestion }) {
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const Navigate = useNavigate()

  const handleSubmit = (value:{}) => {
    



    onAddQuestion(newQuestion);
    setNewQuestion({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  };

  return (
    <div className="admin-panel-container">
      <h2 className="admin-panel-title">Quiz Admin Panel</h2>
      <Button onClick={()=>Navigate("/")}>AdminPanel</Button>

      <Form onFinish={handleSubmit} className="question-form">
        <div className="form-group">
          <label className="form-label">Question Text</label>
          <Input
            type="text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            className="form-input"
            required
            placeholder="Enter your question here"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Options</label>
          {newQuestion.options.map((option, index) => (
            <Input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...newQuestion.options];
                newOptions[index] = e.target.value;
                setNewQuestion({ ...newQuestion, options: newOptions });
              }}
              className="form-input option-input"
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Correct Answer</label>
          <Select 
            value={newQuestion.correctAnswer}
            onChange={(value) => setNewQuestion({ ...newQuestion, correctAnswer: value })}
            className="form-input"
          >
            {newQuestion.options.map((_, index) => (
              <Select.Option key={index} value={index}>
                Option {index + 1} 
              </Select.Option>
            ))}
          </Select>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusCircle size={20} />}
          className="submit-button"
        >
          Add Question
        </Button>
      </Form>
    </div>
  );
}
