import React, {useContext, useEffect, useRef, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faPause, faPlay, faSquarePhone} from "@fortawesome/free-solid-svg-icons";

import {
    Box,
    Flex,
    IconButton,
    Slider, SliderFilledTrack, SliderThumb, SliderTrack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";

import {ProfileContext} from "../../../config/profile/ProfileContext";

function HomeHeader() {

    const profile = useContext(ProfileContext);

    const showMusicPlayer = useBreakpointValue({base: false, md: false, lg: true});


    return (
        <Flex direction={"column"}
              justify={"start"}
              align={"center"}
              width={"100%"}
        >
            <AdminLinks email={profile.email}
                        github={profile.github}
                        linkedIn={profile.linkedIn}
                        tel={profile.tel}
            />
            <Flex direction={"row"}
                  width="100%"
                  justify={"center"}
                  align="start"
            >
                <Box flex="1">
                    <DateWidget/>
                </Box>
                <Box flex="1"
                     textAlign="center"
                >
                    <BlogTitle blogTitle={profile.blogTitle}/>
                </Box>
                <Box flex="1">
                    {showMusicPlayer ? <MusicPlayer playlist={profile.playlist}/> : null}
                </Box>
            </Flex>
            <DateDivider/>
        </Flex>
    );
}

function AdminLinks({email, github, linkedIn, tel}) {
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
        <Flex
            paddingTop={linkPadding}
            direction={"row"}
        >
            <FontAwesomeIcon
                icon={faEnvelope}
                fontSize={linkFontSize}
                cursor="pointer"
                onClick={() => copyToClipboard(email)}
            />
            <Box width={"17.5px"}/>
            <FontAwesomeIcon
                icon={faGithub}
                fontSize={linkFontSize}
                cursor="pointer"
                onClick={() => copyToClipboard(github)}
            />
            <Box width={"17.5px"}/>
            <FontAwesomeIcon
                icon={faLinkedin}
                fontSize={linkFontSize}
                cursor="pointer"
                onClick={() => copyToClipboard(linkedIn)}
            />
            <Box width={"17.5px"}/>
            <FontAwesomeIcon
                icon={faSquarePhone}
                fontSize={linkFontSize}
                cursor="pointer"
                onClick={() => copyToClipboard(tel)}
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
        <Text fontSize={dateFontSize} fontWeight={"semibold"}>
            {today}
        </Text>
    );
}

function BlogTitle({blogTitle}) {
    const blogTitleFontSize = useBreakpointValue({base: "20px", md: "30px", lg: "70px"});

    const handleRefresh = () => {
        window.location.reload(); // Refreshes the page
    };

    return (
        <Text
            fontSize={blogTitleFontSize}
            fontFamily={"OldLondon"}
            whiteSpace={"nowrap"}
            cursor={"pointer"}
            onClick={handleRefresh}
        >
            {blogTitle}
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

    const dateFontSize = useBreakpointValue({base: "10px", md: "12.5px", lg: "0px"});

    const dateDividerBg = useBreakpointValue({base: "#f8f8f8", md: "#f8f8f8", lg: "none"});
    const dateDividerBorderColor = useBreakpointValue({
        base: "blackAlpha.200",
        md: "blackAlpha.200",
        lg: "blackAlpha.500"
    });

    const dateDividerPaddingY = useBreakpointValue({base: "5px", md: "5px", lg: "1px"});

    return (
        <Box paddingY={dateDividerPaddingY}
             width={"100%"}
             background={dateDividerBg}
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
                >
                    contact me
                </Text>

            </Flex>

        </Box>
    );
}

function MusicPlayer({playlist}) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (playlist && playlist.length > 0) {
            setIsLoaded(false);
            audioRef.current.src = playlist[currentMediaIndex];

            const handleCanPlay = () => {
                setIsLoaded(true);
                setCurrentTime(audioRef.current.currentTime);
                if (isPlaying) {
                    audioRef.current.play();
                }
            };

            audioRef.current.addEventListener('canplay', handleCanPlay);
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('canplay', handleCanPlay);
                }
            };
        }
    }, [currentMediaIndex, playlist]);

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

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else if (isLoaded) {
                audioRef.current.play();
                setCurrentTime(audioRef.current.currentTime);
            }

            setIsPlaying(!isPlaying);
        }
    };

    const handleNext = () => {
        if (playlist.length === 1) {
            setCurrentMediaIndex(0);
        }

        setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % playlist.length);
        setCurrentTime(0);
        audioRef.current.play();
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

    if (!playlist || playlist.length === 0) {
        return <Flex direction="column" align="end" width={"100%"}>
            <Text fontSize={"11.5px"}>
                No media available
            </Text>
        </Flex>
    }

    const filePath = playlist[currentMediaIndex].split('playlist/')[1];
    const fileName = filePath.split('.mp3')[0];
    const [singerWithPlus, titleWithPlus] = fileName.split('-');
    const singer = singerWithPlus.replace(/\+/g, ' ');
    const title = titleWithPlus.replace(/\+/g, ' ');

    return (
        <Box>
            <Flex direction="column" align="end" width={"100%"}>
                <Text fontSize={"11.5px"}>
                    {`${singer} - ${title}`}
                </Text>
                <Flex direction="row" justify="end" align="stretch" width={"50%"}>
                    <IconButton
                        background={"none"}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        icon={<FontAwesomeIcon icon={isPlaying ? faPause : faPlay}/>}
                        onClick={togglePlayPause}
                        mr={2}
                        _focus={{}}
                        isDisabled={!isLoaded} // 로딩 중에는 버튼 비활성화
                    />
                    <Slider
                        width={"100%"}
                        value={currentTime}
                        min={0}
                        max={isLoaded ? audioRef.current.duration : 100} // 로드 전에는 max 값을 임시로 설정
                        onChange={handleSliderChange}
                        onChangeEnd={handleSliderChangeEnd} // 슬라이더 조작이 끝날 때 호출
                        _focus={{}}
                    >
                        <SliderTrack background={"#f8f8f8"}>
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