import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import JobApplicantCard from '../components/JobApplicantCard';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import NoDataDisplay from '../components/NoDataDisplay';

const ViewJobApplicants = () => {
    const { jobId } = useParams();

    const auth = useContext(AuthContext);

    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [hasMoreData, setHasMoreData] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    const fetchJobApplicants = () => {
        return sendRequest(
            `${process.env.REACT_APP_HOSTNAME}/api/immigration-firm/get-job-applicants-details/${jobId}/${pageNumber}`,
            'GET',
            null,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        )
            .then(res => {
                setHasMoreData(res.hasMoreData);
                setData(prevData => {
                    return [
                        ...prevData,
                        ...res.jobApplications
                    ]
                });
            });
    }

    useEffect(() => {
        if (auth.isLoggedIn) {
            fetchJobApplicants();
        }
    }, [auth, pageNumber])
    return (
        <React.Fragment>
            <Container className="my-5">
                {data && data.length > 0 && data.map((dt, index) => (
                    <JobApplicantCard
                        key={index}
                        applicantData={dt}
                        lastDataRef={index === data.length - 1 ? lastDataRef : null} />
                ))}
                {!isLoading && data && data.length === 0 && (
                    <NoDataDisplay
                        heading="Looks like no one has applied for your job yet..." />
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
            </Container>
        </React.Fragment>
    );
};

export default ViewJobApplicants;