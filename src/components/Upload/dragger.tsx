import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";
interface DraggerProps {
  onFile: (files: FileList) => void;
}
export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames("xdf-uploader-dragger", {
    "is-dragover": dragOver,
  });
  const handleOver = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    console.log(e.dataTransfer.files);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleOver(e, true);
      }}
      onDragLeave={(e) => {
        handleOver(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
Dragger.defaultProps = {};
export default Dragger;
