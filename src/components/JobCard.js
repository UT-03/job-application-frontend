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

    const deleteJobPostingHandler = () => {
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/immigration-firm/delete-job-posting`,
            'DELETE',
            JSON.stringify({
                _id: props.jobData._id
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(res => console.log(res))
            .then(() => setShowWarningModal(null))
            .then(() => props.onJobPostingDelete(props.jobData._id))
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            {!!showWarningModal && <WarningModal
                show={!!showWarningModal}
                data={showWarningModal}
                onHide={() => setShowWarningModal(null)}
                onActionButtonClick={deleteJobPostingHandler}
                isLoading={isLoading} />}
            <Card className='w-100 shadow'>
                <Card.Body>
                    <Card.Title>{props.jobData.jobTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <Image src={locationIcon} className='me-1' />
                        {props.jobData.jobLocation}
                        <Image src={industryIcon} className='ms-3 me-1' />
                        {props.jobData.industry}
                    </Card.Subtitle>
                    <Card.Subtitle>
                        {
                            props.jobData.keyWords.map((tag, index) => (<Badge pill bg="secondary" className='text-black mx-1' key={index}>{tag}</Badge>))
                        }
                    </Card.Subtitle>
                    <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                        {props.jobData.jobDescription}
                    </Card.Text>
                    {auth.isLoggedIn && auth.userType === 'immigration-firm' && (
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
                    {auth.isLoggedIn && auth.userType === 'applicant' && <Button variant="primary" as={Link} to={`/apply-for-job/${props.jobData._id}`}>Apply</Button>}
                </Card.Body>
            </Card>
        </React.Fragment>

    );
};

export default JobCard;