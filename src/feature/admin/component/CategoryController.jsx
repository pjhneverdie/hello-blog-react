import React, {useEffect, useState} from 'react';
import CategoryCardList from "../../category/component/CategoryCardList";
import axios from "axios";
import {BASE_URL} from "../../../common/const/data";

const CategoryController = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategoryHierarchy = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/category/hierarchy`,
                    {
                        withCredentials: true
                    },
                );
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching category hierarchy:', error);
            }
        };

        fetchCategoryHierarchy();
    }, []);

    return (
        <CategoryCardList categories={categories}/>
    );
};

export default CategoryController;