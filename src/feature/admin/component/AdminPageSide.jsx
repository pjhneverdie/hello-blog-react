import React from 'react';
import {Box, Center, Flex, IconButton, Text, useDisclosure, VStack} from '@chakra-ui/react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faC, faDoorOpen, faFeatherPointed} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function AdminPageSide() {
    const {isOpen, onToggle} = useDisclosure({defaultIsOpen: true});
    const navigate = useNavigate();

    const pop = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <Flex>
            <Box pos="fixed"
                 left="0"
                 top="0"
                 paddingY={"25px"}
                 minWidth="80px"
                 width={isOpen ? "15%" : "5%"}
                 height="100%"
                 bg="gray.800"
                 color="white"
                 transition="width 0.5s"
            >
                <Flex display="flex"
                      flexDirection="column"
                      align="center"
                      height="100%"
                >
                    <IconButton aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                                icon={isOpen ? <Text fontFamily="OldLondon">close</Text> :
                                    <Text fontFamily="OldLondon">open</Text>}
                                onClick={onToggle}
                                mb="4"
                                variant="outline"
                                colorScheme="whiteAlpha"
                    />
                    <Box mt="4"
                         transition="height 0.5s ease, opacity 0.5s ease"
                         opacity={isOpen ? 1 : 0}
                         width={"100%"}
                         height={"100%"}
                    >
                        <VStack width="100%" height={"100%"}>
                            <Flex direction={"column"} justify={"space-between"} height={"100%"}>
                                <Flex direction={"column"}>
                                    <Box width="100%"
                                         paddingX={"10px"}
                                         paddingY={"10px"}
                                         _hover={{
                                             bg: "gray.600",
                                             borderRadius: "10px",
                                             transition: "background-color 0.3s"
                                         }}
                                         cursor="pointer"
                                         borderRadius="10px"
                                    >
                                        <Center>
                                            <FontAwesomeIcon icon={faFeatherPointed} fontSize={"25px"}
                                                             cursor="pointer"/>
                                        </Center>
                                    </Box>
                                    <Box width="100%"
                                         paddingY={"10px"}
                                         _hover={{
                                             bg: "gray.600",
                                             borderRadius: "10px",
                                             transition: "background-color 0.3s"
                                         }}
                                         cursor="pointer"
                                         borderRadius="10px"
                                    >
                                        <Center>
                                            <FontAwesomeIcon icon={faC} fontSize={"25px"} cursor="pointer"/>
                                        </Center>
                                    </Box>
                                </Flex>
                                <Box width="100%"
                                     paddingX={"10px"}
                                     paddingY={"10px"}
                                     _hover={{
                                         bg: "gray.600",
                                         borderRadius: "10px",
                                         transition: "background-color 0.3s"
                                     }}
                                     cursor="pointer"
                                     onClick={pop}
                                     borderRadius="10px"
                                >
                                    <Center>
                                        <FontAwesomeIcon icon={faDoorOpen} fontSize={"25px"}/>
                                    </Center>
                                </Box>
                            </Flex>
                        </VStack>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
}

export default AdminPageSide;
