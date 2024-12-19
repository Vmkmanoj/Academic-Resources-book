import { Flex, Segmented } from 'antd';
import React from 'react';
import "./Recommednation.css";

const justifyOptions = [
  'Subject',
  'Youtube',
  'FeedBack',
  'Course',
  'Test',
];

interface RecommendationProps {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
}

export const Recommendation: React.FC<RecommendationProps> = ({ path, setPath }) => {
  const handleSegmentChange = (value: string) => {
    setPath(value);
  };

  return (
    <Flex gap="middle" align="start">
      <Segmented
        options={justifyOptions}
        value={path} // Set the current selected value
        onChange={handleSegmentChange} // Update `path` on change
        className="custom-segmented h-10 p-2 text-lg"
      />
    </Flex>
  );
};
