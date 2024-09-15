import React from 'react';

import {Box} from "@chakra-ui/react";

import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

function PostEditor({markRef, handleUploadContentImageAsTemp}) {

    const customToolbarItems = [
        ['heading', 'bold', 'italic'],
        ['hr'],
        ['ul', 'ol'],
        ['link'],
        ['image'],
        ['code', 'codeblock'],
    ];

    return (
        <Box minWidth={"600px"}>
            <Editor
                ref={markRef}
                width={"100%"}
                height={"100vh"}
                hideModeSwitch={true}
                previewStyle={"vertical"}
                initialEditType="markdown"
                toolbarItems={customToolbarItems}
                hooks={{
                    addImageBlobHook: handleUploadContentImageAsTemp,
                }}
            />
            <style>
                {`
                    /* 에디터 테두리 없음 */
                    .toastui-editor-defaultUI {
                        border: none !important;
                    }
                    /* 미리보기 글씨 배경 빨간색 */
                    .toastui-editor-contents .toastui-editor-md-preview-highlight::after {
                        background-color: rgba(255, 182, 193, 0.3) !important;
                    }
                    /* 확인 버튼을 남색으로 변경 */
                    .toastui-editor-defaultUI .toastui-editor-ok-button {
                        background-color: #e78413 !important;
                        color: #fff !important;
                        outline-color: #e78413 !important;
                    }
                     /* 이미지 추가 팝업에서 활성화된 탭의 색상을 남색으로 변경 */
                    .toastui-editor-popup-add-image .toastui-editor-tabs .tab-item.active {
                        color: #1A202C !important;
                        border-bottom: 2px solid #e78413 !important;
                    }
                     /* 뷰어 이미지 16:9 가운데 정렬 */
                     .toastui-editor-contents img {
                        width: 100%;
                        aspect-ratio: 16 / 9;
                        display: block;
                        margin-top: 25px;
                        margin-bottom: 25px;
                        margin-left: auto;
                        margin-right: auto;
                        object-fit: cover; 
                    }
                    /* h1, h2 태그 밑줄 제거 */
                    .toastui-editor-contents h1, .toastui-editor-contents h2 {
                        border-bottom: none !important;
                    }
                    /* toastui-editor-contents 폰트 사이즈 변경 */
                    .toastui-editor-contents {
                        margin: 0;
                        padding: 0;
                        font-size: 17.5px; /* 폰트 사이즈 15px로 변경 */
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕',
                            'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif;
                        z-index: 20;
                    }
                `}
            </style>
        </Box>
    );
}

export default PostEditor;
