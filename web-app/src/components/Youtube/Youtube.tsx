import React, { useState, useEffect } from "react";
import { Button, message, Select } from "antd";

function YoutubeList() {
  const [Lang, setLang] = useState("Python"); // Default language filter
  const [getcourse, setGetcourse] = useState([]); // Store fetched courses

  // Debugging: Log all course data whenever `getcourse` changes
  useEffect(() => {
    getcourse.forEach((course, index) => {
      console.log(`Index: ${index}`);
      Object.entries(course).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    });
  }, [getcourse]); // Trigger only when `getcourse` changes

  // Fetch courses from the server
  const CourseData = async () => {
    try {
      const response = await fetch("http://localhost:3000/GetCrousePost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course data. Please try again later.");
      }

      const data = await response.json();
      setGetcourse(data.data || []); // Ensure data is stored correctly
      message.success("Courses loaded successfully!");
    } catch (error) {
      console.error("Error fetching course data:", error);
      message.error("Something went wrong while fetching courses.");
    }
  };

  // Fetch courses when the component is mounted
  useEffect(() => {
    CourseData();
  }, []);

  // Handle language change
  const handleLangChange = (value: React.SetStateAction<string>) => {
    setLang(value);
  };

  return (
    <div className="mt-20 px-4">
      <Select
        onChange={handleLangChange}
        value={Lang}
        options={[
          { value: "Java", label: "Java" },
          { value: "Python", label: "Python" },
          { value: "React", label: "React" },
        ]}
        className="w-32"
        defaultValue="Python"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
      {getcourse
  .filter((course) =>
    course.title?.toLowerCase().includes(Lang.toLowerCase())
  )
  .map((course) => (
    <div
      key={course._id || course.id} // Unique key for each course
      className="course-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">
        {course.title}
      </h3>
      <p className="text-gray-600 mb-2">{course.channel}</p>
      <Button type="link">
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mb-2 inline-block"
        >
          Watch Now
        </a>
      </Button>
      <div className="text-gray-700 mt-4">
        <p>
          <strong>Duration:</strong> {course.duration}
        </p>
        <p>
          <strong>Rating:</strong> {course.rating} ⭐
        </p>
        <p>
          <strong>Description:</strong> {course.description}
        </p>
        <p>
          <strong>Views:</strong> {course.views}
        </p>
      </div>
    </div>
  ))}

      </div>
    </div>
  );
}

export default YoutubeList;
