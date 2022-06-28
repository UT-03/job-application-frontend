import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { useForm } from '../hooks/FormHook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators';
import Input from './Input';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from './ErrorModal';

const AuthForm = (props) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate();

    const googleAuthSubmit = async (res) => {
        const userObject = jwt_decode(res.credential);
        return sendRequest(
            `${process.env.REACT_APP_HOSTNAME}/api/user/google-signin`,
            'POST',
            JSON.stringify({
                name: userObject.name,
                email: userObject.email,
                userType: props.userType
            }),
            {
                'Content-Type': 'application/json'
            }
        )
            .then(res => auth.login(res.token, res.userType, res.userId))
            .then(() => {
                navigate('/');
            })
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID,
            callback: googleAuthSubmit
        });

        google.accounts.id.renderButton(document.getElementById('signInDiv'),
            {
                theme: "outline",
                size: "large",
                text: "continue_with",
                width: "270"
            });

        google.accounts.id.prompt();
    }, []);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
            return sendRequest(
                `${process.env.REACT_APP_HOSTNAME}/api/user/login`,
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    userType: props.userType
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
                .then(res => auth.login(res.token, res.userType, res.userId))
                .then(() => {
                    navigate('/');
                })
        } else {
            return sendRequest(
                'http://localhost:5000/api/user/signup',
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    userType: props.userType
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
                .then(res => auth.login(res.token, res.userType, res.userId))
                .then(() => {
                    navigate('/');
                })
        }
    };

    return (
        <React.Fragment>
            <ErrorModal
                error={error}
                show={!!error}
                onHide={clearError} />
            <Form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        id="name"
                        element="input"
                        type="name"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler} />
                )}
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email."
                    onInput={inputHandler} />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                    extraText="Password must be at least six characters long."
                    onInput={inputHandler} />
                <Button
                    className='d-block mx-auto'
                    type="submit"
                    disabled={!formState.isValid || isLoading}
                >
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
                    {isLoginMode ? 'Login' : 'Signup'}
                </Button>

                <div className='fs-6 text-center mt-2'>
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"} Switch to <span
                        className='text-primary fw-semibold'
                        style={{ cursor: "pointer" }}
                        onClick={switchModeHandler}>
                        {isLoginMode ? 'Signup' : 'Login'}.
                    </span>
                </div>
            </Form>
            <div style={{
                borderTop: "1px solid #dee2e6",
                position: "relative"
            }}
                className="mt-3">
                <span
                    style={{
                        position: "absolute",
                        left: "calc(50% - 14px)",
                        top: "-14px"
                    }}
                    className="bg-white px-2">or</span>
            </div>
            <div
                style={{
                    width: "270px"
                }}
                id="signInDiv"
                className="mt-3 d-block mx-auto"></div>
        </React.Fragment>
    );
};

export default AuthForm;