// src/components/ToolSelector.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiGlobe, FiMail, FiChevronDown } from 'react-icons/fi';
import { FaPen } from "react-icons/fa6";

const tools = [
  { name: 'Chat', path: '/gemini', icon: <FiMessageCircle />},
  { name: 'Summarize', path: '/summarize', icon: < FaPen />},
  { name: 'Translate', path: '/translate', icon: <FiGlobe />},
  { name: 'Email', path: '/email', icon: <FiMail /> },
];

const ToolSelector = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const currentTool = tools.find((tool) => location.pathname === tool.path) || tools[0];

  return (
    <motion.div
      className="w-full mb-6"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Desktop Tab Selector */}
      <div className="hidden sm:flex gap-3 justify-center px-4 py-2">
        {tools.map(({ name, path, icon, description }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path} className="relative group">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-primary border border-primary hover:bg-primary hover:text-white hover:border-white'
                  }
                `}
              >
                {icon}
                {name}
              </button>

            

              {/* Animated underline for active tab */}
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="sm:hidden px-4">
        <div className="relative">
          <button
            className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-primary text-primary font-semibold bg-white"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex items-center gap-2">
              {currentTool.icon}
              {currentTool.name}
            </div>
            <FiChevronDown className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
          {showDropdown && (
            <div className="absolute z-10 mt-2 w-full bg-white border-gray-200 rounded-lg shadow-lg text-primary  ">
              {tools.map(({ name, path, icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setShowDropdown(false)}
                  className={`block px-4 py-3 text-sm flex items-center gap-2 hover:text-white hover:bg-primary  ${
                    location.pathname === path ? 'bg-primary font-medium text-white hover:border-white' : ''
                  }`}
                >
                  {icon}
                  {name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ToolSelector;
