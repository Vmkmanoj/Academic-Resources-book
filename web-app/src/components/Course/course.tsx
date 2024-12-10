import React from "react";
import { CrouseData } from "../Dummydata/Crouse"; // Make sure the path is correct
import { Button } from "antd";

const Course = () => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {CrouseData.map((website) => (
          <div
            key={website.id}
            className="course-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={website.imageUrl}
              alt={website.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{website.title}</h3>
            <p className="text-gray-600 mb-2">{website.category}</p>
            <Button type="link"><a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mb-2 inline-block"
            >
              Visit Website
            </a></Button>
            <div className="text-gray-700 mt-4">
              <p><strong>Description:</strong> {website.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
