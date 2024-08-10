import {Box, Flex} from "@chakra-ui/react"
import HomeFooter from "../component/HomeFooter";
import HomeTabBar from "../component/HomeTabBar";
import HomeHeader from "../component/HomeHeader";
import MyLinks from "../component/MyLinks";

function HomePage() {
    return (
        <Flex direction="column" justify="center" align="stretch" width={"100%"} height={"100%"}>
            <Box paddingX={"25px"}>
                <HomeHeader/>
            </Box>
            <Box paddingTop={"10px"}>
                <MyLinks/>
            </Box>
            <Box paddingX={"25px"}>
                <HomeTabBar/>
            </Box>
            <Box paddingX={"25px"}>
                <HomeFooter/>
            </Box>
        </Flex>
    );
}

export default HomePage;