import {FormControl, FormLabel, Input} from "@chakra-ui/react";


function PostCategoryField({categoryId, setCategoryId}) {
    const handleChange = (e) => {
        setCategoryId(e.target.value);
    };

    return (
        <FormControl>
            <FormLabel
                fontWeight={"normal"}
            >
                카테고리
            </FormLabel>
            <Input
                value={categoryId ?? ""}
                onChange={handleChange}
                _focus={{}}
            />
        </FormControl>
    );
}

export default PostCategoryField;