import { useState } from 'react';
import { Form, Input, Button, Alert, message, Segmented } from "antd";
import { Contact, GraduationCap} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

import { Register } from './Register';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logOrRegister, setLogOrRegister] = useState("Login");
  const navigate = useNavigate();
  

  const handlelogOrRegiser = (value: string)=>{

    setLogOrRegister(value)

  }

  console.log(logOrRegister);



  const handleLogin = async (values: { name: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:3000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data.Username);
   
  
      if (data.success) {
        // Store the JWT token and username in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.Username); // Store username
        console.log(data)
        message.success(`Welcome ${data.Username}`);
  
        // Redirect user to home page
        navigate("/Home"); 
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  


  return (

    <>
<Segmented options={["Login","Register"]} value={logOrRegister} onChange={handlelogOrRegiser}></Segmented>
{logOrRegister === "Login" ? (<> <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom right, #f3e8ff 0%, #ebf4ff 100%)",
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

        {error && (
          <Alert
            message={error}
            type="error"
            style={{ marginBottom: "16px" }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleLogin}
          style={{ gap: "16px" }}
        >
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
            <Input
              placeholder="user@kongu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div></>) : <Register></Register> }
   
    </>
  );
};