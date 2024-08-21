import {Flex, FormControl, FormLabel, Input} from "@chakra-ui/react";
import React from "react";


function PostTitleField({isExpanded, title, setTitle}) {
    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <FormControl>
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
            />
        </FormControl>
    );
}

export default PostTitleField;