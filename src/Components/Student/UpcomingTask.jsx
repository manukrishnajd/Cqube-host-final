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
      // Filter out submitted tasks before setting the activityResponse state
      const upcomingTasks = res.result.filter((task) => task.answer?.status !== 'evaluated' && task.answer?.status !== 'submitted');
      setActivityResponse(upcomingTasks);
    });
  }, []);

  const navigate = useNavigate();

  const handleTaskButtonClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-5">
      {activityResponse.map((task, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.topic}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.notes}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due Date: {task.duedate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Assigned By: {task.assignedBy}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {task.type}
            </Typography>
          </CardContent>
          <Button size="small" color="primary" onClick={() => handleTaskButtonClick(task)}>
            Task
          </Button>
        </Card>
      ))}

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogContent>
          <SubmitForm topic={selectedTask.topic} duedate={selectedTask.duedate} note={selectedTask.notes} id={selectedTask._id} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
