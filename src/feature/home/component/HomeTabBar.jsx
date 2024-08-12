import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import React from "react";

function HomeTabBar() {
    return (
        <Tabs variant="line" width={"100%"}>
            <TabList>
                <Tab mr={"25px"}
                     fontSize={"17.5px"}
                     borderBottom={"1px"}
                     _selected={{color: "black", borderBottom: "1px solid black"}}
                     _focus={{boxShadow: "none"}}
                >
                    Recent
                </Tab>
                <Tab fontSize={"17.5px"}
                     display="inline-flex"
                     borderBottom={"1px"}
                     _selected={{color: "black", borderBottom: "1px solid black"}}
                     _focus={{boxShadow: "none"}}
                >
                    Category
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>

    );
}

export default HomeTabBar