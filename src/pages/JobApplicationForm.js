import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useForm } from '../hooks/FormHook';
import Input from '../components/Input';
import { VALIDATOR_EMAIL, VALIDATOR_FILE, VALIDATOR_REQUIRE } from '../util/validators';
import BlockSeparator from '../components/BlockSeparator';
import TwoColumnStructuringWrapper from '../components/TwoColumnStructuringWrapper';

import { COUNTRIES } from '../util/GlobalVariables';

const JobApplicationForm = () => {
    let { jobId } = useParams();

    const [haveValidVisaForCanada, setHaveValidVisaForCanada] = useState(false);
    const [wouldYouLikeToGetAlertsOfThePostedJobs, setWouldYouLikeToGetAlertsOfThePostedJobs] = useState(true);

    const [formState, inputHandler] = useForm({
        name: {
            value: "",
            isValid: false
        },
        email: {
            value: "",
            isValid: false
        },
        phoneNumber: {
            value: "",
            isValid: false
        },
        maritalStatus: {
            value: "",
            isValid: false
        },
        noOfChildren: {
            value: "",
            isValid: false
        },
        countryOfResidence: {
            value: "",
            isValid: false
        },
        provinceOfCanadaWhereInterestedToWork: {
            value: "",
            isValid: false
        },
        statusInCountryOfResidence: {
            value: "",
            isValid: false
        },
        areaOfInterest: {
            value: "",
            isValid: false
        },
        workExperience: {
            value: "",
            isValid: false
        },
        highestLevelOfEducation: {
            value: "",
            isValid: false
        },
        nameOfReference1: {
            value: "",
            isValid: false
        },
        emailOfReference1: {
            value: "",
            isValid: false
        },
        resume: {
            value: null,
            isValid: false
        },
        phoneNumberOfReference1: {
            value: "",
            isValid: false
        },
        nameOfReference2: {
            value: "",
            isValid: false
        },
        emailOfReference2: {
            value: "",
            isValid: false
        },
        phoneNumberOfReference2: {
            value: "",
            isValid: false
        },
        nameOfReference3: {
            value: "",
            isValid: false
        },
        emailOfReference3: {
            value: "",
            isValid: false
        },
        phoneNumberOfReference3: {
            value: "",
            isValid: false
        },
        experienceInTheAppliedField: {
            value: "",
            isValid: false
        },
        whyAreYouInterestedInThisPosition: {
            value: "",
            isValid: false
        }
    }, false);

    return (
        <React.Fragment>
            <Container>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                }}
                    className='w-75 mx-auto'>
                    <BlockSeparator heading="Personal Information" />
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <TwoColumnStructuringWrapper
                        element1={
                            <Input
                                element="input"
                                id="email"
                                type="text"
                                label="Email"
                                validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
                                errorText="Please enter valid email."
                                onInput={inputHandler}
                            />
                        }
                        element2={
                            <Input
                                element="input"
                                id="phoneNumber"
                                type="number"
                                label="Phone Number"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter valid phone Number."
                                onInput={inputHandler}
                            />
                        }
                    />
                    <Input
                        element="select"
                        id="maritalStatus"
                        type="select"
                        label="Marital Status"
                        defaultOption="Please select your marital status"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        options={['Single', 'Married', 'Common-law']}
                    />
                    <Input
                        element="input"
                        id="noOfChildren"
                        type="number"
                        label="Number of Children"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="highestLevelOfEducation"
                        type="text"
                        label="Highest level of Education"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        element="select"
                        id="countryOfResidence"
                        type="select"
                        label="Country of Residence"
                        defaultOption="Please select your country of Residence"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        options={COUNTRIES}
                    />
                    <Input
                        element="select"
                        id="statusInCountryOfResidence"
                        type="select"
                        label="Status in the country of residence"
                        defaultOption="Please select your status in the country of residence"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        options={COUNTRIES}
                    />
                    <BlockSeparator heading="Work-related Information" />
                    <Input
                        element="textarea"
                        id="workExperience"
                        type="text"
                        label="Work Experience"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="areaOfInterest"
                        type="text"
                        label="Area of Interest"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="experienceInTheAppliedField"
                        type="text"
                        label="Do you have experience in the applied field?"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        element="textarea"
                        id="whyAreYouInterestedInThisPosition"
                        type="text"
                        label="Why are you interested in this position?"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        element="select"
                        id="provinceOfCanadaWhereInterestedToWork"
                        type="select"
                        label="Province of Canada where you are interested to work"
                        defaultOption="Please select the province in Canada where you want to work"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        options={COUNTRIES}
                    />
                    <Input
                        element="checkbox"
                        type="switch"
                        id="haveValidVisaForCanada"
                        label="I have a valid visa for Canada"
                        checked={haveValidVisaForCanada}
                        onClick={(e) => setHaveValidVisaForCanada(e.target.checked)} />
                    <Input
                        element="checkbox"
                        type="checkbox"
                        id="wouldYouLikeToGetAlertsOfThePostedJobs"
                        label="I would like to get alerts of the posted jobs"
                        checked={wouldYouLikeToGetAlertsOfThePostedJobs}
                        onClick={(e) => setWouldYouLikeToGetAlertsOfThePostedJobs(e.target.checked)} />
                    <Input
                        element="input"
                        type="file"
                        id="resume"
                        label="Resume"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_FILE(['pdf', 'doc'])]}
                        onInput={inputHandler}
                        extraText=".pdf and .doc files are accepted."
                        errorText="This field is required. Please adhere to the instructions given below." />
                    <BlockSeparator heading="References" />
                    <Input
                        element="input"
                        id="nameOfReference1"
                        type="text"
                        label="Name of Reference 1"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <TwoColumnStructuringWrapper
                        element1={<Input
                            element="input"
                            id="emailOfReference1"
                            type="text"
                            label="Email of Reference 1"
                            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid email."
                            onInput={inputHandler}
                        />}
                        element2={<Input
                            element="input"
                            id="phoneNumberOfReference1"
                            type="number"
                            label="Phone Number of Reference 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid phone Number."
                            onInput={inputHandler}
                        />}
                    />
                    <Input
                        element="input"
                        id="nameOfReference2"
                        type="text"
                        label="Name of Reference 2"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <TwoColumnStructuringWrapper
                        element1={<Input
                            element="input"
                            id="emailOfReference2"
                            type="text"
                            label="Email of Reference 2"
                            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid email."
                            onInput={inputHandler}
                        />}
                        element2={<Input
                            element="input"
                            id="phoneNumberOfReference2"
                            type="number"
                            label="Phone Number of Reference 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid phone Number."
                            onInput={inputHandler}
                        />}
                    />
                    <Input
                        element="input"
                        id="nameOfReference3"
                        type="text"
                        label="Name of Reference 3"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <TwoColumnStructuringWrapper
                        element1={<Input
                            element="input"
                            id="emailOfReference3"
                            type="text"
                            label="Email of Reference 3"
                            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid email."
                            onInput={inputHandler}
                        />}
                        element2={<Input
                            element="input"
                            id="phoneNumberOfReference3"
                            type="number"
                            label="Phone Number of Reference 3"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter valid phone Number."
                            onInput={inputHandler}
                        />}
                    />

                    <Button
                        type='submit'
                        variant='primary'
                        className='d-block mx-auto mt-3'
                        disabled={!formState.isValid}
                    >Apply</Button>
                </Form>
            </Container>
        </React.Fragment>
    );
};

export default JobApplicationForm;