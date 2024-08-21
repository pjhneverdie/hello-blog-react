import {Box, Button, Flex, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import CategoryThumbnailField from "./CategoryThumbnailField";
import CategoryNameField from "./CategoryNameField";

function CategoryAddForm({selectedFolder, addCategory}) {
    const [imageFile, setImageFile] = useState(null);

    const [name, setName] = useState(null);

    function add() {
        addCategory({
            name: name,
            thumbImageFile: imageFile,
            parentId: selectedFolder.id
        });

        setImageFile(null);
        setName("");
    }

    return (
        <Flex
            direction={"column"}
            maxW={"800px"}
        >
            <Box
                height={"10px"}
            />
            <CategoryThumbnailField
                thumbUrl={null}
                imageFile={imageFile}
                setImageFile={setImageFile}
            />
            <Box
                height={"25px"}
            />
            <CategoryNameField
                name={name}
                setName={setName}
            />
            <Box
                height={"25px"}
            />
            <Flex
                justify={"flex-end"}
            >
                <Button
                    width={"55px"}
                    height={"37.5px"}
                    bg={"#e78413"}
                    borderRadius={"3.5px"}
                    _hover={{bgColor: "#cf7000"}}
                    _active={{bgColor: "#b65f00"}}
                    _focus={{}}
                    onClick={add}
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

export default CategoryAddForm;