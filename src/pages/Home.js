import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import JobsList from '../components/JobsList';
import NoDataDisplay from '../components/NoDataDisplay';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import ErrorModal from '../components/ErrorModal';

const DUMMY_JOB_APPLICATIONS = [
    {
        id: 1,
        jobTitle: 'Job Title',
        jobDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dicta libero minus quisquam laborum rem molestias explicabo nostrum? Impedit assumenda quibusdam ipsum numquam laboriosam saepe dolores harum veniam adipisci corrupti.',
        jobLocation: 'Lorem, Ipsum',
        tags: ['tag1', 'tag2']
    },
    {
        id: 2,
        jobTitle: 'Job Title',
        jobDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dicta libero minus quisquam laborum rem molestias explicabo nostrum? Impedit assumenda quibusdam ipsum numquam laboriosam saepe dolores harum veniam adipisci corrupti.',
        jobLocation: 'Lorem, Ipsum',
        tags: ['tag1', 'tag2', 'tag3']
    },
    {
        id: 3,
        jobTitle: 'Job Title',
        jobDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dicta libero minus quisquam laborum rem molestias explicabo nostrum? Impedit assumenda quibusdam ipsum numquam laboriosam saepe dolores harum veniam adipisci corrupti.',
        jobLocation: 'Lorem, Ipsum',
        tags: ['tag1', 'tag2']
    },
]

const Home = () => {
    const [data, setData] = useState();
    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPostedJobs = async () => {
            if (!auth.isLoggedIn || (auth.isLoggedIn && auth.userType === 'applicant'))
                return;
            let responseData;
            try {
                responseData = await sendRequest(
                    `${process.env.REACT_APP_HOSTNAME}/api/immigration-firm/get-job-posting`,
                    'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                setData(() => responseData.jobsPosted);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPostedJobs();
    }, [sendRequest, auth]);

    const JobPostingDeleteHandler = _id => {
        const data$ = [...data];

        setData(() => data$.filter(dt => dt._id !== _id));
    }

    return (
        <React.Fragment>
            <ErrorModal show={!!error} onHide={clearError} error={error} />
            <Header />
            {!isLoading && data && <JobsList
                data={data}
                onJobPostingDelete={JobPostingDeleteHandler} />}
            {!isLoading && data && data.length === 0 && (
                <NoDataDisplay
                    heading="Looks like you have not posted any Job yet..." />
            )}
        </React.Fragment>
    );
};

export default Home;