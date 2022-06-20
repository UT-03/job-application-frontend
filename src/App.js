import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/AuthHook';
import Auth from './pages/Auth';
import Home from './pages/Home';
import AddJobPosting from './pages/AddJobPosting';
import { AuthContext } from './context/AuthContext';
import EditJobPosting from './pages/EditJobPosting';
import ViewJobPostings from './pages/ViewJobPostings';
import Header from './components/Header';
import SearchJobs from './pages/SearchJobs';
import ScrollToTop from './components/ScrollToTop';
import ApplicantProfile from './pages/ApplicantProfile';
import EditApplicantProfile from './pages/EditApplicantProfile';
import JobApplication from './pages/JobApplication';

const App = () => {
  const { token, userType, userId, login, logout } = useAuth();

  let routes;
  routes = <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/search-jobs' element={<SearchJobs />} />
    <Route path='/my-profile' element={<ApplicantProfile />} />
    <Route path='/edit-profile' element={<EditApplicantProfile />} />
    <Route path='/view-my-job-postings' element={<ViewJobPostings />} />
    <Route path='/apply-for-job/:jobId' element={<JobApplication />} />
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
        userId: userId,
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