import React, {useState} from 'react';

import {Flex} from "@chakra-ui/react";

import BoardControlPage from "./BoardControlPage";
import AdminPageSide from "../component/AdminPageSide/AdminPageSide";

function AdminPage() {

    const [selectedPage, setSelectedPage] = useState("edit");

    return (
        <Flex direction={"row"}
              width={"100vw"}
              height={"100vh"}
        >
            <AdminPageSide setSelectedPage={setSelectedPage}/>
            {selectedPage === "edit" && <BoardControlPage/>}
        </Flex>
    );

}

export default AdminPage;
