import axios from "axios";
import {BASE_URL} from "../../../common/const/data";
import {handleException} from "../../../common/util/globalErrorHandler";
import {postExceptionCode} from "../exception/postExceptionCode";


export const useAdminPostApi = () => {

    const uploadImage = async (blob, callback) => {
        const formData = new FormData();
        formData.append("thumbImageFile", blob);

        console.log(blob);

        try {
            const response = await axios.post(`${BASE_URL}/admin/post/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            callback(response.data.value, "image");
        } catch (exc) {
            handleException(exc, postExceptionCode);
        }
    };

    const savePost = async ({title, content, thumbImageFile, categoryId}) => {
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
        } catch (exc) {
            handleException(exc, postExceptionCode);
        }
    };

    return {
        uploadImage,
        savePost,
    };
};
