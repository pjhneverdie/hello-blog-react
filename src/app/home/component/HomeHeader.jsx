import React, {useEffect, useState, useRef} from "react";

import {
    Box,
    Flex,
    Text,
    Divider,
    IconButton,
    Slider, SliderFilledTrack, SliderThumb, SliderTrack,
    useBreakpointValue,
} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faPause, faPlay, faSquarePhone} from "@fortawesome/free-solid-svg-icons";

import {profileConfig} from "../../../config/profile/profile";

function HomeHeader() {

    const showMusicPlayer = useBreakpointValue({base: false, md: false, lg: true});

    return (
        <Flex direction={"column"}
              justify={"start"}
              align={"center"}
              width={"100%"}
        >
            <AdminLinks/>
            <Flex direction={"row"}
                  justify={"center"}
                  align="start"
                  width="100%"
            >
                <Box flex="1">
                    <DateWidget/>
                </Box>
                <Box flex="1">
                    <BlogTitle/>
                </Box>
                <Box flex="1">
                    {showMusicPlayer && <MusicPlayer/>}
                </Box>
            </Flex>
            <Box height={"7.5px"}/>
            <DateDivider/>
        </Flex>
    );
}

function AdminLinks() {

    const linkPadding = useBreakpointValue({base: "0px", md: "0px", lg: "12.5px"});
    const linkFontSize = useBreakpointValue({base: "0px", md: "0px", lg: "15.5px"});

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                if (text) {
                    alert(`Copied to clipboard!  ${text}`);
                }
            })
            .catch((err) => {
            });
    };

    return (
        <Flex paddingTop={linkPadding}
              direction={"row"}
        >
            <FontAwesomeIcon icon={faEnvelope}
                             fontSize={linkFontSize}
                             cursor="pointer"
                             onClick={() => copyToClipboard(profileConfig.email)}
            />
            <Box width={"17.5px"}/>
            <FontAwesomeIcon icon={faGithub}
                             fontSize={linkFontSize}
                             cursor="pointer"
                             onClick={() => copyToClipboard(profileConfig.github)}
            />
            <Box width={"17.5px"}/>
            <FontAwesomeIcon icon={faLinkedin}
                             fontSize={linkFontSize}
                             cursor="pointer"
                             onClick={() => copyToClipboard(profileConfig.linkedIn)}
            />
            <Box width={"17.5px"}/>
            <FontAwesomeIcon icon={faSquarePhone}
                             fontSize={linkFontSize}
                             cursor="pointer"
                             onClick={() => copyToClipboard(profileConfig.tel)}
            />
        </Flex>
    );

}

function DateWidget() {
    const today = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
        weekday: "long", // Added to get the full name of the weekday
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const dateFontSize = useBreakpointValue({base: "0px", md: "0px", lg: "15.5px"});

    return (
        <Text fontSize={dateFontSize}
              fontWeight={"semibold"}
        >
            {today}
        </Text>
    );
}

function BlogTitle() {

    const blogTitleFontSize = useBreakpointValue({base: "25px", md: "30px", lg: "70px"});

    const handleRefresh = () => {

        window.location.reload();

    };

    return (
        <Text fontSize={blogTitleFontSize}
              fontFamily={"OldLondon"}
              whiteSpace={"nowrap"}
              textAlign={"center"}
              cursor={"pointer"}
              onClick={handleRefresh}
        >
            {profileConfig.blogTitle}
        </Text>
    );
}

