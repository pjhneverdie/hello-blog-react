import {FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";


function PostTitleField({title, setTitle}) {
    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <FormControl>
            <FormLabel
                fontWeight={"normal"}
            >
                제목
            </FormLabel>
            <Input
                value={title ?? ""}
                onChange={handleChange}
                _focus={{}}
            />
        </FormControl>
    );
}

export default PostTitleField;