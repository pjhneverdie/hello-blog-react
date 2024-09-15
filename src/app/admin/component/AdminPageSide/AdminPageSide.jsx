import React from 'react';

import {useNavigate} from "react-router-dom";

import {Box, Flex, VStack, IconButton} from '@chakra-ui/react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {faEtsy} from "@fortawesome/free-brands-svg-icons";

function AdminPageSide({setSelectedPage}) {

    const [isOpen, setIsOpen] = React.useState(true);

    const navigate = useNavigate();
    const pop = () => {

        if (isOpen) {
            navigate("/");
        }

    };

    const toggleSidebar = () => {

        setIsOpen(!isOpen);

    };

    return (
        <Flex paddingY={"25px"}
              direction={"column"}
              align={"center"}
              minW={"60px"}
              width={isOpen ? "15%" : "5%"}
              height={"100%"}
              bg={"gray.800"}
              color={"white"}
              transition="width 0.5s"
        >
            <IconButton aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                        variant="outline"
                        icon={isOpen ? <FontAwesomeIcon icon={faEyeSlash}/> :
                            <FontAwesomeIcon icon={faEye}/>}
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
                         _hover={isOpen ? {
                             bg: "gray.600",
                             borderRadius: "10px",
                             transition: "background-color 0.3s"
                         } : {}}
                         cursor={isOpen ? "pointer" : "default"}
                         onClick={() => isOpen && setSelectedPage("edit")}
                    >
                        <FontAwesomeIcon icon={faEtsy} fontSize={"25px"}/>
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
                 _hover={isOpen ? {
                     bg: "gray.600",
                     borderRadius: "10px",
                     transition: "background-color 0.3s"
                 } : {}}
                 cursor={isOpen ? "pointer" : "default"}
                 onClick={pop}
            >
                <FontAwesomeIcon icon={faDoorOpen} fontSize={"25px"}/>
            </Box>
        </Flex>
    );

}

export default AdminPageSide;

