import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import FormComponent from './FormComponent';
import { VALIDATOR_FILE } from '../util/validators';
import storage from '../util/firebase';
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from './ErrorModal';
import { AuthContext } from '../context/AuthContext';

const ResumeUploadModal = (props) => {
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [progress, setProgress] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const { error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

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

    const handleResumeUpload = (formData) => {
        setIsUploading(true);

        const file = formData.resume.value;

        setShowProgressBar(true);
        const fileName = new Date().getTime() + file.name;

        const storageRef = ref(storage, `/uploads/resume/${fileName}`);

        const metaData = {
            contentType: file.type
        }

        const uploadTask = uploadBytesResumable(storageRef, file, metaData);
        uploadTask.on("state_changed",
            snapshot => {
                const uploaded = Math.floor(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(uploaded);
            },
            error => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        return sendRequest(`${process.env.REACT_APP_HOSTNAME}/api/applicant/update-resume-url`,
                            'PATCH',
                            JSON.stringify({
                                resumeURL: url
                            }),
                            {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + auth.token
                            })
                            .then(() => {
                                setIsUploading(false);
                                setShowProgressBar(false);
                                props.onResumeUpload(url);

                                props.onHide();
                            });
                    });
            }
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop={`${isUploading ? 'static' : true}`}
            >
                <Modal.Header
                    closeButton={!isUploading ? true : false}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Upload a Resume
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showProgressBar && (
                        <ProgressBar animated now={progress || 0} className="w-50 mx-auto mb-3" />
                    )}
                    <FormComponent
                        formObj={formObj}
                        initialValid={false}
                        onSubmit={handleResumeUpload}
                        submitButtonLabel="Upload"
                        disableSubmitButton={isUploading} />
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={isUploading} onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default ResumeUploadModal;