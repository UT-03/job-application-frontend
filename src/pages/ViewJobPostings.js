import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

import Header from '../components/Header';
import JobsList from '../components/JobsList';
import NoDataDisplay from '../components/NoDataDisplay';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from '../components/ErrorModal';

const ViewJobPostings = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [hasMoreData, setHasMoreData] = useState(true);

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPostedJobs = async () => {
            if (!auth.isLoggedIn)
                return;

            return sendRequest(
                `${process.env.REACT_APP_HOSTNAME}/api/immigration-firm/get-my-job-postings/${pageNumber}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
                .then(responseData => {
                    setHasMoreData(() => responseData.hasMoreData);

                    setData(prevData => {
                        return [
                            ...prevData,
                            ...responseData.jobsPosted
                        ]
                    });
                })
        }

        if (hasMoreData)
            fetchPostedJobs();
    }, [sendRequest, auth, pageNumber]);

    const observer = useRef();

    const lastDataRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (hasMoreData && !isLoading)
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })

        if (node) observer.current.observe(node);
    })

    const JobPostingDeleteHandler = _id => {
        const data$ = [...data];

        setData(() => data$.filter(dt => dt._id !== _id));
    }

    return (
        <React.Fragment>
            <ErrorModal show={!!error} onHide={clearError} error={error} />
            <Header />
            {data && <JobsList
                data={data}
                onJobPostingDelete={JobPostingDeleteHandler}
                lastDataRef={lastDataRef} />}
            {!isLoading && data && data.length === 0 && (
                <NoDataDisplay
                    heading="Looks like you have not posted any Job yet..." />
            )}

            {isLoading && (
                <Container
                    className="d-flex align-items-center justify-content-center mb-4"
                >
                    <Spinner animation="border" variant='primary'
                        style={{
                            width: "6rem",
                            height: "6rem"
                        }} />
                </Container>
            )}
        </React.Fragment>
    );
};

export default ViewJobPostings;