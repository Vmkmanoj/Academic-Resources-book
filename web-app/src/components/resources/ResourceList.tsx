import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Recommendation } from '../recommendation/Recommendation';
import YoutubeList from '../Youtube/Youtube';
import Course from '../Course/course';
import { Button, Flex, Segmented } from 'antd';
import "./ResourceLisst.css"
import { MCAData } from '../Dummydata/stubject'; // Ensure MCAData is correctly imported
import { EyeOutlined, FilePdfFilled } from '@ant-design/icons';
import { QuizzApp } from "@kongu/quizz-app";

import { Feedback } from '../FeedBack/Feedback';




const ResourceList = () => {
  const [path, setPath] = React.useState<string>('Subject'); // State for path
  const [section, setSection] = React.useState<string>('MCA-1'); // State for MCA section

  console.log('Current Path:', path);
  console.log('Current Section:', section);

  return (
    <>
      <Recommendation path={path} setPath={setPath} />
      {path === 'Subject' ? (
        <>
          {/* Section Selector */}
          <Segmented
            options={['MCA-1', 'MCA-2']}
            value={section}
            onChange={(value) => setSection(value as string)}
            className="mt-10"
          />
          {/* Animated Grid */}
          <div className="relative mt-8">
            <CSSTransition
              key={section} // Triggers re-render and animation when section changes
              timeout={500}
              classNames="slide"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {MCAData.filter((data) => data.year === section).map((subject) => (
                  <div
                    key={subject.id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >

                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>



                    <p className="text-gray-600 mb-4">{subject.description}</p>
                    <a
                      href={subject.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      <FilePdfFilled></FilePdfFilled><Button type='link'> Download</Button>
                    </a>
                    <EyeOutlined className='cursor-pointer'></EyeOutlined>
                  </div>
                ))}
              </div>
            </CSSTransition>
          </div>
        </>
      ) : null}

      {/* YouTube Section */}
      {path === 'Youtube' && (
        <div className="mt-20">
          <YoutubeList />
        </div>
      )}

      {/* Course Section */}
      {path === 'Course' && (
        <div className="mt-20">
          <Course />
        </div>
      )}

      {/* Course Section */}
      {path === 'Test' && (
        <div className="mt-20">
          <QuizzApp />
        </div>
      )}

        {path === 'FeedBack' && (
        <div className="mt-20">
          <Feedback></Feedback>
        </div>
      )}

    </>
  );
};

export default ResourceList;
