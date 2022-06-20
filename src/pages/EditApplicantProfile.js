import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useHttpClient } from '../hooks/HttpHook';
import { AuthContext } from '../context/AuthContext';
import ErrorModal from '../components/ErrorModal';
import EditProfileForm from '../components/EditProfileForm';

const EditApplicantProfile = () => {
    const { state } = useLocation();

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const editProfileFormSubmitHandler = (requestObj) => {
        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/update-profile-data`,
            'POST',
            JSON.stringify(requestObj),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            })
            .then(() => navigate('/my-profile'));
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <EditProfileForm
                formState={state}
                onSubmit={editProfileFormSubmitHandler}
                isLoading={isLoading} />
        </React.Fragment>
    );
};

export default EditApplicantProfile;