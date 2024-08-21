import {AspectRatio, Box, Flex, FormControl, FormLabel, IconButton, Input} from "@chakra-ui/react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faPlus} from "@fortawesome/free-solid-svg-icons";

function PostThumbnailFiled({isExpanded, imageFile, setImageFile, thumbUrl}) {
    const handleClick = (event) => {
        event.stopPropagation();

    };

    return (
        <AspectRatio
            maxW={"500px"}
            minW={"50px"}
            width={isExpanded ? "80%" : "15%"}
            transition="width 0.3s ease"
        >
            <FormControl flexDirection={"column"}>
                {
                    isExpanded ?
                        <FormLabel
                            pl={"5.5px"}
                            width={"100%"}
                            fontWeight={"normal"}
                        >
                            썸네일
                        </FormLabel> :
                        null
                }
                <Box
                    width={"100%"}
                    height={"100%"}
                    bg={"white"}
                    borderWidth={"1px"}
                    borderRadius={"md"}
                    textAlign="center"
                    onClick={handleClick}
                >
                    <IconButton
                        aria-label="Upload Image"
                        icon={<FontAwesomeIcon icon={faImage} color={"#e78413"}/>}
                        size="lg"
                        variant={isExpanded ? "outline" : "unstyled"}
                        borderRadius={isExpanded ? "full" : "0px"}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                    />
                    <Input
                        type="file"
                        accept="image/*"
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        opacity="0"
                        cursor="pointer"
                    />
                </Box>
            </FormControl>
        </AspectRatio>
    );
}

export default PostThumbnailFiled;