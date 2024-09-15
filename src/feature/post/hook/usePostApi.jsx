import axios from "axios";

import {BASE_URL} from "../../../common/const/data";
import {handleException} from "../../../common/util/exceptionHandler";

import {postExceptionCode} from "../exception/postExceptionCode";

export const usePostApi = () => {

    async function getPost(id) {

        try {
            const response = await axios.get(`${BASE_URL}/post/${id}`);

            return response.data.value;
        } catch (e) {
            handleException(e, postExceptionCode);
            return null;
        }

    }

    return {
        getPost,
    };

};
