import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getActivity } from './apiServices';
import { logBase } from '@syncfusion/ej2-react-charts';

export default function UpcomingTasks() {

  React.useEffect(()=>{
    getActivity().then((res)=>{
      setActivityResponse(res.result);
    })
  },[])

  const navigate = useNavigate();

  const handleTaskButtonClick = (task) => {
    // Use the `navigate` function to go to the Submit Form page and pass the task data as state
    navigate('/student/submitform', { state: task });
  };

  const [activityResponse, setActivityResponse] = React.useState([]);
  console.log(activityResponse,'sdaokioufiyu');

  return ( 
    <div className='flex gap-5'>
      {activityResponse.map((task, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {task.topic} 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.notes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.duedate}
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
            <Link to={`/student/submitform/${task._id}`}>
            <Button
              size="small"
              color="primary" TaskTopics={task.topic} TaskNote={task.notes}>
              Task
            </Button>
                </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
