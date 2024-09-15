import React from 'react';

import {Box, Flex, Text, Image, AspectRatio, useBreakpointValue} from '@chakra-ui/react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";

import {profileConfig} from "../../../../config/profile/profile";

const PostCard = ({title, content, thumbUrl, createdAt}) => {

    return (
        <Flex direction={"column"}
              width={"100%"}
        >
            <AuthorInfo/>
            <Box height={"5px"}/>
            <Flex direction={"row"}>
                <Flex direction={"column"}
                      align={"start"}
                      width={"80%"}
                >
                    <PostTitle title={title}
                    />
                    <Box height={"5px"}/>
                    <PostContent content={content}
                    />
                    <Box height={"15px"}/>
                    <PostCreatedAt createdAt={createdAt}
                    />
                </Flex>
                <Box width={"15px"}/>
                <AspectRatio ratio={1}
                             maxW={"120px"}
                             width={"25%"}
                >
                    <Image src={thumbUrl}
                           alt="thumbnail"
                           boxSize={"100%"}
                    />
                </AspectRatio>
            </Flex>
            <Box height={"5px"}/>
        </Flex>
    );
};

function AuthorInfo() {

    const authorFontSize = useBreakpointValue({base: "xs", md: "xs", lg: "md"});

    return (
        <Flex direction="row"
              align="start"
        >
            <Image src={profileConfig.represent}
                   alt={"Profile Picture"}
                   boxSize={"21.5px"}
                   borderRadius={"full"}
            />
            <Box width={"7.5px"}/>
            <Text fontSize={authorFontSize}
                  lineHeight={"18.5px"}
            >
                {profileConfig.name}
            </Text>
        </Flex>
    );

}

function PostTitle({title}) {

    const postTitleFontSize = useBreakpointValue({base: "xl", md: "xl", lg: "25px"});

    return (
        <Text fontSize={postTitleFontSize}
              fontWeight={"bold"}
              wordBreak={"break-all"}
        >
            {title}
        </Text>
    );

}

function PostContent({content}) {

    const contentFontSize = useBreakpointValue({base: "md", md: "md", lg: "15px"});

    return (
        <Text fontSize={contentFontSize}
              color={"gray.700"}
              noOfLines={2}
              wordBreak={"break-all"}
        >
            {content}
        </Text>
    );

}

function PostCreatedAt({createdAt}) {

    const createdAtFontSize = useBreakpointValue({base: "xs", md: "xs", lg: "xs"});

    return (
        <Flex>
            <FontAwesomeIcon icon={faClock}
                             fontSize={"12.5px"}
                             color={"#a0a0a0"}
            />
            <Box width={"7.5px"}/>
            <Text color={"#a0a0a0"}
                  fontSize={createdAtFontSize}
                  lineHeight={"13.75px"}
            >
                {createdAt.match(/\d{4}-\d{2}-\d{2}/)[0]}
            </Text>
        </Flex>
    );

}

export default PostCard;

