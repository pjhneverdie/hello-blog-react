import React from "react";

import {Flex, Input, FormLabel} from "@chakra-ui/react";

function PostTitleField({isExpanded, title, setTitle}) {

    function handleChangeTitle  (e)  {

        setTitle(e.target.value);

    };

    function handleClick (event) {

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
            <Input placeholder="Title"
                   value={title ?? ""}
                   onChange={handleChangeTitle}
                   _focus={{}}
                   onClick={handleClick}
            />
        </Flex>
    );
}

export default PostTitleField;