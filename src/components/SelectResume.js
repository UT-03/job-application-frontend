import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BoxSeperator from './BoxSeperator';

const SelectResume = (props) => {
    console.log(props.resumeURLs)
    return (
        <BoxSeperator
            heading="Select Resume"
        >
            <Container>
                {props.resumeURLs && props.resumeURLs.length !== 0 && props.resumeURLs.map((url, index) => (
                    <Row
                        className="my-2 w-50 py-2 bg-light rounded"
                        key={index}
                        style={{ backgroundColor: props.selectedResume === index ? '#adb5bd' : '' }}>
                        <Col xs={3} lg={6} className="d-flex align-items-center">
                            <h6 className="text-muted">Resume {index + 1}</h6>
                        </Col>
                        <Col>
                            <Button
                                as="a"
                                href={url}
                                target="_blank"
                                variant="outline-primary"
                                className="d-inline-block">
                                View
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant={props.selectedResume === index ? 'primary' : 'outline-primary'}
                                onClick={() => props.onSelectResume(index)}>
                                {props.selectedResume === index ? 'Selected' : 'Select'}
                            </Button>
                        </Col>
                    </Row>
                ))}
            </Container>
            <Button
                disabled={props.selectedResume === null}
                onClick={props.onResumeSubmit}>
                Apply
            </Button>
        </BoxSeperator >
    );
};

export default SelectResume;