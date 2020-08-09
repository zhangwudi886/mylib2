import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./button";

const defaultButton = () => {
  return <Button onClick={action("click")}>default button</Button>;
};

const ButtonWithSize = () => (
  <>
    <Button onClick={action("click")} size="lg">
      large button
    </Button>
    <Button onClick={action("click")} size="sm">
      sm button
    </Button>
  </>
);

const ButtonWithType = () => (
  <>
    <Button onClick={action("click")} btnType="primary">
      primary button111
    </Button>
    <Button onClick={action("click")} btnType="danger">
      danger button
    </Button>
    <Button btnType="link" href="http://www.baidu.com">
      danger button
    </Button>
  </>
);
storiesOf("Button Component", module)
  .add("Button", defaultButton)
  .add("样式 Button", ButtonWithSize, {
    info: {
      inline: false,
    },
  })
  .add("类型 Button", ButtonWithType);
