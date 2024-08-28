import React from "react";

import {Tab, TabList, TabPanel, TabPanels, Tabs, Box, Text, useBreakpointValue} from "@chakra-ui/react";

function HomeTabBar() {

    const homeTabFontSize = useBreakpointValue({base: "10px", md: "13.5px", lg: "13.5px"});
    const homeTabGap = useBreakpointValue({base: "10px", md: "25px", lg: "25px"});

    return (
        <Tabs variant="soft-rounded" colorScheme="red" width={"100%"}>
            <TabList>
                <Tab marginRight={homeTabGap}
                     _focus={{}}
                >
                    <Text fontSize={homeTabFontSize}>
                        Recent
                    </Text>
                </Tab>
                <Tab fontSize={homeTabFontSize}
                     _focus={{}}
                >
                    <Text fontSize={homeTabFontSize}>
                        Category
                    </Text>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Box>
                        {Array.from({length: 50}, (_, i) => (
                            <p key={i}>Post {i + 1}</p>
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box>
                        {Array.from({length: 50}, (_, i) => (
                            <p key={i}>Category {i + 1}</p>
                        ))}
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default HomeTabBar;
