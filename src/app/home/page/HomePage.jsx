import {
    Box,
    Flex,
    Text,
    Center,
    Tabs, TabPanel, TabPanels,
    useColorModeValue, useBreakpointValue
} from "@chakra-ui/react";

import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {BASE_URL} from "../../../common/const/data";
import {darkTheme, lightTheme} from "../../../config/theme/Theme";

import {usePostContext} from "../../../feature/post/provider/PostProvider";
import {useCategoryContext} from "../../../feature/category/provider/CategoryProvider";

import HomeAppBar, {Actions} from "../component/HomeAppBar";
import PostList from "../../../feature/post/component/PostList/PostList";
import CategoryList from "../../../feature/category/component/CategoryList/CategoryList";
import HeartAnimation from "../component/HeartAnimation/HeartAnimation";

function HomePage() {

    const varForUI = {
        homePageBg: useColorModeValue(lightTheme.primaryWhite, darkTheme.primaryBlack),
        useDividedActions: useBreakpointValue({base: true, md: false}),
    };

    const [tabIndex, setTabIndex] = useState(0);

    function handleTabChange(tabIndex) {
        setTabIndex(tabIndex);
    }

    return (
        /**
         * 가로 무한, 최소 285px
         * 높이 무한
         */
        <Box bg={varForUI.homePageBg}
             width={"100vw"}
             minWidth={"285px"}
             minHeight={"100vh"}
        >
            {
                /**
                 * 가로 화면의 90% 차지, 최대 1080px까지 늘어남
                 * 높이 70px 고정
                 */
            }
            <Center paddingTop={"15px"}
                    width={"100%"}
                    height={"70px"}
            >
                <Box width={"90%"}
                     height={"100%"}
                     maxWidth={"1080px"}
                >
                    <HomeAppBar
                        actions={
                            <Actions
                                tabIndex={tabIndex}
                                handleTabChange={handleTabChange}
                            />
                        }
                        handleLeadingClick={() => {
                            window.location.reload();
                        }}
                    />
                </Box>
            </Center>
            {
                /**
                 * 화면이 좁아지면 앱바의 Actions를 아래로 분리!
                 */
            }
            {
                varForUI.useDividedActions ? <ActionsOnlyWhenOnBase tabIndex={tabIndex}
                                                                    handleTabChange={handleTabChange}
                /> : null
            }
            {
                /**
                 * 탭패널이 남은 공간을 차지
                 */
            }
            <Flex direction={"column"}
                  alignItems={"center"}
                  width={"100%"}
                  height={"100%"}
            >
                <TabsAndPanels tabIndex={tabIndex}
                               handleTabChange={handleTabChange}
                />
            </Flex>
        </Box>
    );

}

function ActionsOnlyWhenOnBase({tabIndex, handleTabChange}) {

    return (
        /**
         * 가로 화면의 90% 차지, 최대 1080px까지 늘어남
         * 높이 70px 고정
         */
        <Center width={"100%"}
                height={"70px"}
        >
            <Box width={"90%"}
                 height={"100%"}
                 maxWidth={"1080px"}
            >
                <Actions tabIndex={tabIndex}
                         handleTabChange={handleTabChange}
                />
            </Box>
        </Center>
    );

}

function TabsAndPanels({tabIndex, handleTabChange}) {

    const varForUI = {
        tabBg: useColorModeValue(lightTheme.primaryWhite, darkTheme.primaryBlack),
        actionLabelStyles: {
            color: useColorModeValue(lightTheme.primaryBlack, darkTheme.primaryWhite),
            fontSize: "2.50rem",
            fontWeight: "bold",
        },
    };

    const navigate = useNavigate();

    const {
        posts,
        setPosts,
        page,
        setPage,
        hasMore,
        setHasMore,
        postApiURL,
        setPostApiURL,
        clearPost
    } = usePostContext();

    const handleSelectPost = (post) => {
        navigate(`/post/${post.id}`, {state: {post}});
    };

    const {
        categories,
        setCategories,
        categoryStack,
        setCategoryStack,
        selectedCategory,
        setSelectedCategory
    } = useCategoryContext();

    function handleSelectCategory(category) {
        /**
         * 하위 카테고리가 없으면 바로 게시글을 로드!
         */
        if (category.childCategoryCount === 0) {
            clearPost();
            setPostApiURL(`${BASE_URL}/post/category/${category.id}`);
            handleTabChange(0);
        } else {
            if (category.id === selectedCategory?.id) {
                clearPost();
                setPostApiURL(`${BASE_URL}/post/category/${category.id}`);
                handleTabChange(0);
                return;
            }

            setCategoryStack(prevStack => [...prevStack, category]);
            setSelectedCategory(category);
        }
    }

    function popCategory() {
        if (postApiURL !== `${BASE_URL}/post/recent`) {
            clearPost();
        }

        const newStack = [...categoryStack];
        newStack.pop();

        setCategoryStack(newStack);

        /**
         * 뒤로가기 시 선택된 카테고리를 부모 카테고리로 바꿈
         */
        const parent = newStack[newStack.length - 1] || null;

        if (parent && categoryStack.length > 0) {
            setSelectedCategory(parent);
        } else {
            /**
             * 루트로 이동하는 경우 스택 초기화
             */
            setCategoryStack([]);
            setSelectedCategory(null);
            setCategories([]);
        }
    }

    return (
        /**
         * 게시글, 카테고리 로드를 위한 프레임
         * 최대 720px 선에서 화면의 90프로를 차지!
         */
        <Tabs bg={varForUI.tabBg}
              borderColor={varForUI.tabBg}
              index={tabIndex}
              width={"90%"}
              maxWidth={"720px"}
        >
            <TabPanels>
                <TabPanel paddingX={"0px"}>
                    <Text {...varForUI.actionLabelStyles}>
                        Posts
                    </Text>
                    <PostList posts={posts}
                              setPosts={setPosts}
                              page={page}
                              setPage={setPage}
                              hasMore={hasMore}
                              setHasMore={setHasMore}
                              handleSelectPost={handleSelectPost}
                              url={postApiURL}
                              isAdmin={false}
                    />
                </TabPanel>
                <TabPanel paddingX={"0px"}>
                    <Text {...varForUI.actionLabelStyles}>
                        Categories
                    </Text>
                    <CategoryList categories={categories}
                                  setCategories={setCategories}
                                  selectedCategory={selectedCategory}
                                  handleSelectCategory={handleSelectCategory}
                                  popCategory={popCategory}
                    />
                </TabPanel>
                <TabPanel paddingX={"0px"}>
                    <Text {...varForUI.actionLabelStyles}>
                        About Me
                    </Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );

}

export default HomePage;