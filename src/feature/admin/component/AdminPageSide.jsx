import React from 'react';
import {Box, Flex, IconButton, Text, VStack} from '@chakra-ui/react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faC, faDoorOpen, faFeatherPointed, faHome} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function AdminPageSide({setSelectedPage}) {
    /**
     * 사이드바 토글
     */
    const [isOpen, setIsOpen] = React.useState(true);

    /**
     * 라우팅
     */
    const navigate = useNavigate();
    const pop = () => {
        navigate(-1);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Flex
            direction={"column"}
            align={"center"}
            paddingY={"25px"}
            minW={"60px"}
            width={isOpen ? "15%" : "5%"}
            height={"100%"}
            transition="width 0.5s"
            bg={"gray.800"}
            color={"white"}
        >
            <IconButton aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                        variant="outline"
                        icon={isOpen ? <Text fontFamily="OldLondon">close</Text> :
                            <Text fontFamily="OldLondon">open</Text>}
                        onClick={toggleSidebar}
                        color={"white"}
                        _hover={{
                            bg: "gray.600",
                            transition: "background-color 0.3s"
                        }}
                        _focus={{
                            outline: "none",
                            boxShadow: "none"
                        }}
            />
            <Box height={"25px"}/>
            <Box flex="1"
                 opacity={isOpen ? 1 : 0}
                 transition="opacity 0.5s"
            >
                <VStack>
                    <Box paddingX={"10px"}
                         paddingY={"10px"}
                         width="50px"
                         height="50px"
                         display="flex"
                         alignItems="center"
                         justifyContent="center"
                         borderRadius="10px"
                         _hover={{
                             bg: "gray.600",
                             borderRadius: "10px",
                             transition: "background-color 0.3s"
                         }}
                         cursor="pointer"
                         onClick={() => setSelectedPage("edit")}
                    >
                        <FontAwesomeIcon icon={faFeatherPointed} fontSize={"25px"}/>
                    </Box>
                </VStack>
            </Box>
            <Box width={"50px"}
                 height={"50px"}
                 paddingX={"10px"}
                 paddingY={"10px"}
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
                 opacity={isOpen ? 1 : 0}
                 transition="opacity 0.5s"
                 borderRadius="10px"
                 _hover={{
                     bg: "gray.600",
                     borderRadius: "10px",
                     transition: "background-color 0.3s"
                 }}
                 cursor="pointer"
                 onClick={pop}
            >
                <FontAwesomeIcon icon={faDoorOpen} fontSize={"25px"}/>
            </Box>
        </Flex>
    );
}

export default AdminPageSide;
