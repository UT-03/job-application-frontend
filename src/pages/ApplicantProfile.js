import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import emailIcon from '../assets/images/emailIcon.svg';
import phoneIcon from '../assets/images/phoneIcon.svg';
import BlockSeparator from '../components/BlockSeparator';
import ProfileData from '../components/ProfileData';
import WarningModal from '../components/WarningModal';
import ResumeUploadModal from '../components/ResumeUploadModal';
import ErrorModal from '../components/ErrorModal';
import PageLoadingSpinner from '../components/PageLoadingSpinner';

const ApplicantProfile = () => {
    const [data, setData] = useState();
    const [showWarningModel, setShowWarningModel] = useState();
    const [showResumeUploadModel, setShowResumeUploadModel] = useState(false);


    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate();

    const fetchApplicantData = () => {
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/profile-data`,
            'GET',
            null,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(res => {
                console.log(res)
                setData(() => res.applicantProfileData);
            });
    }

    useEffect(() => {
        if (auth.isLoggedIn)
            fetchApplicantData();
    }, [auth]);

    const deleteResumeHandler = (value) => {
        const resumeToBeDeleted = value.resumeURL;

        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/delete-resume`,
            'DELETE',
            JSON.stringify({
                urlToBeDeleted: resumeToBeDeleted
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(() => {
                const data$ = { ...data };
                data$.resume = data$.resume.filter(res => res !== resumeToBeDeleted);
                setData(() => data$);

                setShowWarningModel(null);
            });
    }

    const onResumeUpload = (url) => {
        const data$ = { ...data };
        data$.resume.push(url);
        setData(() => data$);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            {!!showWarningModel && <WarningModal
                show={!!showWarningModel}
                data={showWarningModel}
                onHide={() => setShowWarningModel(null)}
                onActionButtonClick={deleteResumeHandler}
                isLoading={isLoading} />}
            <ResumeUploadModal
                show={showResumeUploadModel}
                onHide={() => setShowResumeUploadModel(false)}
                onResumeSubmit={onResumeUpload} />
            <Container className="pt-5 px-0">
                {data && (
                    <React.Fragment>
                        <Button
                            variant='outline-primary'
                            onClick={() => navigate('/edit-profile', { state: data })}
                            className="mb-3 d-block ms-auto"
                        >Edit Profile</Button>
                        <Card className='w-100 shadow mb-3'>
                            <Card.Body>
                                <Card.Title className="display-4">{data.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted d-flex">
                                    <Image src={emailIcon} className='me-1' />
                                    {data.email}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted d-flex">
                                    <Image src={phoneIcon} className='me-1' />
                                    {data.phoneNumber ? data.phoneNumber : <span><em>Not Provided</em></span>}
                                </Card.Subtitle>
                                <BlockSeparator heading="Personal Details" />
                                <ProfileData
                                    data={[
                                        {
                                            label: "Marital Status",
                                            value: data.maritalStatus
                                        },
                                        {
                                            label: "Number of Children",
                                            value: data.noOfChildren
                                        },
                                        {
                                            label: "Highest level of Education",
                                            value: data.highestLevelOfEducation
                                        },
                                        {
                                            label: "Country of Residence",
                                            value: data.countryOfResidence
                                        },
                                        {
                                            label: "Status in the country of Residence",
                                            value: data.statusInCountryOfResidence
                                        }
                                    ]} />
                                <BlockSeparator heading="Work-related Details" />
                                <ProfileData
                                    data={[
                                        {
                                            label: "Work Experience",
                                            value: data.workExperience
                                        },
                                        {
                                            label: "Area of Interest",
                                            value: data.areaOfInterest
                                        },
                                        {
                                            label: "Provinces of Canada where interested to work",
                                            value: data.provinceOfCanadaWhereInterestedToWork
                                        },
                                    ]} />
                                <h5>Resume</h5>

                                {data.resume && data.resume.length !== 0 && data.resume.map((url, index) => (
                                    <Row className="my-2 py-2 px-0 mx-0 bg-light rounded resume-display--container" key={index}>
                                        <Col xs={12} md={4} className="d-flex align-items-center resume-display--heading-box">
                                            <h6 className="text-muted mb-0">Resume {index + 1}</h6>
                                        </Col>
                                        <Col xs={12} md={8} className="d-flex resume-display--buttons-box">
                                            <Button
                                                as="a"
                                                href={url}
                                                target="_blank"
                                                variant="outline-primary"
                                                className="d-block me-2">
                                                View
                                            </Button>
                                            <Button
                                                onClick={() => setShowWarningModel({
                                                    message: "Are you sure you want to delete this resume?",
                                                    actionButtonLabel: "Delete",
                                                    resumeURL: url
                                                })}
                                                variant="primary"
                                                className="d-block">Delete</Button>
                                        </Col>
                                    </Row>
                                ))}

                                {data.resume.length === 0 && (
                                    <h6 className="mb-4 text-muted d-flex">
                                        <span><em>Not Provided</em></span>
                                    </h6>
                                )}

                                <Button
                                    className="mb-4"
                                    onClick={() => setShowResumeUploadModel(true)}>Upload resume</Button>

                                {data.haveValidVisaForCanada && (
                                    <Form.Check
                                        label="Have a valid visa for Canada"
                                        className="mb-4 text-muted"
                                        checked
                                        readOnly />
                                )}

                                {data.searchKeyWords.length > 0 && (
                                    <ProfileData
                                        data={[
                                            {
                                                label: "Search Keywords",
                                                value: data.searchKeyWords.join(', ')
                                            }
                                        ]} />

                                )}


                                <BlockSeparator heading="References" />

                                {data.references.length === 0 && (
                                    <h6 className="mb-4 text-muted d-flex">
                                        <span><em>Not Provided</em></span>
                                    </h6>
                                )}

                                {data.references.length !== 0 && data.references.map((dt, index) => (
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
                    </React.Fragment>
                )}
            </Container>
            {!data && isLoading && <PageLoadingSpinner />}
        </React.Fragment>
    );
};

export default ApplicantProfile;