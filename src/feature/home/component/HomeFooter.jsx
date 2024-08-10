import {Box, Flex, Text} from "@chakra-ui/react"
import {Link} from '@chakra-ui/react'
import {useState, useEffect, useRef} from "react";
import AuthModal from "../../../app/auth/component/AuthModal";

function HomeFooter() {
    /**
     * 로그인 모달 visibility 상태 변수
     */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * 눌러도 로그인 모달이 닫히지 않는 포인트(로그인 버튼, 로그인 모달 자체)
     */
    const whitePoint1 = useRef(null);
    const whitePoint2 = useRef(null);

    /**
     * 로그인 모달 visibility 상태 리스너
     */
    useEffect(() => {
        // 로그인 모달 밖 클릭 시 모달을 닫음
        const onClickOutSideOfAuthModal = (e) => {
            if (
                isModalOpen &&
                whitePoint1.current &&
                whitePoint2.current &&
                !whitePoint1.current.contains(e.target) &&
                !whitePoint2.current.contains(e.target)
            ) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("mousedown", onClickOutSideOfAuthModal);

        return () => {
            document.removeEventListener("mousedown", onClickOutSideOfAuthModal);
        };
    }, [isModalOpen]);

    function signIn() {
        setIsModalOpen(true);
    }

    return (
        <Flex direction="row" justify="center" align="center">
            <Link href="https://github.com/hello-blog-JJ" target="blank" fontSize="15px"
                  color="#6b6b6b" cursor="pointer" _hover={{color: "#000"}}
            >
                &copy; https://github.com/hello-blog-JJ. All rights reserved.
            </Link>
            <Box width="10px"/>
            <Text fontSize="15px" color="#6b6b6b" cursor="pointer" _hover={{color: "#000"}}
                  ref={whitePoint1} onClick={signIn}
            >
                로그인
            </Text>
            <Box ref={whitePoint2}>
                <AuthModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </Box>

        </Flex>
    );
}

export default HomeFooter;