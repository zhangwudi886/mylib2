import "@testing-library/jest-dom/extend-expect";
import React from "react";
import axios from "axios";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  createEvent,
} from "@testing-library/react";
// 测试引入的组件
import { Upload, UploadProps } from "./upload";

// 异步调用外部资源
jest.mock("../Icon/icon", () => {
  return ({ icon = {}, onClick = () => {} }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
// 使用jest拦截axios异步实例，
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// 定义默认参数
const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
// 定义外部变量，wrapper当前组件整个容器，fileInput真正上传的组件(input)，uploadArea,显示的可以触发上传的区域
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

// 因为每个文件的uid都是动态变化的，我们直接使用一个假的File类型，模拟拿到的所有的数据，这个类型就是真正拖拽，按钮上传的对象。
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

// 定义当前单测的类型
describe("test upload component", () => {
  // 每个测试断言开始前的执行命令，类似于vue中的routerbefore
  beforeEach(() => {
    //   拿到元素的方法，具体参考官网文档
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      ".xdf-file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("Click to upload") as HTMLElement;
  });
  //   第一个测试用例，模拟，判断上传区域正常加载->真正的input未显示->点击上传按钮->显示上传中的小图标->等待最终上传结果->确定最终展示上传成功的图标->onSuccess时间触发并符合ts类型检查->onChange时间触发并符合ts类型检查->确保移除按钮在页面上->执行删除操作->期望得到test.png不在页面上(因为当前元素已经被删除)->onRemove事件成功触发，并且回调参数正常
  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText("spinner")).toBeInTheDocument();
    await wait(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
    });
    expect(queryByText("check-circle")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    //remove the uploaded file
    let timesElement = queryByText("times") as HTMLElement;
    expect(timesElement).toBeInTheDocument();
    fireEvent.click(timesElement);
    expect(queryByText("test.png")).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });
  //   第一个测试用例，模拟，拖拽上传，网上的hack方法，因为没法给formdata真正的append一个对象。
  it("drag and drop files should works fine", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);

    await wait(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });
});
