import React, {useEffect, useState} from 'react';

import {Box, Flex} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";

import {useAdminCategoryApi} from "../../../feature/category/hook/useAdminCategoryApi";

import CategorySelector from "../../../feature/category/component/CategorySelector/CategorySelector";
import CategoryController from "../../../feature/category/component/CategoryController/CategoryController";

import PostController from "../../../feature/post/component/PostController/PostController";

function BoardControlPage() {

    /**
     * 카테고리 관리 관련 api들
     */
    const {
        rootCategories,
        addCategory,
        getSubCategories,
        updateCategory,
        deleteCategory,
        clearCategoryCache,
    } = useAdminCategoryApi();

    /**
     * 현재 선택된 카테고리 상태
     */
    const [selectedCategory, setSelectedCategory] = useState({
        id: null,
        name: null,
        thumbUrl: null,
        parentId: null,
        createdAt: null,
        postCount: 0,
    });

    /**
     * 게시글 컨트롤러 <-> 카테고리 컨트롤러 토글
     */
    const [isPostController, setIsPostController] = useState(false);

    /**
     * 카테고리 선택
     */
    const handleSelectCategory = (id, name, thumbUrl, parentId, createdAt, postCount, isParent) => {

        setSelectedCategory({
            id: id,
            name: name,
            thumbUrl: thumbUrl,
            parentId: parentId,
            createdAt: createdAt,
            postCount: postCount,
        });

        setIsPostController(isParent);

    };

    /**
     * 카테고리 삭제
     */
    async function handleDeleteCategory() {

        const result = await deleteCategory(
            {
                id: selectedCategory.id,
                parentId: selectedCategory.parentId
            }
        );

        if (result) {
            setSelectedCategory({
                id: null,
                name: null,
                thumbUrl: null,
                parentId: null,
                createdAt: null,
                postCount: null,
            });
        }

    }

    /**
     * 에디터 초기화
     */
    async function handleClearCategoryCache() {

        await clearCategoryCache();

        setSelectedCategory({
            id: null,
            name: null,
            thumbUrl: null,
            parentId: null,
            createdAt: null,
            postCount: 0,
        });

        setIsPostController(false);

    }

    /**
     * 최상위 카테고리 업데이트 시 동기화
     * !**! 하위 카테고리는 CategorySelector에서 동기화 중 !**!
     */
    useEffect(() => {

        if (selectedCategory.id && rootCategories.length > 0) {
            const updatedRootCategory = rootCategories.find(category => category.id === selectedCategory.id);
            if (updatedRootCategory) {
                setSelectedCategory({
                    id: updatedRootCategory.id,
                    name: updatedRootCategory.name,
                    thumbUrl: updatedRootCategory.thumbUrl,
                    parentId: updatedRootCategory.parentId,
                    createdAt: updatedRootCategory.createdAt,
                    postCount: updatedRootCategory.postCount,
                });
            }
        }

    }, [rootCategories]);

    return (
        <Box minW={"999px"}
             width={"100%"}
             height={"100%"}
             overflow={"scroll"}
             background={"#f7f9fc"}
        >
            <Flex paddingX={"7.5%"}
                  paddingY={"7.5%"}
                  direction={"row"}
                  width={"100%"}
                  height={"100%"}
            >
                <Box width={"50%"}
                     height={"100%"}
                >
                    <Flex direction={"column"}
                          height={"100%"}
                          align={"end"}
                    >
                        <CategorySelector rootCategories={rootCategories}
                                          getSubCategories={getSubCategories}
                                          handleSelectCategory={handleSelectCategory}
                        />
                        <Box height={"15px"}/>
                        <Flex direction={"row"}>
                            <ClearCacheButton handleClearCategoryCache={handleClearCategoryCache}/>
                        </Flex>
                    </Flex>
                </Box>
                <Box width={"5%"}
                     height={"100%"}
                />
                <Box width={"50%"}
                     height={"100%"}
                >
                    <Controller isPostController={isPostController}
                                selectedCategory={selectedCategory}
                                addCategory={addCategory}
                                updateCategory={updateCategory}
                                handleDeleteCategory={handleDeleteCategory}
                    />
                </Box>
            </Flex>
        </Box>
    );
}

function ClearCacheButton({handleClearCategoryCache}) {

    return (
        <Box width={"40px"}
             height={"40px"}
             background={"white"}
             borderWidth={"1px"}
             borderRadius={"md"}
             display={"flex"}
             alignItems={"center"}
             justifyContent={"center"}
             color={"gray.100"}
             _hover={{
                 color: "#e78413"
             }}
             cursor={"pointer"}
             onClick={handleClearCategoryCache}
        >
            <FontAwesomeIcon icon={faRotateRight}/>
        </Box>
    );

}

function Controller({
                        isPostController,
                        selectedCategory,
                        addCategory,
                        updateCategory,
                        handleDeleteCategory,
                    }) {

    const [isExpanded, setIsExpanded] = useState(false);

    /**
     * 카테고리 컨트롤러일 때 항상 false
     * 게시글 컨트롤러일 때 게시, 수정 탭에서 true
     */
    function handleExtendControllerSize(value) {
        setIsExpanded(value);
    }

    return (
        <Box paddingX={"20px"}
             paddingTop={"20px"}
             width={isExpanded ? "230%" : "100%"}
             height={isExpanded ? "150%" : "100%"}
             background={"white"}
             borderWidth={"1px"}
             borderRadius={"md"}
             transition={"width 0.5s ease, height 0.5s ease"}
             overflow={"scroll"}
        >
            {isPostController ?
                <PostController key={selectedCategory.id}
                                selectedCategory={selectedCategory}
                                handleExtendControllerSize={handleExtendControllerSize}
                />
                : <CategoryController selectedCategory={selectedCategory}
                                      addCategory={addCategory}
                                      updateCategory={updateCategory}
                                      handleDeleteCategory={handleDeleteCategory}
                                      handleExtendControllerSize={handleExtendControllerSize}
                />}
        </Box>
    );

}

export default BoardControlPage;




