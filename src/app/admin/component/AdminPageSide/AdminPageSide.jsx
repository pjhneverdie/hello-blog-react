import {useState} from 'react';

import {useNavigate} from "react-router-dom";

import {Box, Flex, VStack, IconButton} from '@chakra-ui/react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {faEtsy} from "@fortawesome/free-brands-svg-icons";
import {commonTheme, darkTheme} from "../../../../config/theme/Theme";

function AdminPageSide({setSelectedPage}) {

    const [isOpen, setIsOpen] = useState(true);

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
              alignItems={"center"}
              bg={commonTheme.orange}
              backgroundImage="url('https://hello-blog-api-dev-server-bucket.s3.ap-northeast-2.amazonaws.com/profile/boxki.png')"
              backgroundRepeat={"repeat"}
              backgroundSize={"90px 90px"}
              backgroundPosition={"center"}
              width={isOpen ? "15%" : "5%"}
              height={"100%"}
              minW={"60px"}
              color={commonTheme.white}
              transition={"width 0.5s"}
        >
            <IconButton aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                        variant="outline"
                        icon={
                            isOpen ? <FontAwesomeIcon icon={faEyeSlash}/>
                                : <FontAwesomeIcon icon={faEye}/>
                        }
                        color={"white"}
                        _hover={{
                            bg: darkTheme.secondaryBlack,
                            transition: "background-color 0.3s"
                        }}
                        _focus={{
                            outline: "none",
                            boxShadow: "none"
                        }}
                        onClick={toggleSidebar}
            />
            <Box height={"25px"}/>
            <Box flex={"1"}
                 opacity={isOpen ? 1 : 0}
                 transition={"opacity 0.5s"}
            >
                <VStack>
                    <Box paddingX={"10px"}
                         paddingY={"10px"}
                         display={"flex"}
                         alignItems={"center"}
                         justifyContent={"center"}
                         width={"50px"}
                         height={"50px"}
                         borderRadius="10px"
                         _hover={isOpen ? {
                             bg: darkTheme.secondaryBlack,
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
            <Box display="flex"
                 alignItems="center"
                 justifyContent="center"
                 paddingX={"10px"}
                 paddingY={"10px"}
                 width={"50px"}
                 height={"50px"}
                 opacity={isOpen ? 1 : 0}
                 transition="opacity 0.5s"
                 borderRadius="10px"
                 _hover={isOpen ? {
                     bg: darkTheme.secondaryBlack,
                     borderRadius: "10px",
                     transition: "background-color 0.3s"
                 } : {}}
                 cursor={isOpen ? "pointer" : "default"}
                 onClick={pop}
            >
                <FontAwesomeIcon icon={faDoorOpen}
                                 fontSize={"25px"}
                />
            </Box>
        </Flex>
    );

}

export default AdminPageSide;

