import React, {useEffect, useState} from "react";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import CategoryThumbnailField from "./CategoryThumbnailField";
import CategoryNameField from "./CategoryNameField";
import CategoryParentField from "./CategoryParentField";

function CategoryUpdateForm({selectedFolder, updateCategory}) {
    const [parentId, setParentId] = useState(selectedFolder.parentId);

    const [imageFile, setImageFile] = useState(null);

    const [name, setName] = useState(selectedFolder.name);

    function update() {
        updateCategory({
            id: selectedFolder.id,
            name: name,
            thumbUrl: selectedFolder.thumbUrl,
            parentId: parentId,
            thumbImageFile: imageFile,
            originParentId: selectedFolder.parentId,
        });

        setImageFile(null);
    }

    useEffect(() => {
        setParentId(selectedFolder.parentId);
        setName(selectedFolder.name);

        console.log(parentId);
    }, [selectedFolder]);

    return (
        <Flex
            direction={"column"}
            maxW={"800px"}
        >
            <Box
                height={"10px"}
            />
            <CategoryParentField
                parentId={parentId}
                setParentId={setParentId}
            />
            <Box
                height={"25px"}
            />
            <CategoryThumbnailField
                thumbUrl={selectedFolder.thumbUrl}
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
                justify={"end"}
            >
                <Box width={"15px"}/>
                <Button
                    width={"55px"}
                    height={"37.5px"}
                    bg={"#e78413"}
                    borderRadius={"3.5px"}
                    _hover={{bgColor: "#cf7000"}}
                    _active={{bgColor: "#b65f00"}}
                    _focus={{}}
                    onClick={update}
                >
                    <Text fontSize={"15px"} color={"white"}>
                        수정
                    </Text>
                </Button>
            </Flex>
        </Flex>
    );
}

export default CategoryUpdateForm;