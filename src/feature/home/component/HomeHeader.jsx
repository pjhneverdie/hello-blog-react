import React, {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faFont, faGear, faGears} from "@fortawesome/free-solid-svg-icons";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Text,
    useDisclosure
} from "@chakra-ui/react";

import {ProfileContext} from "../../../config/profile/ProfileContext";
import {useAuth} from "../../../app/auth/AuthContext";
import {useNavigate} from "react-router-dom";

function HomeHeader() {
    /**
     * 프로필 데이터
     */
    const profile = useContext(ProfileContext);

    /**
     * 로그인 콘텍스트
     */
    const {authState} = useAuth();
    const email = authState?.email;
    const isOwner = authState?.isOwner;

    const {isOpen, onOpen, onClose} = useDisclosure()

    const navigate = useNavigate();
    const pushToAdmin = () => {
        navigate('/admin');
    };

    return (
        <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <Text fontSize={"37.5px"} fontFamily="OldLondon" cursor="pointer"
            >
                {profile.blogName}
            </Text>
            <Flex direction={"row"} justify={"start"} align={"center"}>
                {authState && isOwner ? <FontAwesomeIcon icon={faGears} fontSize={"25px"}
                                                         cursor="pointer" onClick={pushToAdmin}
                /> : null}
                <Box width={"20px"}/>
                <FontAwesomeIcon icon={faBars} fontSize={"25px"} cursor="pointer" onClick={onOpen}
                />
            </Flex>
            <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader>drawer contents</DrawerHeader>
                    <DrawerBody>
                        ㅎㅎㅎ
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
}

export default HomeHeader