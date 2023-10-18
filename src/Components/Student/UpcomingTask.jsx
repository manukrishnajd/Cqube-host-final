import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UpcomingTask() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Merge sort
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: 2023-10-10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assigned by: John Doe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: Online
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to='/student/submitform'>
        <Button size="small" color="primary">
          Task
        </Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}
