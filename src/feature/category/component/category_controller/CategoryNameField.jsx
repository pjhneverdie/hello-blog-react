import {FormControl, FormLabel, FormHelperText, Input} from "@chakra-ui/react";

function CategoryNameField({name, setName}) {

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <FormControl>
            <FormLabel
                fontWeight={"normal"}
            >
                카테고리명
            </FormLabel>
            <Input
                value={name ?? ""}
                onChange={handleChange}
                _focus={{}}
            />
            <FormHelperText
                fontSize={"12.5px"}
            >
                카테고리명은 중복될 수 없습니다.
            </FormHelperText>
        </FormControl>
    );
}

export default CategoryNameField;

