import React, { useState, useEffect, useRef } from "react";
import AttachmentInput from "./AttachmentInput";
import { useNavigate, useLocation } from 'react-router-dom';
import{ useTokenVerification} from './apiServices'

const SubmitForm = (props) => {
  const location = useLocation();
  const taskData = location.state; // Access the data from location.state

  const [note, setNote] = useState("");
  const [tips, setTips] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [resetInput, setResetInput] = useState(false);
  const isMounted = useRef(true);

  useTokenVerification()

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  console.log("Task Data:", taskData); // Log the task data

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Note:", note);
    console.log("Tips:", tips);
    console.log("Files", selectedFile);
   

    if (isMounted.current) {
      setNote("");
      setTips("");
      setSelectedFile(null);
      setResetInput(true);

      setTimeout(() => {
        setResetInput(false);
      }, 100);

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
            Topics : {taskData.taskName}
            Assigned BY: {taskData.assignedBy}
          </label>
        </div>
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
