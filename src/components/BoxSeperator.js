import React from 'react';
import Container from 'react-bootstrap/Container';

const BoxSeperator = (props) => {
    return (
        <Container
            className="mx-auto my-5 pt-5 pb-3 border border-3 border-primary rounded-3 position-relative"
        >
            <h3 className="position-absolute bg-white display-6"
                style={{ top: "-25px", left: "2%" }}>{props.heading}</h3>
            {props.children}
        </Container>
    );
};

export default BoxSeperator;