import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
export declare type ButtonType = "primary" | "danger" | "default" | "link";
export declare type ButtonSize = "lg" | "sm";
interface BaseButtonProps {
    btnType?: ButtonType;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
