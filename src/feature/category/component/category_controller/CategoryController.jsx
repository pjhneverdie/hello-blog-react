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
import PostEditor from "../../../post/component/postEditor/PostEditor";

import PostThumbnailField from "../../../post/component/PostForm/PostThumbnailField";
import PostTitleField from "../../../post/component/PostForm/PostTitleField";
import PostController from "../../../post/component/PostController/PostController";
import BlogCard from "../../../post/component/PostCard/PostCard";

function CategoryController({
                                selectedFolder,
                                setSelectedFolder,
                                isExpanded,
                                setIsExpanded,
                                isPostControlMode,
                                addCategory,
                                updateCategory,
                                deleteCategory
                            }) {

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        setTabIndex(0);

        setIsExpanded(false);

    }, [selectedFolder]);


    const handleTabChange = (index) => {
        setTabIndex(index);

        if (isPostControlMode && index === 1) {
            setIsExpanded(true);
        } else {
            setIsExpanded(index === 2);
        }
    };

    const post = {
        title: 'SOLID Principles in Flutter SOLID Principles in Flutter SOLID Principles in Flutter',
        description: 'Enhancing Code Quality and Maintainability Through Five Key Design Principles.Enhancing Code Quality and Maintainability Through Five Key Design Principles.Enhancing Code Quality and Maintainability Through Five Key Design Principles.',
        author: {
            name: 'Syed Abdul Basit',
            profilePicture: 'path_to_author_image.jpg'
        },
        date: 'Aug 12',
        views: 265,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/%ED%94%84%EB%A1%9C%ED%95%84%28%EC%A0%95%EB%A9%B4%29.jpg'
    };

    return (
        <Box
            paddingX={"20px"}
            pt={"20px"}
            width={isExpanded ? "230%" : "100%"}
            height={isExpanded ? "150%" : "100%"}
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
                <Tabs index={tabIndex} onChange={handleTabChange}>
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
                                <BlogCard {...post} />
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
                                <PostController selectedCategory={selectedFolder}/>
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


export default CategoryController;





