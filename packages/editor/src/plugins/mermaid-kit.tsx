"use client";

import { createPlatePlugin } from "platejs/react";

import { MermaidElement } from "../components/node/mermaid-node";

export const MermaidKit = [
  createPlatePlugin({
    key: "mermaid",
    node: {
      component: MermaidElement,
      isElement: true,
      isVoid: true,
    },
    options: {},
    rules: {
      break: { empty: "reset" },
    },
    shortcuts: {
      toggle: { keys: "mod+alt+m" },
    },
  }),
];

