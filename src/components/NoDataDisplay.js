import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import noDataIllustration from '../assets/images/noDataIllustration.svg';

const NoDataDisplay = (props) => {
    return (
        <React.Fragment>
            <Container className='min-vh-50 d-flex flex-column justify-content-center'>
                <Row>
                    <Col lg={6} className="d-lg-block">
                        <Image src={noDataIllustration} style={{ width: "30vw" }} className="d-block m-auto w-50" />
                    </Col>
                    <Col xs={12} lg={6} className='d-flex align-items-center'>
                        <div className="mx-auto">
                            <h1>{props.heading}</h1>
                            <h3>{props.subHeading}</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default NoDataDisplay;