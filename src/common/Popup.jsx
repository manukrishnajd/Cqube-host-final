import React from 'react';
import './Popup.css';

const Popup = ({ data, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>{data.name} Details</h2>
        {/* Add content/details of the node here */}
      </div>
    </div>
  );
};

export default Popup;
