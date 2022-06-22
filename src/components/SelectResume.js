import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import BoxSeperator from './BoxSeperator';
import ResumeUploadModal from './ResumeUploadModal';

const SelectResume = (props) => {
    const [data, setData] = useState(props.resumeURLs);
    const [showResumeUploadModel, setShowResumeUploadModel] = useState(false);

    const onResumeUpload = (url) => {
        console.log(url)
        const data$ = [...data];
        data$.push(url);
        setData(() => data$);

        setShowResumeUploadModel(false);

        props.onSelectResume(data$.length - 1);
    }

    return (
        <React.Fragment>
            <ResumeUploadModal
                show={showResumeUploadModel}
                onHide={() => setShowResumeUploadModel(false)}
                onResumeUpload={onResumeUpload} />
            <BoxSeperator
                heading="Select Resume"
            >
                <Container>
                    {data && data.length === 0 && (
                        <h6 className="mb-4 text-muted d-flex">You haven't uploaded any resume yet. Upload one to see here.</h6>
                    )}
                    {data && data.length !== 0 && data.map((url, index) => (
                        <Row
                            className="my-2 py-2 px-0 mx-0 bg-light rounded resume-display--container"
                            key={index}>
                            <Col xs={12} md={4} className="d-flex align-items-center resume-display--heading-box">
                                <h6 className="text-muted mb-0">Resume {index + 1}</h6>
                            </Col>
                            <Col xs={12} md={8} className="d-flex resume-display--buttons-box">
                                <Button
                                    as="a"
                                    href={url}
                                    target="_blank"
                                    variant="primary"
                                    className="d-block me-2">
                                    View
                                </Button>
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
                    disabled={props.selectedResume === null || props.isLoading}
                    onClick={props.onResumeSubmit}>
                    {props.isLoading && (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
                    Apply
                </Button>
                <Button
                    className="ms-2"
                    variant="outline-primary"
                    onClick={() => setShowResumeUploadModel(true)}>
                    Upload Resume
                </Button>
            </BoxSeperator >
        </React.Fragment>
    );
};

export default SelectResume;