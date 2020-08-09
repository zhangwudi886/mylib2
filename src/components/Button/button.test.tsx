import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const DefaultButtonProps: ButtonProps = {
  onClick: jest.fn(),
  className: "xdf-uilib",
};
const PrimaryWithDisabledButtonProps: ButtonProps = {
  onClick: jest.fn(),
  disabled: true,
  btnType: "primary",
};

const DiffSizeButtonProps: ButtonProps = {
  btnType: "danger",
  size: "sm",
};

const LinkButtonProps: ButtonProps = {
  btnType: "link",
  href: "http://core.xdf.cn/",
};

const renderButton = (props: ButtonProps, renderString: string) => (
  <Button {...props}>{renderString}</Button>
);

describe("测试新东方button组件", () => {
  it("测试默认组件", () => {
    let wrapper = render(renderButton(DefaultButtonProps, "default"));
    let element = wrapper.getByText("default") as HTMLInputElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass("btn btn-default xdf-uilib");
    expect(element).not.toHaveClass("btn-primary btn-danger");
    fireEvent.click(element);
    expect(DefaultButtonProps.onClick).toBeCalled();
  });
  it("测试primary组件添加disabled属性", () => {
    let wrapper = render(
      renderButton(PrimaryWithDisabledButtonProps, "primary")
    );
    let element = wrapper.getByText("primary") as HTMLInputElement;
    expect(element).toHaveClass("btn btn-primary");
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(PrimaryWithDisabledButtonProps.onClick).not.toBeCalled();
  });
  it("测试danger组件添加size属性", () => {
    let wrapper = render(renderButton(DiffSizeButtonProps, "danger"));
    let element = wrapper.getByText("danger") as HTMLInputElement;
    expect(element).toHaveClass("btn btn-danger btn-sm");
    expect(element).not.toHaveClass("btn-lg");
  });
  it("测试link组件href属性", () => {
    let wrapper = render(renderButton(LinkButtonProps, "link"));
    let element = wrapper.getByText("link") as HTMLAnchorElement;
    expect(element.href).toEqual("http://core.xdf.cn/");
    expect(element).toHaveClass("btn btn-link");
  });
});

// 总结2个问题，，
// 一个是jest dom有多少用用法，
// 异步链接怎么判断。
