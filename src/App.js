import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  let routes;
  routes = <Routes>
    <Route path='/' element={<Home />} />
  </Routes>
  return (
    <React.Fragment>
      {routes}
    </React.Fragment>
  );
};

export default App;