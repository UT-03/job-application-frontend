import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const DisplayResumeList = (props) => {
    return (
        <React.Fragment>
            {props.resumeArray && props.resumeArray.length !== 0 && props.resumeArray.map((url, index) => (
                <Row className="my-2 py-2 px-0 mx-0 bg-light rounded resume-display--container" key={index}>
                    <Col xs={12} md={4} className="d-flex align-items-center resume-display--heading-box">
                        <h6 className="text-muted mb-0">Resume {index + 1}</h6>
                    </Col>
                    <Col xs={12} md={8} className="d-flex resume-display--buttons-box">
                        <Button
                            as="a"
                            href={url}
                            target="_blank"
                            variant="outline-primary"
                            className="d-block me-2">
                            View
                        </Button>
                        <Button
                            onClick={() => props.onActionButtonClick(url, index)}
                            variant="primary"
                            className="d-block">{props.actionButtonLabel}</Button>
                    </Col>
                </Row>
            ))}
        </React.Fragment>
    );
};

export default DisplayResumeList;