import {Box, Center, Divider, Flex, Grid} from "@chakra-ui/react";
import HomeFooter from "../component/HomeFooter";
import HomeTabBar from "../component/HomeTabBar";
import HomeHeader from "../component/HomeHeader";
import MyLinks from "../component/MyLinks";
import React from "react";

function HomePage() {
    return (
        <Flex direction="column" justify="center" align="stretch" width="100%" height="100%">
            <Box paddingX="25px">
                <HomeHeader/>
            </Box>
            <MyLinks/>
            <Box paddingX="60px">
                <Grid
                    templateColumns={{
                        base: "1fr",
                        md: "1fr",
                        lg: "70% 30%",
                    }}
                    height="100vh"
                >
                    <Box height="100%" paddingRight={"75px"}>
                        <Box paddingTop={"35px"}>
                            <Center>
                                <HomeTabBar/>
                            </Center>
                        </Box>
                    </Box>
                    <Box height="100%"
                         display={{
                             base: "none", // 작은 화면에서는 숨김
                             md: "none",   // 중간 크기에서는 숨김
                             lg: "block",  // 큰 화면에서만 표시
                         }}
                    >
                        <Flex direction={"row"} align={"start"} height="100%">
                            <Divider orientation="vertical"/>
                            <Box paddingLeft={"40px"} paddingTop={"35px"}>
                                <Center>
                                    <HomeFooter/>
                                </Center>
                            </Box>
                        </Flex>
                    </Box>
                </Grid>
            </Box>
        </Flex>
    );
}

export default HomePage;
