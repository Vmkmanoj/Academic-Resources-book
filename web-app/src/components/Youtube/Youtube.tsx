import React, { useState } from "react";
import { coursesData } from "../Dummydata/Youtube"; // Correct the import path if needed
import { Button, Select } from "antd";

function YoutubeList() {
  const [Lang, setLang] = useState("Python"); // Correcting the initialization of state

  const handleLangChange = (value: string) => {
    setLang(value); // Update language state on selection change
  };

  return (
    <div className="mt-20 px-4">
      <Select
        onChange={handleLangChange} // Use onChange to update state
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
        {coursesData
          .filter((course) => course.title.toLowerCase().includes(Lang.toLowerCase())) // Filter courses based on selected language
          .map((course) => (
            <div
              key={course.id}
              className="course-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.channel}</p>
             <Button type="link"> <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mb-2 inline-block"
              >
                Watch Now
              </a></Button>
              <div className="text-gray-700 mt-4">
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Rating:</strong> {course.rating} ⭐</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Views:</strong> {course.views}</p>
                <p><strong>Level:</strong> {course.level}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default YoutubeList;
