import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Progress,
    Text
} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

import {checkIsValidEmail} from "../../../common/util/emailValidator";
import {ProfileContext} from "../../../config/profile/ProfileContext";
import {useAuth} from "../AuthContext";

function AuthModal(props) {
    /**
     * 프로필 데이터
     */
    const profile = useContext(ProfileContext);

    /**
     * 로그인 <-> 회원가입 폼 토글
     */
    const [isLoginForm, setIsLoginForm] = useState(true);

    /**
     * 로딩 여부
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * 아이디, 비밀번호 컨트롤러
     */
    const idRef = useRef(null);
    const passwordRef = useRef(null);

    /**
     * 로그인 콘텍스트
     */
    const {sign} = useAuth();

    function toggleForm() {
        setIsLoginForm(!isLoginForm);
    }

    function validateForm() {
        const email = idRef.current.value;
        const password = passwordRef.current.value;

        if (!checkIsValidEmail(email)) {
            idRef.current.setCustomValidity('유효한 이메일 주소를 입력하세요.');
            idRef.current.reportValidity();
            return false;
        }

        if (password.length < 6) {
            passwordRef.current.setCustomValidity('비밀번호는 최소 6자 이상이어야 합니다.');
            passwordRef.current.reportValidity();
            return false;
        }

        return true;
    }

    const handleIdKeyDown = (event) => {
        idRef.current.setCustomValidity("");

        if (event.key === "Enter") {
            passwordRef.current.focus();
        }
    }

    const handlePasswordDown = async (event) => {
        passwordRef.current.setCustomValidity("");

        if (event.key === "Enter") {
            if (validateForm()) {
                setIsLoading(true);

                const result = await sign(idRef.current.value, passwordRef.current.value, isLoginForm ? "signIn" : "signUp");

                setIsLoading(false);

                if (result) {
                    props.setIsModalOpen(false);
                }
            }
        }
    }

    useEffect(() => {
        setIsLoginForm(true);
    }, [props.isOpen]);

    if (!props.isOpen) return null;

    return (
        <Box position="fixed"
             top="10px" right="20px"
             width="300px"
             bg="#22191b" borderRadius="10px"
             pl="15px" pr="15px"
        >
            <Flex direction="column" justify="start" align="stretch" height="100%"
            >
                <Box h="15px"/>
                <Header isLoginForm={isLoginForm} toggleForm={toggleForm} profile={profile}/>
                <Box h="10px"/>
                {isLoading ? <Progress size='xs' isIndeterminate/> : <Progress size='xs' value={0}/>}
                <Box h="10px"/>
                <AuthForm idRef={idRef} passwordRef={passwordRef} onIdKeyDown={handleIdKeyDown}
                          onPasswordKeyDown={handlePasswordDown}
                />
                <Box h="18.5px"/>
            </Flex>
        </Box>
    );
}

function Header(props) {
    return (
        <Flex direction="column">
            <Text fontSize="15px" color="#fde8ed">
                이메일을 사용해 {props.profile.host}에 <Text as="span" fontSize="15px" fontWeight="extrabold">
                {props.isLoginForm ? "로그인" : "회원가입"}
            </Text>
            </Text>
            <Box h="6.5px"/>
            <Flex direction="row" justify="start" align="start">
                <Text fontSize="12.5px" color="#fde8ed">
                    {props.isLoginForm ? "아직 회원이 아니신가요?" : "회원이신가요?"}
                </Text>
                <Box w="10px"/>
                <Text fontSize="12.5px" color="#fde8ed" fontWeight="bold"
                      cursor="pointer" _hover={{color: "#fde8ed"}}
                      onClick={props.toggleForm}
                >
                    {props.isLoginForm ? "회원가입" : "로그인"}
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
                    children={<FontAwesomeIcon icon={faEnvelope} color="#fde8ed"/>}
                />
                <Input ref={idRef} color="#fde8ed"
                       placeholder="이메일" _placeholder={{color: "#fde8ed"}}
                       onKeyDown={onIdKeyDown}
                />
            </InputGroup>
            <Box h="10px"/>
            <InputGroup>
                <InputLeftElement
                    children={<FontAwesomeIcon icon={faLock} color="#fde8ed"/>}
                />
                <Input type={"password"} ref={passwordRef} color="#fde8ed"
                       placeholder="비밀번호" _placeholder={{color: "#fde8ed"}}
                       onKeyDown={onPasswordKeyDown}
                />
            </InputGroup>
        </Flex>
    );
}

export default AuthModal;