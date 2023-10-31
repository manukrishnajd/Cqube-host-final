import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Answer, useTokenVerification } from './apiServices';
import { errorToastify } from "./toastify";

const SubmitForm = (props) => {
  const [note, setNote] = useState("");
  const [tips, setTips] = useState("");
  const [attachment,setAttachment] =useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [resetInput, setResetInput] = useState(false);
  const isMounted = useRef(true);

  useTokenVerification();

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('running');

    const requestData = {
       activityRef:props.id,
       attachment: attachment
    };
console.log(requestData,'datas');
try
{

  Answer(requestData);
}catch (error){
errorToastify(error?.message)}

    
  };

  return (
    <div className="p-4 bg-white mt-4 rounded shadow container">
      
      <h1 className="text-2xl text-center font-bold mb-4">
        Student Assignment Submission Form
      </h1>
      <label htmlFor="note" className="block text-gray-600 font-extrabold">
            Topics: {props.topic}
               Description: {props.note}
               Due Date: {props.duedate}
               {/* Assigned by: {props.assignedby} */}
               Type: {props.id}
          </label>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label htmlFor="attachment" className="block text-gray-600">
            Add Attachment:
          </label>
          <input
            type="text"
            id="attachment"
            name="attachment"
            className="border rounded-md p-2 w-full"
            onChange={(e) => setAttachment(e.target.value)}
            // You can add more attributes like accept, multiple, etc. as needed
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
