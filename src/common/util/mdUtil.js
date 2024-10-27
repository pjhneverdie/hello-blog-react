export function extractPlainText(markdown) {
    return markdown
        .replace(/[#*_>`~\[\]\(\)!]/g, '')  // 제목, 이탤릭, 굵게, 코드, 링크 문법 제거
        .replace(/\!\[.*?\]\(.*?\)/g, '')    // 이미지 제거
        .replace(/\[.*?\]\(.*?\)/g, '')      // 링크 제거
        .replace(/^\s*[-*]\s+/gm, '')        // 리스트 제거
        .replace(/^\d+\.\s+/gm, '')          // 번호 있는 리스트 제거
        .replace(/^\s+|\s+$/g, '');          // 양쪽 공백 제거
}