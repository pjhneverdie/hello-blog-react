import React, {useEffect, useState, useRef} from "react";

import {useParams, useLocation, useNavigate} from "react-router-dom";

import {
    Box,
    Flex,
    Text,
    Center,
    useColorModeValue,
    Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
} from "@chakra-ui/react";

import {Viewer} from '@toast-ui/react-editor';
import "@toast-ui/editor/dist/toastui-editor.css";
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import codeSyntaxHighlight
    from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import "prismjs/themes/prism.css";

import {giscusConfig} from "../../../config/profile/giscus";

import {usePostApi} from "../hook/usePostApi";
import {commonTheme, darkTheme, lightTheme} from "../../../config/theme/Theme";
import {PostCreatedAt} from "../component/PostCard/PostCard";
import HomeAppBar from "../../../app/home/component/HomeAppBar";

function PostDetailPage() {

    const giscusTheme = useColorModeValue("light", "dark");
    const postDetailPageBg = useColorModeValue(commonTheme.white, darkTheme.primaryBlack);

    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const {getPost} = usePostApi();
    const [post, setPost] = useState(location.state?.post);

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0);

            if (!post) {
                const fetchedPost = await getPost(id);

                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate("/");
                }
            }
        };

        fetchData();
    }, [post]);

    useEffect(() => {
        const loadGiscusScript = async () => {
            if (post) {
                const script = document.createElement("script");

                Object.keys(giscusConfig[giscusTheme]).forEach((key) => {
                    if (key === "src" || key === "crossOrigin") {
                        script[key] = giscusConfig[giscusTheme][key];
                    } else {
                        script.setAttribute(key, giscusConfig[giscusTheme][key]);
                    }
                });

                script.async = true;

                const giscusDiv = document.querySelector(".giscus");
                if (giscusDiv) {
                    giscusDiv.appendChild(script);
                }
            }
        };

        loadGiscusScript();
    }, [post, giscusTheme]);

    return (
        <Box bg={postDetailPageBg}
             width={"100vw"}
             minWidth={"285px"}
             minHeight={"100vh"}
        >
            {post && (
                <Center paddingTop={"15px"}
                        width={"100%"}
                        height={"70px"}
                >
                    <Box width={"90%"}
                         height={"100%"}
                         maxWidth={"1080px"}
                    >
                        <HomeAppBar actions={null}
                                    handleLeadingClick={()=>{
                                        window.history.back();
                                    }}
                        />
                    </Box>
                </Center>
            )}
            {post && (
                <Flex direction={"column"}
                      alignItems={"center"}
                      width={"100%"}
                      height={"100%"}
                >
                    <Box height={"20px"}/>
                    <Box width={"90%"}
                         maxWidth={"750px"}
                    >
                        <PostTitle post={post}/>
                        <Box height={"5px"}/>
                        <PostCreatedAt createdAt={post.createdAt}/>
                        <Box height={"20px"}/>
                        <TableOfContents post={post}/>
                        <Box height={"2px"}/>
                        <PostContent post={post}/>
                        <Box height={"160px"}/>
                    </Box>
                    <Box width={"90%"}
                         maxWidth={"750px"}
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

const TableOfContents = ({post}) => {

    const tocBg = useColorModeValue(lightTheme.primaryWhite, darkTheme.secondaryBlack);
    const indexColor = useColorModeValue(lightTheme.primaryBlack, darkTheme.primaryWhite);

    const [index, setIndex] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Markdown 텍스트를 줄 단위로 나누고 헤드라인만 필터링
        const headlines = post.content.split('\n').filter(line => line.startsWith('#'));

        const map = [];
        let currentLevel1 = null;
        let currentLevel2 = null;

        headlines.forEach(heading => {
            const level = heading.match(/^#+/)[0].length;
            const title = heading.replace(/^#+\s*/, '');

            if (level === 1) {
                currentLevel1 = {title, children: []};
                map.push(currentLevel1);
            } else if (level === 2) {
                currentLevel2 = {title, children: []};
                if (currentLevel1) {
                    currentLevel1.children.push(currentLevel2);
                }
            } else if (level === 3) {
                if (currentLevel2) {
                    currentLevel2.children.push({title});
                }
            }
        });

        setIndex(map);
    }, [post]);

    return (
        <Accordion allowToggle
                   onChange={(expandedIndex) => {
                       setIsExpanded(!isExpanded);
                   }}
        >
            <AccordionItem border={"none"}
            >
                <h2>
                    <AccordionButton bg={tocBg}
                                     borderTopRadius={"lg"}
                                     borderBottomRadius={isExpanded ? "none" : "lg"}
                    >
                        <Box flex="1"
                             color={indexColor}
                             fontSize={"lg"}
                             fontWeight="bold"
                             textAlign="left"
                        >
                            Table of Contents
                        </Box>
                        <AccordionIcon color={indexColor}/>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}
                                bg={tocBg}
                                borderBottomRadius={"lg"}
                >
                    {index.map((level1, idx1) => (
                        <Box key={idx1}
                             mb={4}
                             color={indexColor}
                             fontWeight="semibold"
                        >
                            <Box mb={2}
                                 fontSize={"lg"}
                            >
                                {`○ ${level1.title}`}
                            </Box>
                            {level1.children.map((level2, idx2) => (
                                <Box key={idx2}
                                     pl={3}
                                     mb={2}
                                >
                                    <Box mb={2}
                                         fontSize={"md"}
                                    >
                                        {`□ ${level2.title}`}
                                    </Box>
                                    {level2.children && level2.children.map((level3, idx3) => (
                                        <Box key={idx3}
                                             pl={3}
                                             mb={2}
                                             fontSize={"sm"}
                                        >
                                            {`△ ${level3.title}`}
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );

};

function PostTitle({post}) {

    const postTitleColor = useColorModeValue(lightTheme.primaryBlack, darkTheme.primaryWhite);

    return (
        <Text color={postTitleColor}
              fontSize={"5xl"}
              fontWeight={"extrabold"}
              whiteSpace={"normal"}
              wordBreak={"break-all"}
        >
            {post.title}
        </Text>
    );

}

function PostContent({post}) {

    const mdStyle = useColorModeValue(
        `
                    .toastui-editor-contents p,
                    .toastui-editor-contents h1, .toastui-editor-contents h2,
                    .toastui-editor-contents h3, .toastui-editor-contents h4,
                    .toastui-editor-contents h5, .toastui-editor-contents h6 {
                        border-bottom: none !important;
                        color: #1e1e1e !important;
                    }
                    .toastui-editor-contents {
                        font-size: 18px !important;
                        font-weight: normal !important;
                    }
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
                    .toastui-editor-md-list-item-style.toastui-editor-md-list-item-odd {
                        color: #1e1e1e !important;
                        font-weight: normal !important;
                    }
                    .toastui-editor-contents ul > li::before {
                        margin-top: 13px !important;
                        background-color: #1e1e1e !important;
                    }
                    .toastui-editor-contents ol > li::before {
                        color: #1e1e1e !important;
                    }
                    .toastui-editor-contents ul p, .toastui-editor-contents ol p {                      
                        margin-left: 0px !important;
                        margin-right: 0px !important;
                        margin-top: 0px !important;
                        margin-bottom: 10px  !important;
                    }        
                    .toastui-editor-dark .toastui-editor-contents code {
                        color: #1e1e1e !important;
                        background-color: rgba(1,169,255, 0.1);
                    }
                    .toastui-editor-dark .toastui-editor-contents pre {
                        background-color: #f7f7f8 !important;
                    }
                    .toastui-editor-dark .toastui-editor-contents pre code {
                        color: #1e1e1e !important;
                    }
                    .toastui-editor-dark .token.operator {
                        background-color: transparent;
                    }      
                `,
        `
                    .toastui-editor-contents p,
                    .toastui-editor-contents h1, .toastui-editor-contents h2,
                    .toastui-editor-contents h3, .toastui-editor-contents h4,
                    .toastui-editor-contents h5, .toastui-editor-contents h6 {
                        border-bottom: none !important;
                        color: #C4C4C5 !important;
                    }
                    .toastui-editor-contents {
                        font-size: 18px !important;
                        font-weight: 500 !important;
                    }
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
                    .toastui-editor-md-list-item-style.toastui-editor-md-list-item-odd {
                        color: #C4C4C5 !important;
                        font-weight: normal !important;
                    }
                    .toastui-editor-contents ul > li::before {
                        margin-top: 13px !important;
                        background-color: #C4C4C5 !important;
                    }
                    .toastui-editor-contents ol > li::before {
                        color: #C4C4C5 !important;
                    }
                    .toastui-editor-contents ul p, .toastui-editor-contents ol p {                      
                        margin-left: 0px !important;
                        margin-right: 0px !important;
                        margin-top: 0px !important;
                        margin-bottom: 10px  !important;
                    } 
                    .toastui-editor-dark .toastui-editor-contents pre {
                        background-color: #2E2E33 !important;
                    }   
                    .toastui-editor-dark .toastui-editor-contents pre code {
                        color: #C4C4C5 !important;
                    }
                    .toastui-editor-dark .token.operator {
                        background-color: transparent;
                    }                                     
                `
    );

    return (
        <Box>
            <Viewer initialValue={post.content}
                    theme={"dark"}
                    plugins={[codeSyntaxHighlight]}
            />
            <style>{mdStyle}</style>
        </Box>
    );

}

export default PostDetailPage;
