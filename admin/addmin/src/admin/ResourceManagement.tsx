import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { mockResources } from '../data/mockData';
import './ResourceManagement.css';  // Import the external CSS file

export const ResourceManagement = () => {
  const handleEdit = (id: string) => {
    console.log('Edit resource:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete resource:', id);
  };

  return (
    <div className="resource-management-container">
      <div className="resource-management-header">
        <h3 className="resource-management-title">Manage Resources</h3>
        <div className="overflow-x-auto">
          <table className="resource-management-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockResources.map((resource) => (
                <tr key={resource.id}>
                  <td>{resource.title}</td>
                  <td>{resource.type}</td>
                  <td>{resource.subject}</td>
                  <td>{resource.department}</td>
                  <td>{resource.semester}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(resource.id)}
                        className="edit-button"
                        title="Edit Resource"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(resource.id)}
                        className="delete-button"
                        title="Delete Resource"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
