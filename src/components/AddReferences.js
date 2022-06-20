import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Input from './Input';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/validators';
import TwoColumnStructuringWrapper from './TwoColumnStructuringWrapper';
import deleteIcon from '../assets/images/deleteIcon.svg';

const AddReferences = (props) => {
    return (
        <React.Fragment>
            {props.existingReferences.map((ref, index) => {
                const isSelected = props.isApplicationFormMode ? props.selectedReferences.includes(index) : null;
                return (
                    <Container className="my-3" key={index}>
                        <Row>
                            <Col>
                                <h6 className="d-inline-block">Reference {index + 1}</h6>
                            </Col>
                            <Col>
                                <Col className="d-flex justify-content-end">
                                    {props.isApplicationFormMode && (
                                        <Button
                                            size='sm'
                                            variant={`${isSelected ? 'primary' : 'outline-primary'}`}
                                            onClick={() => props.onSelectClick(index)}
                                        >
                                            {isSelected ? 'Selected' : 'Select'}
                                        </Button>
                                    )}
                                </Col>
                            </Col>
                        </Row>

                        <Input
                            className="mb-1"
                            element="input"
                            type="text"
                            id={`name${index}`}
                            label="Name"
                            initialValue={ref.name}
                            initialValid={ref.name ? true : false}
                            onChange={(val) => props.changeHandler(index, 'name', val)}
                            validators={[]} />
                        <TwoColumnStructuringWrapper
                            element1={<Input
                                element="input"
                                type="email"
                                id={`email${index}`}
                                label="Email"
                                initialValue={ref.email}
                                initialValid={ref.email ? true : false}
                                onChange={(val) => props.changeHandler(index, 'email', val)}
                                validators={[VALIDATOR_EMAIL()]}
                                errorText="Please enter valid email" />}
                            element2={<Input
                                element="input"
                                type="tel"
                                id={`phoneNumber${index}`}
                                label="Phone Number"
                                initialValue={ref.phoneNumber}
                                initialValid={ref.phoneNumber ? true : false}
                                onChange={(val) => props.changeHandler(index, 'phoneNumber', val)}
                                validators={[]} />}
                        />
                    </Container>
                );
            })}
            <Button
                className="d-block mx-auto"
                onClick={props.onAddReference}>+</Button>
        </React.Fragment>
    );
};

export default AddReferences;