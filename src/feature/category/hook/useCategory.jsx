import {useState, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from "../../../common/const/data";
import {categoryExceptionCode} from "../exception/categoryExceptionCode";
import {handleException} from "../../../common/util/globalErrorHandler";

export const useCategory = () => {
    const [categories, setCategories] = useState([]);

    const getRootCategories = async () => {
        try {
            const cachedCategories = localStorage.getItem('categories');

            if (cachedCategories) {
                setCategories(JSON.parse(cachedCategories));
                return;
            }

            const response = await axios.get(`${BASE_URL}/category`, {
                withCredentials: true,
            });

            setCategories(response.data.value);

            localStorage.setItem('categories', JSON.stringify(response.data.value));
        } catch (exc) {
            handleException(exc, categoryExceptionCode);
        }
    };

    const fetchSubCategories = async (parentId) => {
        try {
            const cachedSubCategories = localStorage.getItem(`subcategories_${parentId}`);

            if (cachedSubCategories) {
                return JSON.parse(cachedSubCategories);
            }

            const response = await axios.get(`${BASE_URL}/category/${parentId}`, {
                withCredentials: true,
            });

            const subCategories = response.data.value;

            localStorage.setItem(`subcategories_${parentId}`, JSON.stringify(subCategories));

            return subCategories;
        } catch (exc) {
            handleException(exc, categoryExceptionCode);
            return [];
        }
    };

    const addCategory = async ({name, thumbImageFile, parentId}) => {
        try {
            const formData = new FormData();

            if (thumbImageFile) {
                formData.append("thumbImageFile", thumbImageFile);
            }

            const categoryAddForm = {
                name: name,
                parentId: parentId,
            };

            formData.append("categoryAddForm", new Blob([JSON.stringify(categoryAddForm)], {
                type: "application/json"
            }));


            const response = await axios.post(`${BASE_URL}/admin/category`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            if (!parentId) {
                const updatedCategories = [...categories, response.data.value];

                setCategories(updatedCategories);

                localStorage.setItem("categories", JSON.stringify(updatedCategories));
            } else {
                const subCategories = await fetchSubCategories(parentId);

                const updatedSubCategories = [...subCategories, response.data.value];

                localStorage.setItem(`subcategories_${parentId}`, JSON.stringify(updatedSubCategories));
            }
        } catch (exc) {
            handleException(exc, categoryExceptionCode);
        }
    };

    const updateCategory = async ({id, name, thumbUrl, parentId, thumbImageFile, originParentId}) => {
        try {
            const formData = new FormData();

            if (thumbImageFile) {
                formData.append("thumbImageFile", thumbImageFile);
            }

            const categoryUpdateForm = {
                id: id,
                name: name,
                thumbUrl: thumbUrl,
                parentId: parentId === "" ? null : parentId,
            };

            formData.append("categoryUpdateForm", new Blob([JSON.stringify(categoryUpdateForm)], {
                type: "application/json"
            }));

            const response = await axios.patchForm(`${BASE_URL}/admin/category`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            const updatedCategory = response.data.value;

            const updateStorageAndState = (key, updatedList) => {
                updatedList.sort((a, b) => a.id - b.id);
                localStorage.setItem(key, JSON.stringify(updatedList));
                setCategories(updatedList);
            };

            const updateSubcategoriesStorage = (key, updatedList) => {
                updatedList.sort((a, b) => a.id - b.id);
                localStorage.setItem(key, JSON.stringify(updatedList));
            };

            const handleTopToTop = () => {
                const filteredCategories = categories.filter(category => category.id !== id);
                const updatedCategories = [...filteredCategories, updatedCategory];
                updateStorageAndState("categories", updatedCategories);
            };

            const handleSubToTop = async () => {
                const subCategories = await fetchSubCategories(originParentId);
                const filteredSubCategories = subCategories.filter(subcategory => subcategory.id !== id);
                updateSubcategoriesStorage(`subcategories_${originParentId}`, filteredSubCategories);

                const updatedCategories = [...categories, updatedCategory];
                updateStorageAndState("categories", updatedCategories);
            };

            const handleTopToSub = async () => {
                const filteredCategories = categories.filter(category => category.id !== id);
                updateStorageAndState("categories", filteredCategories);

                const subCategories = await fetchSubCategories(parentId);
                const updatedSubCategories = [...subCategories, updatedCategory];
                updateSubcategoriesStorage(`subcategories_${parentId}`, updatedSubCategories);
            };

            const handleSubToSub = async () => {
                const originSubCategories = await fetchSubCategories(originParentId);
                const filteredSubCategories = originSubCategories.filter(subcategory => subcategory.id !== id);
                updateSubcategoriesStorage(`subcategories_${originParentId}`, filteredSubCategories);

                const subCategories = await fetchSubCategories(parentId);
                const updatedSubCategories = [...subCategories, updatedCategory];
                updateSubcategoriesStorage(`subcategories_${parentId}`, updatedSubCategories);
            };

            // 최상위 카테고리의 수정인 경우
            if (!updatedCategory.parentId) {
                // 최상위 -> 최상위
                if (!originParentId) {
                    handleTopToTop();
                } else {
                    // 하위 -> 최상위
                    await handleSubToTop();
                }
            } else {
                // 최상위 -> 하위
                if (!originParentId) {
                    await handleTopToSub();
                } else {
                    // 하위 -> 하위
                    await handleSubToSub();
                }
            }
        } catch (exc) {
            handleException(exc, categoryExceptionCode);
        }
    };

    const deleteCategory = async ({id, parentId, setSelectedFolder}) => {
        try {
            await axios.delete(`${BASE_URL}/admin/category/${id}`, {
                withCredentials: true,
            });

            if (!parentId) {
                const updatedCategories = categories.filter(category => category.id !== id);

                setCategories(updatedCategories);

                localStorage.setItem('categories', JSON.stringify(updatedCategories));
            } else {
                const subCategories = await fetchSubCategories(parentId);

                const updatedSubCategories = subCategories.filter(subcategory => subcategory.id !== id);

                localStorage.setItem(`subcategories_${parentId}`, JSON.stringify(updatedSubCategories));
            }

            setSelectedFolder({
                id: null,
                name: null,
                thumbUrl: null,
                parentId: null,
                createdAt: null,
                postCount: null,
            });

        } catch (exc) {
            handleException(exc, categoryExceptionCode);
        }
    };

    const clearCategoryCache = () => {
        localStorage.clear();

        setCategories([]);

        getRootCategories();
    };

    useEffect(() => {
        getRootCategories();
    }, []);

    return {
        categories,
        addCategory,
        fetchSubCategories,
        updateCategory,
        deleteCategory,
        clearCategoryCache,
    };
};
