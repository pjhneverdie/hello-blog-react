import {createContext, useContext, useState} from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [categoryStack, setCategoryStack] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <CategoryContext.Provider value={{categories, setCategories, categoryStack, setCategoryStack, selectedCategory, setSelectedCategory}}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => useContext(CategoryContext);