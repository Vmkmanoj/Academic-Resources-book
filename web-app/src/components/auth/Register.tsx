
import { Button, Form, Input, message, Select } from "antd";
import Password from "antd/es/input/Password";
import { GraduationCap } from 'lucide-react';
import { useState } from "react";


export const Register = () => {

  const [register ,setRegister] = useState(false)


  const handleRegister = async (value: { 
    Username: string; 
    name: string; 
    password: string; 
    department: string; 
    confirmPassword: string; 
  }) => {

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: value.Username,
          name: value.name,
          password: value.password,
          department: value.department,
          confirmPassword: value.confirmPassword, // Include if needed
        }),
      });

      console.log(value.Username)
  
      const data = await response.json();
      console.log("Registration successful:", data.message);
      setRegister(data.success);
      if(response.ok){
        message.success("Registration successfull...");
      }
   
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  };
  



  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #f3e8ff 0%, #ebf4ff 100%)",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <GraduationCap
              style={{
                fontSize: "64px",
                color: "#9f7aea",
              }}
            />
          </div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#1a202c",
              marginBottom: "32px",
            }}
          >
            Kongu Academic Resources
          </h2>


          <Form
            layout="vertical"
            onFinish={handleRegister}  // Change function name to handle registration
            style={{ gap: "16px" }}
          >

            <Form.Item label="Username"
              name="Username" rules={[{ required: true, message: "Please enter your name" }, { type: "string", message: "Enter valid name" }]}
            >
              <Input></Input>

            </Form.Item>

            <Form.Item
              label="Kongu Email"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Department" name="department" rules={[{ required: true, message: "Choose your Department" }]}>

              <Select options={[{ value: "MCA", label: "MCA" }, { value: "ECE", label: "ECE" }, { value: "CSE", label: "CSE" }, { value: "MSC", label: "MSC" }, { value: "EEE", label: "EEE" }]}></Select>

            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>



            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#9f7aea",
                  borderColor: "#9f7aea",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                className="hover:bg-purple-700 focus:ring focus:ring-purple-500"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          {register && <p style={{ color: 'green' }}>register success fully</p>}
        </div>
      </div>

    


    </>
  )


}