export function formatLocalDateTime(localDateTimeStr) {
    const date = new Date(localDateTimeStr);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[date.getMonth()]; // 월 이름
    const day = date.getDate(); // 일
    const year = date.getFullYear(); // 연도

    return `${month} ${day}, ${year}`;
}