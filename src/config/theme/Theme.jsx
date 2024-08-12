import {extendTheme} from "@chakra-ui/react"

export const theme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                margin: 0,
            },
        },
    },
    fonts: {
        heading: "inherit",
        body: "inherit",
    },
})