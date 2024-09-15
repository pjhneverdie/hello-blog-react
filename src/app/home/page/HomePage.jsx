import React, {useEffect, useState} from "react";

import {Box, Divider, Flex, Grid, useBreakpointValue} from "@chakra-ui/react";

import HomeTabs from "../component/HomeTabs";
import HomeHeader from "../component/HomeHeader";
import HomeFooter from "../component/HomeFooter";

function HomePage() {

    const homePaddingX = useBreakpointValue({base: "0px", md: "0px", lg: "20px"});
    const homeTabsWidth = useBreakpointValue({base: "95%", md: "95%", lg: "100%"});

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {

        setScrollY(window.scrollY);

    };

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    const translateYValue = Math.min(scrollY / 10, window.innerHeight / 2);

    return (
        <Flex direction={"column"}
              justify={"center"}
              align={"center"}
              width={"100%"}
              height={"100%"}
        >
            <BlankArea/>
            <Box height={"15px"}/>
            <Flex paddingX={homePaddingX}
                  direction={"column"}
                  justify={"center"}
                  maxWidth={"1200px"}
                  width={"100%"}
                  height={"100%"}
            >
                <HomeHeader/>
                <Box height={"5px"}/>
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
                            <Box width={homeTabsWidth}>
                                <HomeTabs/>
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
                                <Divider orientation={"vertical"}
                                         borderWidth={"1px"}
                                />
                                <Box paddingLeft={"20px"}
                                     height={"100%"}
                                >
                                    <Box position="sticky"
                                         top="5"
                                         style={{
                                             transform: `translateY(${translateYValue}px)`,
                                             transition: "transform 0.3s ease-out",
                                         }}
                                    >
                                        <HomeFooter/>
                                    </Box>
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

    const blankAreaHeight = useBreakpointValue({base: "0px", md: "0px", lg: "110px"});

    const styles = {
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='58' viewBox='0 0 42 58'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M12 18h12v18h6v4H18V22h-6v-4zm-6-2v-4H0V0h36v6h6v36h-6v4h6v12H6v-6H0V16h6zM34 2H2v8h24v24h8V2zM6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2 50h32v-8H10V18H2v32zm28-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'/%3E%3C/g%3E%3C/svg%3E\")"
    };

    return (
        <Box
            width={"100%"}
            height={blankAreaHeight}
            background={"#f8f8f8"}
            backgroundImage={styles.backgroundImage}
        />
    );
}

export default HomePage;

