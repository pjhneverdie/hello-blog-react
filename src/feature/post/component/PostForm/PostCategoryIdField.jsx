import React from "react";

import {Flex, FormLabel, Input} from "@chakra-ui/react";

function PostCategoryIdField({isExpanded, categoryId, setCategoryId}) {
    const handleChange = (e) => {
        setCategoryId(e.target.value);
    };

    const handleClick = (event) => {
        event.stopPropagation();
    };

    return (
        <Flex direction={"column"}>
            {
                isExpanded ?
                    <FormLabel fontWeight={"normal"}>
                        카테고리
                    </FormLabel> :
                    null
            }
            <Input placeholder="Category"
                   value={categoryId}
                   onChange={handleChange}
                   _focus={{}}
                   onClick={handleClick}
            />
        </Flex>
    );
}

export default PostCategoryIdField;