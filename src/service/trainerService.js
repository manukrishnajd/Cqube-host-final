import axios from "axios";


const token=localStorage.getItem("token")


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWZmMzQ4YjkyNTUwYThlY2Y0YzQ3NSIsImlzVHJhaW5lciI6dHJ1ZSwiaWF0IjoxNjk2NTkyOTE4fQ.MR1jDj3QPzwGVZGPl-J24KuCLlw4DcjkI_FhDJbQK_0"

export const Course=()=>{
    axios.get("http://localhost:4000/api/course").then((data)=>{
        console.log(data.data);
    })
}


export const AddActivity=()=>{

}



export const viewstudent=async (id)=>{
  console.log(id,'viewstudent')
  try {
    console.log(token,'after login');
    const response = await axios.get(`http://localhost:4000/api/student/studentsby/${id}?status=true`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("response",response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }

}


export const trainerdetail=async (id)=>{
  try {
    const response = await axios.get(`http://localhost:4000/api/trainer/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("response",response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }

}
export const coursebyid=async (courseid)=>{
  try {
    const response = await axios.get(`http://localhost:4000/api/course/${courseid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("response",response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }

}
export const login = async (data) => {
  try {
    const response = await axios.post(`http://localhost:4000/api/trainer/login`, data);
    console.log("response", response.data.otherDetails._id);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id",response.data.otherDetails._id);
    return { token: response.data.token};
  } catch (error) {
    throw new Error("Failed to log in: " + error.message);
    
  }
};

export const notification=async ()=>{
  try {
    const response = await axios.get(`http://localhost:4000/api/notification`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("response",response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }

}

export const studentbycourse=async (id,courseid)=>{
  console.log(courseid,id,'courses id');
  try {
    const response = await axios.get(`http://localhost:4000/api/student/studentsby/${courseid}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the token for authorization
      }
    });
    console.log("response",response);
    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add student: " + error.message);
  }

}


