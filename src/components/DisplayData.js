import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DisplayData = (props) => {
    return (
        <Container className="w-75">
            <Row>
                <Col className="mb-1"
                >{props.data.heading}</Col>
            </Row>
            <Row
                className="border border-2 rounded py-2"
                style={{
                    backgroundColor: "#e9ecef"
                }}>
                {!props.data.value && (<Col className="text-muted"><em>Not Provided</em></Col>)}
            </Row>
        </Container>
    );
};

export default DisplayData;