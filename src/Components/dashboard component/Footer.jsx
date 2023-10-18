import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-slate-600 text-center p-5 text-white">
      <div className="text-sm text-white">
        &copy; {new Date().getFullYear()} Cqube. All rights reserved.
      </div>
      <div className="mt-2">
        <a href="#" className="text-black-500 hover:underline">Terms of Service</a>
        <span className="mx-2">|</span>
        <a href="#" className="text-black-500 hover:underline">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default Footer;
