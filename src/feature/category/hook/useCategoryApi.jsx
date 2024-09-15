import {useState} from "react";

import axios from "axios";

import {BASE_URL} from "../../../common/const/data";

import {handleException} from "../../../common/util/exceptionHandler";
import {categoryExceptionCode} from "../exception/categoryExceptionCode";

export const useCategoryApi = () => {

    const [isLoading, setIsLoading] = useState(false);

    const getRootCategories = async () => {

        try {
            setIsLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 300));

            const response = await axios.get(`${BASE_URL}/category`);

            return response.data.value;
        } catch (exc) {
            handleException(exc, categoryExceptionCode);
            return [];
        } finally {
            setIsLoading(false);
        }

    };

    const getSubCategories = async (parentId) => {

        if (parentId) {
            try {
                setIsLoading(true);

                await new Promise((resolve) => setTimeout(resolve, 300));

                const response = await axios.get(`${BASE_URL}/category/${parentId}`);

                return response.data.value;
            } catch (exc) {
                handleException(exc, categoryExceptionCode);
                return [];
            } finally {
                setIsLoading(false);
            }
        } else {
            await getRootCategories();
        }

    };

    return {
        isLoading,
        getRootCategories,
        getSubCategories,
    };

}