import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import emailIcon from '../assets/images/emailIcon.svg';
import phoneIcon from '../assets/images/phoneIcon.svg';
import BlockSeparator from '../components/BlockSeparator';
import ProfileData from '../components/ProfileData';
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


    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate();

    const fetchApplicantData = () => {
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/profile-data`,
            'GET',
            null,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(res => {
                console.log(res)
                setData(() => res.applicantProfileData);
            });
    }

    useEffect(() => {
        if (auth.isLoggedIn)
            fetchApplicantData();
    }, [auth]);

    const deleteResumeHandler = (dataFromWarningModal) => {
        const resumeToBeDeleted = dataFromWarningModal.resumeURL;
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/delete-resume`,
            'DELETE',
            JSON.stringify({
                urlToBeDeleted: resumeToBeDeleted
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(() => {
                const data$ = { ...data };
                data$.resume = data$.resume.filter(res => res !== resumeToBeDeleted);
                setData(() => data$);

                setShowWarningModel(null);
            });
    }

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
                isLoading={isLoading} />}
            <ResumeUploadModal
                show={showResumeUploadModel}
                onHide={() => setShowResumeUploadModel(false)}
                onResumeUpload={onResumeUpload} />
            <Container className="pt-5 px-0">
                {data && (
                    <React.Fragment>
                        <Button
                            variant='outline-primary'
                            onClick={() => navigate('/edit-profile', { state: data })}
                            className="mb-3 d-block ms-auto"
                        >Edit Profile</Button>
                        <ApplicantProfileCard
                            data={data} >
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