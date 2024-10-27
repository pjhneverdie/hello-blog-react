import React, {useEffect, useState} from "react";

import {Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

import CategoryAddForm from "../CategoryFrom/CategoryAddForm/CategoryAddForm";
import CategoryUpdateForm from "../CategoryFrom/CategoryUpdateForm/CategoryUpdateForm";

function CategoryController({
                                selectedCategory,
                                addCategory,
                                updateCategory,
                                setSelectedCategory,
                                handleDeleteCategory,
                                handleExtendControllerSize,
                            }) {

    /**
     * 현재 선택된 탭 상태
     */
    const [tabIndex, setTabIndex] = useState(0);

    /**
     * 탭 선택
     */
    const handleSelectTab = (index) => {
        setTabIndex(index);
    };

    /**
     * 카테고리를 변경할 때마다 탭 인덱스 초기화
     */
    useEffect(() => {
        handleSelectTab(0);
        handleExtendControllerSize(false);
    }, [selectedCategory]);


    return (
        <Flex direction={"column"}>
            <CategoryControllerHeader selectedCategory={selectedCategory}
                                      handleDeleteCategory={handleDeleteCategory}
            />
            <Box height={"5px"}/>
            <Tabs isLazy
                  index={tabIndex}
                  onChange={handleSelectTab}
            >
                <CategoryControllerTabs selectedCategory={selectedCategory}/>
                <CategoryControllerPanels tabIndex={tabIndex}
                                          selectedCategory={selectedCategory}
                                          addCategory={addCategory}
                                          updateCategory={updateCategory}
                                          setSelectedCategory={setSelectedCategory}
                />
            </Tabs>
        </Flex>
    );

}

function CategoryControllerHeader({selectedCategory, handleDeleteCategory}) {

    return (
        <Flex direction={"row"}
              justify={"space-between"}
              align={"center"}

        >
            <Flex direction={"column"}>
                <Text fontSize={"17.5px"}
                      fontWeight={"semibold"}
                      wordBreak={"break-word"}
                >
                    {selectedCategory.name ?? "선택된 카테고리가 없습니다."}
                </Text>
                <Text fontSize={"15px"}
                      wordBreak={"break-word"}
                >
                    {selectedCategory.createdAt}
                </Text>
            </Flex>
            {
                selectedCategory.name ? <Box width={"40px"}
                                             height={"40px"}
                                             background={"white"}
                                             color={"gray.100"}
                                             borderWidth={"1px"}
                                             borderRadius={"md"}
                                             display={"flex"}
                                             alignItems={"center"}
                                             justifyContent={"center"}
                                             onClick={handleDeleteCategory}
                                             cursor={"pointer"}
                                             _hover={{
                                                 color: "#e78413"
                                             }}
                >
                    <FontAwesomeIcon
                        icon={faTrashCan}
                    />
                </Box> : null
            }
        </Flex>
    );

}

function CategoryControllerTabs({selectedCategory}) {

    const tabStyles = {
        _focus: {},
        _selected: {borderColor: "#e78413"},
    };

    return (
        <TabList>
            {
                selectedCategory.name ? <Tab {...tabStyles}>
                    수정
                </Tab> : null
            }
            <Tab {...tabStyles}>
                새 폴더
            </Tab>
        </TabList>
    );

}

function CategoryControllerPanels({tabIndex, selectedCategory, addCategory, updateCategory, setSelectedCategory}) {

    const panelStyles = {
        paddingX: "0px",
        justify: "center",
        align: "center"
    };

    return (
        <TabPanels>
            {
                selectedCategory.name ? <TabPanel  {...panelStyles}>
                    <CategoryUpdateForm key={tabIndex}
                                        updateCategory={updateCategory}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                    />
                </TabPanel> : null
            }
            <TabPanel  {...panelStyles}>
                <CategoryAddForm key={tabIndex}
                                 addCategory={addCategory}
                                 selectedCategory={selectedCategory}
                />
            </TabPanel>
        </TabPanels>
    );

}

export default CategoryController;