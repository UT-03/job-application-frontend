import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const JobApplicantCard = (props) => {
    const navigate = useNavigate();

    const applicantData = props.applicantData.applicantProfile;
    applicantData.resume = props.applicantData.resume;
    applicantData.references = props.applicantData.references;

    return (
        <Card className='w-100 shadow my-3' ref={props.lastDataRef ? props.lastDataRef : null}>
            <Card.Body>
                {/* Applicant's name */}
                <Card.Title>{applicantData.name}</Card.Title>

                {/* Applicant's email */}
                <Card.Subtitle
                    className="text-muted mb-2">{applicantData.email}</Card.Subtitle>

                {/* View Resume */}
                <Button
                    as="a"
                    href={applicantData.resume}
                    target="_blank"
                    variant="outline-primary"
                    className="d-inline-block me-2">
                    View Resume
                </Button>

                {/* View profile */}
                <Button
                    variant="primary"
                    onClick={() => navigate('/view-job-applicant-profile', { state: { applicantData: applicantData } })}>
                    View Profile
                </Button>
            </Card.Body>
        </Card>
    );
};

export default JobApplicantCard;