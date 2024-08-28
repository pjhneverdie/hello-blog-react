import {AspectRatio, Box, FormControl, FormLabel, IconButton, Input, Image, Flex} from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

function PostThumbnailField({isExpanded, imageFile, setImageFile, thumbUrl}) {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setPreviewUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [imageFile]);

    const handleClick = (event) => {
        event.stopPropagation();
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        } else {
            setImageFile(null);
        }
    };

    return (
        <Box
            minW={"30px"}
            maxW={"300px"}
            width={isExpanded ? "80%" : "15%"}
            transition="width 0.3s ease"
        >
            <Flex direction={"column"}>
                {isExpanded ? (
                    <FormLabel
                        width={"100%"}
                        fontWeight={"normal"}
                    >
                        썸네일
                    </FormLabel>
                ) : null}
                <AspectRatio
                    ratio={1}
                    width={"100%"}
                >
                    <Box
                        width={"100%"}
                        height={"100%"}
                        bg={"white"}
                        borderWidth={"1px"}
                        borderRadius={"md"}
                        textAlign="center"
                        onClick={handleClick}
                        position={"relative"}
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
                                alt="Thumbnail Image"
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
                            onChange={handleImageChange}
                        />
                    </Box>
                </AspectRatio>
            </Flex>
        </Box>
    );
}

export default PostThumbnailField;
