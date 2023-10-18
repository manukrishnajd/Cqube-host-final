// MainRouter.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminDashboard, Trainers, Students, Courses, ViewPage, Trainer, Kanban, Editor, Calendar, ColorPicker, Line, Area, Bar, Pie, Financial, ColorMapping, Pyramid, Stacked } from './Pages';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/trainer_dash" element={<AdminDashboard />} />
        <Route path="/dupe" element={<Ecommerce />} />
        <Route path="/Home" element={<AdminDashboard />} />
        <Route path="/trainer" element={<Trainers />} />
        <Route path="/student" element={<Students />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/student/viewpage" element={<ViewPage />} />
        <Route path="/trainer_new" element={<Trainer />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/line" element={<Line />} />
        <Route path="/area" element={<Area />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/color-mapping" element={<ColorMapping />} />
        <Route path="/pyramid" element={<Pyramid />} />
        <Route path="/stacked" element={<Stacked />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
