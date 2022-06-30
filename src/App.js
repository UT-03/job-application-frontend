import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAuth } from './hooks/AuthHook';
import { AuthContext } from './context/AuthContext';
import Header from './components/Header';
import PageLoadingSpinner from './components/PageLoadingSpinner';

// Lazy imports for lazy loadings
const Auth = React.lazy(() => import('./pages/Auth'));
const Home = React.lazy(() => import('./pages/Home'));
const AddJobPosting = React.lazy(() => import('./pages/AddJobPosting'));
const EditJobPosting = React.lazy(() => import('./pages/EditJobPosting'));
const ViewJobPostings = React.lazy(() => import('./pages/ViewJobPostings'));
const SearchJobs = React.lazy(() => import('./pages/SearchJobs'));
const ApplicantProfile = React.lazy(() => import('./pages/ApplicantProfile'));
const EditApplicantProfile = React.lazy(() => import('./pages/EditApplicantProfile'));
const JobApplication = React.lazy(() => import('./pages/JobApplication'));
const ViewJobApplicants = React.lazy(() => import('./pages/ViewJobApplicants'));
const ViewJobApplicantProfile = React.lazy(() => import('./pages/ViewJobApplicantProfile'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));
const ScrollToTop = React.lazy(() => import('./components/ScrollToTop'));

const App = () => {
  // To login on reload if already logged in
  const { token, userType, userId, login, logout } = useAuth();

  // Loading google script synchronously on start of app
  useEffect(() => {
    let googleScript = document.createElement('script');
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.type = "text/javascript";
    googleScript.async = false;                                 // <-- this is important
    document.getElementsByTagName('head')[0].appendChild(googleScript);
  }, []);

  let routes = null;
  if (!!token) {// if logged in
    if (userType === 'applicant') { // if logged in and is an applicant
      routes = <React.Fragment>
        <Route path='/search-jobs' element={<SearchJobs />} />
        <Route path='/my-profile' element={<ApplicantProfile />} />
        <Route path='/edit-profile' element={<EditApplicantProfile />} />
        <Route path='/apply-for-job/:jobId' element={<JobApplication />} />
      </React.Fragment>
    }
    else if (userType === 'immigration-firm') { // if logged in and is immigration-firm
      routes = <React.Fragment>
        <Route path='/view-my-job-postings' element={<ViewJobPostings />} />
        <Route path="/add-new-job" element={<AddJobPosting />} />
        <Route path="/edit-job-posting" element={<EditJobPosting />} />
        <Route path="/view-job-applicants/:jobId" element={<ViewJobApplicants />} />
        <Route path="/view-job-applicant-profile" element={<ViewJobApplicantProfile />} />
      </React.Fragment>
    }
  }
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
        <Suspense fallback={<PageLoadingSpinner />}>
          <Routes>
            {/* Routes available only when user is logged in */}
            {routes}

            {/* Routes available for everyone irrespective of userType */}
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </AuthContext.Provider>
  );
};

export default App;