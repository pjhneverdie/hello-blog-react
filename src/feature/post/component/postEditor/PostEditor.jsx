import React from 'react';

import {Box} from "@chakra-ui/react";

import {Editor} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import codeSyntaxHighlight
    from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";

import "prismjs/themes/prism.css";

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
            <Editor ref={markRef}
                    width={"100%"}
                    height={"100vh"}
                    hideModeSwitch={true}
                    previewStyle={"vertical"}
                    initialEditType="markdown"
                    toolbarItems={customToolbarItems}
                    hooks={{
                        addImageBlobHook: handleUploadContentImageAsTemp,
                    }}
                    plugins={[codeSyntaxHighlight]}
            />
            <style>
                {`
                    .toastui-editor-defaultUI {
                        border: none !important;
                    }
                    .toastui-editor-contents .toastui-editor-md-preview-highlight::after {
                        background-color: rgba(1,169,255, 0.1) !important;
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
                    .toastui-editor-popup-body input[type='text']:focus {
                        outline: 1px solid #e78413 !important;
                        border-color: transparent;
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
                    .toastui-editor-contents p,
                    .toastui-editor-contents h1, .toastui-editor-contents h2,
                    .toastui-editor-contents h3, .toastui-editor-contents h4,
                    .toastui-editor-contents h5, .toastui-editor-contents h6 {
                        border-bottom: none !important;
                        color: #1e1e1e !important;
                    }
                    .toastui-editor-contents {
                        font-weight: normal !important;
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
                    .toastui-editor-contents code {
                        color: black;
                        background-color: rgba(1,169,255, 0.1);
                        padding: 2px 3px;
                        letter-spacing: -0.3px;
                        border-radius: 2px;
                    }
                    .toastui-editor-md-code {
                        color: black !important;
                        background-color: rgba(1,169,255, 0.1) !important;
                    }              
                    .toastui-editor-md-link.toastui-editor-md-link-desc.toastui-editor-md-marked-text {
                        color: #01a9ff !important;
                    }
                    .toastui-editor-contents a {
                        text-decoration: underline;
                        color: #01a9ff !important;
                    }
                    .toastui-editor-contents a:hover {
                        color: #01a9ff !important;
                    }
                    .token.operator {
                        background-color: transparent;
                    }     
                `}
            </style>
        </Box>
    );
}

export default PostEditor;
