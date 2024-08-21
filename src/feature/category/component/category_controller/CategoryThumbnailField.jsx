import {FormControl, FormHelperText, FormLabel} from "@chakra-ui/react";
import ImageUploadBox from "../../../../common/component/ImageUploadBox";
import React from "react";

function CategoryThumbnailField({imageFile, setImageFile, thumbUrl}) {
    return (
        <FormControl>
            <FormLabel
                fontWeight={"normal"}
            >
                썸네일
            </FormLabel>
            <ImageUploadBox
                imageFile={imageFile}
                setImageFile={setImageFile}
                thumbUrl={thumbUrl}
            />
            <FormHelperText
                fontSize={"12.5px"}
                textAlign={"left"}
            >
                ! PNG · JPG · JPEG
            </FormHelperText>
        </FormControl>
    );
}

export default CategoryThumbnailField;