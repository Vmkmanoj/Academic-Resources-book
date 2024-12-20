import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Input, Select, Button, Form, message } from 'antd';
import './AdminPanel.css';
import { useNavigate } from 'react-router-dom';

export function AdminPanel() {
  const [newquestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/Questionadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newquestion),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Question added successfully:", result);
      message.success("Question added");

      setNewQuestion({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      });
    } catch (error) {
      console.error("Failed to add question:", error.message);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2 className="admin-panel-title">Quiz Admin Panel</h2>
     

      <Form onFinish={handleSubmit} className="question-form">
        <Form.Item
          label="Question Text"
          rules={[{ required: true, message: 'Please enter the question text.' }]}
        >
          <Input
            value={newquestion.text}
            onChange={(e) => setNewQuestion({ ...newquestion, text: e.target.value })}
            className="form-input"
            placeholder="Enter your question here"
          />
        </Form.Item>

        <Form.Item label="Options">
          {newquestion.options.map((option, index) => (
            <Input
              key={index}
              value={option}
              onChange={(e) => {
                const newOptions = [...newquestion.options];
                newOptions[index] = e.target.value;
                setNewQuestion({ ...newquestion, options: newOptions });
              }}
              className="form-input option-input"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </Form.Item>

        <Form.Item
          label="Correct Answer"
          rules={[{ required: true, message: 'Please select the correct answer.' }]}
        >
          <Select
            value={newquestion.correctAnswer}
            onChange={(value) => setNewQuestion({ ...newquestion, correctAnswer: value })}
            className="form-input"
            placeholder="Select the correct answer"
          >
            {newquestion.options.map((_, index) => (
              <Select.Option key={index} value={index}>
                Option {index + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

<div className='' style={{display:"flex",justifyContent:"space-between"}}>

<Button onClick={() => navigate("/")}>back</Button>


<Button
  type="primary"
  htmlType="submit"
  icon={<PlusCircle size={20} />}
  className="submit-button"
>
  Add Question
</Button>


</div>
       
      </Form>
    </div>
  );
}
