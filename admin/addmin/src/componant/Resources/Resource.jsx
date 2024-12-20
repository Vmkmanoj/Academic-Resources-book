import React from 'react';
import { Form, Input, Select, Upload, Button, Rate, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Resource.css';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const Resource = () => {
  const [form] = Form.useForm();

  const Navigate = useNavigate();



  const onFinish = async (values) => {
    console.log('Form values:', values);
  
    try {
      const response = await fetch("http://localhost:3000/CrousePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save the course details. Please try again.');
      }
  
      const data = await response.json();
  
      // Display success message
      message.success('Course details uploaded successfully!');
      console.log('Response:', data);
  
      // Optionally reset the form
      form.resetFields();
  
    } catch (error) {
      // Display error message
      message.error(error.message || 'Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="container">
      <h1 className="title">Upload Course Details</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          level: "Beginner",
        }}
      >
        <div className="form-item">
          <Form.Item
            label="Course Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the course title!' }]}
          >
            <Input className="input" placeholder="Enter course title" />
          </Form.Item>
        </div>

        <div className="form-item">
          <Form.Item
            label="Channel"
            name="channel"
            rules={[{ required: true, message: 'Please enter the channel name!' }]}
          >
            <Input className="input" placeholder="Enter channel name" />
          </Form.Item>
        </div>

        <div className="form-item">
          <Form.Item
            label="Course URL"
            name="url"
            rules={[{ required: true, message: 'Please enter the course URL!' }]}
          >
            <Input className="input" placeholder="Enter course URL" />
          </Form.Item>
        </div>

        <div className="form-item">
          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: 'Please enter the course duration!' }]}
          >
            <Input className="input" placeholder="e.g., 2 hours 30 minutes" />
          </Form.Item>
        </div>

        <div className="form-item">
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please provide a rating!' }]}
          >
            <Rate allowHalf />
          </Form.Item>
        </div>

        <div className="form-item">
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description!' }]}
          >
            <TextArea rows={4} className="input" placeholder="Enter course description" />
          </Form.Item>
        </div>

        <div className="form-item">
          <Form.Item
            label="Views"
            name="views"
            rules={[{ required: true, message: 'Please enter the number of views!' }]}
          >
            <Input className="input" placeholder="e.g., 1.2M" />
          </Form.Item>
        </div>

        <div className="form-item">
          <Form.Item
            label="Level"
            name="level"
            rules={[{ required: true, message: 'Please select a level!' }]}
          >
            <Select className="select">
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Intermediate">Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form-item">

            <Form.Item name="imageUrl" label="imageUrl" rules={[{required:true,message:"Please Enter Urlimage"}]}>

                <Input className='input' placeholder='ImageUrl Link'></Input>

            </Form.Item>
          
         
        </div>
        <div className='' style={{display:"flex",justifyContent:"space-between"}}>

        <Button onClick={()=>Navigate("/")}>Back</Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Submit
          </Button>
        </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Resource;
