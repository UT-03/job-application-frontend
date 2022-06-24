import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';

import locationIcon from '../assets/images/locationIcon.svg';
import industryIcon from '../assets/images/industryIcon.svg';
import { AuthContext } from '../context/AuthContext';
import WarningModal from './WarningModal';
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from './ErrorModal';

const JobCard = (props) => {
    const auth = useContext(AuthContext);

    const [showWarningModal, setShowWarningModal] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate();

    // deletes the job posting on server
    const deleteJobPostingHandler = () => {
        // sending request to backend
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/immigration-firm/delete-job-posting`,
            'DELETE',
            JSON.stringify({
                _id: props.jobData._id
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(() => setShowWarningModal(null))  //hiding warning modal
            .then(() => props.onJobPostingDelete(props.jobData._id))    //calling func to update frontend
    }

    return (
        <React.Fragment>
            {/* ErrorModal */}
            <ErrorModal error={error} show={!!error} onHide={clearError} />

            {/* Warning Modal for deleting job posting */}
            {!!showWarningModal && <WarningModal
                show={!!showWarningModal}
                data={showWarningModal}
                onHide={() => setShowWarningModal(null)}
                onActionButtonClick={deleteJobPostingHandler}
                isLoading={isLoading} />}

            {/* Job Card */}
            <Card className='w-100 shadow'>
                <Card.Body>
                    {/* Job Title */}
                    <Card.Title>{props.jobData.jobTitle}</Card.Title>

                    {/* Job Location and Job Industry */}
                    <Card.Subtitle className="mb-2 text-muted">
                        <Image src={locationIcon} className='me-1' />
                        {props.jobData.jobLocation}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                        <Image src={industryIcon} className='me-1' />
                        {props.jobData.industry}
                    </Card.Subtitle>

                    {/* number of applications for job-visible only to owner immigration firm */}
                    <Card.Subtitle className="mb-2 text-muted d-block text-decoration-none" as={Link} to={`/view-job-applicants/${props.jobData._id}`}>
                        {`${props.jobData.jobApplications.length} Application${props.jobData.jobApplications.length === 1 ? '' : 's'}`}
                    </Card.Subtitle>

                    {/* keywords in pill badges */}
                    <Card.Subtitle>
                        {
                            props.jobData.keyWords.map((tag, index) => (<Badge pill bg="secondary" className='text-white mx-1' key={index}>{tag}</Badge>))
                        }
                    </Card.Subtitle>

                    {/* Job Description */}
                    <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                        {props.jobData.jobDescription}
                    </Card.Text>

                    {/* EDIT and DELETE buttons - visible only to immigration firm account(only to owner of job posting) */}
                    {auth.isLoggedIn && auth.userType === 'immigration-firm' && auth.userId === props.jobData.postedBy && (
                        <React.Fragment>
                            <Button
                                variant='outline-primary'
                                className='me-2'
                                onClick={() => navigate('/edit-job-posting', { state: props.jobData })}>
                                Edit</Button>
                            <Button
                                onClick={() => setShowWarningModal({
                                    message: 'Are you sure you want to delete this Job Posting?',
                                    actionButtonLabel: 'Delete'
                                })}
                            >
                                Delete</Button>
                        </React.Fragment>
                    )}

                    {/* APLLY button - visible only to applicant accounts */}
                    {auth.isLoggedIn && auth.userType === 'applicant' && (
                        <Button
                            variant="primary"
                            onClick={() => navigate(`/apply-for-job/${props.jobData._id}`, { state: { stage: "review-profile" } })}
                        >
                            Apply for job
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </React.Fragment>

    );
};

export default JobCard;