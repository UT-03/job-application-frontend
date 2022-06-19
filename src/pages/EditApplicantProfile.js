import React, { useContext, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


// import storage from '../util/firebase';
import FormComponentBlockSeparated from '../components/FormComponentBlockSeparated';
import { useHttpClient } from '../hooks/HttpHook';
import { AuthContext } from '../context/AuthContext';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/validators';
import { canadaProvinces, COUNTRIES, statusInCountryPfResidence } from '../util/GlobalVariables';
// import DisplayData from '../components/DisplayData';
// import { getMimetype } from '../util/GlobalFunctions';
import ErrorModal from '../components/ErrorModal';

const EditApplicantProfile = () => {
    const { state } = useLocation();

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();



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
        },
        group3: {
            nameOfReference1: {
                formState: {
                    value: state.nameOfReference1 || '',
                    isValid: state.nameOfReference1 ? true : false
                },
                props: {
                    element: "input",
                    type: "text",
                    label: "Name",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            emailOfReference1: {
                formState: {
                    value: state.emailOfReference1 || '',
                    isValid: state.emailOfReference1 ? true : false
                },
                props: {
                    element: "input",
                    type: "email",
                    label: "Email",
                    validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
                    errorText: "Please enter valid email."
                }
            },
            phoneNumberOfReference1: {
                formState: {
                    value: state.phoneNumberOfReference1 || '',
                    isValid: state.phoneNumberOfReference1 ? true : false
                },
                props: {
                    element: "input",
                    type: "tel",
                    label: "Phone Number",
                    validators: [VALIDATOR_REQUIRE()],
                    errorText: "Please enter valid phone Number."
                }
            }
        },
        group4: {
            nameOfReference2: {
                formState: {
                    value: state.nameOfReference2 || '',
                    isValid: state.nameOfReference2 ? true : false
                },
                props: {
                    element: "input",
                    type: "text",
                    label: "Name",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            emailOfReference2: {
                formState: {
                    value: state.emailOfReference2 || '',
                    isValid: state.emailOfReference2 ? true : false
                },
                props: {
                    element: "input",
                    type: "email",
                    label: "Email",
                    validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
                    errorText: "Please enter valid email."
                }
            },
            phoneNumberOfReference2: {
                formState: {
                    value: state.phoneNumberOfReference2 || '',
                    isValid: state.phoneNumberOfReference2 ? true : false
                },
                props: {
                    element: "input",
                    type: "tel",
                    label: "Phone Number",
                    validators: [VALIDATOR_REQUIRE()],
                    errorText: "Please enter valid phone Number."
                }
            }
        },
        group5: {
            nameOfReference3: {
                formState: {
                    value: state.nameOfReference3 || '',
                    isValid: state.nameOfReference3 ? true : false
                },
                props: {
                    element: "input",
                    type: "text",
                    label: "Name",
                    validators: [VALIDATOR_REQUIRE()]
                }
            },
            emailOfReference3: {
                formState: {
                    value: state.emailOfReference3 || '',
                    isValid: state.emailOfReference3 ? true : false
                },
                props: {
                    element: "input",
                    type: "email",
                    label: "Email",
                    validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
                    errorText: "Please enter valid email."
                }
            },
            phoneNumberOfReference3: {
                formState: {
                    value: state.phoneNumberOfReference3 || '',
                    isValid: state.phoneNumberOfReference3 ? true : false
                },
                props: {
                    element: "input",
                    type: "tel",
                    label: "Phone Number",
                    validators: [VALIDATOR_REQUIRE()],
                    errorText: "Please enter valid phone Number."
                }
            }
        },
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <FormComponentBlockSeparated
                formObj={formObj}
                initialValid={false}
                disableSubmitButton={isLoading}
                submitButtonLabel="Update Profile"
                headings={["Personal Details", "Work-related Details", "Reference 1", "Reference 2", "Reference 3"]}
                onSubmit={formState => {
                    let requestObj = {};
                    for (const key in formState.inputs) {
                        if (key !== 'email') {
                            requestObj[key] = formState.inputs[key].value;
                        }
                    }
                    console.log(requestObj)
                    return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/update-profile-data`,
                        'POST',
                        JSON.stringify(requestObj),
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        })
                }
                }
            />
        </React.Fragment>
    );
};

export default EditApplicantProfile;