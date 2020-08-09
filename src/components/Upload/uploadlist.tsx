import React, { FC } from "react";
import Icon from "../Icon/icon";
import { UploadFile } from "./upload";
import Progress from "../Progress/progress";
interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (_file: UploadFile) => void;
}
export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="xdf-upload-list">
      {fileList.map((item) => {
        return (
          <li className="xdf-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === "uploading" || item.status === "ready") && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove && onRemove(item);
                }}
              />
            </span>
            {(item.status === "ready" || item.status === "uploading") && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};
UploadList.defaultProps = {};
export default UploadList;
