import React, { useState, useRef, useCallback, useEffect } from 'react';
import ErrorModal from '../components/ErrorModal';
import SearchFilter from '../components/SearchFilter';
import SearchResults from '../components/SearchResults';
import { useHttpClient } from '../hooks/HttpHook';

const SearchJobs = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [keyWordQuery, setKeyWordQuery] = useState();
    const [industryQuery, setIndustryQuery] = useState();
    const [locationQuery, setLocationQuery] = useState();


    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const fetchJobs = () => {
        return sendRequest(
            `${process.env.REACT_APP_HOSTNAME}/api/user/search-jobs/${pageNumber}?${keyWordQuery ? `keyWordQuery=${keyWordQuery}&` : ''}${industryQuery ? `industryQuery=${industryQuery}&` : ''}${locationQuery ? `locationQuery=${locationQuery}` : ''}`,
            'GET',
            null,
            {
                'Content-Type': 'application/json'
            }
        )
            .then(responseData => {
                setHasMoreData(() => responseData.hasMoreData);

                setData(prevData => {
                    return [
                        ...prevData,
                        ...responseData.searchJobs
                    ]
                });

                if (responseData.searchJobs.length === 0 && responseData.hasMoreData) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            });
    }

    useEffect(() => {
        fetchJobs();
    }, [pageNumber]);

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

    return (
        <React.Fragment>
            <ErrorModal error={error} show={!!error} onHide={clearError} />
            <SearchFilter
                buttonLabel="Apply Filters"
                setKeyWordQuery={(value) => setKeyWordQuery(value)}
                setIndustryQuery={(value) => setIndustryQuery(value)}
                setLocationQuery={(value) => setLocationQuery(value)}
                onSubmit={() => {
                    setData(() => []);
                    setHasMoreData(() => true);
                    setPageNumber(() => 1);
                    fetchJobs();
                }} />
            <SearchResults
                lastDataRef={lastDataRef}
                data={data}
                isLoading={isLoading} />
        </React.Fragment>
    );
};

export default SearchJobs;