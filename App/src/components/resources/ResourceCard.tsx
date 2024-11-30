import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Resource } from '../../types';

interface ResourceCardProps {
  resource: Resource;
  onDownload: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">{resource.title}</h3>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600">Subject: {resource.subject}</p>
            <p className="text-sm text-gray-600">Type: {resource.type}</p>
            <p className="text-sm text-gray-600">
              Uploaded: {new Date(resource.uploadedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => onDownload(resource)}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
        >
          <Download className="w-5 h-5" />
          <span className="text-sm">Download</span>
        </button>
      </div>
    </div>
  );
};