import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JobApplicationForm from './pages/JobApplicationForm';

const App = () => {
  let routes;
  routes = <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/apply-for-job/:jobId' element={<JobApplicationForm />} />
  </Routes>
  return (
    <React.Fragment>
      {routes}
    </React.Fragment>
  );
};

export default App;