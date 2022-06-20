import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import FormComponent from '../components/FormComponent';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import { VALIDATOR_REQUIRE } from '../util/validators';
import { canadaProvinces, industries } from '../util/GlobalVariables';
import ErrorModal from '../components/ErrorModal';

const EditJobPosting = () => {
    const { state } = useLocation();

    const keyWords = useRef();
    const [noOfKeyWords, setNoOfKeyWords] = useState(state.keyWords.length !== 0 ? state.keyWords.length : 1);

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const formObj = {
        jobTitle: {
            formState: {
                value: state.jobTitle,
                isValid: true
            },
            props: {
                element: "input",
                type: "text",
                label: "Job Title",
                validators: [VALIDATOR_REQUIRE()]
            }
        },
        jobDescription: {
            formState: {
                value: state.jobDescription,
                isValid: true
            },
            props: {
                element: "textarea",
                type: "text",
                label: "Job Description",
                validators: [VALIDATOR_REQUIRE()]
            }
        },
        jobLocation: {
            formState: {
                value: state.jobLocation,
                isValid: true
            },
            props: {
                element: "select",
                label: "Job Location",
                defaultOption: "Please select Job Location from the list",
                options: Object.values(canadaProvinces),
                validators: [VALIDATOR_REQUIRE()]
            }
        },
        industry: {
            formState: {
                value: state.industry,
                isValid: true
            },
            props: {
                element: "select",
                label: "Industry",
                defaultOption: "Please select Industry from the list",
                options: Object.values(industries),
                validators: [VALIDATOR_REQUIRE()]
            }
        },
        keyWords: {
            props: {
                element: "multi-input",
                type: "text",
                label: "Enter keywords (optional)",
                validators: [],
                reference: keyWords,
                noOfInputs: noOfKeyWords,
                onFieldAdd: () => setNoOfKeyWords(prevNo => prevNo + 1),
                defaultValues: state.keyWords
            }
        }
    }

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <FormComponent
                formObj={formObj}
                initialValid={true}
                disableSubmitButton={isLoading}
                onSubmit={formState => {
                    let keyWordsArray = [];
                    for (let i = 0; i < noOfKeyWords; i++) {
                        const value = keyWords.current.children["keyWordscontainer" + i].children["keyWords" + i].value;
                        if (value !== '')
                            keyWordsArray.push(value);
                    }

                    return sendRequest(
                        `${process.env.REACT_APP_HOSTNAME}/api/immigration-firm/edit-job-posting`,
                        'PATCH',
                        JSON.stringify({
                            _id: state._id,
                            jobTitle: formState.jobTitle.value,
                            jobDescription: formState.jobDescription.value,
                            jobLocation: formState.jobLocation.value,
                            industry: formState.industry.value,
                            keyWords: keyWordsArray
                        }),
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        }
                    )
                        .then(() => {
                            navigate('/');
                        })
                }}
            />
        </React.Fragment>
    );
};

export default EditJobPosting;