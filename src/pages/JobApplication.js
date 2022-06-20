import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditProfileForm from '../components/EditProfileForm';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from '../components/ErrorModal';
import SelectResume from '../components/SelectResume';

const JobApplication = () => {
    const { state } = useLocation();
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(state.stage === 'resume-select' ? state.resumeURLs : null);
    const [selectedResume, setSelectedResume] = useState(null);

    const auth = useContext(AuthContext);

    const { isLoading, sendRequest, error, clearError } = useHttpClient();

    const fetchApplicantProfileData = () => {
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/profile-data`,
            'GET',
            null,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(res => {
                setData(() => res.applicantProfileData);
            });
    }

    useEffect(() => {
        if (auth.isLoggedIn && state.stage === 'review-profile')
            fetchApplicantProfileData();
    }, [auth]);

    const reviewProfileFormSubmitHandler = (requestObj, selectedReferencesIndex) => {
        navigate(`/apply-for-job/${jobId}`, {
            state: {
                stage: "resume-select",
                profileDataObj: requestObj,
                selectedReferencesIndex: selectedReferencesIndex,
                resumeURLs: data.resume
            }
        });
    }

    const resumeSelectHandler = (index) => {
        if (selectedResume === index)
            setSelectedResume(null);
        else
            setSelectedResume(index);
    }

    const resumeSubmitHandler = () => {
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/apply-for-job/${jobId}`,
            'POST',
            JSON.stringify({
                requestObj: state.profileDataObj,
                selectedReferencesIndex: state.selectedReferencesIndex,
                selectedResume: state.resumeURLs[selectedResume]
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(() => navigate('/'));
    }

    return (
        <React.Fragment>
            <ErrorModal show={!!error} error={error} onHide={clearError} />
            {state.stage === "review-profile" && data && (
                <EditProfileForm
                    formState={data}
                    isApplicationFormMode={true}
                    onSubmit={reviewProfileFormSubmitHandler}
                    disableSubmitButton={isLoading}
                />
            )}
            {state.stage === "resume-select" && data && (
                <SelectResume
                    resumeURLs={state.resumeURLs}
                    selectedResume={selectedResume}
                    onSelectResume={resumeSelectHandler}
                    onResumeSubmit={resumeSubmitHandler}
                    isLoading={isLoading} />
            )}
        </React.Fragment>
    );
};

export default JobApplication;