import React, {useState, useEffect} from "react";

import {
    Box,
    Flex,
    Image,
    IconButton,
    AspectRatio,
    Input,
    FormLabel,
    useBreakpointValue
} from "@chakra-ui/react";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

function PostThumbnailField({isExpanded, thumbUrl, thumbImageFile, setThumbImageFile}) {

    const [previewUrl, setPreviewUrl] = useState(null);

    const thumbnailFieldMaxWidth = useBreakpointValue({base: "110px", md: "110px", lg: "110px", xl: "180px"});

    useEffect(() => {

        if (thumbImageFile) {
            const objectUrl = URL.createObjectURL(thumbImageFile);
            setPreviewUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setPreviewUrl(null);
        }

    }, [thumbImageFile]);

    const handleClick = (event) => {

        event.stopPropagation();

    };

    function handleChangeThumbImageFile(event) {

        if (event.target.files && event.target.files.length > 0) {
            setThumbImageFile(event.target.files[0]);
        } else {
            setThumbImageFile(null);
        }

    };

    return (
        <Box minW={"37.5px"}
             maxW={thumbnailFieldMaxWidth}
             width={isExpanded ? "80%" : "30%"}
             transition="width 0.3s ease"
        >
            <Flex direction={"column"}>
                {isExpanded ? (
                    <FormLabel width={"100%"}
                               fontWeight={"normal"}
                    >
                        썸네일
                    </FormLabel>
                ) : null}
                <AspectRatio ratio={16 / 9}
                             width={"100%"}
                >
                    <Box position={"relative"}
                         width={"100%"}
                         height={"100%"}
                         background={"white"}
                         borderWidth={"1px"}
                         borderRadius={"md"}
                         textAlign="center"
                         onClick={handleClick}
                    >
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Selected Image"
                                boxSize="100%"
                                objectFit="cover"
                                borderRadius="md"
                            />
                        ) : thumbUrl ? (
                            <Image
                                src={thumbUrl}
                                alt="Thumbnail"
                                boxSize="100%"
                                objectFit="cover"
                                borderRadius="md"
                            />
                        ) : (
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
                        )}
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
                            onChange={handleChangeThumbImageFile}
                        />
                    </Box>
                </AspectRatio>
            </Flex>
        </Box>
    );
}

export default PostThumbnailField;
