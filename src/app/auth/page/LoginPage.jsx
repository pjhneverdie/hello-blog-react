import React, {useState, useRef} from "react";

import {
    Box,
    Flex,
    Text,
    Progress,
    InputGroup, InputLeftElement, Input, useColorMode
} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

import {useAuth} from "../AuthContext";
import {commonTheme} from "../../../config/theme/Theme";

function LoginPage() {

    const varForUI = {
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23edf2f7' fill-opacity='1'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    };

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

    return (
        <Box display={"flex"}
             flexDirection={"column"}
             justifyContent={"center"}
             alignItems={"center"}
             backgroundImage={varForUI.backgroundImage}
             width={"100vw"}
             height={"100vh"}
        >
            <Flex direction={"column"}
                  justifyContent={"center"}
                  alignItems={"stretch"}
                  px={"10px"}
                  bg={"white"}
                  width={"100%"}
                  maxW={"500px"}
                  borderWidth={"2px"}
                  borderRadius={"lg"}
            >
                <Box h={"15px"}/>
                <AuthModalHeader/>
                <Box h={"10px"}/>
                {isLoading ? <Progress size={"xs"}
                                       isIndeterminate
                                       colorScheme={"orange"}
                /> : <Progress value={0}
                               size={"xs"}
                />}
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
            <Text fontSize={"15px"}>
                이메일을 사용해 로그인
            </Text>
            <Box height={"6.5px"}/>
            <Flex direction={"row"}
                  justifyContent={"start"}
                  alignItems={"start"}
            >
                <Text fontSize={"12.5px"}>
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
                    children={
                        <FontAwesomeIcon icon={faEnvelope}
                                         color={commonTheme.orange}
                        />
                    }
                />
                <Input ref={idRef}
                       placeholder={"이메일"}
                       onKeyDown={onIdKeyDown}
                       _focus={
                           {
                               borderColor: commonTheme.orange
                           }
                       }
                />
            </InputGroup>
            <Box h={"10px"}/>
            <InputGroup>
                <InputLeftElement
                    children={
                        <FontAwesomeIcon icon={faLock}
                                         color={commonTheme.orange}
                        />
                    }
                />
                <Input ref={passwordRef}
                       type={"password"}
                       placeholder={"비밀번호"}
                       onKeyDown={onPasswordKeyDown}
                       _focus={
                           {
                               borderColor: commonTheme.orange
                           }
                       }
                />
            </InputGroup>
        </Flex>
    );

}

export default LoginPage;