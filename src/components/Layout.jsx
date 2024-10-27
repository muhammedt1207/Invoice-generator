import React from 'react';


export const Layout = ({ children }) => (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  );