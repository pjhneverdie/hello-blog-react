import React from 'react';

import {Box} from "@chakra-ui/react";

import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

function PostEditor({markRef, handleUploadContentImageAsTemp}) {

    const customToolbarItems = [
        ['heading', 'bold', 'italic'],
        ['hr'],
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
                    .toastui-editor-defaultUI {
                        border: none !important;
                    }
                    .toastui-editor-contents .toastui-editor-md-preview-highlight::after {
                        background-color: rgba(231, 132, 19, 0.6) !important;
                    }
                    .toastui-editor-defaultUI .toastui-editor-ok-button {
                        background-color: #e78413 !important;
                        color: #fff !important;
                        outline-color: #e78413 !important;
                    }
                    .toastui-editor-popup-add-image .toastui-editor-tabs .tab-item.active {
                        color: #e78413 !important;
                        border-bottom: 2px solid #e78413 !important;
                    }
                     .toastui-editor-contents img {
                        width: 100%;
                        aspect-ratio: 16 / 9;
                        display: block;
                        margin-top: 25px;
                        margin-bottom: 25px;
                        margin-left: auto;
                        margin-right: auto;
                        object-fit: contain; 
                    }
                    .toastui-editor-contents h1, .toastui-editor-contents h2 {
                        border-bottom: none !important;
                    }
                    .toastui-editor-contents {
                        margin: 0;
                        padding: 0;
                        font-size: 17.5px;
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕',
                            'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif;
                        z-index: 20;
                    }
                    .toastui-editor-md-list-item-style.toastui-editor-md-list-item-odd {
                        color: black !important;
                        font-weight: normal !important;
                    }
                    .toastui-editor-contents ul > li::before {
                        margin-top: 13px !important;
                        background-color: black !important;
                    }
                    .toastui-editor-contents ol > li::before {
                        color: black !important;
                    }
                    .toastui-editor-contents ul p,
                    .toastui-editor-contents ol p {                      
                        margin-left: 0px !important;
                        margin-right: 0px !important;
                        margin-top: 0px !important;
                        margin-bottom: 10px  !important;
                    }
                `}
            </style>
        </Box>
    );
}

export default PostEditor;
