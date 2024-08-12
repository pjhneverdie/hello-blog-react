import {Box, Flex} from "@chakra-ui/react";

function Divider() {
    return (
        <Flex direction={"column"}>
            <Box width="100%" height="1px" boxShadow="0 0 0 0.5px black"/>
            <Box height={"10px"}/>
            <Box width="100%" height="1px" boxShadow="0 0 0 0.5px black"/>
        </Flex>
    );
}

export default Divider