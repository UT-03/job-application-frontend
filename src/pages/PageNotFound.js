import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import pageNotFoundIllustration from '../assets/images/pageNotFoundIllustration.svg';

const PageNotFound = () => {
    return (
        <Container className='min-vh-100 d-flex flex-column justify-content-center'>
            <Row>
                <Col lg={6} className="d-lg-block">
                    <Image src={pageNotFoundIllustration} style={{ width: "30vw" }} className="d-block m-auto w-50" />
                </Col>
                <Col xs={12} lg={6} className='d-flex align-items-center'>
                    <div className="mx-auto">
                        <h1 className="display-2">Page Not Found!</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PageNotFound;