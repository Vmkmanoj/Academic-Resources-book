import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
export const Header: React.FC = () => {

  const username = localStorage.getItem("userName")

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* App Title */}
          <div>
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
              Academic Resource Hub
            </Link>
            {/* Greeting for logged-in user */}
            
              <p className="text-sm text-gray-600 mt-5">
              <UserOutlined></UserOutlined> <span className='ml-2'>Welcome {username}</span>
              </p>
          </div>
       
            {/* Logout Button */}
        
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                <Button color='danger'  variant="solid" onClick={()=>{localStorage.removeItem('token') ; localStorage.removeItem("userName")}}><LogoutOutlined></LogoutOutlined> Log out</Button>
              </Link>
            
          
        </div>
      </div>
    </header>
  );
};
