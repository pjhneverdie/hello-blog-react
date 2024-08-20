import React, {useEffect, useState} from 'react';
import {Box, Flex, UnorderedList, ListItem, Tooltip} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder, faFolderOpen} from "@fortawesome/free-solid-svg-icons";

function CategorySelector({categories, onFolderSelect, fetchSubCategories}) {
    return (
        <Box
            pl={"20px"}
            paddingY={"20px"}
            width={"100%"}
            height={"100%"}
            overflowY={"scroll"}
            bg={"white"}
            borderWidth={"1px"}
            borderRadius={"md"}
        >
            <UnorderedList
                styleType={"none"}
                ml={"4px"}
            >
                {categories.map((node) => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        onFolderSelect={onFolderSelect}
                        fetchSubCategories={fetchSubCategories}
                    />
                ))}
            </UnorderedList>
        </Box>
    );
}

const TreeNode = ({node, onFolderSelect, fetchSubCategories}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [children, setChildren] = useState([]);

    const handleToggle = async () => {
        if (node.isParent) {
            onFolderSelect(node.id, node.name, node.thumbUrl, node.parentId, node.createdAt, node.postCount, true);
            return;
        }

        if (!isOpen) {
            const subCategories = await fetchSubCategories(node.id);
            const parentCategory = subCategories.find(category => category.id === node.id);
            const childCategories = subCategories.filter(category => category.id !== node.id);

            setChildren([{...parentCategory, isParent: true}, ...childCategories]);
        }

        setIsOpen(!isOpen);

        onFolderSelect(node.id, node.name, node.thumbUrl, node.parentId, node.createdAt, node.postCount, false);
    };

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === `subcategories_${node.id}`) {
                const updatedSubCategories = JSON.parse(event.newValue);

                const parentCategory = updatedSubCategories.find(category => category.id === node.id);
                const childCategories = updatedSubCategories.filter(category => category.id !== node.id);

                setChildren([{...parentCategory, isParent: true}, ...childCategories]);
            }
        };

        document.addEventListener('localStorageChange', handleStorageChange);

        return () => {
            document.removeEventListener('localStorageChange', handleStorageChange);
        };
    }, [node.id]);

    return (
        <ListItem
            position={"relative"}
            pl={"15px"}
            my={"5px"}
            _before={{
                content: '""',
                borderLeft: "1px solid",
                borderColor: "gray.300",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "0.5rem",
            }}>
            <Tooltip
                label={node.id}
                fontSize="xs"
                placement="left-start"
                background="rgba(0, 0, 32, 0.75)"
                color="white"
            >
                <Flex
                    align="center"
                    position="relative"
                    onClick={handleToggle}
                    cursor={"pointer"}
                    pl={2}
                    _before={{
                        content: '""',
                        borderTop: "1px solid",
                        borderColor: "gray.300",
                        position: "absolute",
                        top: "1rem",
                        left: "-1.25rem",
                        width: "1rem",
                    }}
                    _hover={{
                        backgroundColor: "gray.100",
                        borderRadius: "md",
                    }}
                >
                    <FontAwesomeIcon
                        icon={isOpen ? faFolderOpen : faFolder}
                        style={{marginRight: '12px', color: '#e78413'}}
                    />
                    {node.isParent ? `${node.postCount}개의 게시글` : node.name}
                </Flex>
            </Tooltip>
            {isOpen && (
                <UnorderedList styleType="none" ml={4}>
                    {children.map((child, index) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            onFolderSelect={onFolderSelect}
                            fetchSubCategories={fetchSubCategories}
                        />
                    ))}
                </UnorderedList>
            )}
        </ListItem>
    );
};

export default CategorySelector;


