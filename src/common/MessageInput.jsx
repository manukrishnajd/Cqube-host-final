import React from "react";
import "./MessageInput.css"; // Import the CSS for animation

const MessageInput = ({ id, type, label, error }) => {
  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        aria-describedby={`${id}_help`}
        className={`block ${
          type === "success" ? "rounded-t-lg" : "rounded-lg"
        } px-2.5 pb-2.5 ${
          type === "success" ? "pt-5" : "pt-4"
        } w-full text-sm text-gray-900 bg-transparent ${
          type === "success" ? "border-green-600" : "border-red-600"
        } appearance-none ${
          type === "success" ? "dark:text-white" : ""
        } focus:outline-none focus:ring-0 ${
          type === "success"
            ? "focus:border-green-600"
            : "focus:border-red-600 dark:focus-border-red-500"
        } peer`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute text-sm ${
          type === "success"
            ? "text-green-600"
            : "text-red-600 dark:text-red-500"
        } duration-300 transform -translate-y-4 scale-75 ${
          type === "success" ? "top-4" : "top-2"
        } z-10 origin-[0] ${
          type === "success" ? "left-2.5" : "left-1"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
      >
        {label}
      </label>
      {error && (
        <p
          id={`${id}_help`}
          className={`mt-2 text-xs error-message ${error ? "show" : ""}`}
        >
          <span className="font-medium">
            {type === "success" ? "Well done!" : "Oh, snap!"}
          </span>{" "}
          {error}
        </p>
      )}
    </div>
  );
};

export default MessageInput;
