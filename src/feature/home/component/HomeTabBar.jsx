import {Divider, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import React from "react";

function HomeTabBar() {
    return (
        <Tabs variant="soft-rounded" colorScheme="red" width={"100%"}>
            <TabList>
                <Tab mr={"25px"}
                     fontSize={"13.5px"}
                >
                    Recent
                </Tab>
                <Tab fontSize={"13.5px"}
                >
                    Category
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Divider/>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <Divider/>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>

    );
}

export default HomeTabBar