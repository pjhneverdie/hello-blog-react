import React, {useState} from "react";

import {Box, Button, Flex, Text, Spinner} from "@chakra-ui/react";

import CategoryNameField from "../CategoryNameField";
import CategoryThumbnailField from "../CategoryThumbnailField";

function CategoryAddForm({selectedCategory, addCategory}) {

    const [thumbImageFile, setThumbImageFile] = useState(null);

    const [name, setName] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function add() {

        setIsLoading(true);

        await addCategory({
            name: name,
            thumbImageFile: thumbImageFile,
            parentId: selectedCategory ? selectedCategory.id : null,
        });

        setIsLoading(false);

        setThumbImageFile(null);
        setName("");

    }

    return (
        <Flex direction={"column"}
              maxW={"800px"}
        >
            <Box height={"10px"}/>
            <CategoryThumbnailField thumbUrl={null}
                                    thumbImageFile={thumbImageFile}
                                    setThumbImageFile={setThumbImageFile}
            />
            <Box height={"25px"}/>
            <CategoryNameField name={name}
                               setName={setName}
            />
            <Box height={"25px"}/>
            <Flex justify={"flex-end"}>
                <Button width={"55px"}
                        height={"37.5px"}
                        bg={"#e78413"}
                        borderRadius={"3.5px"}
                        _hover={{bgColor: "#cf7000"}}
                        _active={{bgColor: "#b65f00"}}
                        _focus={{}}
                        onClick={add}
                        disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner size="sm"
                                 color="white"
                        />
                    ) : (
                        <Text color={"white"}
                              fontSize={"15px"}
                        >
                            저장
                        </Text>
                    )}
                </Button>
            </Flex>
        </Flex>
    );
}

export default CategoryAddForm;