function DateDivider() {

    const today = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
        weekday: "long", // Added to get the full name of the weekday
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(profileConfig.email)
            .then(() => {
                alert(`Copied to clipboard! ${profileConfig.email}`);
            })
            .catch(e => {
            });
    };

    const dateFontSize = useBreakpointValue({base: "12.5px", md: "12.5px", lg: "0px"});

    const dateDividerBackground = useBreakpointValue({base: "#f8f8f8", md: "#f8f8f8", lg: "none"});
    const dateDividerBorderColor = useBreakpointValue({
        base: "blackAlpha.200",
        md: "blackAlpha.200",
        lg: "transparent",
    });
    const dateDividerBorderColor2 = useBreakpointValue({
        base: "transparent",
        md: "transparent",
        lg: "black",
    });

    const dateDividerPaddingY = useBreakpointValue({base: "5px", md: "5px", lg: "1px"});

    return (
        <Flex direction={"column"}
              width={"100%"}
        >
            <Divider borderWidth={"1px"}
                     borderColor={dateDividerBorderColor2}
            />
            <Box paddingY={dateDividerPaddingY}
                 width={"100%"}
                 background={dateDividerBackground}
                 borderY={"1.25px solid"}
                 borderColor={dateDividerBorderColor}
            >
                <Flex paddingX={"15px"}
                      direction={"row"}
                      justify={"space-between"}
                >
                    <Text fontSize={dateFontSize}
                          fontWeight={"semibold"}
                    >
                        {today}
                    </Text>
                    <Text fontSize={dateFontSize}
                          fontWeight={"normal"}
                          color={"blue.600"}
                          cursor={"pointer"}
                          onClick={handleCopy}
                    >
                        contact me
                    </Text>

                </Flex>
            </Box>
            <Divider borderWidth={"1px"}
                     borderColor={dateDividerBorderColor2}
            />
        </Flex>
    );

}


function MusicPlayer() {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const audioRef = useRef(null);

    const filePath = profileConfig.playlist[currentMediaIndex].split('playlist/')[1];
    const fileName = filePath.split('.mp3')[0];
    const [singerWithPlus, titleWithPlus] = fileName.split('-');
    const singer = singerWithPlus.replace(/\+/g, ' ');
    const title = titleWithPlus.replace(/\+/g, ' ');

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else if (isLoaded) {
                audioRef.current.play().catch((error) => {
                });
                setCurrentTime(audioRef.current.currentTime);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleNext = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % profileConfig.playlist.length);
        setCurrentTime(0);
    };

    const handleSliderChange = (value) => {
        setIsSliding(true);
        setCurrentTime(value);
    };

    const handleSliderChangeEnd = (value) => {
        setIsSliding(false);
        audioRef.current.currentTime = value;
        setCurrentTime(value);
    };

    useEffect(() => {
        if (profileConfig.playlist && profileConfig.playlist.length > 0) {
            setIsLoaded(false);
            audioRef.current.src = profileConfig.playlist[currentMediaIndex];

            const handleCanPlay = () => {
                setIsLoaded(true);
                setCurrentTime(audioRef.current.currentTime);
                if (isPlaying) {
                    audioRef.current.play().catch((error) => {
                    });
                }
            };

            audioRef.current.addEventListener('canplay', handleCanPlay);
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('canplay', handleCanPlay);
                }
            };
        }
    }, [currentMediaIndex, profileConfig.playlist]);

    useEffect(() => {
        if (audioRef.current && !isSliding) {
            const audio = audioRef.current;
            const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

            audio.addEventListener("timeupdate", handleTimeUpdate);
            return () => {
                audio.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }
    }, [isSliding]);

    if (!profileConfig.playlist || profileConfig.playlist.length === 0) {
        return (
            <Flex direction="column" align="end" width={"100%"}>
                <Text fontSize={"11.5px"}>No media available</Text>
            </Flex>
        );
    }

    return (
        <Box>
            <Flex direction="column" align="end" width={"100%"}>
                <Text fontSize={"11.5px"}>{`${singer} - ${title}`}</Text>
                <Flex direction="row" justify="end" align="stretch" width={"50%"}>
                    <IconButton
                        background={"none"}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        icon={<FontAwesomeIcon icon={isPlaying ? faPause : faPlay}/>}
                        onClick={togglePlayPause}
                        mr={2}
                        _focus={{}}
                        isDisabled={!isLoaded}
                    />
                    <Slider
                        width={"100%"}
                        value={currentTime}
                        min={0}
                        max={isLoaded ? audioRef.current.duration : 100}
                        onChange={handleSliderChange}
                        onChangeEnd={handleSliderChangeEnd}
                        _focus={{}}
                    >
                        <SliderTrack background={"#0000003D"}>
                            <SliderFilledTrack background={"#760c0c"}/>
                        </SliderTrack>
                        <SliderThumb _focus={{}}/>
                    </Slider>
                </Flex>
            </Flex>
            <audio ref={audioRef} onEnded={handleNext}/>
        </Box>
    );
}

export default HomeHeader;