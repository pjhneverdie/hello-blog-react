import React, {useRef, useState, useEffect} from "react";

import {
    Box,
    Flex,
    Text,
    AspectRatio,
    Tabs, TabList, Tab, TabPanels, TabPanel,
} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

import {BASE_URL} from "../../../../common/const/data";

import {useAdminPostApi} from "../../hook/useAdminPostApi";

import PostList from "../PostList/PostList";
import PostEditor from "../postEditor/PostEditor";

import PostTitleField from "../PostForm/PostTitleField";
import PostSubmitButton from "../PostForm/PostSubmitButton";
import PostThumbnailField from "../PostForm/PostThumbnailField";
import PostCategoryIdField from "../PostForm/PostCategoryIdField";

function PostController({selectedCategory, handleExtendControllerSize}) {
    /**
     * 게시글 관리 관련 api들
     */
    const {
        uploadContentImageAsTemp,
        moveContentImagesFromTempToImage,
        savePost,
        updatePost,
        deletePost,
    } = useAdminPostApi();

    /**
     * 현재 선택된 탭 상태
     */
    const [tabIndex, setTabIndex] = useState(0);

    /**
     * 현재 선택된 게시글 상태
     */
    const [selectedPost, setSelectedPost] = useState(null);

    /**
     * 마크다운 에디터 ref(수정에 사용)
     */
    const markRefForUpdate = useRef();

    /**
     * 마크다운 에디터 ref(글쓰기에 사용)
     */
    const markRefForSave = useRef();

    /**
     * 탭 선택
     */
    const handleSelectTab = (index) => {

        if (index === 2) {
            return;
        }

        setSelectedPost(null);
        setTabIndex(index);
        handleExtendControllerSize(index > 0);

    };

    /**
     * 게시글 선택
     */
    const handleSelectPost = (post) => {

        setSelectedPost(post);
        setTabIndex(2);
        handleExtendControllerSize(true);

    };

    /**
     * 게시글 삭제
     */
    const handleDeletePost = async () => {

        const markdownContent = markRefForUpdate.current.getInstance().getMarkdown();
        const regex = /!\[content-image\]\((.*?)\)/g;
        const relatedUrls = [selectedPost.thumbUrl];
        let match;

        while ((match = regex.exec(markdownContent)) !== null) {
            relatedUrls.push(match[1]);
        }

        await deletePost({id: selectedPost.id, relatedUrls: relatedUrls, categoryId: selectedCategory.id});

        handleSelectTab(0);
        setSelectedPost(null);

    };

    useEffect(() => {

        handleSelectTab(0);

    }, [selectedCategory]);

    return (
        <Flex direction={"column"}>
            <PostControllerHeader tabIndex={tabIndex}
                                  selectedPost={selectedPost}
                                  selectedCategory={selectedCategory}
                                  handleDeletePost={handleDeletePost}
            />
            <Box height={"5px"}/>
            <Tabs index={tabIndex}
                  onChange={handleSelectTab}
            >
                <PostControllerTabs/>
                <PostControllerPanels tabIndex={tabIndex}
                                      markRefForSave={markRefForSave}
                                      markRefForUpdate={markRefForUpdate}
                                      selectedPost={selectedPost}
                                      setSelectedPost={setSelectedPost}
                                      handleSelectPost={handleSelectPost}
                                      selectedCategory={selectedCategory}
                                      uploadContentImageAsTemp={uploadContentImageAsTemp}
                                      moveContentImagesFromTempToImage={moveContentImagesFromTempToImage}
                                      savePost={savePost}
                                      updatePost={updatePost}
                />
            </Tabs>
        </Flex>
    );

}

