// App.js
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Footer, Sidebar, ThemeSettings } from './Components';
import MainRouter from './Router/MainRouter';

const App = () => {
  const [selectedModule, setSelectedModule] = useState('admin');

  const handleModuleChange = (module) => {
    setSelectedModule(module);
  };

  return (
    <div>
      <BrowserRouter>
        <div>
          <button onClick={() => handleModuleChange('admin')}>Admin</button>
          <button onClick={() => handleModuleChange('student')}>Student</button>
          <button onClick={() => handleModuleChange('trainer')}>Trainer</button>

          {selectedModule === 'admin' && (
            <div>
              <h1>Admin Module</h1>
              <MainRouter />
            </div>
          )}
          {selectedModule === 'student' && (
            <div>
              <h1>Student Module</h1>
              {/* Add your StudentModule related content here */}
            </div>
          )}
          {selectedModule === 'trainer' && (
            <div>
              <h1>Trainer Module</h1>
              {/* Add your TrainerModule related content here */}
            </div>
          )}

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
