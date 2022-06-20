import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import landingPageIllustration from '../../assets/images/landingPageIllustration.svg';
import heartIcon from '../../assets/images/heartIcon.svg';
import wave from '../../assets/images/wave.svg';

const HomePage = (props) => {
    return (
        <Container className="gradient pt-3 pt-md-5 px-0 fs-6" fluid>
            <Row className="w-100 mx-auto g-2 mt-2 mt-md-3">
                <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center">
                    <h3 className="display-4 text-white text-center homepage--headline">Find the job you love</h3>
                    <Col xs={12}>
                        <Image className="d-block mx-auto homepage--heart" src={heartIcon} />
                    </Col>
                </Col>
                <Col xs={12} md={6}>
                    <Image className="w-100 rounded p-5" src={landingPageIllustration} />
                </Col>
            </Row>
            <Image src={wave} />
        </Container>
    );
};

export default HomePage;