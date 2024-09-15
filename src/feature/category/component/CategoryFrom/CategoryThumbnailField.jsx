import React, {useState, useEffect} from 'react';

import {Box, Image, Input, IconButton, FormControl, FormHelperText, FormLabel, AspectRatio} from '@chakra-ui/react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

function CategoryThumbnailField({thumbImageFile, setThumbImageFile, thumbUrl}) {
    const [previewUrl, setPreviewUrl] = useState(null);

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

    const handleChangeThumbImage = (event) => {

        if (event.target.files && event.target.files.length > 0) {
            setThumbImageFile(event.target.files[0]);
        } else {
            setThumbImageFile(null);
        }

    };

    return (
        <FormControl>
            <FormLabel fontWeight={"normal"}>
                썸네일
            </FormLabel>
            <AspectRatio ratio={16 / 9}
                         width={"100%"}
            >
                <Box position={"relative"}
                     height={"200px"}
                     borderWidth={"1px"}
                     borderRadius={"md"}
                     textAlign="center"
                >
                    {previewUrl ? (
                        <Image src={previewUrl}
                               alt="Selected Image"
                               boxSize="100%"
                               objectFit="cover"
                               borderRadius="md"
                        />
                    ) : thumbUrl ? (
                        <Image src={thumbUrl}
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
                            variant="outline"
                            borderRadius="full"
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                        />
                    )}
                    <Input type="file"
                           accept="image/*"
                           onChange={handleChangeThumbImage}
                           position="absolute"
                           top="0"
                           left="0"
                           width="100%"
                           height="100%"
                           opacity="0"
                           cursor="pointer"
                    />
                </Box>
            </AspectRatio>
            <FormHelperText fontSize={"12.5px"} textAlign={"left"}>
                ! PNG · JPG · JPEG
            </FormHelperText>
        </FormControl>
    );
}

export default CategoryThumbnailField;
