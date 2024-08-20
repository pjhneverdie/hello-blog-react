import React, {useState} from "react";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import PostThumbnailFiled from "./PostThumbnailFiled";
import PostTitleField from "./PostTitleField";

function PostAddForm() {
    const [imageFile, setImageFile] = useState(null);

    const [title, setTitle] = useState(null);

    return (
        <Flex
            width={"100%"}
            direction={"column"}
        >
            <Box
                height={"10px"}
            />
            <PostThumbnailFiled
                thumbUrl={null}
                imageFile={imageFile}
                setImageFile={setImageFile}
            />
            <Box
                height={"25px"}
            />
            <PostTitleField
                name={title}
                setName={setTitle}
            />
            <Box
                height={"25px"}
            />
            <Flex
                justify={"end"}
            >
                <Button
                    width={"55px"}
                    height={"37.5px"}
                    bg={"#e78413"}
                    borderRadius={"3.5px"}
                    _hover={{bgColor: "#cf7000"}}
                    _active={{bgColor: "#b65f00"}}
                    _focus={{}}
                >
                    <Text
                        fontSize={"15px"}
                        color={"white"}
                    >
                        저장
                    </Text>
                </Button>
            </Flex>
        </Flex>
    );
}

export default PostAddForm;