import {globalExceptionCode} from "../exception/globalExceptionCode";

export function handleException(exc, specificExceptionCode = {}) {
    // 글로벌 예외(NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR 등등)
    const globalExceptionMessage = globalExceptionCode[exc.response.data.exceptionCode];

    // 글로벌 예외인지 확인
    if (globalExceptionMessage) {
        alert(globalExceptionMessage);
        // 커스텀 예외인지 확인
    } else if (specificExceptionCode[exc.response.data.exceptionCode]) {
        alert(specificExceptionCode[exc.response.data.exceptionCode]);
        // 외 모든 경우
    } else {
        alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }

}