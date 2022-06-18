import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/AuthHook';
import Auth from './pages/Auth';
import Home from './pages/Home';
import AddJobPosting from './pages/AddJobPosting';
import JobApplicationForm from './pages/JobApplicationForm';
import { AuthContext } from './context/AuthContext';
import EditJobPosting from './pages/EditJobPosting';
import ViewJobPostings from './pages/ViewJobPostings';
import Header from './components/Header';
import SearchJobs from './pages/SearchJobs';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const { token, userType, login, logout } = useAuth();

  let routes;
  routes = <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/search-jobs' element={<SearchJobs />} />
    <Route path='/view-my-job-postings' element={<ViewJobPostings />} />
    <Route path='/apply-for-job/:jobId' element={<JobApplicationForm />} />
    <Route path='/auth' element={<Auth />} />
    <Route path="/add-new-job" element={<AddJobPosting />} />
    <Route path="/edit-job-posting" element={<EditJobPosting />} />
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
      <ScrollToTop>
        <Header />
        <div style={{ height: "48px" }}></div>
        {routes}
      </ScrollToTop>
    </AuthContext.Provider>
  );
};

export default App;