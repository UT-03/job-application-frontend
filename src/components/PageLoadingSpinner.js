import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const PageLoadingSpinner = () => {
    return (
        <Container
            className="d-flex align-items-center justify-content-center my-5"
        >
            <Spinner animation="border" variant='primary'
                style={{
                    width: "6rem",
                    height: "6rem"
                }} />
        </Container>
    );
};

export default PageLoadingSpinner;