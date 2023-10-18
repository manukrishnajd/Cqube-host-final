import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import App from './AttendenceCalender';
import { studentbyid } from './apiServices';

export default function AttendenceCard() {
  const token = "your_token_here"; // Replace with your actual token
  const stdid = localStorage.getItem("id");

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Fetch student data and update the state
    studentbyid(stdid, { token })
      .then(data => {
        setStudentData(data.courses);
        console.log(data.courses);
      })
      .catch(error => {
        console.error("Failed to fetch student data: " + error.message);
      });
  }, [stdid, token]);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const openDialog = (trainer) => {
    setSelectedTrainer(trainer);
    console.log(trainer,'tt')
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark-bg rounded-3xl">
      <h1 className="text-5xl">Attendance</h1>
      {studentData && studentData.length > 0 ? (
        studentData.map((courses, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginTop: 10 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {courses.trainerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {courses.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => openDialog(courses)}>
                ATTENDANCE
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <p>Loading or no data available.</p>
      )}

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Attendance Calendar</DialogTitle>
        <DialogContent>
          {selectedTrainer && (
            <App data={selectedTrainer} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
