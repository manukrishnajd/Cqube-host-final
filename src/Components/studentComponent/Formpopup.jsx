// StudentPopup.js
import React from "react";

const FormPop = ({ newStudent, handleInputChange, handleAddStudent }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Add Student</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        {/* Add other input fields for Course, Phone Number, Branch, Email, Status, Action */}
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
    </div>
  );
};

export default FormPop;
