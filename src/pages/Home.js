import React from 'react';
import JobsList from '../components/JobsList';

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
    return (
        <React.Fragment>
            <JobsList jobApplications={DUMMY_JOB_APPLICATIONS} />
        </React.Fragment>
    );
};

export default Home;