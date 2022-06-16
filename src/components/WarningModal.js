import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
                <Button onClick={props.onActionButtonClick}>{props.data.actionButtonLabel}</Button>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WarningModal;