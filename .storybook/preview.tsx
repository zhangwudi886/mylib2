import React from "react";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../src/styles/index.scss";
library.add(fas); //在文档中也需要单独引入组件库的模块
const styles: React.CSSProperties = {
  textAlign: "left",
  padding: "20px 40px",
};
// 添加整体配置，这里不很一级二级
const CenterDecorator = (storyFn: any) => (
  <div style={styles}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
);
addDecorator(withInfo);

addDecorator(CenterDecorator);

addParameters({ info: { inline: true, header: false } });
// 定义加载顺序
// const loaderFn = () => {
//   const allExports = [require("../src/stories/Welcome.stories.tsx")];
//   const req = require.context("../src/components", true, /\.stories\.tsx$/);
//   req.keys().forEach((fname) => allExports.push(req(fname)));
//   return allExports;
// };

// configure(loaderFn, module);
