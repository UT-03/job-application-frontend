import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import ApplicantProfileCard from '../components/ApplicantProfileCard';

const ViewJobApplicantProfile = () => {
    const { state } = useLocation();

    const applicantData = state.applicantData;

    return (
        <Container className='mt-5'>
            <ApplicantProfileCard
                data={applicantData}
                origin="job-application">
                <h5>Resume</h5>
                <Button
                    as="a"
                    href={applicantData.resume}
                    target="_blank"
                    variant="primary"
                    className="d-inline-block me-2">
                    View Resume
                </Button>
            </ApplicantProfileCard>
        </Container>
    );
};

export default ViewJobApplicantProfile;