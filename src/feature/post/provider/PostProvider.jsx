import {createContext, useContext, useState} from "react";
import {BASE_URL} from "../../../common/const/data";

const PostContext = createContext();

export const PostProvider = ({children}) => {

    const [postApiURL, setPostApiURL] = useState(`${BASE_URL}/post/recent`);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    function clearPost() {

        setPostApiURL(`${BASE_URL}/post/recent`);

        setPosts([]);
        setPage(1);
        setHasMore(true);

    }

    return (
        <PostContext.Provider value={{posts, setPosts, page, setPage, hasMore, setHasMore, postApiURL, setPostApiURL, clearPost}}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => useContext(PostContext);
