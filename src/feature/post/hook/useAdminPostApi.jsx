import axios from "axios";

import qs from "qs";

import {BASE_URL} from "../../../common/const/data";
import {handleException} from "../../../common/util/exceptionHandler";

import {postExceptionCode} from "../exception/postExceptionCode";

export const useAdminPostApi = () => {

    async function uploadContentImageAsTemp(blob) {

        const formData = new FormData();

        formData.append("contentImageFile", blob);

        try {
            const response = await axios.post(`${BASE_URL}/admin/post/image/temp`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            return response.data.value;
        } catch (e) {
            handleException(e, postExceptionCode);
        }

    }

    async function moveContentImagesFromTempToImage({relatedUrls}) {

        try {
            const response = await axios.post(`${BASE_URL}/admin/post/image/move`,
                {
                    "tempUrls": relatedUrls
                },
                {
                    withCredentials: true
                }
            );

            return response.data.value;
        } catch (e) {
            handleException(e, postExceptionCode);
        }

    }

    async function savePost({title, content, thumbImageFile, categoryId}) {

        try {
            const formData = new FormData();

            if (thumbImageFile) {
                formData.append("thumbImageFile", thumbImageFile);
            }

            const postSaveForm = {
                title: title,
                content: content,
                categoryId: categoryId
            };

            formData.append("postSaveForm", new Blob([JSON.stringify(postSaveForm)], {
                type: "application/json"
            }));

            const response = await axios.post(`${BASE_URL}/admin/post`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            // 로컬 스토리지 업데이트
            const subcategories = JSON.parse(localStorage.getItem(`subcategories_${categoryId}`));
            const updatedCategories = subcategories.map(category => {
                if (category.id === categoryId) {
                    return {...category, postCount: category.postCount + 1};
                }
                return category;
            });

            localStorage.setItem(`subcategories_${categoryId}`, JSON.stringify(updatedCategories));

            return true;
        } catch (e) {
            handleException(e, postExceptionCode);
            return false;
        }

    }

    const updatePost = async ({id, title, content, thumbUrl, thumbImageFile, categoryId, originCategoryId}) => {

        try {
            const formData = new FormData();

            if (thumbImageFile) {
                formData.append("thumbImageFile", thumbImageFile);
            }

            const postUpdateForm = {
                id: id,
                title: title,
                content: content,
                thumbUrl: thumbUrl,
                categoryId: categoryId
            };

            formData.append("postUpdateForm", new Blob([JSON.stringify(postUpdateForm)], {
                type: "application/json"
            }));

            const response = await axios.patchForm(`${BASE_URL}/admin/post`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            if (categoryId !== originCategoryId) {
                const originSubCategories = JSON.parse(localStorage.getItem(`subcategories_${originCategoryId}`));
                const updatedOriginSubCategories = originSubCategories.map(category => {
                    if (category.id.toString() === originCategoryId.toString()) {
                        return {...category, postCount: category.postCount - 1};
                    }
                    return category;
                });

                const subCategories = JSON.parse(localStorage.getItem(`subcategories_${categoryId}`));

                if (subCategories) {
                    const updatedSubCategories = subCategories.map(category => {
                        if (category.id.toString() === categoryId.toString()) {
                            return {...category, postCount: category.postCount + 1};
                        }
                        return category;
                    });

                    localStorage.setItem(`subcategories_${categoryId}`, JSON.stringify(updatedSubCategories));
                }

                localStorage.setItem(`subcategories_${originCategoryId}`, JSON.stringify(updatedOriginSubCategories));

                return response.data.value;
            }
        } catch (e) {
            handleException(e, postExceptionCode);
        }

    };

    const deletePost = async ({id, relatedUrls, categoryId}) => {

        try {
            const qs = require("qs");

            const response = await axios.delete(`${BASE_URL}/admin/post/${id}`, {
                params: {
                    relatedUrls: relatedUrls
                },
                paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat: "repeat"});
                },
                withCredentials: true
            });

            const subCategories = JSON.parse(localStorage.getItem(`subcategories_${categoryId}`));

            const updatedSubCategories = subCategories.map(category => {
                if (category.id.toString() === categoryId.toString()) {
                    return {...category, postCount: category.postCount - 1};
                }
                return category;
            });

            localStorage.setItem(`subcategories_${categoryId}`, JSON.stringify(updatedSubCategories));

        } catch (e) {
            handleException(e, postExceptionCode);
        }

    }

    return {
        uploadContentImageAsTemp,
        moveContentImagesFromTempToImage,
        savePost,
        updatePost,
        deletePost,
    };

};
