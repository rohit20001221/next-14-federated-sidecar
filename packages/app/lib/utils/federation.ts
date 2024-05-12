import { init } from "@module-federation/enhanced/runtime";
import React from "react";
import ReactDOM from "react-dom";

export const federation = init({
  name: "next_app",
  remotes: [],
  shared: {
    react: {
      scope: "default",
      lib: () => React,
      get: () => () => require("react"),
      shareConfig: {
        singleton: true,
        requiredVersion: "^18",
      },
    },
    "react-dom": {
      scope: "default",
      lib: () => ReactDOM,
      get: () => () => require("react-dom"),
      shareConfig: {
        singleton: true,
        requiredVersion: "^18",
      },
    },
  },
});
