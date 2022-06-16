import React from 'react';
import { useLocation } from 'react-router-dom'
import AddJobForm from '../components/AddJobForm';

const AddJob = (props) => {
    const { state } = useLocation();

    return (
        <AddJobForm isEdit={props.isEdit} editJobData={state} />
    );
};

export default AddJob;