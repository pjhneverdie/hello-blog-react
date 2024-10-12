import React, {useEffect, useState, useRef} from "react";

import {useParams, useLocation, useNavigate} from "react-router-dom";

import {
    Box,
    Flex,
    Text,
    Divider,
    IconButton,
    useBreakpointValue, VStack,
} from "@chakra-ui/react";

import {Viewer} from '@toast-ui/react-editor';

import {giscusConfig} from "../../../config/profile/giscus";

import {usePostApi} from "../hook/usePostApi";

function PostDetailPage() {

    const {id} = useParams();

    const location = useLocation();

    const navigate = useNavigate();

    const [fromList, setFromList] = useState(true);

    const commentSectionRef = useRef(null);

    const {getPost} = usePostApi();

    const [post, setPost] = useState(location.state?.post);

    // const [index, setIndex] = useState([]);

    // useEffect(() => {
    //     // Markdown 텍스트를 줄 단위로 나누고 헤드라인만 필터링
    //     const headlines = post.content.split('\n').filter(line => line.startsWith('#'));
    //     console.log(headlines);
    //
    //     const map = [];
    //     let currentLevel1 = null;
    //     let currentLevel2 = null;
    //
    //     headlines.forEach(heading => {
    //         const level = heading.match(/^#+/)[0].length;
    //         const title = heading.replace(/^#+\s*/, '');
    //
    //         if (level === 1) {
    //             // Level 1 heading
    //             currentLevel1 = {title, children: []};
    //             map.push(currentLevel1);
    //         } else if (level === 2) {
    //             // Level 2 heading
    //             currentLevel2 = {title, children: []};
    //             if (currentLevel1) {
    //                 currentLevel1.children.push(currentLevel2);
    //             }
    //         } else if (level === 3) {
    //             // Level 3 heading
    //             if (currentLevel2) {
    //                 currentLevel2.children.push({title});
    //             }
    //         }
    //     });
    //
    //     setIndex(map);
    //
    // }, [post]);

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
    const commentPaddingX = useBreakpointValue({base: "20px", md: "0px", lg: "0px"});

    return (
        <Box width={"100vw"}
             height={"100vh"}
        >
            {post && <AppBar fromList={fromList}
            />}
            {/*{post &&*/}
            {/*    <Box position="fixed"*/}
            {/*         top="120px"*/}
            {/*         right="0"*/}
            {/*         background={"black"}*/}
            {/*         width="200px"*/}
            {/*         marginRight="20px"*/}
            {/*         alignSelf="flex-end"*/}
            {/*    >*/}
            {/*        <TableOfContents index={index}/>*/}
            {/*    </Box>*/}
            {/*}*/}
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
                         maxWidth={"700px"}
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

// // 나중에 목차 만들 것!
// function TableOfContents({index}) {
//
//     return (
//         <VStack align="start" spacing={3}>
//             {index.map((level1, idx1) => (
//                 <Box key={idx1}>
//                     <Text fontWeight="bold">{level1.title}</Text>
//                     {level1.children.map((level2, idx2) => (
//                         <Box pl={4} key={idx2}>
//                             <Text>{level2.title}</Text>
//                             {level2.children?.map((level3, idx3) => (
//                                 <Box pl={4} key={idx3}>
//                                     <Text>{level3.title}</Text>
//                                 </Box>
//                             ))}
//                         </Box>
//                     ))}
//                 </Box>
//             ))}
//         </VStack>
//     );
//
// }

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

function PostContent({post}) {

    return (
        <Box>
            <Viewer initialValue={post.content}/>
            <style>
                {`
                     .toastui-editor-contents img {
                        width: 100%;
                        aspect-ratio: 16 / 9;
                        display: block;
                        margin-top: 25px;
                        margin-bottom: 25px;
                        margin-left: auto;
                        margin-right: auto;
                        object-fit: contain; 
                    }
                    .toastui-editor-contents h1, .toastui-editor-contents h2 {
                        border-bottom: none !important;
                    }
                    .toastui-editor-contents {
                        margin: 0;
                        padding: 0;
                        font-size: 17.5px;
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕',
                            'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif;
                        z-index: 20;
                    }
                    .toastui-editor-md-list-item-style.toastui-editor-md-list-item-odd {
                        color: black !important;
                        font-weight: normal !important;
                    }
                    .toastui-editor-contents ul > li::before {
                        margin-top: 13px !important;
                        background-color: black !important;
                    }
                    .toastui-editor-contents ol > li::before {
                        color: black !important;
                    }
                    .toastui-editor-contents ul p,
                    .toastui-editor-contents ol p {                      
                        margin-left: 0px !important;
                        margin-right: 0px !important;
                        margin-top: 0px !important;
                        margin-bottom: 10px  !important;
                    }
                    .toastui-editor-contents a {
                        text-decoration: underline;
                        color: #01a9ff !important;
                    }
                    .toastui-editor-contents a:hover {
                        color: #01a9ff !important;
                    }
                    .toastui-editor-contents code {
                        color: black;
                        background-color: rgba(1,169,255, 0.1);
                        padding: 2px 3px;
                        letter-spacing: -0.3px;
                        border-radius: 2px;
                    }
                `}
            </style>
        </Box>
    );

}

export default PostDetailPage;
