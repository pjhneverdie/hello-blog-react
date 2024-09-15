import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

import {Text, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue} from "@chakra-ui/react";

import {BASE_URL} from "../../../common/const/data";

import {usePostContext} from "../../../feature/post/provider/PostProvider";
import {useCategoryContext} from "../../../feature/category/provider/CategoryProvider";

import PostList from "../../../feature/post/component/PostList/PostList";
import CategoryList from "../../../feature/category/component/CategoryList/CategoryList";

function HomeTabs() {

    const navigate = useNavigate();

    const [tabIndex, setTabIndex] = useState(0);

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

    const {
        categories,
        setCategories,
        categoryStack,
        setCategoryStack,
        selectedCategory,
        setSelectedCategory
    } = useCategoryContext();

    const handleSelectPost = (post) => {

        navigate(`/post/${post.id}`, {state: {post}});

    };

    function handleSelectCategory(category) {

        if (selectedCategory && category.id === selectedCategory.id) {
            clearPost();
            setPostApiURL(`${BASE_URL}/post/category/${category.id}`);
            setTabIndex(0);
        } else {
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

        const parent = newStack[newStack.length - 1] || null;

        if (parent && categoryStack.length > 0) {
            setSelectedCategory(parent);
        } else {
            setCategoryStack([]);
            setSelectedCategory(null);
            setCategories([]);
        }

    }

    const homeTabAlign = useBreakpointValue({base: "center", md: "start", lg: "start"});
    const homeTabGap = useBreakpointValue({base: "10px", md: "25px", lg: "25px"});
    const homeTabFontSize = useBreakpointValue({base: "13.5px", md: "13.5px", lg: "13.5px"});

    return (
        <Tabs variant="soft-rounded"
              width={"100%"}
              align={homeTabAlign}
              colorScheme="blackAlpha"
              index={tabIndex}
              onChange={setTabIndex}
        >
            <TabList>
                <Tab marginRight={homeTabGap}
                     _focus={{}}
                >
                    <Text fontSize={homeTabFontSize}>
                        Posts
                    </Text>
                </Tab>
                <Tab fontSize={homeTabFontSize}
                     _focus={{}}
                >
                    <Text fontSize={homeTabFontSize}>
                        Category
                    </Text>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <PostList posts={posts}
                              setPosts={setPosts}
                              page={page}
                              setPage={setPage}
                              hasMore={hasMore}
                              setHasMore={setHasMore}
                              handleSelectPost={handleSelectPost}
                              url={postApiURL}
                    />
                </TabPanel>
                <TabPanel>
                    <CategoryList categories={categories}
                                  setCategories={setCategories}
                                  selectedCategory={selectedCategory}
                                  handleSelectCategory={handleSelectCategory}
                                  popCategory={popCategory}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default HomeTabs;
