import React, { useState } from 'react';
import { Button, Input, Select, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './ResourceUploadForm.css';  // Import the external CSS file

interface ResourceUploadFormProps {
  onClose: () => void;
}

export const ResourceUploadForm: React.FC<ResourceUploadFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'syllabus',
    subject: '',
    semester: '1',
    department: 'CSE',
  });

  const handleSubmit = async (values: any) => {
    const { title, type, subject, semester, department, file } = values;

    // console.log("dasda",file)
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('subject', subject);
    formData.append('semester', semester);
    formData.append('department', department);
  
    if (file && file[0]?.originFileObj) {
      console.log('Uploading file:', file[0].originFileObj); // Ant Design wraps file in `originFileObj`
      formData.append('file', file[0].originFileObj);
    } else {
      console.error('No file found to upload');
      alert('Please select a file to upload');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/update', {
        method: 'POST',
        body: formData, // sending FormData directly
      });
    
      // Check if the response is successful
      if (!res.ok) {
        const errorText = await res.text(); // get the error response body as text
        console.error('Upload failed with status:', res.status);
        console.error('Error details:', errorText);
        throw new Error('Failed to upload resource');
      }
    
      const data = await res.json(); // If response is successful, parse as JSON
      console.log('Upload successful:', data);
      onClose(); // Close the modal on success
    } catch (error: any) {
      console.error('Error:', error.message);
      alert('Error: ' + error.message);
    }
  };
  

  return (
    <div className="resource-upload-form-overlay">
      <div className="resource-upload-form-container">
        <div className="resource-upload-form-header">
          <h3 className="resource-upload-form-title">Upload New Resource</h3>
          <Button onClick={onClose} className="resource-upload-form-close-button" type="link">
            {/* < className="w-7 h-6" /> */}
          </Button>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
          className="resource-upload-form"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the type!' }]}
          >
            <Select value={formData.type} onChange={(value) => setFormData({ ...formData, type: value })}>
              <Select.Option value="syllabus">Syllabus</Select.Option>
              <Select.Option value="questionBank">Question Bank</Select.Option>
              <Select.Option value="eBook">E-Book</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please input the subject!' }]}
          >
            <Input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item label="Semester" name="semester" rules={[{ required: true, message: 'Please select the semester!' }]}>
              <Select value={formData.semester} onChange={(value) => setFormData({ ...formData, semester: value })}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <Select.Option key={sem} value={sem}>{sem}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please select the department!' }]}>
              <Select value={formData.department} onChange={(value) => setFormData({ ...formData, department: value })}>
                <Select.Option value="CSE">CSE</Select.Option>
                <Select.Option value="ECE">ECE</Select.Option>
                <Select.Option value="EEE">EEE</Select.Option>
                <Select.Option value="MECH">MECH</Select.Option>
                <Select.Option value="MCA">MCA</Select.Option>
                <Select.Option value="MSCS">MSCS</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
  label="File"
  name="file"
  valuePropName="fileList"
  getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)} // Extract fileList
  rules={[{ required: true, message: 'Please upload a file!' }]}
>
  <Upload
    name="file"
    beforeUpload={() => false} // Prevent automatic upload
    listType="text"
    maxCount={1}
  >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
</Form.Item>


          <div className="resource-upload-form-buttons">
            <Button type="default" onClick={onClose} className="resource-upload-form-button resource-upload-form-cancel-button">Cancel</Button>
            <Button type="primary" htmlType="submit" className="resource-upload-form-button resource-upload-form-submit-button">Upload</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