function PostControllerHeader({tabIndex, selectedPost, selectedCategory, handleDeletePost}) {

    return (
        <Flex direction={"row"}
              justify={"space-between"}
              align={"center"}
        >
            <Flex direction={"column"}>
                <Text fontSize={"17.5px"}
                      fontWeight={"bold"}
                      wordBreak={"break-word"}
                >
                    {selectedPost ? selectedPost.title : selectedCategory.name}
                </Text>
                <Text fontSize={"15px"}
                      wordBreak={"break-word"}
                >
                    {selectedPost ? selectedPost.createdAt : selectedCategory.createdAt}
                </Text>
            </Flex>
            {
                tabIndex === 2 ?
                    <Box width={"40px"}
                         height={"40px"}
                         bg={"white"}
                         color={"gray.100"}
                         borderWidth={"1px"}
                         borderRadius={"md"}
                         display={"flex"}
                         alignItems={"center"}
                         justifyContent={"center"}
                         onClick={handleDeletePost}
                         cursor={"pointer"}
                         _hover={{
                             color: "#e78413"
                         }}
                    >
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </Box> :
                    null
            }
        </Flex>
    );

}

function PostControllerTabs() {

    const tabStyles = {
        _focus: {},
        _selected: {borderColor: "#e78413"},
    };

    return (
        <TabList>
            <Tab {...tabStyles}>
                목록
            </Tab>
            <Tab {...tabStyles}>
                게시
            </Tab>
            <Tab {...tabStyles}>
                수정
            </Tab>
        </TabList>
    );

}

function PostControllerPanels({
                                  tabIndex,
                                  selectedPost,
                                  setSelectedPost,
                                  handleSelectPost,
                                  markRefForSave,
                                  markRefForUpdate,
                                  selectedCategory,
                                  uploadContentImageAsTemp,
                                  moveContentImagesFromTempToImage,
                                  savePost,
                                  updatePost,
                              }) {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {

        setPosts([]);
        setPage(1);
        setHasMore(true);

    }, [tabIndex]);

    return (
        <TabPanels>
            <TabPanel>
                <PostList key={tabIndex}
                          posts={posts}
                          setPosts={setPosts}
                          page={page}
                          setPage={setPage}
                          hasMore={hasMore}
                          setHasMore={setHasMore}
                          handleSelectPost={handleSelectPost}
                          url={`${BASE_URL}/post/category/${selectedCategory.id}`}
                />
            </TabPanel>
            <TabPanel>
                <PostSaveController key={tabIndex}
                                    markRef={markRefForSave}
                                    selectedCategory={selectedCategory}
                                    uploadContentImageAsTemp={uploadContentImageAsTemp}
                                    moveContentImagesFromTempToImage={moveContentImagesFromTempToImage}
                                    savePost={savePost}
                />
            </TabPanel>
            <TabPanel>
                <PostUpdateController key={tabIndex}
                                      markRef={markRefForUpdate}
                                      selectedPost={selectedPost}
                                      setSelectedPost={setSelectedPost}
                                      selectedCategory={selectedCategory}
                                      uploadContentImageAsTemp={uploadContentImageAsTemp}
                                      moveContentImagesFromTempToImage={moveContentImagesFromTempToImage}
                                      updatePost={updatePost}
                />
            </TabPanel>
        </TabPanels>
    );

}

