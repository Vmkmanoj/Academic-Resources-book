import { Form, Input, Rate, Button, message, List } from "antd";
import React, { useEffect, useState } from "react";

// Define the type for the feedback form values
interface FeedbackFormValues {
  Feedback: string;
  Rate: number;
}

// Define the type for feedback data
interface FeedbackData {
  name: string;
  Feedback: string;
  Rate: string;
}

export const Feedback: React.FC = () => {
  const UserName = localStorage.getItem("userName");

  const [feedBackdetials, setFeedBackdetials] = useState({
    name: UserName,
    FeedBack: "",
    Rate: "",
  });

  const [getDatafeedback, setGetDatafeedback] = useState<FeedbackData[]>([]);

  console.log(feedBackdetials);

  // Define the function to handle feedback submission
  const Getfeedback = async (values: FeedbackFormValues) => {
    setFeedBackdetials({
      name: UserName || "",
      FeedBack: values.Feedback,
      Rate: values.Rate.toString(),
    });

    try {
      const response = await fetch("http://localhost:3000/Feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: UserName || "Anonymous",
          Feedback: values.Feedback,
          Rate: values.Rate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      message.success("Feedback submitted successfully");
      returnFeedback(); // Refresh feedback list after submission
    } catch (error) {
      console.error(error);
      message.error("Failed to submit feedback");
    }

    setFeedBackdetials({
      name: "",
      FeedBack: "",
      Rate: "",
    });
  };

  const returnFeedback = async () => {
    try {
      const response = await fetch("http://localhost:3000/getfeedback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Failed to fetch feedback. Status: ${response.status}`);
      }

      // Parse the JSON data
      const data = await response.json();
      console.log("Feedback data:", data);

      setGetDatafeedback(data.data || []); // Update the feedback list
    } catch (error) {
      console.error("Error fetching feedback:", error);
      message.error("Failed to load feedback");
    }
  };

  useEffect(() => {
    returnFeedback();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Feedback</h1>

        <Form onFinish={Getfeedback} className="space-y-4">
          <Form.Item
            name="Feedback"
            label={<span className="font-medium">Feedback</span>}
            rules={[{ required: true, message: "Please provide your feedback!" }]}
          >
            <Input.TextArea className="p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            name="Rate"
            label={<span className="font-medium">Rate</span>}
            rules={[{ required: true, message: "Please provide a rating!" }]}
          >
            <Rate className="text-yellow-500" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="bg-gray-100 p-6 mt-8 w-full max-w-2xl rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Feedback</h2>

        {getDatafeedback.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={getDatafeedback}
            renderItem={(item) => (
              <List.Item>
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p className="font-bold">{item.name}</p>
                  <p>{item.Feedback}</p>
                  <Rate disabled defaultValue={parseFloat(item.Rate)} />
                </div>
              </List.Item>
            )}
          />
        ) : (
          <p className="text-center text-gray-500">No feedback available.</p>
        )}
      </div>
    </div>
  );
};
