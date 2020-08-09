import React from "react";
import Button from "./components/Button/button";
import Upload from "./components/Upload/upload";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { UploadFile } from "./components/Upload/upload";
library.add(fas);
function App() {
  const defaultFileLists: UploadFile[] = [
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
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          defaultFileLists={defaultFileLists}
          drag={true}
        >
          拖动到这里上传文件
        </Upload>
      </header>
    </div>
  );
}

export default App;
