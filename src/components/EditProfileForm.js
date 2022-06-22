import React, { useState, useEffect } from 'react';

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../util/validators';
import { canadaProvinces, COUNTRIES, statusInCountryOfResidence } from '../util/GlobalVariables';
import BoxSeperator from './BoxSeperator';
import AddReferences from './AddReferences';
import FormComponentBlockSeparated from './FormComponentBlockSeparated';

const EditProfileForm = (props) => {
    const [existingReferences, setExistingReferences] = useState(props.formState.references && props.formState.references.length !== 0 ? props.formState.references : [
        {
            name: '',
            email: '',
            phoneNumber: ''
        }
    ]);
    const [selectedReferences, setSelectedReferences] = useState([]);
    const [areReferencesSelected, setAreReferencesSelected] = useState(false);

    useEffect(() => {
        if (selectedReferences.length === 3)
            setAreReferencesSelected(true);
        else
            setAreReferencesSelected(false);
    }, [selectedReferences])

    const formObj = {
        group1: {
            name: {
                formState: {
                    value: props.formState.name || '',
                    isValid: props.formState.name ? true : false
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
                    value: props.formState.email || '',
                    isValid: props.formState.email ? true : false
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
                    value: props.formState.phoneNumber,
                    isValid: props.formState.phoneNumber ? true : false
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
                    value: props.formState.maritalStatus,
                    isValid: props.formState.maritalStatus ? true : false
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
                    value: props.formState.noOfChildren || null,
                    isValid: props.formState.noOfChildren ? true : false
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
                    value: props.formState.highestLevelOfEducation,
                    isValid: props.formState.highestLevelOfEducation ? true : false
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
                    value: props.formState.countryOfResidence,
                    isValid: props.formState.countryOfResidence ? true : false
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
                    value: props.formState.statusInCountryOfResidence || '',
                    isValid: props.formState.statusInCountryOfResidence ? true : false
                },
                props: {
                    element: "select",
                    type: "select",
                    label: "Status in the country of residence",
                    defaultOption: "Please select your status in the country of residence",
                    validators: [VALIDATOR_REQUIRE()],
                    options: statusInCountryOfResidence
                }
            }
        },
        group2: {
            workExperience: {
                formState: {
                    value: props.formState.workExperience || '',
                    isValid: props.formState.workExperience ? true : false
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
                    value: props.formState.areaOfInterest || '',
                    isValid: props.formState.areaOfInterest ? true : false
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
                    value: props.formState.provinceOfCanadaWhereInterestedToWork,
                    isValid: props.formState.provinceOfCanadaWhereInterestedToWork ? true : false
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
            searchKeyWords: {
                formState: {
                    value: props.formState.searchKeyWords.length === 0 ? [''] : props.formState.searchKeyWords,
                    isValid: true
                },
                props: {
                    element: "multi-input",
                    type: "text",
                    label: "Enter search keywords (optional)",
                    validators: []
                }
            }
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

    const selectReferenceHandler = (index) => {
        let selectedReferences$ = [...selectedReferences];
        if (selectedReferences$.includes(index))
            selectedReferences$ = selectedReferences$.filter(ele => ele !== index);
        else if (selectedReferences.length < 3)
            selectedReferences$.push(index);

        setSelectedReferences(selectedReferences$);
    }

    return (
        <React.Fragment>
            <FormComponentBlockSeparated
                formObj={formObj}
                initialValid={true}
                disableSubmitButton={props.isLoading}
                disableSubmitButtonNoLoading={props.isApplicationFormMode ? !areReferencesSelected : false}
                submitButtonLabel={props.isApplicationFormMode ? 'Continue' : 'Update Profile'}
                headings={["Personal Details", "Work-related Details"]}
                onSubmit={formState => {
                    let requestObj = {};
                    for (const key in formState.inputs) {
                        if (key !== 'email') {
                            requestObj[key] = formState.inputs[key].value;
                        }
                    }

                    requestObj.references = existingReferences;

                    props.onSubmit(requestObj, props.isApplicationFormMode ? selectedReferences : null);
                }
                }
            >
                <BoxSeperator heading={`${props.isApplicationFormMode ? 'Select References' : 'References'}`}>
                    <AddReferences
                        existingReferences={existingReferences}
                        changeHandler={changeHandler}
                        onAddReference={addReferenceHandler}
                        selectedReferences={selectedReferences}
                        onSelectClick={selectReferenceHandler}
                        isApplicationFormMode={props.isApplicationFormMode}
                    />
                </BoxSeperator>
            </FormComponentBlockSeparated>
        </React.Fragment>
    );
};

export default EditProfileForm;