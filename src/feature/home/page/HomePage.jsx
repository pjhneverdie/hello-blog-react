import {Box, Center, Divider, Flex, Grid, useBreakpointValue} from "@chakra-ui/react";
import HomeFooter from "../component/HomeFooter";
import HomeTabBar from "../component/HomeTabBar";
import HomeHeader from "../component/HomeHeader";
import MyLinks from "../component/MyLinks";
import React from "react";

function HomePage() {

    const homeTabBarWidth = useBreakpointValue({base: "95%", md: "80%", lg: "100%"});
    const homePaddingX = useBreakpointValue({base: "0px", md: "0px", lg: "20px"});

    return (
        <Flex direction={"column"}
              justify={"center"}
              align={"center"}
              width={"100%"}
              height={"100%"}
        >
            <BlankArea/>
            <Flex paddingX={homePaddingX}
                  direction={"column"}
                  justify={"center"}
                  maxWidth={"1200px"}
                  width={"100%"}
                  height={"100%"}
            >
                <HomeHeader/>
                <Box>
                    <Grid templateColumns={{
                        base: "1fr",
                        md: "1fr",
                        lg: "70% 30%",
                    }}
                          height="100vh"
                    >
                        <Flex paddingTop={"20px"}
                              direction={"column"}
                              justify="stretch"
                              align="center"
                              width="100%"
                              height="100%"
                        >
                            <Box width={homeTabBarWidth}>
                                <HomeTabBar/>
                            </Box>
                        </Flex>
                        <Box height="100%"
                             display={{
                                 base: "none",
                                 md: "none",
                                 lg: "block",
                             }}
                        >
                            <Flex paddingTop={"20px"}
                                  direction={"row"}
                                  align={"start"}
                                  height="100%"
                            >
                                <Box width={"1.25px"}
                                     height={"100%"}
                                     background={"blackAlpha.500"}
                                />
                                <Box paddingLeft={"40px"}>
                                    <Center>
                                        <HomeFooter/>
                                    </Center>
                                </Box>
                            </Flex>
                        </Box>
                    </Grid>
                </Box>

            </Flex>
        </Flex>
    );
}

function BlankArea() {
    const blankAreaHeight = useBreakpointValue({base: "0px", md: "0px", lg: "92.5px"});

    return (
        <Box
            width={"100%"}
            height={blankAreaHeight}
            background={"#f8f8f8"}
            borderBottom={"1.25px solid"}
            borderColor={"blackAlpha.200"}
        />
    );
}

export default HomePage;

