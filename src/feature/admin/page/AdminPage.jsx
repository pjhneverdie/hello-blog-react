import React, {useState} from 'react';
import {Flex} from "@chakra-ui/react";
import AdminPageSide from "../component/AdminPageSide";
import EditorPage from "./EditorPage";

function AdminPage() {
    const [selectedPage, setSelectedPage] = useState("edit");

    return (
        <Flex direction={"row"} width={"100vw"} height={"100vh"}>
            <AdminPageSide setSelectedPage={setSelectedPage}/>
            {selectedPage === "edit" && <EditorPage/>}
        </Flex>
    );
}

export default AdminPage;
