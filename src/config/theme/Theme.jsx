import {extendTheme} from '@chakra-ui/react'

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
}

export const chakraTheme = extendTheme({config});

export const commonTheme = {
    orange: "#e78413",
    white: "#ffffff",
    blue: "#63b3ed",
}

export const lightTheme = {
    primaryWhite: "#f7f7f8",
    secondaryWhite: "#EEEEEE",
    thirdWhite: "#d8d5d5",
    primaryBlack: "#1e1e1e",
    secondaryBlack: "#6C6C6C",
}

export const darkTheme = {
    primaryWhite: "#DADADB",
    secondaryWhite: "#C4C4C5",
    thirdWhite: "#9B9C9D",
    primaryBlack: "#1d1e20",
    secondaryBlack: "#2E2E33",
    thirdBlack: "#343434",
}
