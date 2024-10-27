import React, {useEffect} from "react";

import {
    Box,
    Grid,
    Skeleton,
    IconButton,
    AspectRatio,
    useBreakpointValue, useColorModeValue
} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faDoorOpen} from "@fortawesome/free-solid-svg-icons";

import {useCategoryApi} from "../../hook/useCategoryApi";
import {commonTheme, darkTheme, lightTheme} from "../../../../config/theme/Theme";
import CategoryCard from "../CategoryCard/CategoryCard";

function CategoryList({categories, setCategories, selectedCategory, handleSelectCategory, popCategory}) {

    const popButtonVisibility = useBreakpointValue({base: false, sm: true, md: true, lg: true});
    const floatingActionButtonVisibility = useBreakpointValue({base: true, sm: false, md: false, lg: false});

    const startSkeletonColor = useColorModeValue(lightTheme.secondaryBlack, darkTheme.secondaryBlack);
    const endSkeletonColor = useColorModeValue(lightTheme.secondaryWhite, darkTheme.thirdBlack);

    const {isLoading, getRootCategories, getSubCategories} = useCategoryApi();

    useEffect(() => {
        const handleGetRootCategories = async () => {
            if (categories.length === 0) {
                const rootCategories = await getRootCategories();

                if (rootCategories.length !== 0) {
                    setCategories(rootCategories);
                }
            }
        };

        handleGetRootCategories();
    }, [categories]);

    useEffect(() => {
        const handleGetSubCategories = async () => {
            if (selectedCategory) {
                const subCategories = await getSubCategories(selectedCategory.id);

                setCategories(subCategories);
            }
        };

        handleGetSubCategories();
    }, [selectedCategory]);

    return (
        <Box marginTop={"15px"}
             width={"100%"}
             height={"100%"}
        >
            {isLoading ? (
                <Grid templateColumns={"repeat(auto-fill, minmax(200px, 1fr))"}
                      gap={4}
                >
                    {Array(6).fill("").map((_, index) => (
                        <AspectRatio key={index}
                                     ratio={16 / 9}
                        >
                            <Skeleton startColor={startSkeletonColor}
                                      endColor={endSkeletonColor}
                                      height={"200px"}
                                      borderRadius={"lg"}
                            />
                        </AspectRatio>
                    ))}
                </Grid>
            ) : (
                <Grid templateColumns={"repeat(auto-fill, minmax(200px, 1fr))"}
                      gap={4}
                >
                    {(selectedCategory && popButtonVisibility) && (
                        <PopButton popCategory={popCategory}/>
                    )}
                    {categories.map((category) => (
                        category.id === selectedCategory?.id && selectedCategory.postCount === 0 ? null :
                            <CategoryCard key={category.id}
                                          category={category}
                                          selectedCategory={selectedCategory}
                                          handleSelectCategory={handleSelectCategory}
                            />
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

function PopButton({popCategory}) {

    const popButtonBorderColor = useColorModeValue(commonTheme.orange, commonTheme.blue);
    const popButtonIconColor = useColorModeValue(commonTheme.orange, commonTheme.blue);

    return (
        <Box display={"flex"}
             flexDirection={"column"}
             justifyContent={"center"}
             alignItems={"center"}
             border={`1px solid ${popButtonBorderColor}`}
             borderRadius={"lg"}
             cursor={"pointer"}
             onClick={popCategory}
        >
            <FontAwesomeIcon icon={faDoorOpen}
                             color={popButtonIconColor}
                             fontSize={"25px"}
            />
        </Box>
    );

}

function FloatingActionPopButton({popCategory}) {

    const popButtonBg = useColorModeValue(lightTheme.primaryBlack, darkTheme.secondaryBlack);
    const popButtonIconColor = useColorModeValue(lightTheme.primaryWhite, darkTheme.primaryWhite);

    return (
        <IconButton icon={
            <FontAwesomeIcon icon={faArrowLeft}
                             color={popButtonIconColor}
            />
        }
                    position={"fixed"}
                    bottom={"20px"}
                    right={"20px"}
                    bg={popButtonBg}
                    size={"lg"}
                    borderRadius={"full"}
                    aria-label={"back"}
                    onClick={popCategory}
        />
    );

}

export default CategoryList;