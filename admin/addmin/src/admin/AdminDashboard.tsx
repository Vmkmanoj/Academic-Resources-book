import React from 'react';
import { Button } from 'antd';
import { Plus, FileText, BookOpen, Library } from 'lucide-react';
import { ResourceUploadForm } from './ResourceUploadForm';
import { ResourceManagement } from './ResourceManagement';
import './AdminDashboard.css'; // External CSS file

export const AdminDashboard = () => {
  const [showUploadForm, setShowUploadForm] = React.useState(false);
  const stats = [
    { title: 'Total Syllabi', count: 24, icon: FileText, progress: 75 },
    { title: 'Question Banks', count: 36, icon: BookOpen, progress: 60 },
    { title: 'E-Books', count: 18, icon: Library, progress: 45 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="text-white text-xl">Dashboard</h2>
        </div>
        <div className="sidebar-links">
          <a href="#" className="sidebar-link">Dashboard</a>
          <a href="#" className="sidebar-link">Resources</a>
          <a href="#" className="sidebar-link">Users</a>
          <a href="#" className="sidebar-link">Settings</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header Section */}
        {/* <div className="header flex justify-between items-center p-6"> */}
          <h2 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h2>
          <button
            onClick={() => setShowUploadForm(true)}
            className=""
          >
            {/* <Plus className="w-5 h-5" /> */}
            <Button><Plus></Plus>Upload Resource</Button>
          </button>
        {/* </div> */}

        {/* Stats Section */}
        <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="stat-card bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p className="text-sm">{stat.title}</p>
                  <p className="text-3xl font-semibold">{stat.count}</p>
                </div>
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              {/* Progress Bar */}
              <div className="mt-4 bg-white rounded-full h-2.5 w-full">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Conditional Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 fade-in">
            <div className="bg-white rounded-lg p-8 w-full sm:w-96 shadow-lg">
              <ResourceUploadForm onClose={() => setShowUploadForm(false)} />
            </div>
          </div>
        )}

        {/* Resource Management Section */}
        <div className="resource-management-section">
          <ResourceManagement />
        </div>
      </div>
    </div>
  );
};
