import { Resource } from '../../types'; // Ensure this type is defined
import { ResourceCard } from './ResourceCard'; // Assumes a reusable card component
import { mockResources } from '../../data/mockData'; // Import mock data
import React from 'react';
import { Recommendation } from '../recommendation/Recommendation';
import YoutubeList from '../Youtube/Youtube';
import Course from '../Course/course';





const ResourceList = () => {
  const [path, setPath] = React.useState<string>('Subject'); // State for path

  console.log(path)

  // Handle resource downloads
  const handleDownload = (resource: Resource) => {
    window.open(resource.downloadUrl, '_blank'); // Opens the resource in a new tab
  };

  return (
    <>
     
      <Recommendation path={path} setPath={setPath}/>

      {path==="Subject"?
        
        (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
       
       
        {mockResources.map((resource) => (
          <ResourceCard
            key={resource.id} // Ensure each resource has a unique `id`
            resource={resource} // Pass resource data as a prop
            onDownload={handleDownload} // Pass the download handler
          />
        ))}

      </div>):

      ""
      }

      
        <div className='mt-20'>
       { path === "Youtube"? <YoutubeList></YoutubeList>:""}
        </div>

        <div className='mt-20'>

          {path==="Course"? <Course></Course>:""}

        </div>
      
  

 
   
    </>
  );
};

export default ResourceList;