function PostSaveController({
                                markRef,
                                selectedCategory,
                                uploadContentImageAsTemp,
                                moveContentImagesFromTempToImage,
                                savePost,
                            }) {

    const [isSaveAreaExpanded, setIsSaveAreaExpanded] = useState(false);

    /**
     * 썸네일 상태
     */
    const [thumbImageFile, setThumbImageFile] = useState(null);

    /**
     * 제목 상태
     */
    const [title, setTitle] = useState("");

    /**
     * 게시글 본문에 삽입한 이미지 상태
     */
    const [contentImageTempUrls, setContentImageTempUrls] = useState([]);

    const handleToggleSaveAreaSize = () => {

        setIsSaveAreaExpanded(!isSaveAreaExpanded);

    };

    /**
     * 본문에 이미지 삽입
     */
    async function handleUploadContentImageAsTemp(blob, callback) {

        const tempUrl = await uploadContentImageAsTemp(blob, callback);

        setContentImageTempUrls(prev => [...prev, tempUrl]);

        callback(tempUrl, "content-image");

    }

    /**
     * 게시글 저장
     */
    async function handleSavePost() {

        let content = markRef.current.getInstance().getMarkdown();

        console.log(content)

        if (contentImageTempUrls.length !== 0) {
            const relatedUrls = contentImageTempUrls.filter(url => content.includes(url));

            const urlMap = await moveContentImagesFromTempToImage({relatedUrls: relatedUrls});

            Object.keys(urlMap).forEach(tempUrl => {
                const realURL = urlMap[tempUrl];
                content = content.replace(new RegExp(tempUrl, 'g'), realURL);
            });
        }

        const isSaved = await savePost(
            {
                title: title,
                content: content,
                thumbImageFile: thumbImageFile,
                categoryId: selectedCategory.id,
            }
        );

        if (isSaved) {
            clearEditor();
        }

    }

    /**
     * 에디터 초기화
     */
    function clearEditor() {

        setTitle("");
        setThumbImageFile(null);
        setContentImageTempUrls([]);
        markRef.current.getInstance().setMarkdown("");

    }

    return (
        <Flex direction={"row"}
              justify={"center"}
              align={"center"}
              width={"100%"}
              height={"100%"}
        >
            <AspectRatio ratio={1}
                         minW={"110px"}
                         maxW={"600px"}
                         width={isSaveAreaExpanded ? "100%" : "10%"}
                         transition="width 0.3s ease"
                         onClick={handleToggleSaveAreaSize}
            >
                <Box bg={"white"}
                     borderWidth={"1px"}
                     borderRadius={"md"}
                     cursor={"pointer"}
                >
                    <Flex direction={"column"}
                          justify={"center"}
                          align={"center"}
                          width={"100%"}
                    >
                        <PostThumbnailField isExpanded={isSaveAreaExpanded}
                                            thumbImageFile={thumbImageFile}
                                            setThumbImageFile={setThumbImageFile}

                        />
                        <Box height={isSaveAreaExpanded ? "25px" : "15px"}/>
                        <Box height={isSaveAreaExpanded ? "25px" : "0px"}/>
                        <Box maxW={"500px"}
                             width={"80%"}
                        >
                            <PostTitleField isExpanded={isSaveAreaExpanded}
                                            title={title}
                                            setTitle={setTitle}
                            />
                        </Box>
                        <Box height={isSaveAreaExpanded ? "25px" : "0px"}/>
                        {
                            isSaveAreaExpanded ?
                                <Flex direction={"column"}
                                      align={"end"}
                                      maxW={"500px"}
                                      width={"80%"}
                                >
                                    <PostSubmitButton label={"저장"}
                                                      onTap={handleSavePost}
                                    />
                                </Flex>
                                : null
                        }
                    </Flex>
                </Box>
            </AspectRatio>
            <Box width={"50px"}/>
            <EditArea markRef={markRef}
                      handleUploadContentImageAsTemp={handleUploadContentImageAsTemp}
            />
        </Flex>
    );

}

