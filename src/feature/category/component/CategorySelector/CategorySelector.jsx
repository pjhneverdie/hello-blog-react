import React, {useEffect, useState} from 'react';

import {Box, Flex, UnorderedList, ListItem, Tooltip, Text, useColorModeValue} from "@chakra-ui/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder, faFolderOpen} from "@fortawesome/free-solid-svg-icons";

function CategorySelector({rootCategories, getSubCategories, handleSelectCategory}) {

    return (
        <Box py={"20px"}
             pl={"20px"}
             width={"100%"}
             height={"100%"}
             bg={"white"}
             borderWidth={"1px"}
             borderRadius={"md"}
             overflow={"scroll"}
        >
            <UnorderedList ml={"4px"}
                           styleType={"none"}
            >
                {rootCategories.map((node) => (
                    <TreeNode key={node.id}
                              node={node}
                              getSubCategories={getSubCategories}
                              handleSelectCategory={handleSelectCategory}
                    />
                ))}
            </UnorderedList>
        </Box>
    );

}

const TreeNode = ({node, getSubCategories, handleSelectCategory}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [children, setChildren] = useState([]);

    /**
     * 해당 카테고리의 하위 카테고리를 불러오는 메서드
     */
    const handleGetSubCategories = async () => {
        if (node.isParent) {
            handleSelectCategory(node.id, node.name, node.thumbUrl, node.parentId, node.createdAt, node.postCount, true);
            return;
        }

        if (!isOpen) {
            const subCategories = await getSubCategories(node.id);
            const parentCategory = subCategories.find(category => category.id === node.id);
            const children = subCategories.filter(category => category.id !== node.id);

            setChildren([{...parentCategory, isParent: true}, ...children]);
        }

        setIsOpen(!isOpen);

        handleSelectCategory(node.id, node.name, node.thumbUrl, node.parentId, node.createdAt, node.postCount, false);
    };

    /**
     * 새 카테고리 추가 및 수정 시 그대로 트리에 반영
     */
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === `subcategories_${node.id}`) {
                const updatedSubCategories = JSON.parse(event.newValue);

                const parentCategory = updatedSubCategories.find(category => category.id === node.id);
                const children = updatedSubCategories.filter(category => category.id !== node.id);

                setChildren([{...parentCategory, isParent: true}, ...children]);
            }
        };

        document.addEventListener("localStorageChange", handleStorageChange);

        return () => {
            document.removeEventListener("localStorageChange", handleStorageChange);
        };
    }, [node.id]);

    return (
        <ListItem position={"relative"}
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
            <Tooltip label={node.id}
                     fontSize="xs"
                     placement="left-start"
                     background="rgba(0, 0, 32, 0.75)"
                     color="white"
            >
                <Flex position="relative"
                      pl={2}
                      align="center"
                      cursor={"pointer"}
                      onClick={handleGetSubCategories}
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
                    <FontAwesomeIcon icon={isOpen ? faFolderOpen : faFolder}
                                     style={{marginRight: '12px', color: '#e78413'}}
                    />
                    <Text>
                        {node.isParent ? `${node.postCount}개의 게시글` : node.name}
                    </Text>
                </Flex>
            </Tooltip>
            {isOpen && (
                <UnorderedList ml={4}
                               styleType="none"
                >
                    {children.map((child, index) => (
                        <TreeNode key={child.id}
                                  node={child}
                                  getSubCategories={getSubCategories}
                                  handleSelectCategory={handleSelectCategory}
                        />
                    ))}
                </UnorderedList>
            )}
        </ListItem>
    );

};

export default CategorySelector;


