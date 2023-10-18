import React from 'react';

const Footer = () => (
  <div className="mt-24">
    
    <footer className="text-center mt-8">
      <div className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
      <div className="mt-2">
        <a href="#" className="text-black-500 hover:underline">Terms of Service</a>
        <span className="mx-2">|</span>
        <a href="#" className="text-black-500 hover:underline">Privacy Policy</a>
        {/* Add more relevant links */}
      </div>
    </footer>
  </div>
);

export default Footer;