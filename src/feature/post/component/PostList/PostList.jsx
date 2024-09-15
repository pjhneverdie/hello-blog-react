import React from "react";

import {
    Box,
    Flex,
    Center,
    Divider,
    Skeleton, SkeletonText
} from "@chakra-ui/react";

import useInfiniteScroll from "../../../../common/hook/useInfiniteScroll";

import PostCard from "../PostCard/PostCard";

const PostList = ({posts, setPosts, page, setPage, hasMore, setHasMore, handleSelectPost, url}) => {

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
        <Box>
            <Box marginY={"15px"}>
                {posts.map((post, index) => (
                    <Flex key={post.id}
                          direction={"column"}
                          cursor={"pointer"}
                          onClick={() => handleSelectPost(post)}
                    >
                        {posts.length === index + 1 ? (
                            <div ref={observerRef}>
                                <PostCard title={post.title}
                                          content={post.content}
                                          thumbUrl={post.thumbUrl}
                                          createdAt={post.createdAt}
                                />
                            </div>
                        ) : (
                            <div>
                                <PostCard title={post.title}
                                          content={post.content}
                                          thumbUrl={post.thumbUrl}
                                          createdAt={post.createdAt}
                                />
                            </div>
                        )}
                        <Box paddingY={"40px"}>
                            <Divider/>
                        </Box>
                    </Flex>
                ))}
                {hasMore && isLoading && (
                    <Box paddingY={"20px"}>
                        <Skeleton height={"40px"}
                                  marginBottom={"10px"}
                                  startColor={"blackAlpha.200"}
                                  endColor={"blackAlpha.500"}
                        />
                        <SkeletonText mt={"4"}
                                      noOfLines={3}
                                      spacing={"4"}
                                      startColor={"blackAlpha.200"}
                                      endColor={"blackAlpha.500"}
                        />
                    </Box>
                )}
                {!hasMore && (
                    <Center>
                        더 이상 게시글이 없습니다.
                    </Center>
                )}
            </Box>
        </Box>
    );
};

export default PostList;

