import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { ref, deleteObject } from 'firebase/storage';

import storage from '../util/firebase';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import WarningModal from '../components/WarningModal';
import ResumeUploadModal from '../components/ResumeUploadModal';
import ErrorModal from '../components/ErrorModal';
import PageLoadingSpinner from '../components/PageLoadingSpinner';
import DisplayResumeList from '../components/DisplayResumeList';
import ApplicantProfileCard from '../components/ApplicantProfileCard';

const ApplicantProfile = () => {
    const [data, setData] = useState();
    const [showWarningModel, setShowWarningModel] = useState();
    const [showResumeUploadModel, setShowResumeUploadModel] = useState(false);
    const [isDeletingResume, setIsDeletingResume] = useState(false);

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate();

    // Fetches applicant profile data amd sets the state 'data'
    const fetchApplicantData = () => {
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
        // fetching applicant data if user is logged in
        if (auth.isLoggedIn)
            fetchApplicantData();
    }, [auth]);

    // Deletes the resume in backend and updates th UI on success
    const deleteResumeHandler = (dataFromWarningModal) => {
        setIsDeletingResume(true);
        const resumeToBeDeleted = dataFromWarningModal.resumeURL;

        const deleteRef = ref(storage, resumeToBeDeleted);
        deleteObject(deleteRef)
            .then(() => {
                return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/delete-resume`,
                    'DELETE',
                    JSON.stringify({
                        urlToBeDeleted: resumeToBeDeleted
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    })
            })
            .then(() => {
                const data$ = { ...data };
                data$.resume = data$.resume.filter(res => res !== resumeToBeDeleted);
                setData(() => data$);

                setShowWarningModel(null);
                setIsDeletingResume(false);
            })
            .catch((err) => {
                console.log(err);
            });


    }

    // Changes the UI on resume upload
    const onResumeUpload = (url) => {
        const data$ = { ...data };
        data$.resume.push(url);
        setData(() => data$);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            {!!showWarningModel && <WarningModal
                show={!!showWarningModel}
                data={showWarningModel}
                onHide={() => setShowWarningModel(null)}
                onActionButtonClick={deleteResumeHandler}
                isLoading={isDeletingResume} />}
            <ResumeUploadModal
                show={showResumeUploadModel}
                onHide={() => setShowResumeUploadModel(false)}
                onResumeUpload={onResumeUpload} />
            <Container className="pt-5 px-0">
                {data && (
                    <React.Fragment>
                        {/* EDIT PROFILE button */}
                        <Button
                            variant='outline-primary'
                            onClick={() => navigate('/edit-profile', { state: data })}
                            className="mb-3 d-block ms-auto"
                        >Edit Profile</Button>

                        {/* APPLICANT PROFILE card */}
                        <ApplicantProfileCard
                            data={data} >

                            {/* applicant RESUME */}
                            <h5>Resume</h5>
                            <DisplayResumeList
                                resumeArray={data.resume}
                                onActionButtonClick={(url) => {
                                    setShowWarningModel({
                                        message: "Are you sure you want to delete this resume?",
                                        actionButtonLabel: "Delete",
                                        resumeURL: url
                                    })
                                }}
                                actionButtonLabel="Delete"
                            />

                            {data.resume.length === 0 && (
                                <h6 className="mb-4 text-muted d-flex">
                                    <span><em>Not Provided</em></span>
                                </h6>
                            )}

                            <Button
                                className="mb-4"
                                onClick={() => setShowResumeUploadModel(true)}>Upload resume</Button>
                        </ApplicantProfileCard>
                    </React.Fragment>
                )}
            </Container>
            {!data && isLoading && <PageLoadingSpinner />}
        </React.Fragment>
    );
};

export default ApplicantProfile;