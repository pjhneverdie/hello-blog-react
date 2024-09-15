import React, {useState} from "react";

import {Button, Spinner, Text} from "@chakra-ui/react";

function PostSubmitButton({label, onTap}) {

    const [isLoading, setIsLoading] = useState(false);

    async function handleClick(event) {

        event.stopPropagation();

        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        await onTap();

        setIsLoading(false);

    }

    return (
        <Button width={"55px"}
                height={"37.5px"}
                bg={"#e78413"}
                borderRadius={"3.5px"}
                _hover={{bgColor: "#cf7000"}}
                _active={{bgColor: "#b65f00"}}
                _focus={{}}
                onClick={handleClick}
        >

            {isLoading ? (
                <Spinner size="sm"
                         color="white"
                />
            ) : (
                <Text fontSize={"15px"} color={"white"}>
                    {label}
                </Text>
            )}
        </Button>
    );

}

export default PostSubmitButton;