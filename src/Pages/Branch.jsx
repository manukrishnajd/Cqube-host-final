import React, { useEffect, useState } from "react";
import { addbranch, deleteBranch, getBranch } from "../service/apiService";

const Branch = () => {
  const [branch, setBranch] = useState({ name: "" });
  const [createdBranch, setCreatedBranch] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [callUseEffect,setCallUseEffect] = useState(false)

  const handleChange = (event) => {
    setBranch({ ...branch, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addbranch(branch)
      .then((response) => {
        if (response.success) {
          setError(!response?.success);
          setCreatedBranch(response.result);
          setCallUseEffect(!callUseEffect)
          setMessage("");
        } else {
          setError(!response?.success);
          setCreatedBranch(null);
          setMessage(response.message);
        }
      })
      .catch((error) => {
        setError(!error?.success);
        setMessage(error?.message);
      });
  };

  const handleDelete = (id) => {
    deleteBranch(id)
      .then((response) => {
        setCallUseEffect(!callUseEffect)
      })
      .catch((error) => {
        setError(!error?.success);
        setMessage(error?.message);
      });
  };

  useEffect(() => {
    getBranch(1)
      .then((response) => {
        console.log(response);
        setBranches(response.result);
      })
      .catch((error) => {
        setError(!error?.success);
        setMessage(error?.message);
      });
  }, [callUseEffect]);

  return (
    <div className="flex flex-col items-center m-4">
      <div className="bg-slate-600 shadow-lg p-6 rounded-lg mb-4 w-full max-w-xl">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="Branch"
            name="name"
            value={branch.name}
            onChange={handleChange}
            className="border border-slate-600 p-2 rounded-l w-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-orange-400 text-white p-2 rounded-r"
          >
            Submit
          </button>
        </form>
      </div>

      {createdBranch && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-xl">
          <div className="bg-slate-600 p-4">
            <h2 className="text-white text-xl font-bold">Created Branch</h2>
          </div>
          <div className="p-4">
            <p className="text-lg">
              <strong>Branch Name:</strong> {createdBranch.name}
            </p>
          </div>
        </div>
      )}

      {error && message}

      <table>
        {branches.map(({ name, _id }) => {
          return (
            <tr>
              <td>
                {name} <button onClick={() => handleDelete(_id)} style={{color:"red"}}>delete</button>{" "}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Branch;
