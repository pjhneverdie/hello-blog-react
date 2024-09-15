import React, {useEffect, useState} from "react";

import {Box, Flex, Text, Button, Spinner} from "@chakra-ui/react";

import CategoryNameField from "../CategoryNameField";
import CategoryParentField from "../CategoryParentField";
import CategoryThumbnailField from "../CategoryThumbnailField";

function CategoryUpdateForm({selectedCategory, updateCategory}) {

    const [parentId, setParentId] = useState(selectedCategory.parentId);

    const [thumbImageFile, setThumbImageFile] = useState(null);

    const [name, setName] = useState(selectedCategory.name);

    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    async function update() {

        setIsLoading(true);

        await updateCategory({
            id: selectedCategory.id,
            name: name,
            thumbUrl: selectedCategory.thumbUrl,
            parentId: parentId,
            thumbImageFile: thumbImageFile,
            originParentId: selectedCategory.parentId,
        });

        setIsLoading(false);

    }

    useEffect(() => {

        setParentId(selectedCategory.parentId);

        setName(selectedCategory.name);

    }, [selectedCategory]);

    return (
        <Flex direction={"column"}
              maxW={"800px"}
        >
            <Box height={"10px"}/>
            <CategoryParentField parentId={parentId}
                                 setParentId={setParentId}
            />
            <Box height={"25px"}/>
            <CategoryThumbnailField thumbUrl={selectedCategory.thumbUrl}
                                    thumbImageFile={thumbImageFile}
                                    setThumbImageFile={setThumbImageFile}
            />
            <Box height={"25px"}/>
            <CategoryNameField name={name}
                               setName={setName}
            />
            <Box height={"25px"}/>
            <Flex justify={"end"}>
                <Box width={"15px"}/>
                <Button width={"55px"}
                        height={"37.5px"}
                        bg={"#e78413"}
                        borderRadius={"3.5px"}
                        _focus={{}}
                        _hover={{bgColor: "#cf7000"}}
                        _active={{bgColor: "#b65f00"}}
                        onClick={update}
                >
                    {isLoading ? (
                        <Spinner size="sm"
                                 color="white"
                        />
                    ) : (
                        <Text color={"white"}
                              fontSize={"15px"}
                        >
                            수정
                        </Text>
                    )}
                </Button>
            </Flex>
        </Flex>
    );
}

export default CategoryUpdateForm;