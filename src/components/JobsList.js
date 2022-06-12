import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import JobCard from './JobCard';

const JobsList = (props) => {
    return (
        <Container style={{ marginTop: '90px' }}>
            {props.jobApplications.map(appl => {
                return (
                    <Row key={appl.id} className='my-4'>
                        <JobCard jobData={appl} />
                    </Row>
                )
            })}
        </Container>
    );
};

export default JobsList;