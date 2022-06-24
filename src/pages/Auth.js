import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import loginIllustration from '../assets/images/loginIllustration.svg';
import AuthForm from '../components/AuthForm';

const Auth = () => {
    const [userType, setUserType] = useState(null);
    return (
        <Container className='min-vh-100 d-flex flex-column justify-content-center'>
            <h6 className='display-6 text-center mb-3 mt-5'>Login to Brand</h6>
            <Row>
                <Col xs={12} lg={6} className={`${!userType && 'd-flex align-items-center'}`}>
                    {!userType && (
                        <Col>
                            <Button onClick={() => setUserType('applicant')} className='d-block mx-auto my-2'>I'm a Job Applicant</Button>
                            <Button onClick={() => setUserType('immigration-firm')} className='d-block mx-auto my-2'>I'm an Immigration Firm</Button>
                        </Col>
                    )}
                    {userType && <AuthForm userType={userType} />}
                </Col>
                <Col lg={6} className="d-none d-lg-block">
                    <Image src={loginIllustration} className='w-100' />
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;