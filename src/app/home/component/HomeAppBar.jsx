import {
    Box,
    Flex,
    Text,
    Tabs, Tab, TabList,
    useColorMode, useColorModeValue, useBreakpointValue
} from "@chakra-ui/react";

import {commonTheme, darkTheme, lightTheme} from "../../../config/theme/Theme";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLightbulb as solidLightbulb} from "@fortawesome/free-solid-svg-icons";
import {faLightbulb as regularLightbulb} from "@fortawesome/free-regular-svg-icons";
import {profileConfig} from "../../../config/profile/profile";

function HomeAppBar({actions, handleLeadingClick}) {

    const isUpperThanMd = useBreakpointValue({base: false, md: true})

    return (
        <Flex dir={"row"}
              width={"100%"}
              height={"100%"}
        >
            <Flex dir={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  height={"30px"}
            >
                <Flex dir={"row"}
                      alignItems={"center"}
                      width={"100%"}
                      height={"30px"}
                >
                    <BlogTitle handleLeadingClick={handleLeadingClick}/>
                    <Box width={"7px"}/>
                    <ThemeToggleButton/>
                </Flex>
                {
                    isUpperThanMd && actions ? actions : null
                }
            </Flex>
        </Flex>
    );

}

function BlogTitle({handleLeadingClick}) {

    const titleColor = useColorModeValue(lightTheme.primaryBlack, darkTheme.primaryWhite);

    return (
        <Text color={titleColor}
              fontSize={"2xl"}
              fontWeight={"bold"}
              cursor={"pointer"}
              onClick={handleLeadingClick}
        >
            {profileConfig.blogTitle}
        </Text>
    );

}

function ThemeToggleButton() {

    const {colorMode, toggleColorMode} = useColorMode();

    const iconColor = useColorModeValue(commonTheme.orange, darkTheme.primaryWhite);
    const icon = useColorModeValue(solidLightbulb, regularLightbulb);

    return (
        <FontAwesomeIcon icon={icon}
                         color={iconColor}
                         cursor={"pointer"}
                         onClick={toggleColorMode}
                         fontSize={"1.5rem"}
        />
    );

}

export function Actions({tabIndex, handleTabChange}) {

    const titleColor = useColorModeValue(lightTheme.primaryBlack, darkTheme.primaryWhite);
    const borderColor = useColorModeValue(lightTheme.primaryWhite, darkTheme.secondaryBlack);

    const tabStyles = {
        _selected: {
            borderColor: titleColor,

        },
        paddingLeft: "0px",
        paddingRight: "0px",
    };

    const textStyles = {
        color: titleColor,
        fontSize: "md",
        fontWeight: "semibold"
    };

    return (
        <Tabs borderColor={borderColor}
              index={tabIndex}
              onChange={handleTabChange}
        >
            <TabList>
                <Tab {...tabStyles}>
                    <Text {...textStyles}>Posts</Text>
                </Tab>
                <Box width={"20px"}/>
                <Tab {...tabStyles}>
                    <Text {...textStyles}>Categories</Text>
                </Tab>
                <Box width={"20px"}/>
                <Tab {...tabStyles}>
                    <Text {...textStyles}>About</Text>
                </Tab>
            </TabList>
        </Tabs>
    );

}


export default HomeAppBar;