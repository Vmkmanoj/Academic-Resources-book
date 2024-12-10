import React, { useEffect, useState } from "react";
import { Button, Card, List, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react"; // For icons
import "./Usershow.css"; // Import your CSS file for additional styling

const { Title, Text } = Typography;

export const Usershow = () => {
  const [getdata, setGetdata] = useState([]);
  const [detailView, setDetailView] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGetdata(data.Userdata); // Assuming data is an array of users
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleDetailView = (index) => {
    setDetailView((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle detail view for the specific user
    }));
  };

  return (
    <div className="usershow-container">
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        User List
      </Title>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={() => navigate("/")}
          icon={<MoveRight size={16} />}
        >
          Admin Dashboard
        </Button>
      </div>
      <div className="usershow-list">
        {getdata.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={getdata}
            renderItem={(user, index) => (
              <List.Item>
               
                <Card
                  title="Profile"
                  bordered
                  extra={
                    <Button
                      type="link"
                      onClick={() => toggleDetailView(index)}
                    >
                      {detailView[index] ? "Hide Details" : "View Profile"}
                    </Button>
                  }
                >
                    {user.Username}
                  
                  {detailView[index] && (
                    <>
                      <Divider />
                      <p>
                        <Text strong>Department:</Text> {user.department}
                      </p>
                      <p>
                        <Text strong>Email:</Text> {user.name}
                      </p>
                    </>
                  )}
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}
      </div>
    </div>
  );
};
