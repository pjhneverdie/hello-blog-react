import React, {useEffect, useRef, useState} from "react";
import {AspectRatio, Box, Flex} from "@chakra-ui/react";
import PostThumbnailField from "../PostForm/PostThumbnailField";
import PostTitleField from "../PostForm/PostTitleField";
import PostEditor from "../postEditor/PostEditor";
import PostSubmitButton from "../PostForm/PostSubmitButton";
import {useAdminPostApi} from "../../hook/useAdminPostApi";

function PostController({selectedCategory}) {

    /**
     * 저장 모드 토글
     */
    const [isSaveMode, setIsSaveMode] = useState(false);

    const [thumbImageFile, setThumbImageFile] = useState(null);

    const [title, setTitle] = useState(null);

    const editorRef = useRef();

    const {savePost} = useAdminPostApi();

    const toggleWidth = () => {
        setIsSaveMode(!isSaveMode);
    };

    function handleSavePost() {
        savePost(
            {
                title: title,
                content: editorRef.current.getInstance().getMarkdown(),
                thumbImageFile: thumbImageFile,
                categoryId: selectedCategory.id
            }
        );

        setThumbImageFile(null);
        setTitle("");
        editorRef.current.getInstance().setMarkdown('');
    }

    useEffect(() => {
        setThumbImageFile(null);
        setTitle("");
        editorRef.current.getInstance().setMarkdown('');
    }, [selectedCategory]);

    return (
        <Flex
            direction={"row"}
            justify={"center"}
            align={"center"}
            width={"100%"}
            height={"100%"}
        >
            <AspectRatio
                ratio={1}
                minW={"100px"}
                maxW={"600px"}
                width={isSaveMode ? "100%" : "10%"}
                transition="width 0.3s ease"
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
                        <PostThumbnailField
                            isExpanded={isSaveMode}
                            imageFile={thumbImageFile}
                            setImageFile={setThumbImageFile}
                        />
                        <Box
                            height={isSaveMode ? "25px" : "15px"}
                        />
                        <Box
                            maxW={"500px"}
                            width={"80%"}
                        >
                            <PostTitleField
                                isExpanded={isSaveMode}
                                title={title}
                                setTitle={setTitle}
                            />
                        </Box>
                        {
                            isSaveMode ?
                                <Flex direction={"column"} align={"end"} maxW={"500px"} width={"80%"}>
                                    <Box
                                        height={"25px"}
                                    />
                                    <PostSubmitButton
                                        label={"저장"}
                                        onTap={handleSavePost}
                                    />
                                </Flex>
                                : null
                        }
                    </Flex>
                </Box>
            </AspectRatio>
            <Box width={"50px"}/>
            <Box
                width={"100%"}
                bg={"white"}
                borderWidth={"1px"}
                borderRadius={"md"}

            >
                <PostEditor editorRef={editorRef}/>
            </Box>
        </Flex>
    );
}

export default PostController;