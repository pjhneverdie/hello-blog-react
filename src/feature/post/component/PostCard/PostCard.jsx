import React from 'react';
import {Box, Image, Text, Flex, AspectRatio, useBreakpointValue} from '@chakra-ui/react';

const BlogCard = ({title, description, author, imageUrl}) => {
    // 반응형 제목 글자 크기 설정
    const titleFontSize = useBreakpointValue({ base: 'md', md: 'xl', lg: 'xl' });

    return (
        <Flex direction={"column"} width={"100%"}>
            <Text fontSize="xs">
                {author.name}
            </Text>
            <Box height={"5px"}/>
            <Flex direction={"row"}>
                <Flex direction={"column"} width={"80%"}>
                    <Text
                        fontSize={titleFontSize}
                        fontWeight="extrabold"
                    >
                        {title}
                    </Text>
                    <Box height={"5px"}/>
                    <Text
                        fontSize={"sm"}
                        color={"gray.700"}
                        noOfLines={2}
                        wordBreak="break-word"
                    >
                        {description}
                    </Text>
                </Flex>
                <Box width={"15px"}/>
                <AspectRatio ratio={1} maxW={"120px"} width={"25%"}>
                    <Image
                        src={imageUrl}
                        alt="thumbnail"
                        boxSize={"100%"}
                    />
                </AspectRatio>
            </Flex>
            <Box height={"5px"}/>
            <Text fontSize="xs">
                {author.name}
            </Text>
        </Flex>
    );
};

export default BlogCard;

