"use client";

import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from "@platejs/code-block/react";
import { all, createLowlight } from "lowlight";
import {
  CodeBlockElement,
  CodeLineElement,
  CodeSyntaxLeaf,
} from "../components/node/code-block-node";
import { customLowlight } from "../lib/customLowlight";

const lowlight = createLowlight(all);

customLowlight(lowlight.register);

export const CodeBlockKit = [
  CodeBlockPlugin.configure({
    node: { component: CodeBlockElement },
    options: { lowlight },
    shortcuts: { toggle: { keys: "mod+alt+8" } },
  }),
  CodeLinePlugin.withComponent(CodeLineElement),
  CodeSyntaxPlugin.withComponent(CodeSyntaxLeaf),
];
