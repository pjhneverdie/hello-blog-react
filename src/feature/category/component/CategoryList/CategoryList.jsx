import React, {useEffect} from "react";

import {AspectRatio, Box, Flex, Grid, IconButton, Skeleton, Text, useBreakpointValue} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faDoorOpen} from "@fortawesome/free-solid-svg-icons";

import {useCategoryApi} from "../../hook/useCategoryApi";

function CategoryList({categories, setCategories, selectedCategory, handleSelectCategory, popCategory}) {

    const {isLoading, getRootCategories, getSubCategories} = useCategoryApi();

    useEffect(async () => {

        if (categories.length === 0) {
            setCategories(await getRootCategories());
        }

    }, [categories]);

    useEffect(async () => {

        if (selectedCategory) {
            setCategories(await getSubCategories(selectedCategory.id));
        }

    }, [selectedCategory]);

    const popButtonVisibility = useBreakpointValue({base: false, md: true, lg: true});

    const floatingActionButtonVisibility = useBreakpointValue({base: true, md: false, lg: false});

    return (
        <Box>
            {isLoading ? (
                <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                      gap={4}
                >
                    {Array(6).fill("").map((_, index) => (
                        <Skeleton key={index}
                                  height="200px"
                                  startColor={"blackAlpha.200"}
                                  endColor={"blackAlpha.500"}
                        />
                    ))}
                </Grid>
            ) : (
                <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                      gap={4}
                >
                    {(selectedCategory && popButtonVisibility) && (
                        <Box sx={{
                            padding: "15px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #ddd",
                            cursor: "pointer",
                            '&:hover': {
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                             onClick={popCategory}
                        >
                            <FontAwesomeIcon icon={faDoorOpen}
                                             color={"#e78413"}
                                             fontSize={"25px"}

                            />
                        </Box>
                    )}
                    {categories.map((category) => (
                        <Box key={category.id}
                             sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center',
                                 border: '1px solid #ddd',
                                 cursor: 'pointer',
                                 '&:hover': {
                                     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                 },
                             }}
                             onClick={() => handleSelectCategory(category)}
                        >
                            <AspectRatio ratio={16 / 9}
                                         width={"100%"}
                            >
                                <Box position={"relative"}
                                     textAlign="center"
                                >
                                    <img src={category.thumbUrl}
                                         alt={category.name}
                                         style={{
                                             objectFit: 'cover',
                                         }}
                                    />
                                </Box>
                            </AspectRatio>
                            <Flex flex={1}
                                  direction={"column"}
                                  justify={"center"}
                            >
                                <Text padding={"5px"}
                                      textAlign={"center"}
                                >
                                    {category.id === selectedCategory?.id ? `${category.postCount}개의 게시글` : category.name}
                                </Text>
                            </Flex>
                        </Box>
                    ))}
                </Grid>
            )}
            {
                (selectedCategory && floatingActionButtonVisibility) &&
                <FloatingActionPopButton popCategory={popCategory}/>
            }
        </Box>
    );

}


function FloatingActionPopButton({popCategory}) {

    return (
        <IconButton
            icon={<FontAwesomeIcon icon={faArrowLeft}/>}
            colorScheme="blackAlpha"
            aria-label="Go back"
            position="fixed"
            bottom="20px"
            right="20px"
            borderRadius="full"
            size="lg"
            boxShadow="lg"
            onClick={popCategory}
        />
    );

}

export default CategoryList;