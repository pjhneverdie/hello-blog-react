import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {Flex} from "@chakra-ui/react";

function MyLinks() {
    const bannerStyle = {
        background: 'linear-gradient(to right, #FFF38F, #FFF38F, #FFE610, #FFA500)',
        padding: '11.5px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden', // Ensure the :before pseudo-element is contained
    };

    const beforeStyle = {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundImage: `url('data:image/png;base64,${generateNoiseTexture()}')`, // Base64 encoded texture
        opacity: 0.065,
        pointerEvents: 'none',
        zIndex: 0, // Place behind content
    };

    const iconStyle = {
        zIndex: 1, // Ensure icon is above the texture
        position: 'relative',
        fontSize: '25px',
        cursor: 'pointer',
        color: 'black',
    };

    return (
        <Flex direction={"row"} justify={"center"} align={"center"} style={bannerStyle}>
            <div style={beforeStyle}></div>
            <FontAwesomeIcon icon={faGithub} style={iconStyle}/>
        </Flex>
    );
}

function generateNoiseTexture() {
    // Function to generate a Base64 encoded noise texture
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            const val = Math.floor(Math.random() * 255);
            ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
            ctx.fillRect(i, j, 1, 1);
        }
    }

    return canvas.toDataURL().split(',')[1];
}

export default MyLinks;
