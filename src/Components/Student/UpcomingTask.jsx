import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Link, useNavigate } from 'react-router-dom';
import { getActivity } from './apiServices';
import SubmitForm from './SubmitForm';

export default function UpcomingTasks() {
  const [activityResponse, setActivityResponse] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getActivity().then((res) => {
      // Filter out submitted tasks
      const upcomingTasks = res.result.filter((task) => task.answer?.status !== 'evaluated' && task.answer?.status !== 'submitted');
      
      // Sort the filtered tasks by duedate in descending order
      upcomingTasks.sort((task1, task2) => new Date(task2.duedate) - new Date(task1.duedate));
      
      setActivityResponse(upcomingTasks);
    });
  }, []);

  console.log(activityResponse);

  const navigate = useNavigate();

  const handleTaskButtonClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='overflow-x-scroll w-[55rem] p-3' >
    <div className="flex gap-5 container w-[1008px]">
      {activityResponse.map((task, index) => {
        const createdAtDate = new Date(task.duedate);
        const formattedDate = `${createdAtDate.getDate()} / ${createdAtDate.getMonth() + 1} / ${createdAtDate.getFullYear()}`;
        return (
          <Card key={index} sx={{ width: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {task.topic}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.notes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Due Date: {formattedDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assigned By: {task.trainersName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {task.type}
              </Typography>
            </CardContent>
            <Button size="small" color="primary" onClick={() => handleTaskButtonClick(task)}>
              Task
            </Button>
          </Card>
        );
      })}
      </div>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogContent>
          <SubmitForm topic={selectedTask.topic} duedate={selectedTask.duedate} note={selectedTask.notes} id={selectedTask._id} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
