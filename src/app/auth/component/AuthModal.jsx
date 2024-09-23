import React, {useState, useRef} from "react";

import {
    Box,
    Flex,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    Progress,
} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

import {useAuth} from "../AuthContext";

function AuthModal({modalRef, isModalOpen, setIsModalOpen}) {

    const {signIn} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const idRef = useRef(null);
    const passwordRef = useRef(null);

    const handleIdKeyDown = (event) => {
        idRef.current.setCustomValidity("");

        if (event.key === "Enter") {
            passwordRef.current.focus();
        }
    }

    const handlePasswordKeyDown = async (event) => {
        if (event.key === "Enter") {
            setIsLoading(true);

            await signIn(idRef.current.value, passwordRef.current.value);

            setIsLoading(false);
        }
    }

    if (!isModalOpen) return null;

    return (
        <Box ref={modalRef}
             px={"15px"}
             position={"fixed"}
             top={"10px"}
             right={"20px"}
             width={"300px"}
             bg={"#22191b"}
             borderRadius={"10px"}
        >
            <Flex direction={"column"}
                  justify={"start"}
                  align={"stretch"}
                  height={"100%"}
            >
                <Box h={"15px"}/>
                <AuthModalHeader/>
                <Box h={"10px"}/>
                {isLoading ? <Progress size={"xs"} isIndeterminate/> : <Progress size={"xs"} value={0}/>}
                <Box h={"10px"}/>
                <AuthForm idRef={idRef}
                          passwordRef={passwordRef}
                          onIdKeyDown={handleIdKeyDown}
                          onPasswordKeyDown={handlePasswordKeyDown}
                />
                <Box h={"18.5px"}/>
            </Flex>
        </Box>
    );

}

function AuthModalHeader() {

    return (
        <Flex direction={"column"}>
            <Text color={"#fde8ed"}
                  fontSize={"15px"}
            >
                이메일을 사용해
                <Text as={"span"}
                      fontSize={"15px"}
                      fontWeight={"extrabold"}
                >
                    로그인
                </Text>
            </Text>
            <Box h={"6.5px"}/>
            <Flex direction={"row"}
                  justify={"start"}
                  align={"start"}
            >
                <Text fontSize={"12.5px"}
                      color={"#fde8ed"}
                >
                    어드민 페이지입니다. 로그인해 주세요.
                </Text>
            </Flex>
        </Flex>
    );

}


function AuthForm({idRef, passwordRef, onIdKeyDown, onPasswordKeyDown}) {

    return (
        <Flex direction={"column"}>
            <InputGroup>
                <InputLeftElement
                    children={<FontAwesomeIcon icon={faEnvelope}
                                               color={"#fde8ed"}
                    />}
                />
                <Input ref={idRef}
                       color={"#fde8ed"}
                       placeholder={"이메일"}
                       _placeholder={{color: "#fde8ed"}}
                       onKeyDown={onIdKeyDown}
                />
            </InputGroup>
            <Box h={"10px"}/>
            <InputGroup>
                <InputLeftElement
                    children={<FontAwesomeIcon icon={faLock}
                                               color={"#fde8ed"}
                    />}
                />
                <Input ref={passwordRef}
                       type={"password"}
                       color={"#fde8ed"}
                       placeholder={"비밀번호"}
                       _placeholder={{color: "#fde8ed"}}
                       onKeyDown={onPasswordKeyDown}
                />
            </InputGroup>
        </Flex>
    );

}

export default AuthModal;