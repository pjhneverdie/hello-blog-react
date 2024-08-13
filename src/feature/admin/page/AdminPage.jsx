import {Box, Center, Flex} from "@chakra-ui/react";
import AdminPageSide from "../component/AdminPageSide";
import CategoryController from "../component/CategoryController";

function AdminPage() {
    return (
        <Flex direction={"row"} justify={"stretch"} width={"100%"} height={"100%"}>
            <AdminPageSide/>
            <Box width={"80%"} height={"100%"} paddingLeft={"80px"}>
                <Center>
                    <CategoryController/>
                </Center>
            </Box>
        </Flex>
    );
}

export default AdminPage