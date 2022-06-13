import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TwoColumnStructuringWrapper = (props) => {
    return (
        <Container fluid className="p-0">
            <Row>
                <Col xs={12} lg={6}>
                    {props.element1}
                </Col>
                <Col xs={12} lg={6}>
                    {props.element2}
                </Col>
            </Row>
        </Container>
    );
};

export default TwoColumnStructuringWrapper;