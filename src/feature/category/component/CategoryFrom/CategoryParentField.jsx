import {FormControl, Input, FormLabel} from "@chakra-ui/react";

function CategoryParentField({parentId, setParentId}) {

    const handleChange = (e) => {

        setParentId(e.target.value);

    };

    return (
        <FormControl>
            <FormLabel fontWeight={"normal"}>
                상위 카테고리
            </FormLabel>
            <Input value={parentId ?? ""}
                   onChange={handleChange}
                   _focus={{}}
            />
        </FormControl>
    );
}

export default CategoryParentField;