import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/AuthHook';
import Auth from './pages/Auth';
import Home from './pages/Home';
import JobApplicationForm from './pages/JobApplicationForm';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { token, userType, login, logout } = useAuth();

  let routes;
  routes = <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/apply-for-job/:jobId' element={<JobApplicationForm />} />
    <Route path='/auth' element={<Auth />} />
  </Routes>
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userType: userType,
        login: login,
        logout: logout
      }}
    >
      <React.Fragment>
        {routes}
      </React.Fragment>
    </AuthContext.Provider>
  );
};

export default App;