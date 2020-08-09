var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState, useEffect, } from "react";
import axios from "axios";
import UploadList from "./uploadlist";
import Dragger from "./dragger";
export var Upload = function (props) {
    var action = props.action, onSuccess = props.onSuccess, onProgress = props.onProgress, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, defaultFileLists = props.defaultFileLists, withCredentials = props.withCredentials, multiple = props.multiple, accept = props.accept, headers = props.headers, data = props.data, name = props.name, children = props.children, drag = props.drag, beforeUpload = props.beforeUpload;
    var _a = useState(defaultFileLists || []), fileList = _a[0], setFileList = _a[1];
    var inputRef = useRef(null);
    var handleUpload = function () {
        inputRef.current && inputRef.current.click();
    };
    var uploadFiles = function (files) {
        console.log(files, "uploadFiles");
        var arrayFiles = Array.from(files);
        arrayFiles.forEach(function (file) {
            if (!beforeUpload) {
                postUpload(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        postUpload(processedFile);
                    });
                }
                else if (result !== false) {
                    postUpload(file);
                }
            }
        });
    };
    var postUpload = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList(function (preFileList) { return __spreadArrays([_file], preFileList); });
        var formData = new FormData();
        formData.append(name || "file", file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            withCredentials: withCredentials,
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            onUploadProgress: function (e) {
                console.log(Math.round((e.loaded * 100) / e.total) || 0);
                var percentRate = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(percentRate);
                updateFileList(_file, {
                    percent: percentRate,
                    status: "uploading",
                });
                onProgress && onProgress(percentRate, file);
            },
        })
            .then(function (res) {
            console.log("上传成功", res);
            onSuccess && onSuccess(res.data, file);
            updateFileList(_file, { response: res.data, status: "success" });
        })
            .catch(function (err) {
            console.log("上传失败", err);
            onError && onError(err, file);
            updateFileList(_file, { error: err, status: "error" });
        })
            .finally(function () {
            onChange && onChange(file);
        });
    };
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (preFileList) {
            return preFileList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    useEffect(function () {
        console.log("fileList", fileList);
    }, [fileList]);
    var handleFileChange = function (e) {
        e.stopPropagation();
        var files = e.target.files;
        if (!files) {
            return;
        }
        // 准备上传文件
        uploadFiles(files);
        // if(inputRef.current){
        //     inputRef.current.value=null
        // }
    };
    var handleRemove = function (_file) {
        console.log(_file);
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== _file.uid; });
        });
        if (onRemove) {
            onRemove(_file);
        }
    };
    return (React.createElement("div", null,
        drag ? (React.createElement(Dragger, { onFile: function (files) {
                uploadFiles(files);
            } }, children)) : (children),
        React.createElement("input", { type: "file", className: "xdf-file-input", ref: inputRef, style: { display: "none" }, onChange: handleFileChange, multiple: multiple, accept: accept }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
