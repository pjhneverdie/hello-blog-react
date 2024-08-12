import {Box, Center, Flex, Grid} from "@chakra-ui/react"
import HomeFooter from "../component/HomeFooter";
import HomeTabBar from "../component/HomeTabBar";
import HomeHeader from "../component/HomeHeader";
import MyLinks from "../component/MyLinks";
import Divider from "../component/Divider";

function HomePage() {
    return (
        <Flex direction="column" justify="center" align="stretch" width={"100%"} height={"100%"}>
            <Box paddingX={"25px"}>
                <HomeHeader/>
            </Box>
            <Box paddingTop={"10px"}>
                <MyLinks/>
            </Box>
            <Box paddingX={"25px"} paddingY={"20px"}>
                <Divider/>
            </Box>
            <Box paddingX={"25px"}>
                <Grid
                    templateColumns={{base: "1fr", lg: "1fr 2fr 1fr"}}
                    gap={4}
                    height="100vh"
                    paddingX={{base: "20px", lg: "0px"}}
                >
                    <Box
                        height="100%"
                        boxShadow="0 0 0 0.5px black"
                        display={{base: "none", lg: "block"}}
                    >
                        <Center>
                            Left Content
                        </Center>

                    </Box>
                    <Box height="100%">
                        <Center>
                            <HomeTabBar/>
                        </Center>
                    </Box>
                    <Box
                        height="100%"
                        boxShadow="0 0 0 0.5px black"
                        display={{base: "none", lg: "block"}}
                    >
                        <Center>
                            Right Content
                        </Center>
                    </Box>
                </Grid>
                <Box paddingX={"25px"}>
                    <HomeFooter/>
                </Box>
            </Box>
        </Flex>
    );
}


export default HomePage;