import React from "react";
import Upload from "./components/Upload/upload";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
function App() {
    var defaultFileLists = [
        {
            name: "实例图片.png",
            size: 17996,
            status: "success",
            uid: "1596964498326upload-file",
        },
        {
            name: "实例图片1.png",
            size: 17996,
            status: "ready",
            percent: 90,
            uid: "1596964498327upload-file",
        },
        {
            name: "实例图片.png",
            size: 17996,
            status: "error",
            uid: "1596964498328upload-file",
        },
        {
            name: "实例图片.png",
            size: 17996,
            percent: 30,
            status: "uploading",
            uid: "1596964498329upload-file",
        },
    ];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Upload, { action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", defaultFileLists: defaultFileLists, drag: true }, "\u62D6\u52A8\u5230\u8FD9\u91CC\u4E0A\u4F20\u6587\u4EF6"))));
}
export default App;
