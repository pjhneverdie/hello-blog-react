import {useState, useEffect, useRef, useCallback} from "react";
import axios from "axios";

const useInfiniteScroll = (url, options = {}) => {
    const {threshold = 0.1, initialPage = 1, perPage = 10} = options;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const fetchData = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.get(url, {
                params: {page, perPage},
            });
            setData((prev) => [...prev, ...response.data]);
            setHasMore(response.data.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [page, url, perPage, loading]);

    const observerCallback = useCallback(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        },
        [hasMore]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        const observer = new IntersectionObserver(observerCallback, {threshold});

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [observerCallback, threshold]);

    return {data, hasMore, loading, observerRef};
};

export default useInfiniteScroll;
