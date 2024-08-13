import React from 'react';
import {List, Text} from '@chakra-ui/react';
import CategoryCard from "./CategoryCard";

const CategoryCardList = ({categories}) => {

    if (!categories || categories.length === 0) {
        return <Text>카테고리를 추가해 주세요.</Text>
    }

    return (

        <List spacing={3}>
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category}/>
            ))}
        </List>
    );
};

export default CategoryCardList;