import React from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4  sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
            <Link to="/">
          Cron Scheduler
          </Link>
        </div>
        <div className="flex space-x-4">
            <Link to="/">
          <button className="text-white flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded">
            <FaHome />
            <span>Home</span>
          </button>
          </Link>
          <Link to="/create-job">
          <button className="text-white flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded">
            <FaPlus />
            <span>New Job</span>
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
