import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import JobCard from './JobCard';

const JobsList = (props) => {
    return (
        <Container style={{ marginTop: '90px' }}>

            {props.data.map((appl, index) => {
                if (index === props.data.length - 1)
                    return (
                        <Row key={appl._id} className='my-4' ref={props.lastDataRef}>
                            <JobCard jobData={appl} onJobPostingDelete={props.onJobPostingDelete} />
                        </Row>
                    )
                else
                    return (
                        <Row key={appl._id} className='my-4'>
                            <JobCard jobData={appl} onJobPostingDelete={props.onJobPostingDelete} />
                        </Row>
                    )
            })}
        </Container>
    );
};

export default JobsList;