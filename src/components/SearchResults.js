import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import JobsList from './JobsList';
import NoDataDisplay from './NoDataDisplay';

const SearchResults = (props) => {
    return (
        <React.Fragment>
            {props.data && <JobsList
                data={props.data}
                lastDataRef={props.lastDataRef} />}
            {!props.isLoading && props.data && props.data.length === 0 && (
                <NoDataDisplay
                    heading="Looks like our database is empty..." />
            )}

            {props.isLoading && (
                <Container
                    className="d-flex align-items-center justify-content-center mb-4"
                >
                    <Spinner animation="border" variant='primary'
                        style={{
                            width: "6rem",
                            height: "6rem"
                        }} />
                </Container>
            )
            }
        </React.Fragment>
    );
};

export default SearchResults;