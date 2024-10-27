import React from "react";

import {
    Box,
    Skeleton,
    useColorModeValue,
} from "@chakra-ui/react";

import useInfiniteScroll from "../../../../common/hook/useInfiniteScroll";

import PostCard from "../PostCard/PostCard";
import {darkTheme, lightTheme} from "../../../../config/theme/Theme";

const PostList = ({posts, setPosts, page, setPage, hasMore, setHasMore, handleSelectPost, url, isAdmin}) => {

    const {observerRef, isLoading} = useInfiniteScroll(
        url, {
            data: posts,
            setData: setPosts,
            page: page,
            setPage: setPage,
            hasMore: hasMore,
            setHasMore: setHasMore,
        }
    );

    return (
        <Box marginTop={"15px"}
             width={"100%"}
             height={"100%"}
        >
            {posts.map((post, index) => (
                <Box key={post.id}
                     marginBottom={"30px"}
                     cursor={"pointer"}
                     onClick={() => handleSelectPost(post)}
                >
                    {posts.length === index + 1 ? (
                        <div ref={observerRef}>
                            <PostCard title={post.title}
                                      content={post.content}
                                      thumbUrl={post.thumbUrl}
                                      createdAt={post.createdAt}
                                      isAdmin={isAdmin}
                            />
                        </div>
                    ) : (
                        <div>
                            <PostCard title={post.title}
                                      content={post.content}
                                      thumbUrl={post.thumbUrl}
                                      createdAt={post.createdAt}
                                      isAdmin={isAdmin}
                            />
                        </div>
                    )}
                </Box>
            ))}
            {hasMore && isLoading && (
                <Box paddingY={"20px"}>
                    <Skeletons isAdmin={isAdmin}/>
                </Box>
            )}
        </Box>
    );
};

function Skeletons({isAdmin}) {

    const startColor = useColorModeValue(lightTheme.secondaryBlack, darkTheme.secondaryBlack);
    const endColor = useColorModeValue(lightTheme.secondaryWhite, darkTheme.thirdBlack);

    return (
        <Box>
            <Skeleton marginBottom={"30px"}
                      height={"170px"}
                      startColor={isAdmin ? "#CBD5E0" : startColor}
                      endColor={isAdmin ? "#CBD5E0" : endColor}
                      borderRadius={"lg"}
            />
        </Box>
    );

}

export default PostList;

