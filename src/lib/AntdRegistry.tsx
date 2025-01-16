"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const AntdProvider = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const isServerInserted = React.useRef<boolean>(false);
  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });

  // Custom theme settings
  const theme = {
    token: {
      colorPrimary: "inherit",
      colorPrimaryBg: "#edf2f9",
      fontFamily: "inherit",
    },
  };

  return (
    <StyleProvider cache={cache}>
      <Provider store={store}>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </Provider>
    </StyleProvider>
  );
};

export default AntdProvider;
