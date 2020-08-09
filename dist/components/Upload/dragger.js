import React, { useState } from "react";
import classNames from "classnames";
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var classes = classNames("xdf-uploader-dragger", {
        "is-dragover": dragOver,
    });
    var handleOver = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        console.log(e.dataTransfer.files);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) {
            handleOver(e, true);
        }, onDragLeave: function (e) {
            handleOver(e, false);
        }, onDrop: handleDrop }, children));
};
Dragger.defaultProps = {};
export default Dragger;
