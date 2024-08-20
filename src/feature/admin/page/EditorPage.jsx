import React, {useEffect, useState} from 'react';
import {useCategory} from "../../category/hook/useCategory";
import CategorySelector from "../../category/component/category_selector/CategorySelector";
import {Box, Flex} from "@chakra-ui/react";
import CategoryController from "../../category/component/category_controller/CategoryController";
import {faRotateRight, faSquareRootAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function EditorPage() {

    /**
     * 카테고리 관련 메서드
     */
    const {
        categories,
        addCategory,
        fetchSubCategories,
        updateCategory,
        deleteCategory,
        clearCategoryCache,
    } = useCategory();

    /**
     * 현재 선택된 폴더(카테고리)
     */
    const [selectedFolder, setSelectedFolder] = useState({
        id: null,
        name: null,
        thumbUrl: null,
        parentId: null,
        createdAt: null,
        postCount: 0,
    });

    /**
     * 카테고리 컨트롤러 / 게시글 컨트롤러 토글
     */
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPostControlMode, setIsPostControlMode] = useState(false);

    const onFolderSelect = (id, name, thumbUrl, parentId, createdAt, postCount, isParent) => {
        setSelectedFolder({
            id: id,
            name: name,
            thumbUrl: thumbUrl,
            parentId: parentId,
            createdAt: createdAt,
            postCount: postCount,
        });

        setIsPostControlMode(isParent);

        if (isParent) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

    /**
     * 카테고리 업데이트 시 동기화
     */
    useEffect(() => {
        if (selectedFolder.id && categories.length > 0) {
            const updatedFolder = categories.find(category => category.id === selectedFolder.id);
            if (updatedFolder) {
                setSelectedFolder({
                    id: updatedFolder.id,
                    name: updatedFolder.name,
                    thumbUrl: updatedFolder.thumbUrl,
                    parentId: updatedFolder.parentId,
                    createdAt: updatedFolder.createdAt,
                    postCount: updatedFolder.postCount,
                });
            }
        }
    }, [categories]);

    return (
        <Box
            minWidth={"1100px"}
            width={"100%"}
            height={"100%"}
            overflow={"scroll"}
            bg={"#f7f9fc"}
        >
            <Flex
                direction={"row"}
                paddingX={"7.5%"}
                paddingY={"7.5%"}
                width={"100%"}
                height={"100%"}
            >
                <Box
                    width={"50%"}
                    height={"100%"}
                >
                    <Flex direction={"column"} height={"100%"} align={"end"}>
                        <CategorySelector
                            categories={categories}
                            fetchSubCategories={fetchSubCategories}
                            onFolderSelect={onFolderSelect}
                        />
                        <Box height={"15px"}/>
                        <Flex direction={"row"}>
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
                                cursor={"pointer"}
                                onClick={() => {
                                    setSelectedFolder({
                                        id: null,
                                        name: null,
                                        thumbUrl: null,
                                        parentId: null,
                                        createdAt: null,
                                        postCount: null,
                                    });
                                }}
                                _hover={{
                                    color: "#e78413"
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faSquareRootAlt}
                                />
                            </Box>
                            <Box width={"15px"}/>
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
                                cursor={"pointer"}
                                onClick={clearCategoryCache}
                                _hover={{
                                    color: "#e78413"
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faRotateRight}
                                />
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
                <Box
                    width={"5%"}
                    height={"100%"}
                />
                <Box
                    width={"50%"}
                    height={"100%"}
                >
                    <CategoryController
                        selectedFolder={selectedFolder}
                        setSelectedFolder={setSelectedFolder}
                        isExpanded={isExpanded}
                        isPostControlMode={isPostControlMode}
                        addCategory={addCategory}
                        updateCategory={updateCategory}
                        deleteCategory={deleteCategory}
                    />
                </Box>
            </Flex>
        </Box>
    );
}

export default EditorPage;