function PostUpdateController({
                                  markRef,
                                  selectedPost,
                                  setSelectedPost,
                                  selectedCategory,
                                  uploadContentImageAsTemp,
                                  moveContentImagesFromTempToImage,
                                  updatePost,
                              }) {

    const [isSaveAreaExpanded, setIsSaveAreaExpanded] = useState(false);

    /**
     * 썸네일 관련 상태
     */
    const [thumbUrl, setThumbUrl] = useState(selectedPost ? selectedPost.thumbUrl : "");
    const [thumbImageFile, setThumbImageFile] = useState(null);

    /**
     * 제목 상태
     */
    const [title, setTitle] = useState(selectedPost ? selectedPost.title : "");

    /**
     * 카테고리 관련 상태
     */
    const [categoryId, setCategoryId] = useState(selectedCategory.id);
    const [originCategoryId, setOriginCategoryId] = useState(selectedCategory.id);

    /**
     * 게시글 본문에 삽입한 이미지 상태
     */
    const [contentImageTempUrls, setContentImageTempUrls] = useState([]);

    const handleToggleSaveAreaSize = () => {

        setIsSaveAreaExpanded(!isSaveAreaExpanded);

    };

    /**
     * 본문에 이미지 삽입
     */
    async function handleUploadContentImageAsTemp(blob, callback) {

        const tempUrl = await uploadContentImageAsTemp(blob, callback);

        setContentImageTempUrls(prev => [...prev, tempUrl]);

        callback(tempUrl, "content-image");

    }


    /**
     * 게시글 업데이트
     */
    async function handleUpdatePost() {

        let content = markRef.current.getInstance().getMarkdown();

        if (contentImageTempUrls.length !== 0) {
            const relatedUrls = contentImageTempUrls.filter(url => content.includes(url));

            const urlMap = await moveContentImagesFromTempToImage({relatedUrls: relatedUrls});

            Object.keys(urlMap).forEach(tempUrl => {
                const realURL = urlMap[tempUrl];
                content = content.replace(new RegExp(tempUrl, 'g'), realURL);
            });
        }

        await updatePost(
            {
                id: selectedPost.id,
                title: title,
                content: content,
                thumbUrl: selectedPost.thumbUrl,
                thumbImageFile: thumbImageFile,
                categoryId: categoryId,
                originCategoryId: originCategoryId,
            }
        );

        setOriginCategoryId(categoryId);

        setContentImageTempUrls([]);

        setSelectedPost((prevPost) => ({
            ...prevPost,
            title: title,
            content: content,
        }));

    }

    useEffect(() => {

        if (selectedPost) {
            setTitle(selectedPost.title);
            setThumbUrl(selectedPost.thumbUrl);
            markRef.current.getInstance().setMarkdown(selectedPost.content);
        }

    }, [selectedPost]);

    if (!selectedPost) {
        return null;
    }

    return (
        <Flex direction={"row"}
              justify={"center"}
              align={"center"}
              width={"100%"}
              height={"100%"}
        >
            <AspectRatio ratio={1}
                         minW={"110px"}
                         maxW={"600px"}
                         width={isSaveAreaExpanded ? "100%" : "10%"}
                         transition="width 0.3s ease"
                         onClick={handleToggleSaveAreaSize}
            >
                <Box bg={"white"}
                     borderWidth={"1px"}
                     borderRadius={"md"}
                     cursor={"pointer"}
                >
                    <Flex direction={"column"}
                          justify={"center"}
                          align={"center"}
                          width={"100%"}
                    >
                        <PostThumbnailField isExpanded={isSaveAreaExpanded}
                                            thumbUrl={thumbUrl}
                                            thumbImageFile={thumbImageFile}
                                            setThumbImageFile={setThumbImageFile}

                        />
                        <Box height={isSaveAreaExpanded ? "25px" : "15px"}/>
                        {
                            isSaveAreaExpanded ? <Box maxW={"500px"}
                                                      width={"80%"}
                            >
                                <PostCategoryIdField isExpanded={isSaveAreaExpanded}
                                                     categoryId={categoryId}
                                                     setCategoryId={setCategoryId}

                                />
                            </Box> : null
                        }
                        <Box height={isSaveAreaExpanded ? "25px" : "0px"}/>
                        <Box maxW={"500px"}
                             width={"80%"}
                        >
                            <PostTitleField isExpanded={isSaveAreaExpanded}
                                            title={title}
                                            setTitle={setTitle}
                            />
                        </Box>
                        <Box height={isSaveAreaExpanded ? "25px" : "0px"}/>
                        {
                            isSaveAreaExpanded ?
                                <Flex direction={"column"}
                                      align={"end"}
                                      maxW={"500px"}
                                      width={"80%"}
                                >
                                    <PostSubmitButton label={"수정"}
                                                      onTap={handleUpdatePost}
                                    />
                                </Flex>
                                : null
                        }
                    </Flex>
                </Box>
            </AspectRatio>
            <Box width={"50px"}/>
            <EditArea markRef={markRef}
                      handleUploadContentImageAsTemp={handleUploadContentImageAsTemp}
            />
        </Flex>
    );

}

function EditArea({markRef, handleUploadContentImageAsTemp}) {

    return (
        <Box width={"100%"}
             background={"white"}
             borderWidth={"1px"}
             borderRadius={"md"}
        >
            <PostEditor markRef={markRef}
                        handleUploadContentImageAsTemp={handleUploadContentImageAsTemp}
            />
        </Box>
    );

}

export default PostController;
