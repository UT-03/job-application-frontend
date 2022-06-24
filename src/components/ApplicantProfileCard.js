import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

import ProfileData from './ProfileData';
import BlockSeparator from './BlockSeparator';
import emailIcon from '../assets/images/emailIcon.svg';
import phoneIcon from '../assets/images/phoneIcon.svg';

const ApplicantProfileCard = (props) => {
    return (
        <Card className='w-100 shadow mb-3'>
            <Card.Body>
                <Card.Title className="display-4">{props.data.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted d-flex">
                    <Image src={emailIcon} className='me-1' />
                    {props.data.email}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted d-flex">
                    <Image src={phoneIcon} className='me-1' />
                    {props.data.phoneNumber ? props.data.phoneNumber : <span><em>Not Provided</em></span>}
                </Card.Subtitle>
                <BlockSeparator heading="Personal Details" />
                <ProfileData
                    data={[
                        {
                            label: "Marital Status",
                            value: props.data.maritalStatus
                        },
                        {
                            label: "Number of Children",
                            value: props.data.noOfChildren
                        },
                        {
                            label: "Highest level of Education",
                            value: props.data.highestLevelOfEducation
                        },
                        {
                            label: "Country of Residence",
                            value: props.data.countryOfResidence
                        },
                        {
                            label: "Status in the country of Residence",
                            value: props.data.statusInCountryOfResidence
                        }
                    ]} />
                <BlockSeparator heading="Work-related Details" />
                <ProfileData
                    data={[
                        {
                            label: "Work Experience",
                            value: props.data.workExperience
                        },
                        {
                            label: "Area of Interest",
                            value: props.data.areaOfInterest
                        }
                    ]} />

                <div>
                    <h5>Provinces of Canada where interested to work</h5>
                    <h6 className="mb-4 text-muted d-flex">
                        {props.data.provincesOfCanadaWhereInterestedToWork.length > 0 ? props.data.provincesOfCanadaWhereInterestedToWork.join(', ') : <span><em>Not Provided</em></span>}
                    </h6>
                </div>

                {props.children}

                {props.data.haveValidVisaForCanada && (
                    <Form.Check
                        label="Have a valid visa for Canada"
                        className="mb-4 text-muted"
                        checked
                        readOnly />
                )}

                {props.origin !== "job-application" && props.data.searchKeyWords.length > 0 && (
                    <ProfileData
                        data={[
                            {
                                label: "Search Keywords",
                                value: props.data.searchKeyWords.join(', ')
                            }
                        ]} />

                )}


                <BlockSeparator heading="References" />

                {props.data.references.length === 0 && (
                    <h6 className="mb-4 text-muted d-flex">
                        <span><em>Not Provided</em></span>
                    </h6>
                )}

                {props.data.references.length !== 0 && props.data.references.map((dt, index) => (
                    <React.Fragment key={index}>
                        <Card.Title className="display-6">{dt.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted d-flex">
                            <Image src={emailIcon} className='me-1' />
                            {dt.email}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-5 text-muted d-flex">
                            <Image src={phoneIcon} className='me-1' />
                            {dt.phoneNumber}
                        </Card.Subtitle>
                    </React.Fragment>
                ))}
            </Card.Body>
        </Card>
    );
};

export default ApplicantProfileCard;