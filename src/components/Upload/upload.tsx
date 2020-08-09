import React, {
  FC,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  useRef,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import classNames from "classnames";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadlist";
import Dragger from "./dragger";
export interface UploadProps {
  action: string;
  defaultFileLists?: UploadFile[];
  onSuccess?: (res: string, file: File) => void;
  onProgress?: (percent: number, file: File) => void;
  onError?: (err: string, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (_file: UploadFile) => void;

  beforeUpload?: (file: File) => boolean | Promise<File>;
  headers?: { [key: string]: any };
  data?: { [key: string]: any };
  name?: string;
  withCredentials?: boolean;
  multiple?: boolean;
  accept?: string;
  drag?: boolean;
}
type UploadStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  name?: string;
  size?: number;
  uid?: string;
  status?: UploadStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onSuccess,
    onProgress,
    onError,
    onChange,
    onRemove,
    defaultFileLists,
    withCredentials,
    multiple,
    accept,
    headers,
    data,
    name,
    children,
    drag,
    beforeUpload,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultFileLists || []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    inputRef.current && inputRef.current.click();
  };
  const uploadFiles = (files: FileList) => {
    console.log(files, "uploadFiles");
    let arrayFiles = Array.from(files);
    arrayFiles.forEach((file) => {
      if (!beforeUpload) {
        postUpload(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            postUpload(processedFile);
          });
        } else if (result !== false) {
          postUpload(file);
        }
      }
    });
  };
  const postUpload = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((preFileList) => [_file, ...preFileList]);
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        withCredentials: withCredentials,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          console.log(Math.round((e.loaded * 100) / e.total) || 0);
          let percentRate = Math.round((e.loaded * 100) / e.total) || 0;
          console.log(percentRate);
          updateFileList(_file, {
            percent: percentRate,
            status: "uploading",
          });
          onProgress && onProgress(percentRate, file);
        },
      })
      .then((res) => {
        console.log("上传成功", res);
        onSuccess && onSuccess(res.data, file);
        updateFileList(_file, { response: res.data, status: "success" });
      })
      .catch((err) => {
        console.log("上传失败", err);
        onError && onError(err, file);
        updateFileList(_file, { error: err, status: "error" });
      })
      .finally(() => {
        onChange && onChange(file);
      });
  };
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((preFileList) => {
      return preFileList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  useEffect(() => {
    console.log("fileList", fileList);
  }, [fileList]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    let files = e.target.files;
    if (!files) {
      return;
    }
    // 准备上传文件
    uploadFiles(files);
    // if(inputRef.current){
    //     inputRef.current.value=null
    // }
  };
  const handleRemove = (_file: UploadFile) => {
    console.log(_file);
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== _file.uid);
    });
    if (onRemove) {
      onRemove(_file);
    }
  };
  return (
    <div className="xdf-upload-component">
      <Button onClick={handleUpload}>click upload</Button>
      {drag ? (
        <Dragger
          onFile={(files) => {
            uploadFiles(files);
          }}
        >
          {children}
        </Dragger>
      ) : (
        children
      )}
      <input
        type="file"
        className="xdf-file-input"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
      ></input>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
