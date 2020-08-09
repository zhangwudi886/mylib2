import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";
interface ProgressProps {
    percent: number;
    showText?: Boolean;
    strokeHeight?: number;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
export declare const Progress: FC<ProgressProps>;
export default Progress;
