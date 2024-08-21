import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/react-editor';
import {
    Box,
} from "@chakra-ui/react";
import React, {useRef, useState, useEffect} from 'react';

function PostEditor() {
    const editorRef = useRef();

    const [previewStyle, setPreviewStyle] = useState('vertical');

    const customToolbarItems = [
        ['heading', 'bold', 'italic'],
        ['hr'],
        ['ul', 'ol'],
        ['link'],
        ['image'],
        ['code', 'codeblock'],
    ];


    return (
        <Box minWidth={"500px"}>
            <Editor
                ref={editorRef}
                height={"100vh"}
                toolbarItems={customToolbarItems}
                initialEditType="markdown"
                hideModeSwitch={true}
                previewStyle={previewStyle}
            />
            <style>
                {`
                    /* 미리보기 글씨 배경 빨간색 */
                    .toastui-editor-contents .toastui-editor-md-preview-highlight::after {
                        background-color: rgba(255, 182, 193, 0.3) !important;
                    }
                    /* 확인 버튼을 남색으로 변경 */
                    .toastui-editor-defaultUI .toastui-editor-ok-button {
                        background-color: #1A202C !important; /* 기본 핑크색 */
                        color: #fff !important; /* 흰색 텍스트 */
                        outline-color: #1A202C !important; /* 핑크색 외곽선 */
                    }
                     /* 이미지 추가 팝업에서 활성화된 탭의 색상을 남색으로 변경 */
                    .toastui-editor-popup-add-image .toastui-editor-tabs .tab-item.active {
                        color: #1A202C !important;
                        border-bottom: 2px solid #1A202C !important;
                    }
                    /* 테두리 없음 */
                    .toastui-editor-defaultUI {
                        border: none !important;
                    }
                `}
            </style>
        </Box>
    );
}

export default PostEditor;
