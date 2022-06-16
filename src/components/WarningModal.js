import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const WarningModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="warning-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="warning-modal">
                    Just confirming...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.data.message}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.onActionButtonClick}
                    disabled={props.isLoading}>
                    {props.isLoading && (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
                    {props.data.actionButtonLabel}</Button>
                <Button
                    onClick={props.onHide}
                    disabled={props.isLoading}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WarningModal;