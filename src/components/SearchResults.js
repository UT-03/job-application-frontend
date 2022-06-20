import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import JobsList from './JobsList';
import NoDataDisplay from './NoDataDisplay';
import PageLoadingSpinner from './PageLoadingSpinner';

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

            {props.isLoading && <PageLoadingSpinner />
            }
        </React.Fragment>
    );
};

export default SearchResults;