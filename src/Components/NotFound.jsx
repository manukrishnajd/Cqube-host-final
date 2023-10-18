// src/components/NotFound.js
import React from 'react';
import './NotFound.css';
import image from "../image/404.gif"

const NotFound = () => {
  return (
    <div className="not-found">

      <div className="not-found-content">
        {/* <img src={image} alt="" /> */}
        <h2>404 Not Found</h2>
        <p>Sorry, the page you are looking for could not be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
