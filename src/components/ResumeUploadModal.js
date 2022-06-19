import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import FormComponent from './FormComponent';
import { VALIDATOR_FILE } from '../util/validators';

const ResumeUploadModal = (props) => {
    const formObj = {
        resume: {
            formState: {
                value: null,
                isValid: false
            },
            props: {
                element: "file",
                type: "file",
                label: "Resume",
                extraText: ".pdf and .doc files are accepted.",
                errorText: "Please follow the instructions given below.",
                validators: [VALIDATOR_FILE(['pdf', 'doc', 'docx'])],
                placeholder: "Upload a resume"
            }
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={`${props.isLoading ? 'static' : true}`}
        >
            <Modal.Header
                closeButton={!props.isLoading ? true : false}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload a Resume
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.showProgressBar && (
                    <ProgressBar animated now={props.progress || 0} className="w-50 mx-auto mb-3" />
                )}
                {/* <ProgressBar striped now={40} className="w-50 mx-auto mb-3" /> */}
                <FormComponent
                    formObj={formObj}
                    initialValid={false}
                    onSubmit={props.onResumeSubmit}
                    submitButtonLabel="Upload"
                    disableSubmitButton={props.isLoading} />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={props.isLoading} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResumeUploadModal;