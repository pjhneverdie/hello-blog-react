import {Flex, FormLabel, Input} from "@chakra-ui/react";
import React from "react";

function PostTitleField({isExpanded, title, setTitle}) {
    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleClick = (event) => {
        event.stopPropagation();
    };

    return (
        <Flex direction={"column"}>
            {
                isExpanded ?
                    <FormLabel fontWeight={"normal"}>
                        제목
                    </FormLabel> :
                    null
            }
            <Input
                placeholder="Title"
                value={title ?? ""}
                onChange={handleChange}
                _focus={{}}
                onClick={handleClick}
            />
        </Flex>
    );
}

export default PostTitleField;