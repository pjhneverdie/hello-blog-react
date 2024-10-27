import {AspectRatio, Box, Image, Text, useColorModeValue} from "@chakra-ui/react";

import {commonTheme, darkTheme, lightTheme} from "../../../../config/theme/Theme";

function CategoryCard({category, selectedCategory, handleSelectCategory}) {

    const categoryCardBg = useColorModeValue(commonTheme.white, darkTheme.secondaryBlack);
    const categoryCardBorderColor = useColorModeValue(lightTheme.thirdWhite, darkTheme.thirdBlack);

    const categoryNameWeight = useColorModeValue("semibold", "semibold");

    return (
        <Box key={category.id}
             bg={categoryCardBg}
             borderRadius={"lg"}
             cursor={"pointer"}
             onClick={() => handleSelectCategory(category)}
        >
            <AspectRatio ratio={16 / 9}
                         width={"100%"}
            >
                <Box borderRadius={"lg"}
                     border={`3px solid ${categoryCardBorderColor}`}
                >
                    <Image src={category.thumbUrl}
                           alt={category.name}
                           objectFit={"cover"}
                    />
                    <Box position={"absolute"}
                         bottom={"0"}
                         left={"0"}
                         width={"100%"}
                         bg={"linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.0))"}
                         color={commonTheme.white}
                         padding={"10px"}
                         textAlign={"center"}
                    >
                        <Text fontWeight={categoryNameWeight}>
                            {category.id === selectedCategory?.id ? `${category.postCount}개의 게시글` : category.name}
                        </Text>
                    </Box>
                </Box>
            </AspectRatio>
        </Box>
    );

}

export default CategoryCard;