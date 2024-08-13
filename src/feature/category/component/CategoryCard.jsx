import React from 'react';
import {List, ListItem, Text} from '@chakra-ui/react';

const CategoryCard = ({category}) => {
    return (
        <ListItem>
            <Text fontWeight="bold">{category.name}</Text>
            {category.children && category.children.length > 0 && (
                <List spacing={2} pl={4}>
                    {category.children.map((child) => (
                        <CategoryCard key={child.id} category={child}/>
                    ))}
                </List>
            )}
        </ListItem>
    );
};

export default CategoryCard;
