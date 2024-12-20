import React, { useState, useEffect } from "react";
import { Button, message, Select, Empty } from "antd";

interface Course {
  _id?: string;
  id?: string;
  title: string;
  channel: string;
  url: string;
  imageUrl: string;
  duration: string;
  rating: number;
  description: string;
  views: number;
}

const YoutubeList: React.FC = () => {
  const [Lang, setLang] = useState("Python");
  const [getcourse, setGetcourse] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/GetCrousePost", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch courses.");
        const data = await response.json();
        setGetcourse(data.data || []);
        message.success("Courses loaded successfully!");
      } catch (error) {
        console.error("Error fetching courses:", error);
        message.error("Error loading courses.");
      }
    };

    fetchCourses();
  }, []);

  const handleLangChange = (value: string) => {
    setLang(value);
  };

  // Filter courses by selected language
  const filteredCourses = getcourse.filter((course) =>
    course.title?.toLowerCase().includes(Lang.toLowerCase())
  );

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
      />

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {filteredCourses.map((course) => (
            <div
              key={course._id || course.id}
              className="course-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={course.imageUrl || "https://via.placeholder.com/150"}
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
      ) : (
        <div className="flex justify-center items-center mt-10">
          <Empty description="No courses found for the selected language" />
        </div>
      )}
    </div>
  );
};

export default YoutubeList;
