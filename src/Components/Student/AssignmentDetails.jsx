import React, { useState, useEffect } from 'react';
import {
  AiFillCheckCircle,
 
} from 'react-icons/ai'; // Import your icon components
import {
  BsPenFill
}from 'react-icons/bs'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { getActivity } from './apiServices';

const Activity = () => {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [activityResponse, setActivityResponse] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    getActivity().then((res) => {
      setActivityResponse(res.result);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform task assignment logic here, using selectedStudentId, taskDescription, and dueDate

    // Clear form fields and close the modal
    setSelectedStudentId('');
    setTaskDescription('');
    setDueDate('');
    
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#475569', color: 'white', fontSize: '17px' }}>Topic</TableCell>
              <TableCell style={{ backgroundColor: '#475569', color: 'white', fontSize: '17px' }}>Due Date</TableCell>
              <TableCell style={{ backgroundColor: '#475569', color: 'white', fontSize: '17px' }}>Type</TableCell>
              <TableCell style={{ backgroundColor: '#475569', color: 'white', fontSize: '17px' }}>Evaluated by</TableCell>
              <TableCell style={{ backgroundColor: '#475569', color: 'white', fontSize: '17px' }}>Status</TableCell>
              <TableCell style={{ backgroundColor: '#475569', color: 'white', fontSize: '17px' }}>Mark</TableCell>
              <TableCell style={{ backgroundColor: '#475569', color: 'white', fontSize: '17px' }}>Evaluate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityResponse.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.topic}</TableCell>
                <TableCell>{student.duedate}</TableCell>
                <TableCell>{student.type}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.answer.status}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {student.answer.status === 'submitted' ? (
                    <AiFillCheckCircle size={20} />
                  ) : (
                    <BsPenFill size={20} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Activity;
