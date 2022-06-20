import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


// import storage from '../util/firebase';
import FormComponentBlockSeparated from '../components/FormComponentBlockSeparated';
import { useHttpClient } from '../hooks/HttpHook';
import { AuthContext } from '../context/AuthContext';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/validators';
import { canadaProvinces, COUNTRIES, statusInCountryPfResidence } from '../util/GlobalVariables';
// import DisplayData from '../components/DisplayData';
// import { getMimetype } from '../util/GlobalFunctions';
import ErrorModal from '../components/ErrorModal';
import AddReferences from '../components/AddReferences';
import BoxSeperator from '../components/BoxSeperator';

const EditApplicantProfile = () => {
    const { state } = useLocation();

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [existingReferences, setExistingReferences] = useState(state.references && state.references.length !== 0 ? state.references : [
        {
            name: '',
            email: '',
            phoneNumber: ''
        }
    ]);
    // const [selectedReferences, setSelectedReferences] = useState([0, 2]);

    const formObj = {
        group1: {
            name: {
                formState: {
                    value: state.name || '',
                    isValid: state.name ? true : false
                },
                props: {
                    element: "input",
                    type: "text",
                    label: "Name",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            email: {
                formState: {
                    value: state.email || '',
                    isValid: state.email ? true : false
                },
                props: {
                    element: "input",
                    type: "email",
                    label: "E-mail",
                    validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
                    errorText: "Please enter valid email.",
                    disabled: true
                }
            },
            phoneNumber: {
                formState: {
                    value: state.phoneNumber,
                    isValid: state.phoneNumber ? true : false
                },
                props: {
                    element: "input",
                    type: "tel",
                    label: "Phone Number",
                    validators: [VALIDATOR_REQUIRE()],
                    errorText: "Please enter valid phone number."
                }
            },
            maritalStatus: {
                formState: {
                    value: state.maritalStatus,
                    isValid: state.maritalStatus ? true : false
                },
                props: {
                    element: "select",
                    type: "select",
                    label: "Marital Status",
                    defaultOption: "Please select your marital status",
                    validators: [VALIDATOR_REQUIRE()],
                    options: ['Single', 'Married', 'Common-law']
                }
            },
            noOfChildren: {
                formState: {
                    value: state.noOfChildren || null,
                    isValid: state.noOfChildren ? true : false
                },
                props: {
                    element: "input",
                    type: "number",
                    label: "Number of Children",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            highestLevelOfEducation: {
                formState: {
                    value: state.highestLevelOfEducation,
                    isValid: state.highestLevelOfEducation ? true : false
                },
                props: {
                    element: "input",
                    type: "text",
                    label: "Highest Level of Education",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            countryOfResidence: {
                formState: {
                    value: state.countryOfResidence,
                    isValid: state.countryOfResidence ? true : false
                },
                props: {
                    element: "select",
                    type: "select",
                    label: "Country of Residence",
                    defaultOption: "Please select your country of Residence",
                    validators: [VALIDATOR_REQUIRE()],
                    options: COUNTRIES
                }
            },
            statusInCountryOfResidence: {
                formState: {
                    value: state.statusInCountryOfResidence || '',
                    isValid: state.statusInCountryOfResidence ? true : false
                },
                props: {
                    element: "select",
                    type: "select",
                    label: "Status in the country of residence",
                    defaultOption: "Please select your status in the country of residence",
                    validators: [VALIDATOR_REQUIRE()],
                    options: statusInCountryPfResidence
                }
            }
        },
        group2: {
            workExperience: {
                formState: {
                    value: state.workExperience || '',
                    isValid: state.workExperience ? true : false
                },
                props: {
                    element: "textarea",
                    type: "text",
                    label: "Work Experience",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            areaOfInterest: {
                formState: {
                    value: state.areaOfInterest || '',
                    isValid: state.areaOfInterest ? true : false
                },
                props: {
                    element: "input",
                    type: "text",
                    label: "Area of Interest",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            provinceOfCanadaWhereInterestedToWork: {
                formState: {
                    value: state.provinceOfCanadaWhereInterestedToWork,
                    isValid: state.provinceOfCanadaWhereInterestedToWork ? true : false
                },
                props: {
                    element: "select",
                    type: "select",
                    label: "Province of Canada where you are interested to work",
                    defaultOption: "Please select the province in Canada where you want to work",
                    validators: [VALIDATOR_REQUIRE()],
                    options: Object.values(canadaProvinces)
                }
            },
        }
    }

    const changeHandler = (index, inputType, value) => {
        const existingReferences$ = [...existingReferences];
        existingReferences$[index][inputType] = value;
        setExistingReferences(existingReferences$);
    }

    const addReferenceHandler = () => {
        const existingReferences$ = [...existingReferences];
        existingReferences$.push({
            name: '',
            email: '',
            phoneNumber: ''
        });
        setExistingReferences(existingReferences$);
    }

    // const selectReferenceHandler = (index) => {
    //     let selectedReferences$ = [...selectedReferences];
    //     if (selectedReferences$.includes(index))
    //         selectedReferences$ = selectedReferences$.filter(ele => ele !== index);
    //     else if (selectedReferences.length < 3)
    //         selectedReferences$.push(index);

    //     setSelectedReferences(selectedReferences$);
    // }


    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <FormComponentBlockSeparated
                formObj={formObj}
                initialValid={false}
                disableSubmitButton={isLoading}
                submitButtonLabel="Update Profile"
                headings={["Personal Details", "Work-related Details"]}
                onSubmit={formState => {
                    let requestObj = {};
                    for (const key in formState.inputs) {
                        if (key !== 'email') {
                            requestObj[key] = formState.inputs[key].value;
                        }
                    }

                    requestObj.references = existingReferences;

                    return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/update-profile-data`,
                        'POST',
                        JSON.stringify(requestObj),
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        })
                        .then(() => navigate('/my-profile'));
                }
                }
            >
                <BoxSeperator heading="References">
                    <AddReferences
                        existingReferences={existingReferences}
                        changeHandler={changeHandler}
                        onAddReference={addReferenceHandler}
                    // selectedReferences={selectedReferences}
                    // onSelectClick={selectReferenceHandler}
                    // isApplicationFormMode
                    />
                </BoxSeperator>
            </FormComponentBlockSeparated>
        </React.Fragment>
    );
};

export default EditApplicantProfile;