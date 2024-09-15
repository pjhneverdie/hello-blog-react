import React, {useEffect, useState, useRef} from "react";

import {useParams, useLocation, useNavigate} from "react-router-dom";

import {
    Box,
    Flex,
    Text,
    Divider,
    IconButton,
    useBreakpointValue, Image, AspectRatio,
} from "@chakra-ui/react";

import {Viewer} from '@toast-ui/react-editor';

import {giscusConfig} from "../../../config/profile/giscus";
import {profileConfig} from "../../../config/profile/profile";

import {usePostApi} from "../hook/usePostApi";

function PostDetailPage() {

    const {id} = useParams();

    const location = useLocation();

    const navigate = useNavigate();

    const [fromList, setFromList] = useState(true);

    const commentSectionRef = useRef(null);

    const {getPost} = usePostApi();

    const [post, setPost] = useState(location.state?.post);

    useEffect(async () => {

        window.scrollTo(0, 0);

        if (post) {
            const script = document.createElement("script");

            Object.keys(giscusConfig).forEach(key => {
                if (key === "src" || key === "crossOrigin") {
                    script[key] = giscusConfig[key];
                } else {
                    script.setAttribute(key, giscusConfig[key]);
                }
            });

            script.async = true;

            const giscusDiv = document.querySelector(".giscus");
            if (giscusDiv) {
                giscusDiv.appendChild(script);
            }
        } else {
            setFromList(false);

            const post = await getPost(id);

            if (post) {
                setPost(post);
            } else {
                navigate("/")
            }
        }

    }, [post]);

    const postPaddingX = useBreakpointValue({base: "20px", md: "0px", lg: "0px"});
    const commentPaddingX = useBreakpointValue({base: "20px", md: "40px", lg: "80px"});

    return (
        <Box width={"100vw"}
             height={"100vh"}
        >
            {post && <AppBar fromList={fromList}
            />}
            {post && (
                <Flex direction={"column"}
                      align={"center"}
                      width={"100%"}
                >
                    <Box paddingX={postPaddingX}
                         maxWidth={"700px"}
                         width={"100%"}
                    >
                        <Box height={"120px"}/>
                        <PostTitle post={post}/>
                        <Box paddingY={"20px"}>
                            <Divider borderWidth={"1px"}/>
                        </Box>
                        <Box height={"15px"}/>
                        <PostContent post={post}/>
                        <Box height={"160px"}/>
                        <Divider ref={commentSectionRef}
                                 borderWidth={"1px"}
                        />
                    </Box>
                    <Box paddingX={commentPaddingX}
                         width={"100%"}
                    >
                        <Box height={"80px"}/>
                        <div className="giscus"></div>
                        <Box height={"80px"}/>
                    </Box>
                </Flex>
            )}
        </Box>
    );
}

function AppBar({fromList}) {

    const navigate = useNavigate();

    const [showAppBar, setShowAppBar] = useState(true);

    const [lastScrollY, setLastScrollY] = useState(0);

    const handleBack = () => {

        if (fromList) {
            navigate(-1);
        } else {
            navigate("/");
        }

    };

    const controlAppBar = () => {

        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                setShowAppBar(false);
            } else {
                setShowAppBar(true);
            }
            setLastScrollY(window.scrollY);
        }

    };

    useEffect(() => {

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlAppBar);

            return () => {
                window.removeEventListener("scroll", controlAppBar);
            };
        }

    }, [lastScrollY]);

    return (
        <Box zIndex={"999"}
             position={"fixed"}
             top={showAppBar ? "0" : "-80px"}
             transition={"top 0.3s ease-in-out"}
             paddingX={"20px"}
             paddingY={"10px"}
             width={"100%"}
             background={"white"}
             borderBottom={"2px solid #EDF2F7"}
        >
            <Flex justify={"space-between"}
                  align={"center"}
            >
                <IconButton
                    icon={<Text>뒤로</Text>}
                    aria-label={"뒤로가기"}
                    background={"transparent"}
                    _hover={{bg: "gray.100"}}
                    onClick={handleBack}
                />
            </Flex>
        </Box>
    );

}

function PostTitle({post}) {

    const postTitleFontSize = useBreakpointValue({base: "30px", md: "40px", lg: "50px"});
    const postTitleLineHeight = useBreakpointValue({base: "37.5px", md: "47.5px", lg: "57.5px"});

    return (
        <Text fontSize={postTitleFontSize}
              fontWeight={"bold"}
              wordBreak={"break-all"}
              lineHeight={postTitleLineHeight}
        >
            {post.title}
        </Text>
    );

}

function AuthorInfo({post}) {

    return (
        <Flex direction={"row"}
              justify={"space-between"}
              align={"center"}
        >
            <Flex direction={"row"}>
                <AspectRatio ratio={1}
                             width={"70px"}
                             height={"70px"}
                >
                    <Box border={"2px solid black"}
                    >
                        <Image src={profileConfig.represent}
                               alt="represent"
                               boxSize="100%"
                               objectFit="cover"
                        />
                    </Box>
                </AspectRatio>
                <Box width={"15px"}/>
                <Flex direction={"column"}
                      justify={"space-between"}
                >
                    <Text fontSize={"25px"}
                          fontFamily={"OldLondon"}
                    >
                        {profileConfig.name.charAt(0).toUpperCase() + profileConfig.name.slice(1)}
                    </Text>
                    <Text fontSize={"15px"}
                          fontFamily={"OldLondon"}
                    >
                        {post.createdAt}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );

}

function PostContent({post}) {

    return (
        <Box>
            <Viewer initialValue={post.content}/>
            <style>
                {`
                     /* 뷰어 이미지 16:9 가운데 정렬 */
                     .toastui-editor-contents img {
                        width: 100%;
                        aspect-ratio: 16 / 9;
                        display: block;
                        margin-top: 25px;
                        margin-bottom: 25px;
                        margin-left: auto;
                        margin-right: auto;
                        object-fit: cover; 
                    }
                    /* h1, h2 태그 밑줄 제거 */
                    .toastui-editor-contents h1, .toastui-editor-contents h2 {
                        border-bottom: none !important;
                    }
                    /* toastui-editor-contents 폰트 사이즈 변경 */
                    .toastui-editor-contents {
                        margin: 0;
                        padding: 0;
                        font-size: 17.5px; /* 폰트 사이즈 15px로 변경 */
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕',
                            'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif;
                        z-index: 20;
                    }
                `}
            </style>
        </Box>
    );

}

export default PostDetailPage;
