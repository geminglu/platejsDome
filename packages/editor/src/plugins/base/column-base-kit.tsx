import { BaseColumnItemPlugin, BaseColumnPlugin } from "@platejs/layout";

import {
  ColumnElementStatic,
  ColumnGroupElementStatic,
} from "../../components/staticNode/column-node-static";

export const BaseColumnKit = [
  BaseColumnPlugin.withComponent(ColumnGroupElementStatic),
  BaseColumnItemPlugin.withComponent(ColumnElementStatic),
];
