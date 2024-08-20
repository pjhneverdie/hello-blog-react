import {globalExceptionCode} from "../exception/globalExceptionCode";

export function handleException(exc, specificExceptionCode = {}) {
    const globalExceptionMessage = globalExceptionCode[exc.response.data.exceptionCode];

    if (globalExceptionMessage) {
        alert(globalExceptionMessage);
    } else if (specificExceptionCode[exc.response.data.exceptionCode]) {
        alert(specificExceptionCode[exc.response.data.exceptionCode]);
    } else {
        alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
}