import {Button, Text} from "@chakra-ui/react";
import React from "react";

function PostSubmitButton({label, onTap}) {

    const handleClick = (event) => {
        event.stopPropagation();
        onTap();
    };

    return (
        <Button
            width={"55px"}
            height={"37.5px"}
            bg={"#e78413"}
            borderRadius={"3.5px"}
            _hover={{bgColor: "#cf7000"}}
            _active={{bgColor: "#b65f00"}}
            _focus={{}}
            onClick={handleClick}
        >
            <Text fontSize={"15px"} color={"white"}>
                {label}
            </Text>
        </Button>
    );
}

export default PostSubmitButton;