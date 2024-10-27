import {AspectRatio, Box, Flex, Image, Text, useColorModeValue} from "@chakra-ui/react";

import {commonTheme, darkTheme, lightTheme} from "../../../../config/theme/Theme";

import {extractPlainText} from "../../../../common/util/mdUtil";
import {formatLocalDateTime} from "../../../../common/util/dateUtil";

function PostCard({title, content, thumbUrl, createdAt, isAdmin}) {

    const postCardBg = useColorModeValue(commonTheme.white, darkTheme.secondaryBlack);
    const postCardBorderColor = useColorModeValue(lightTheme.secondaryWhite, darkTheme.thirdBlack);

    return (
        <Box paddingX={"24px"}
             paddingY={"24px"}
             bg={postCardBg}
             width={"100%"}
             height={"100%"}
             borderRadius={"lg"}
             border={`3px solid ${isAdmin ? "#EDF2F7" : postCardBorderColor}`}
        >
            <Flex direction={"column"}
                  width={"100%"}
                  height={"100%"}
            >
                <PostThumbnail thumbUrl={thumbUrl}/>
                <PostTitle title={title}/>
                <Box height={"5px"}/>
                <PostContentPreview content={content}/>
                <Box height={"5px"}/>
                <PostCreatedAt createdAt={createdAt}/>
            </Flex>
        </Box>
    );

}

function PostThumbnail({thumbUrl}) {

    const isDefault = thumbUrl === "https://hello-blog-api-dev-server-bucket.s3.ap-northeast-2.amazonaws.com/default/post_thumbnail_default.png";

    return (
        isDefault ? null : <Box>
            <AspectRatio ratio={16 / 9}
                         width={"100%"}
            >
                <Image src={thumbUrl}
                       alt="thumbnail"
                       boxSize={"100%"}
                       borderRadius={"lg"}
                       objectFit="contain"
                />
            </AspectRatio>
            <Box height={"15px"}/>
        </Box>
    );

}

function PostTitle({title}) {

    const postTitleColor = useColorModeValue(lightTheme.primaryBlack, darkTheme.primaryWhite);

    return (
        <Text color={postTitleColor}
              fontSize={"2xl"}
              fontWeight={"extrabold"}
              whiteSpace={"normal"}
              wordBreak={"break-all"}
        >
            {title}
        </Text>
    );

}

function PostContentPreview({content}) {

    const plainText = extractPlainText(content);

    const postContentColor = useColorModeValue(lightTheme.secondaryBlack, darkTheme.secondaryWhite);
    const postContentFontWeight = useColorModeValue("medium", "semibold");

    return (
        <Text color={postContentColor}
              fontSize={"sm"}
              fontWeight={postContentFontWeight}
              whiteSpace={"normal"}
              wordBreak={"break-all"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
              }}
        >
            {plainText}
        </Text>
    );

}

export function PostCreatedAt({createdAt}) {

    const postCreatedAtColor = useColorModeValue(lightTheme.secondaryBlack, darkTheme.primaryWhite);
    const postCreatedAtFontWeight = useColorModeValue("medium", "semibold");

    return (
        <Text color={postCreatedAtColor}
              fontSize={"sm"}
              fontWeight={postCreatedAtFontWeight}
        >
            {formatLocalDateTime(createdAt)}
        </Text>
    );

}

export default PostCard;