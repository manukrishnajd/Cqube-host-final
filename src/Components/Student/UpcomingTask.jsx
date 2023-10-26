import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function UpcomingTasks() {
  const taskData = [
    {
      taskName: 'Merge sort',
      description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
      date: 'Date: 2023-10-10',
      assignedBy: 'Assigned by: John Doe',
      type: 'Type: Online',
    },
    {
      taskName: 'Hello',
      description: 'Another task description',
      date: 'Date: 2023-10-15',
      assignedBy: 'Assigned by: Jane Smith',
      type: 'Type: In-person',
    },
  ];

  const navigate = useNavigate();

  const handleTaskButtonClick = (task) => {
    // Use the `navigate` function to go to the Submit Form page and pass the task data as state
    navigate('/student/submitform', { state: task });
  };

  return (
    <div>
      {taskData.map((task, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {task.taskName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.assignedBy}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.type}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleTaskButtonClick(task)}
            >
              Task
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
