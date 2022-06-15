import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useForm } from '../hooks/FormHook';
import { VALIDATOR_REQUIRE } from '../util/validators';
import Input from './Input';
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from './ErrorModal';
import { AuthContext } from '../context/AuthContext';

const AddJobForm = () => {
    const [formState, inputHandler] = useForm({
        jobTitle: {
            value: '',
            isValid: false
        },
        jobDescription: {
            value: '',
            isValid: false
        },
        jobLocation: {
            value: '',
            isValid: false
        },
        industry: {
            value: '',
            isValid: false
        },
        keyWordsString: {
            value: '',
            isValid: true
        }
    }, false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const industriesArray = [
        'Accounting & Finance', 'Advertising & Marketing', 'Agriculture, Forestry & Fishing', 'Airlines & Aviation', 'Arts, Fashion & Design', 'Automotive & Vehicle Repair', 'Banking & Financial Services', 'Construction & Building Service', 'Consulting & Project Management', 'Customer Service & Call Centre', 'Education & Training', 'Engineering & Architecture', 'Environment, Health & Safety', 'Government & Public Sector', 'Healthcare & Medical', 'Hospitality, Tourism & Food Service', 'Human Resources & Recruitment', 'Humanitarian ', 'Information & Communication Technology', 'Installation, Maintenance & Repair', 'Insurance', 'Land Use & Environmental Management', 'Legal', 'Library & Records Management', 'Management', 'Manufacturing', 'Marine', 'Media & Corporate Communications', 'Mining, Resources & Energy ', 'Procurement, Logistics & Supply Chain', 'Quality Assurance', 'Railway & Railtrack', 'Real Estate', 'Religion', 'Research, Monitoring & Evaluation', 'Retail', 'Sales and Business Development', 'Scientific', 'Secretarial Administrative & Clerical', 'Security & Armed Forces', 'Sports & Leisure', 'Utilities'
    ];

    const canadaProvinces = [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'
    ];

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <Form
                onSubmit={e => {
                    e.preventDefault();

                    return sendRequest(
                        `${process.env.REACT_APP_HOSTNAME}/api/immigration-firm/new-job-posting`,
                        'POST',
                        JSON.stringify({
                            jobTitle: formState.inputs.jobTitle.value,
                            jobDescription: formState.inputs.jobDescription.value,
                            jobLocation: formState.inputs.jobLocation.value,
                            industry: formState.inputs.industry.value,
                            keyWordsString: formState.inputs.keyWordsString.value
                        }),
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        }
                    )
                        .then(res => console.log(res))
                        .then(() => {
                            navigate('/');
                        })
                }}
                className='w-75 mx-auto'>
                <Input
                    element="input"
                    type="text"
                    id="jobTitle"
                    label="Job Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler} />
                <Input
                    element="textarea"
                    type="text"
                    id="jobDescription"
                    label="Job Description"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler} />
                <Input
                    element="select"
                    id="jobLocation"
                    label="Job Location"
                    defaultOption="Please select Job Location from the list"
                    options={canadaProvinces}
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler} />
                <Input
                    element="select"
                    id="industry"
                    label="Industry"
                    defaultOption="Please select Industry from the list"
                    options={industriesArray}
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler} />
                <Input
                    element="input"
                    id="keyWordsString"
                    type="text"
                    label="Enter keywords"
                    extraText='You can add one or more keywords seperated by semi-colon (;).'
                    onInput={inputHandler}
                    initialValid={true}
                    validators={[]} />

                <Button
                    type='submit'
                    disabled={!formState.isValid || isLoading}>
                    {isLoading && (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className='me-1'
                        />
                    )}
                    Submit</Button>
            </Form>
        </React.Fragment>
    );
};

export default AddJobForm;