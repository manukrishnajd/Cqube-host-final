import React, { useRef, useEffect } from 'react';

const AttachmentInput = ({ onFileChange, maxSizeInBytes, resetInput }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (resetInput) {
      // Reset the file input if resetInput is true
      fileInputRef.current.value = '';
    }
  }, [resetInput]);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    
    // Check if a file is selected
    if (file) {
      // Check the file size against the specified maximum size
      if (file.size <= maxSizeInBytes) {
        onFileChange(file);
      } else {
        alert(`File size exceeds the maximum allowed size of ${maxSizeInBytes / (1024 * 1024)} MB.`);
        // Clear the file input
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-600">Add Attachment:</label>
      <div className="flex items-center">
        <label
          htmlFor="attachment"
          className="cursor-pointer bg-orange-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-orange-600"
        >
          Browse
        </label>
        <span className="text-gray-400">{fileInputRef.current?.files[0]?.name || 'No file selected'}</span>
      </div>
      <input
        type="file"
        id="attachment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf, .doc, .docx"
      />
    </div>
  );
};

export default AttachmentInput;
