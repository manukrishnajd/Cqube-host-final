import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import hello from "./hello.jpg";
import { studentbyid } from "./apiServices";

const StudentProfile = () => {
  const token = "YOUR_AUTH_TOKEN"; // Replace with your authentication token
  const stdid = localStorage.getItem("id");
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (stdid) {
      studentbyid(stdid, { token })
        .then((data) => {
          setStudentData(data);
          console.log(data, "dd");
        })
        .catch((error) => {
          console.error("Failed to fetch student data: " + error.message);
        });
    }
  }, [stdid, token]);

  const [student, setStudent] = useState({
    name: "John Doe",
    branch: "Computer Science",
    course: "Bachelor of Science",
    contact: "123-456-7890",
    email: "john.doe@example.com",
    gitLink: "studentData.github",
    linkedinLink: "studentData.linkedin",
  });

  const [newGitLink, setNewGitLink] = useState("");
  const [newLinkedInLink, setNewLinkedInLink] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [gitLinkError, setGitLinkError] = useState("");
  const [linkedinLinkError, setLinkedInLinkError] = useState("");

  const handleUpdate = () => {
    const gitLinkValid = validateURL(newGitLink);
    const linkedinLinkValid = validateURL(newLinkedInLink);

    if (!gitLinkValid) {
      setGitLinkError("Invalid GitHub URL");
      return;
    }

    if (!linkedinLinkValid) {
      setLinkedInLinkError("Invalid LinkedIn URL");
      return;
    }

    setGitLinkError("");
    setLinkedInLinkError("");

    setStudent({
      ...student,
      gitLink: newGitLink,
      linkedinLink: newLinkedInLink,
    });
    setIsEditing(false);
  };

  const validateURL = (url) => {
    // Simple URL validation, you can improve this based on your requirements.
    const urlPattern =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return urlPattern.test(url);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center mb-4 ">
            {/* Add images here */}
            <img
              src={hello}
              alt="Student Profile"
              className="relative mx-4 mt-4 h-60 w-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
            />
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          {studentData?.name}
        </h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-50 bg-fuchsia-900 rounded-r-2xl w-56 text-center">
            Student Information
          </h2>
          <ul className="pl-6 mt-4 space-y-2">
            <li className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">Branch:</span>
              <span className="text-gray-800">{studentData?.branchRef}</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">Contact:</span>
              <span className="text-gray-800">{studentData?.phoneNumber}</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">Email:</span>
              <span className="text-gray-800">{studentData?.email}</span>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-50 bg-fuchsia-900 rounded-r-2xl w-56 text-center">
            Social Links
          </h2>
          <ul className="pl-6 mt-2 rounded-2xl text-black">
            <li className="mt-4">
              <span className="font-semibold">GitHub:</span>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={newGitLink}
                    onChange={(e) => setNewGitLink(e.target.value)}
                    className="w-full px-3 py-2 mt-3 text-gray-700 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                  {gitLinkError && (
                    <p className="text-red-600">{gitLinkError}</p>
                  )}
                </div>
              ) : (
                <a
                  href={student.gitLink} // Use the state variable for displaying the link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {student.gitLink}
                </a>
              )}
            </li>
            <li className="mt-4">
              <span className="font-semibold">LinkedIn:</span>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={newLinkedInLink}
                    onChange={(e) => setNewLinkedInLink(e.target.value)}
                    className="w-full px-3 py-2 mt-3 text-gray-700 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                  {linkedinLinkError && (
                    <p className="text-red-600">{linkedinLinkError}</p>
                  )}
                </div>
              ) : (
                <a
                  href={student.linkedinLink} // Use the state variable for displaying the link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {student.linkedinLink}
                </a>
              )}
            </li>
          </ul>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              className="float-right"
              style={{ marginTop: "20px" }}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              className="float-right"
              style={{ marginTop: "20px" }}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
