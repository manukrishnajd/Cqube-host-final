import React, { useState, useEffect, useRef } from "react";
import AttachmentInput from "./AttachmentInput";
import { useNavigate } from 'react-router-dom';

const SubmitForm = () => {
  const [note, setNote] = useState("");
  const [tips, setTips] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [resetInput, setResetInput] = useState(false);
  const isMounted = useRef(true); // Create a ref to track component mounting

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Cleanup function to handle component unmounting
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the values of note, tips, and selectedFile
    console.log("Note:", note);
    console.log("Tips:", tips);
    console.log("Files", selectedFile);

    // Ensure that the component is still mounted before updating the state
    if (isMounted.current) {
      // Reset the form fields
      setNote("");
      setTips("");
      setSelectedFile(null);
      // Set resetInput to true to reset the attachment input field
      setResetInput(true);

      // Reset resetInput back to false after a short delay (to allow the input field to reset visually)
      setTimeout(() => {
        setResetInput(false);
      }, 100);

      // Use navigate to redirect to the desired route
      navigate('/student/task');
    }
  };

  return (
    <div className="p-4 bg-white mt-4 rounded shadow container">
      <h1 className="text-2xl text-center font-bold mb-4">
        Student Assignment Submission Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="note" className="block text-gray-600 font-extrabold">
            Note:
          </label>
          <textarea
            id="note"
            name="note"
            rows="4"
            placeholder="Add any notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border rounded-md p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label htmlFor="tips" className="block text-gray-600">
            Tips:
          </label>
          <textarea
            id="tips"
            name="tips"
            rows="4"
            placeholder="Share any tips or additional information..."
            value={tips}
            onChange={(e) => setTips(e.target.value)}
            className="border rounded-md p-2 w-full"
          ></textarea>
        </div>

        <div>
          <AttachmentInput
            onFileChange={handleFileChange}
            maxSizeInBytes={10 * 1024 * 1024}
            resetInput={resetInput}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded-full hover-bg-orange-600"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
