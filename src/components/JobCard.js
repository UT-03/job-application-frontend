import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

import locationIcon from '../assets/images/locationIcon.svg';

const JobCard = (props) => {
    return (
        <Card className='w-100 shadow'>
            <Card.Body>
                <Card.Title>{props.jobData.jobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <Image src={locationIcon} className='me-1' />
                    {props.jobData.jobLocation}
                </Card.Subtitle>
                {
                    props.jobData.tags.map((tag, index) => (<Badge pill bg="secondary" className='text-black mx-1' key={index}>{tag}</Badge>))
                }
                <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {props.jobData.jobDescription}
                </Card.Text>
                <Button variant="primary" as={Link} to={`/apply-for-job/${props.jobData.id}`}>Apply</Button>
            </Card.Body>
        </Card>
    );
};

export default JobCard;