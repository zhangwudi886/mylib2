import { FC } from "react";
export interface UploadProps {
    action: string;
    defaultFileLists?: UploadFile[];
    onSuccess?: (res: string, file: File) => void;
    onProgress?: (percent: number, file: File) => void;
    onError?: (err: string, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (_file: UploadFile) => void;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    headers?: {
        [key: string]: any;
    };
    data?: {
        [key: string]: any;
    };
    name?: string;
    withCredentials?: boolean;
    multiple?: boolean;
    accept?: string;
    drag?: boolean;
}
declare type UploadStatus = "ready" | "uploading" | "success" | "error";
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
export declare const Upload: FC<UploadProps>;
export default Upload;
