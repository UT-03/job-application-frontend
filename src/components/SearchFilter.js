import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { industries, canadaProvinces } from '../util/GlobalVariables';

const SearchFilter = (props) => {
    return (
        <Container
            className="py-5 bg-primary d-flex align-items-center justify-content-center"
            fluid
            style={{
                minHeight: "40vh"
            }}>
            <Row className="g-2"
            >
                <Col xs={12} sm={6} lg={3} className="d-flex align-items-center justify-content-center">
                    <Form.Control
                        type="text"
                        placeholder="Keyword"
                        onChange={e => props.setKeyWordQuery(e.target.value)} />
                </Col>
                <Col xs={12} sm={6} lg={3} className="d-flex align-items-center justify-content-center">
                    <Form.Select
                        onChange={e => props.setIndustryQuery(e.target.value)}>
                        <option value="">Select Industry</option>
                        {Object.keys(industries).map(indCode => <option value={indCode} key={indCode}>{industries[indCode]}</option>)}
                    </Form.Select>
                </Col>
                <Col xs={12} sm={6} lg={3} className="d-flex align-items-center justify-content-center">
                    <Form.Select
                        onChange={e => props.setLocationQuery(e.target.value)}>
                        <option value="">Select Location</option>
                        {Object.keys(canadaProvinces).map(proCode => <option value={proCode} key={proCode}>{canadaProvinces[proCode]}</option>)}
                    </Form.Select>
                </Col>
                <Col xs={12} sm={6} lg={3} className="d-flex align-items-center justify-content-center">
                    <Button
                        variant="outline-light"
                        onClick={() => props.onSubmit()}
                    >{props.buttonLabel}</Button>
                </Col>
            </Row>
        </Container>

    );
};

export default SearchFilter;