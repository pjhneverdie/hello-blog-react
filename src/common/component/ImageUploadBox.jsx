import React, { useState, useEffect } from 'react';
import { Box, Image, Input, IconButton } from '@chakra-ui/react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ImageUploadBox({ imageFile, setImageFile, thumbUrl }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setPreviewUrl(objectUrl);

            return () => {
                // Revoke the previous object URL
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [imageFile]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        } else {
            setImageFile(null); // Reset the file if no file is selected
        }
    };

    return (
        <Box
            position={"relative"}
            height={"200px"}
            borderWidth={"1px"}
            borderRadius={"md"}
            textAlign="center"
        >
            {previewUrl ? (
                <Image src={previewUrl} alt="Selected Image" boxSize="100%" objectFit="cover" borderRadius="md"/>
            ) : thumbUrl ? (
                <Image src={thumbUrl} alt="Thumbnail Image" boxSize="100%" objectFit="cover" borderRadius="md"/>
            ) : (
                <IconButton
                    aria-label="Upload Image"
                    icon={<FontAwesomeIcon icon={faPlus} color={"#e78413"}/>}
                    size="lg"
                    variant="outline"
                    borderRadius="full"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                />
            )}
            <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                opacity="0"
                cursor="pointer"
            />
        </Box>
    );
}

export default ImageUploadBox;




