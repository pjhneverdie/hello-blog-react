import {useRef, useState, useEffect, useCallback} from "react";

import axios from "axios";

const useInfiniteScroll = (url, {data, setData, page, setPage, hasMore, setHasMore}) => {

        const [isLoading, setIsLoading] = useState(false);

        const observerRef = useRef(null);

        async function fetchData() {

            if (isLoading || !hasMore) return;
            setIsLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 500));

            try {
                const response = await axios.get(url, {
                    params: {page, limit: 10},
                });

                setData((prev) => [...prev, ...response.data.value]);
                setHasMore(response.data.value.length > 0);
                setPage((prevPage) => prevPage + 1);

            } catch (e) {
            } finally {
                setIsLoading(false);
            }

        }

        useEffect(() => {

            if (data.length === 0) {
                fetchData();
            }

        }, [page]);

        useEffect(() => {

            if (!observerRef.current) return;

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    fetchData();
                }
            });

            observer.observe(observerRef.current);

            return () => {
                if (observerRef.current) observer.unobserve(observerRef.current);
            };

        }, [isLoading]);

        return {observerRef, isLoading};
    }
;

export default useInfiniteScroll;

