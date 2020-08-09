import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload, { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import UploadList from "./uploadlist";
const defaultFileList: UploadFile[] = [
  {
    name: "-JavaScript高级程序设计第三版error.pdf",
    percent: 23,
    size: 1008165,
    status: "error",
    uid: "123",
  },
  {
    name: "-JavaScript高级程序设计第三版success.pdf",
    percent: 23,
    size: 1008165,
    status: "success",
    uid: "122",
  },
  {
    name: "-JavaScript高级程序设计第三版uploading.pdf",
    percent: 23,
    size: 1008165,
    status: "uploading",
    uid: "121",
  },
];

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 100) {
    alert("file too big");
    return false;
  }
  return true;
};
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};
const SimpleUpload = () => {
  return (
    <Upload
      //   action="http://jsonplaceholder.typicode.com/posts"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onSuccess={action("上传成功")}
      onProgress={action("上传中")}
      onError={action("上传失败")}
      //   accept=".jpg,.jpeg,.png"
      multiple={true}
      // beforeUpload={filePromise}
      onChange={action("onchange")}
      name="fileName"
      data={{ key: "value" }}
      headers={{
        "X-Powered-By": "xdf",
      }}
      drag={true}
      //   defaultFileList={defaultFileList}
      //   onRemove={action("onremove")}
    >
      {" "}
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};
storiesOf("Upload Component", module).add("Upload", SimpleUpload);
