import React, {useState, useEffect} from "react";
import {
    AspectRatio,
    Box,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import CategoryAddForm from "./CategoryAddForm";
import CategoryUpdateForm from "./CategoryUpdateForm";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PostEditor from "../../../post/component/PostForm/PostEditor";

import PostThumbnailFiled from "../../../post/component/PostForm/PostThumbnailFiled";
import PostTitleField from "../../../post/component/PostForm/PostTitleField";

function CategoryController({
                                selectedFolder,
                                setSelectedFolder,
                                isExpanded,
                                isPostControlMode,
                                addCategory,
                                updateCategory,
                                deleteCategory
                            }) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setExpanded(isExpanded);
    }, [isExpanded]);

    const handleTabChange = (index) => {
        if (isPostControlMode) {
            setExpanded(true);
        } else {
            setExpanded(index === 2);
        }
    };

    return (
        <Box
            paddingX={"20px"}
            pt={"20px"}
            width={expanded ? "230%" : "100%"}
            height={expanded ? "150%" : "100%"}
            overflow={"scroll"}
            bg={"white"}
            borderWidth={"1px"}
            borderRadius={"md"}
            transition={"width 0.5s ease, height 0.5s ease"}
        >
            <Flex direction={"column"}>
                {selectedFolder.name ?
                    <Flex
                        direction={"row"}
                        justify={"space-between"}
                        align={"center"}
                    >
                        <Flex direction={"column"}>
                            <Text
                                fontSize={"17.5px"}
                                fontWeight={"bold"}
                                wordBreak={"break-word"}
                            >
                                {selectedFolder.name}
                            </Text>
                            <Text
                                fontSize={"15px"}
                                wordBreak={"break-word"}
                            >
                                {selectedFolder.createdAt}
                            </Text>
                        </Flex>
                        <Box
                            width={"40px"}
                            height={"40px"}
                            bg={"white"}
                            borderWidth={"1px"}
                            borderRadius={"md"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            color={"gray.100"}
                            onClick={() => {
                                deleteCategory(
                                    {
                                        id: selectedFolder.id,
                                        parentId: selectedFolder.parentId,
                                        setSelectedFolder: setSelectedFolder
                                    }
                                );
                            }}
                            cursor={"pointer"}
                            _hover={{
                                color: "#e78413"
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTrashCan}
                            />
                        </Box>
                    </Flex> : "No Folder Selected"}
                <Box height={"10px"}/>
                <Tabs onChange={handleTabChange}>
                    <TabList>
                        {isPostControlMode ? (
                            <>
                                <Tab
                                    _selected={{borderColor: "#e78413"}}
                                    _focus={{}}
                                    borderBottom="2px solid transparent"
                                >
                                    게시글 목록
                                </Tab>
                                <Tab
                                    _selected={{borderColor: "#e78413"}}
                                    _focus={{}}
                                    borderBottom="2px solid transparent"
                                >
                                    수정
                                </Tab>
                            </>
                        ) : selectedFolder.name ? (
                            <>
                                <Tab
                                    _selected={{borderColor: "#e78413"}}
                                    _focus={{}}
                                    borderBottom="2px solid transparent"
                                >
                                    수정
                                </Tab>
                                <Tab
                                    _selected={{borderColor: "#e78413"}}
                                    _focus={{}}
                                    borderBottom="2px solid transparent"
                                >
                                    새 폴더
                                </Tab>
                                <Tab
                                    _selected={{borderColor: "#e78413"}}
                                    _focus={{}}
                                    borderBottom="2px solid transparent"
                                >
                                    게시
                                </Tab>
                            </>
                        ) : (
                            <Tab
                                _selected={{borderColor: "#e78413"}}
                                _focus={{}}
                                borderBottom="2px solid transparent"
                            >
                                새 폴더
                            </Tab>
                        )}
                    </TabList>

                    {isPostControlMode ? (
                        <TabPanels>
                            <TabPanel paddingX={"0px"}>
                                게시글 목록
                            </TabPanel>
                            <TabPanel paddingX={"0px"}>
                                수정
                            </TabPanel>
                        </TabPanels>
                    ) : selectedFolder.name ? (
                        <TabPanels>
                            <TabPanel
                                paddingX={"0px"}
                                justify={"center"}
                                align={"center"}
                            >
                                <CategoryUpdateForm
                                    selectedFolder={selectedFolder}
                                    updateCategory={updateCategory}
                                />
                            </TabPanel>
                            <TabPanel
                                paddingX={"0px"}
                                justify={"center"}
                                align={"center"}
                            >
                                <CategoryAddForm
                                    selectedFolder={selectedFolder}
                                    addCategory={addCategory}
                                />
                            </TabPanel>
                            <TabPanel paddingX={"0px"}>
                                <PostController/>
                            </TabPanel>
                        </TabPanels>
                    ) : (
                        <TabPanels>
                            <TabPanel paddingX={"0px"}>
                                <CategoryAddForm
                                    selectedFolder={selectedFolder}
                                    addCategory={addCategory}
                                />
                            </TabPanel>
                        </TabPanels>
                    )}
                </Tabs>
            </Flex>
        </Box>
    )
        ;
}

function PostController() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleWidth = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <Flex
            direction={"row"}
            justify={"center"}
            align={"center"}
            width={"100%"}
            height={"100%"}
        >
            <AspectRatio
                minW={"100px"}
                maxW={"680px"}
                width={isExpanded ? "50%" : "10%"}
                transition="width 0.3s ease"
                ratio={1}
                onClick={toggleWidth}
            >
                <Box
                    bg={"white"}
                    borderWidth={"1px"}
                    borderRadius={"md"}
                    cursor={"pointer"}
                >
                    <Flex
                        direction={"column"}
                        justify={"center"}
                        align={"center"}
                        width={"100%"}
                    >
                        <PostThumbnailFiled
                            isExpanded={isExpanded}
                        />
                        <Box
                            height={isExpanded ? "25px" : "15px"}
                        />
                        <Box
                            maxW={"500px"}
                            width={"80%"}
                        >
                            <PostTitleField
                                isExpanded={isExpanded}
                            />
                        </Box>
                    </Flex>
                </Box>
            </AspectRatio>
            <Box width={"50px"}/>
            <Box
                flex={1}
                bg={"white"}
                borderWidth={"1px"}
                borderRadius={"md"}
            >
                <PostEditor/>
            </Box>
        </Flex>
    );
}

export default CategoryController;





